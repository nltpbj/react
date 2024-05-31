import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Nav, Tab, Tabs } from 'react-bootstrap'
import { useLocation, useParams } from 'react-router-dom'
import { BsBalloonHeart, BsBalloonHeartFill } from "react-icons/bs";
import ReviewPage from './ReviewPage';

const ReadPage = () => {
    const uid = sessionStorage.getItem('uid');
    const pathname = useLocation();
    console.log(pathname);
    const { bid } = useParams(); //  useparams도 비구조할당 취급 그래서 {} 사용
    const [book, setBook] = useState({
        bid: '',
        author: '',
        title: '',
        bigimage: '',
        contents: '',
        isbn: '',
        fmtdate: '',
        fmtprice: '',
        publisher: '',
        image: '',
        lcnt: '',
        ucnt: ''
    });
    const { author, title, bigimage, contents, isbn, fmtdate, fmtprice, publisher, image, lcnt, ucnt } = book;
    const callAPI = async () => {
        const res = await axios.get(`/books/read/${bid}?uid=${uid}`);
        console.log(res.data);
        setBook(res.data);
    }
    useEffect(() => {
        callAPI();
    }, []);

    const onlikeInsert = async (bid) => {
        if (uid) {
            //좋아요저장
            const res = await axios.post('/books/likes/insert', { bid, uid });
            if (res.data.result === 1) {
                callAPI();
            }
        } else {
            sessionStorage.setItem('target', pathname);
            window.location.href = '/users/login'
        }
    }
    const onLikeCancel = async (bid) => {
        const res = await axios.post('/books/likes/delete', { bid, uid });
        if (res.data.result == 1) {
            callAPI();
        }
    }
    return (
        <Row className='my-5 justify-content-center'>
            <Col xs={12} md={10} lg={8}>
                <h1 className='text-center mb-2'>[{bid}] 도서정보</h1>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col md={6} className='text-center mb-3'>
                                <img src={bigimage || "http://via.placeholder.com/120x170"} width="80%" />
                            </Col>
                            <Col className='my-3 align-self-center'>
                                <div>
                                    <span>[{bid}] {title}</span>
                                    {ucnt === 0 ?
                                        <BsBalloonHeart onClick={() => onlikeInsert(bid)} className='heart' />
                                        :
                                        <BsBalloonHeartFill onClick={() => onLikeCancel(bid)} className='heart' />
                                    }
                                    <span style={{ fontSize: '12px' }}>{lcnt}</span>
                                </div>
                                <hr />
                                <div>저자: {author}</div>
                                <div>출판사: {publisher}</div>
                                <div>ISBN: {isbn}</div>
                                <div>가격: {fmtprice}</div>
                                <div>정보 수정일: {fmtdate}</div>
                                <div className='text-center mt-3'>
                                    <Button className='px-3 me-2' variant='success'>바로구매</Button>
                                    <Button className='px-3'>장바구니</Button>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
            <Row className='my-5 justify-content-center'>
                <Col xs={12} md={10} lg={8}>
                    <Tabs
                        defaultActiveKey="home"
                        id="fill-tab-example"
                        className="mb-3">
                        <Tab eventKey="home" title="리뷰" >
                           <ReviewPage bid={bid}/>
                        </Tab>
                        <Tab eventKey="profile" title="상세설명">
                            <div style={{whiteSpace:'pre-wrap'}}>{contents}</div>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Row>
    )
}

export default ReadPage