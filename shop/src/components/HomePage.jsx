import axios from 'axios';
import React, { useState, useEffect } from 'react'
import {Row, Col, Card, Form, InputGroup, Button} from 'react-bootstrap'
import  Pagination from 'react-js-pagination'
import './Paging.css'
import { BsBalloonHeart, BsBalloonHeartFill } from "react-icons/bs";

const HomePage = () => {
  const uid=sessionStorage.getItem('uid');
  const [count, setCount] = useState(0);
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(6);
  const [key, setKey] = useState('title');
  const [word, setWord] = useState('');

  const callAPI = async() => {
    const res=await axios.get(
      `/books/list?page=${page}&size=${size}&key=${key}&word=${word}&uid=${uid}`);
    console.log(res.data);
    setBooks(res.data.documents);
    setCount(res.data.count);
  }

  useEffect(()=>{
    callAPI();
  }, [page]);

  const onSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    callAPI();
  }

  const onClicklike = async(bid) => {
    if(uid){
      //좋아요 저장
      const res=await axios.post('/books/likes/insert', {uid, bid});
      //alert(res.data.result);
      callAPI();
    }else{
      window.location.href='/users/login';
    }
  }

  const onClickCnacel = async(bid) => {
    const res = await axios.post('/books/likes/delete', {bid, uid});
    if(res.data.result == 1){
      callAPI();
    }
  }

  return (
    <div className='mt-5'>
      <Row className='mb-3 justify-content-end'>
        <Col xs={8} md={6} lg={5} className='text-end'>
          <form onSubmit={onSubmit}>
            <InputGroup>
              <Form.Select className='me-2' value={key} 
                    onChange={(e)=>setKey(e.target.value)}>
                <option value="title">제목</option>
                <option value="author">저자</option>
                <option value="publisher">출판사</option>
              </Form.Select>
              <Form.Control onChange={(e)=>setWord(e.target.value)} 
                  placeholder='검색어' value={word}/>
              <Button type="submit">검색</Button>  
            </InputGroup>
          </form>
        </Col>
      </Row>
      <Row className='mt-5'>
        {books.map(book=>
          <Col key={book.bid} xs={6} md={4} lg={2} className='mb-3'>
            <Card>
              <Card.Body>
              <a href={`/books/read/${book.bid}`}>
                <img src={book.image} width="100%"/>
              </a>
              </Card.Body>

              <Card.Footer>
                <div className='ellipsis mb-2' style={{fontSize:'12px'}}>
                  {book.title}
                </div>
                <Row>
                  <Col>
                    <div className='ellipsis' style={{fontSize:'12px'}}>
                      {book.fmtprice}
                    </div>
                  </Col>
                  <Col className='text-end'>
                    {book.ucnt === 0 ?
                    <BsBalloonHeart className='heart' 
                      onClick={()=>onClicklike(book.bid)}/>
                    :
                    <BsBalloonHeartFill onClick={()=>onClickCnacel(book.bid)} className='heart'/>
                    }
                      <span style={{fontSize:'10px'}} 
                        className='user-text'>{book.lcnt}</span>
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
          </Col>
        )}
      </Row>
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

export default HomePage;