import React, { useEffect, useState } from 'react'
import { Row, Col, Button, InputGroup,Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { app } from '../../firebaseInit'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
import Spinner from 'react-bootstrap/Spinner';

const UpdatePage = () => {
    const navi = useNavigate();
    const [loading, setLoading] = useState(false);
    const db = getFirestore(app);
    const {id} = useParams();
    const [form, setForm] = useState('');
    const {title, body} = form;

    const CallAPI = async() => {
        setLoading(true);
        const res = await getDoc(doc(db, `posts/${id}`));
        console.log(res.data());
        setForm(res.data());
        setLoading(false);
    }

    useEffect(()=>{
        CallAPI();
    }, []);
    const onChangeForm = (e) => {
        setForm({...form, [e.target.name]:e.target.value});
    }
    const onsubmit = async(e) => {
        e.preventDefault();
        if(!window.confirm(`${id}번 게시글 수정하실래요?`)) return;
        
        //게시글 수정
        setLoading(true);
        await setDoc(doc(db,`posts/${id}`), form);
        setLoading(false);
        navi(`/post/read/${id}`);
    }
    if(loading) return <h1 className='text-center my-5'><Spinner animation="border" variant="primary"/></h1>
  return (

    <Row>
        <Col className='justify-content-center my-5'>
            <h1 className='text-center'>게시글수정</h1>
            <form onSubmit={onsubmit}>
                <Form.Control name='title' onChange={onChangeForm} className='mb-2' value={title}/>
                <Form.Control name='body' onChange={onChangeForm} as="textarea" rows={10} className='mb-3' value={body}/>
                <div className='text-center'>
                    <Button className='px-5' type='submit'>수정</Button>
                    <Button onClick={()=> CallAPI()} className='px-5' variant='danger ms-2'>취소</Button>
                </div>
            </form>
        </Col>    
    </Row>
  )
}

export default UpdatePage