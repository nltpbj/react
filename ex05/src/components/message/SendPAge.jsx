import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SendPAge = () => {
  const [checked, setChecked] = useState(0);
  const [list, setList] = useState([]);
  const callAPI = async() => {
    const url=`/message/send.json/${sessionStorage.getItem('uid')}`;
    const res=await axios.get(url);
    const data=res.data.map(msg=>msg && {...msg, checked:false});
    console.log(data);
    setList(data);
  }

  const onChangeAll = (e) => {
    const data=list.map(msg=>msg && {...msg, checked:e.target.checked});
    setList(data);
   }

   const onChangeSingle = (e, mid) => {
    const data=list.map(msg=>msg.mid===mid ? {...msg, checked:e.target.checked}:msg);
    setList(data);
   }

  useEffect(()=> {
    callAPI();
  }, []);

  useEffect(()=>{
    let cnt=0;
    list.forEach(msg=>msg.checked && cnt++);
    setChecked(cnt);
  }, [list]);


  return (
    <div className='my-5'>
        <h1 className='text-center'>보낸메세지</h1>
        <Table hover striped>
          <thead> 
              <tr className='table-danger'>
              <td><input checked={checked===list.length}
                type="checkbox" onChange={onChangeAll}/></td>
                <td>받은이</td>
                <td>내용</td>
                <td>수신확인일</td>
                <td>발신인</td>
              </tr>
          </thead>
          <tbody>
            {list.map(msg=>
              <tr key={msg.mid}>
                <td><input onChange={(e)=>onChangeSingle(e, msg.mid)}
                    type="checkbox" checked={msg.checked}/></td>
                <td>{msg.uname}({msg.receiver})</td>
                <td><div className='title'>
                  <Link to={`/message/send/${msg.mid}`}>{msg.message}</Link></div></td>
                <td>{msg.sendDate}</td>
                <td>{msg.readDate || '안읽음'}</td>
              </tr>
            )}
          </tbody>
        </Table>
    </div>
  )
}

export default SendPAge