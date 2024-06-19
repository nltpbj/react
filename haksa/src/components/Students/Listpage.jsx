import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap';
import '../../common/Paging.css'
import Pagination from 'react-js-pagination';
import Box from '../../common/Box';
import { BoxContext } from '../../context/BoxContext';
import { Link } from 'react-router-dom';

const Listpage = () => {
    const {setBox} = useContext(BoxContext);

    const [list, setList] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    
    const callAPI = async() => {
        const url=`/stu?page=${page}&size=${size}&key=dept&word=`;
        const res=await axios.get(url);
        console.log(res.data);
        setList(res.data.list);
        setCount(res.data.total);
      }

    useEffect(()=>{
        callAPI();
    }, [page]);

    const onClickDelete = (scode) => {
        setBox({
          show:true,
          message:`${scode}번 학생을 삭제하실래요?`,
          action: ()=> onDelete(scode)
        });
      }

      const onDelete = async(scode) => {
        await axios.post(`/stu/delete/${scode}`)
              .then(()=>{
                setPage(1);
                callAPI();
              })
              .catch((err)=>{
                console.log(err)
              });
      }
  return (
    
    <div>
        <h1 className='text-center'>학생목록</h1>
    <Table hover>
        <Row>
        <Col>
          검색수:{count}명
        </Col>
        <Col>
            <Link to='/stu/insert'>학생등록</Link>
        </Col>
        </Row>
        <tbody>
            {list.map(stu=>
                 <tr key={stu.scode}>
                 <td>{stu.scode}</td>
                 <td>{stu.sname}</td>
                 <td>{stu.year}</td>
                 <td>{stu.dept}</td>
                 <td>{stu.pname}({stu.advisor})</td>
                 <td>{stu.birthday}</td>
                 <td>
                 <Button onClick={()=>onClickDelete(stu.scode)} size='sm' variant='danger'>삭제</Button></td>
                </tr>
            )}
        </tbody>
    </Table>
    {count > size && 
      <Pagination
          activePage={page}
          itemsCountPerPage={size}
          totalItemsCount={count}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={ (e)=>setPage(e) }/>
        } 

    </div>
  )
}

export default Listpage