import axios from 'axios';
import React, { useState } from 'react'
import {Row, Col, Card, Form, Button, InputGroup} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'


const Joinpage = () => {
    const navi=useNavigate();

    const [form, setForm] = useState({
        uid:'red',
        upass:'pass',
        uname:'김레드'
    });
    const {uid, upass, uname} = form;
    const onChangeForm = (e) => {
        setForm({...form, [e.target.name]:e.target.value});
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        if(!window.confirm('정말로 가입하실래요?')) return;
        await axios.post('/users/insert', form);
        alert('회원가입완료');
        navi('/users/login');
    }
    return (
        <Row className='justify-content-center my-3'>
            <Col xs={8} md={6} lg={5}>
                <Card>
                    <Card.Header>
                        <h3 className='text-center'>회원가입</h3>
                    </Card.Header>
                    <Card.Body>
                       <form onSubmit={onSubmit}>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text className='title fixed-width'>이름</InputGroup.Text>
                            <Form.Control  onChange={onChangeForm}
                                value={uname} name='uname'/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text className='title fixed-width'>아이디</InputGroup.Text>
                            <Form.Control onChange={onChangeForm}
                                value={uid} name='uid'/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text className='title fixed-width'>비밀번호</InputGroup.Text>
                            <Form.Control  onChange={onChangeForm}
                                value={upass} name='upass'/>
                        </InputGroup>
                            <Button type='submit'
                                className='mb-1 w-100'>회원가입</Button>
                       </form>
                       <div className='mt-2 text-end'>
                        <Link to='/users/login'>로그인 페이지로</Link>
                   </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
      )
}

export default Joinpage