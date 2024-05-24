import React, { useEffect, useState } from 'react'
import { app } from '../../firebaseInit'
import { getDatabase, ref, onValue, remove } from 'firebase/database'
import { Button, Table } from 'react-bootstrap'
import ModalMap from './ModalMap'
import Spinner from 'react-bootstrap/Spinner';

const FavoritePage = () => {
  const [loading, setLoading] = useState(false);
  const [locals, setLocals] = useState([]);
  const db = getDatabase(app);
  const uid= sessionStorage.getItem('uid');

  const callAPI = () => {
    setLoading(true);
    onValue(ref(db, `favorite/${uid}`), res=>{
      let rows= [];
      let count=0;
      res.forEach(row=>{
        count++;
        rows.push({no:count, key:row.key, ...row.val()});
      });
      //console.log(rows);
      setLocals(rows);
      setLoading(false);
    });
  }

  useEffect(()=>{
    callAPI();
  }, []);

  const onClickDelete = (local) =>{
    if(window.confirm(`"${local.place_name}" 삭제하실래요?`)){
      remove(ref(db, `favorite/${uid}/${local.key}`));
    }
  }
  if(loading) return <h1 className='text-center my-5'> <Spinner animation="border" variant="primary" /></h1>
  return (
    <div className='my-5 text-center'>
      <h1 className='my-5'>즐겨찾기</h1>
      <Table bordered hover striped>
        <thead className='table-danger'>
          <tr>
            <td>no.</td>
            <td>장소명</td>
            <td>전화</td>
            <td>주소</td>
            <td>지도</td>
            <td>삭제</td>
          </tr>
        </thead>
        <tbody className='text-center'>
          {locals.map(local=>
            <tr key={local.key}>
              <td>{local.no}</td>
              <td>{local.place_name}</td>
              <td>{local.phone}</td>
              <td>{local.address_name}</td>
              <td><ModalMap local={local}/></td>
              <td>
                <Button variant='danger' onClick={()=>onClickDelete(local)}>삭제</Button>
              </td>
            </tr>
          )}
          </tbody>
      </Table>
    </div>
  )
}

export default FavoritePage