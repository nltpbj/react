import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

const UpdatePage = () => {
    const navi=useNavigate();
    const {bid} = useParams(); 
    const [form, setForm] = useState({
        bid: bid,
        title:'',
        contents:''
    });

    const {title, contents} = form;

    const callAPI = async() => {
        const res=await axios.get(`/bbs/${bid}`);
        setForm(res.data);
    }

    useEffect(()=>{
        callAPI();
    }, []);

    const onChangeForm = (e) => {
        setForm({...form, [e.target.name]:e.target.value});
    }
    
    const onReset = (e) => {
        if(!window.confirm('변경된 내용을 취소하실래요?')) return;
        callAPI();
    }
    const onSubmit = async(e) => {
        e.preventDefault();
        if(!window.confirm('변경된 내용을 수정하실래요?')) return;
        await axios.post('/bbs/update', form);
        navi(-1);
    }
  return (
    <div className='my-5'>
        <h1 className='text-center mb-5'>게시글 수정</h1>
        <Row className='justify-content-center'>
            <Col xs={12} md={10} lg={8}>
                <form onReset={onReset} onSubmit={onSubmit}>
                    <Form.Control onChange={onChangeForm} value={title} name='title' 
                        className='mb-2'/>
                    <Form.Control onChange={onChangeForm} value={contents} name='contents'
                        as='textarea' rows={10}/>
                    <div className='text-center mt-3'>
                        <Button type='submit' className='px-5 me-2'>수정</Button>
                        <Button type='reset'
                            className='px-5' variant='success'>취소</Button>
                    </div>
                </form>
            </Col>
        </Row>
    </div>
  )
}

export default UpdatePage