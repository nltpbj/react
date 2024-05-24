import React, { useState } from 'react'
import {Row, Col, Button, InputGroup, Form, Card} from 'react-bootstrap'
import { AiOutlineMail } from "react-icons/ai";
import { BsKey } from "react-icons/bs";
import { app } from '../../firebaseInit'
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const navi=useNavigate();
    const auth=getAuth(app);

    const [form, setForm] = useState({
        email: "blue@test.com",
        pass: "12341234"
    });
    const {email, pass} = form; //비구조할당

    const onChangeForm = (e) => {
        setForm({...form,[e.target.name]:e.target.value});
    }            

    const onSubmit = (e) => {
        e.preventDefault();
        if(email==="" || pass===""){
            alert("이메일과 비밀번호를 입력하세요");
        }else{
            //로그인체크
            setLoading(true);
            //alert(`${email}\n${pass}`)
            signInWithEmailAndPassword(auth, email, pass)
            
            .then(success=>{
                sessionStorage.setItem('email', email);
                sessionStorage.setItem('uid', success.user.uid);
               // alert('로그인성공' + success.user.uid);
              setLoading(false);
              if(sessionStorage.getItem("target")){
                navi(sessionStorage.getItem("target"));
              }else{
                navi("/");
              }
             
            })
            .catch(error=>{
                setLoading(false);
                alert('이메일 또는 비밀번호가 일치하지 않습니다');
            });
        }
    }

    if(loading) return <div className='my-5 text-center'><Spinner animation="border" variant="primary" /></div>
  return (
    <Row className='justify-content-center my-5 userLogin'>
        <Col xs={6} md={5} lg={4}>
            <Card>
                <Card.Header>
                    <h3 className='text-center'>로그인</h3>
                </Card.Header>
                <Card.Body>
                    <form onSubmit={onSubmit}>
                        <InputGroup className='mb-2'> 
                            <InputGroup.Text className="title justify-centent-center"><AiOutlineMail/></InputGroup.Text>
                            <Form.Control name='email' value={email} onChange={(e)=>onChangeForm(e)}/> 
                        </InputGroup>
                        <InputGroup className='mb-3'>
                            <InputGroup.Text className="title justify-centent-center"><BsKey/></InputGroup.Text>
                            <Form.Control name='pass' type='password' value={pass} onChange={onChangeForm}/>
                        </InputGroup>
                        <Button className='w-100' type='submit'>로그인</Button>
                        <div className='text-end my-2'>
                            <a href='/user/join'>회원가입</a>
                        </div>
                    </form>
                </Card.Body>
            </Card>

        </Col>
    </Row>
  )
}

export default LoginPage