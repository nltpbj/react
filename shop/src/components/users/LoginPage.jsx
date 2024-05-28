import React, { useState } from 'react'
import { AiOutlineMail } from "react-icons/ai";
import { BsKey } from "react-icons/bs";
import { InputGroup, Form,  Button, Card, Col, Row } from 'react-bootstrap'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navi = useNavigate();
    const [form, setForm] = useState({
        uid:'',
        upass:''
    });
    const { uid, upass } = form;
    const onChageForm = (e) => {
        setForm({...form, [e.target.name]:e.target.value});
    }
 const onSubmit = async(e) => {
    e.preventDefault();
    if(uid==="" || upass===""){
        alert("아이디 나 비밀번호를 입력하세요");
        return;
    }
    //로그인체크
   // console.log(uid, upass);
   const res=await axios.post("/users/login", form);
   //console.log(res.data.result);
   const result=parseInt(res.data.result);
   if(result===0){
    alert("아이디가 존재하지 않습니다");
   }else if(result===2){
    alert("비밀번호가 일치하지 않습니다");
   }else if(result===1){
    sessionStorage.setItem('uid', uid);
    navi('/');
   }
 }
 
  return (
    <Row className='justify-content-center my-5 userLogin'>
        <Col xs={8} md={6} lg={4}>
            <Card>
                <Card.Header><h3 className='text-center'>로그인</h3></Card.Header>
                <Card.Body>
                    <form onSubmit={onSubmit}>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text className="title justify-centent-center"><AiOutlineMail/></InputGroup.Text>
                            <Form.Control name="uid" value={uid} onChange={onChageForm}/>
                        </InputGroup>
                        <InputGroup className='mb-3'>
                            <InputGroup.Text className="title justify-centent-center"><BsKey/></InputGroup.Text>
                            <Form.Control 
                                name='upass' value={upass} type='password' onChange={onChageForm}/>
                        </InputGroup>
                        <Button className='w-100' type='submit'>로그인</Button>
                    </form>
                </Card.Body>
            </Card>
        </Col>
    </Row>
  )
}

export default LoginPage