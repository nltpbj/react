import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Table, Row, Col, Button } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';
import { BoxContext } from '../../context/BoxContext';

const ListPage = () => {
    const {setBox} = useContext(BoxContext);
  const [page, setPage]=useState(1);
  const [size, setSize]=useState(2);
  const [count, setCount] = useState(0);
  const [list, setList] = useState([]);

  const callAPI = async()=>{
    const res=await axios.get(`/cou?page=${page}&size=${size}`);
    console.log(res.data);
    setList(res.data.list);
    setCount(res.data.total);
    const last=Math.ceil(res.data.total/size);
    if(page>last) setPage(page-1);
  }

    useEffect(()=>{
        callAPI();
    }, [page]);

    const onDelete = (cou) => {
        if(cou.persons > 0) {
          setBox({
            show:true,
            message:`${cou.persons}명이 수강신청한 강좌입니다.`
          });
          return;
        }

        setBox({
            show:true,
            message:`${cou.lname} 강좌를 삭제하실래요?`,
            action:async()=>{
              await axios.post(`/cou/delete/${cou.lcode}`);
              callAPI();
            }
          });
        }

  return (
    <div>
        <h1 className='text-center mb-5'>강좌목록</h1>
        <Row className='mb-1'>
            <Col>검색수: {count}명</Col>
            <Col className='text-end'><Link to='/cou/insert'>강좌등록</Link></Col>
        </Row>
        <Table hover bordered  className='text-center'>
            <thead>
                <tr className='table-info'>
                    <td>코드</td>
                    <td>강의명</td>
                    <td>교수명</td>
                    <td>강의시간</td>
                    <td>강의실</td>
                    <td>총원</td>
                    <td>삭제</td>
                </tr>
            </thead>
            <tbody>
                {list.map(cou=>
                      <tr key={cou.lcode} className='text-center'>
                        <td>{cou.lcode}</td>
                        <td><Link to={`/cou/read/${cou.lcode}`}>{cou.lname}</Link></td>
                        <td>{cou.pname ? `${cou.pname}(${cou.instructor})` : '-'}</td>
                        <td>{cou.hours}시간</td>    
                        <td>{cou.room ? `${cou.room}호`: '-'}</td>
                        <td>{cou.persons}명/{cou.capacity}명</td>
                        <td><Button onClick={()=>onDelete(cou)}
                            variant='outline-danger' size='sm'>삭제</Button></td>
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

export default ListPage