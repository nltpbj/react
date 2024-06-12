import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Card, Button } from 'react-bootstrap';

const ReadPage = () => {
    const [form, setForm] = useState('');
    const {bid} = useParams();

    const callAPI = async() => {
        const res=await axios.get(`/bbs/${bid}`);
        console.log(res.data);
        setForm(res.data);
    }

    useEffect(()=>{
        callAPI();
    }, []);

    const onDelete = async() => {
        if(!window.confirm(`${form.bid}번 게시글을 삭제하실래요?`)) return;
        await axios.post(`/bbs/delete/${form.bid}`);
        alert("게시글삭제완료");
        window.location.href="/bbs/list";
    }

  return (
    <div className='my-5'>
        <h1 className='text-center mb-5'>{bid}: 게시글 정보</h1>
        <div></div>
        <Row className='justify-content-center'>
            <Col xs={12} md={10} lg={8}>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col>
                                {form.title}
                            </Col>
                            <Col className='text-end'>
                             조회수: {form.viewcnt}
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body style={{whiteSpace:'pre-wrap'}}>
                        {form.contents}
                    </Card.Body>
                    <Card.Footer className='text-muted'>
                        Created by {form.uname} on {form.regDate}
                    </Card.Footer>
                </Card>
                {sessionStorage.getItem('uid')===form.uid &&
                <div className='text-center my-3'>
                    <Link to={`/bbs/update/${form.bid}`}>
                     <Button className='px-5 me-2'>수정</Button>
                    </Link>
                    <Button  onClick={onDelete} className='px-5' variant='danger'>삭제</Button>
                </div>
                }
            </Col>
        </Row>
    </div>
  )
}

export default ReadPage