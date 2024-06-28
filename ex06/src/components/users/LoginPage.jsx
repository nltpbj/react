import axios from 'axios';
import React, { useContext, useState } from 'react'
import {Row, Col, Card, Form, Button, InputGroup} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { BoxContext } from '../../common/BoxContext';

const LoginPage = () => {
    const navi = useNavigate();
    const {user, setUser} = useContext(BoxContext);
    const [form, setForm] = useState({
      uid:'red',
      upass:'pass'
    });
    const {uid, upass} = form;
    const onChangeForm = (e) => {
      setForm({...form, [e.target.name]:e.target.value});
    }
  
    const onSumbit = async(e) => {
      e.preventDefault();
      const res=await axios.post('/users/login', form);
      if(res.data===1){
        alert('로그인성공!');
        sessionStorage.setItem('uid', uid);
        window.location.href='/';
      
      }else if(res.data===2){
        alert('비밀번호 불일치!');
      }else if(res.data===0) {
        alert('아이디가 존재하지않습니다!');
      }
    }

  return (
    <Row className='justify-content-center my-3'>
        <Col xs={8} md={6} lg={5}>
            <Card>
                <Card.Header>
                    <h3 className='text-center'>로그인</h3>
                </Card.Header>
                <Card.Body>
                   <form onSubmit={onSumbit}>
                   <InputGroup className='mb-2'>
                            <InputGroup.Text className='title fixed-width'>아이디</InputGroup.Text>
                            <Form.Control  onChange={onChangeForm}
                                value={uid} name='uid'/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text className='title fixed-width'>비밀번호</InputGroup.Text>
                            <Form.Control   onChange={onChangeForm}
                            type='password' value={upass} name='upass'/>
                        </InputGroup>
                        <Button type='submit' className='mb-1 w-100'>로그인</Button>
                   </form>
                   <div className='mt-2 text-end'>
                        <Link to='/users/join'>회원가입</Link>
                   </div>
                </Card.Body>
            </Card>
        </Col>
    </Row>
  )
}

export default LoginPage