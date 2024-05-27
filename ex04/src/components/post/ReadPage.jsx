import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, Row, Col, Button } from 'react-bootstrap';
import { getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore';
import Spinner from 'react-bootstrap/Spinner';
import { app } from '../../firebaseInit';
import ListPage from '../comment/ListPage';


const ReadPage = () => {
    const navi = useNavigate();
    const [post, setPost] = useState('');
    const db = getFirestore(app);
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const { email, title, body, date} = post;
    
    const callAPI = async() => {
        setLoading(true);
        const res=await getDoc(doc(db, 'posts', id));
        console.log(res.data());
        setPost(res.data());
        setLoading(false);
    }

    useEffect(()=>{
        callAPI();
      }, []);

    const onClickDelete = async() =>{
        if(!window.confirm(`${id}번 게시글을 삭제하실래요?`)) return;
        //게시글삭제
        setLoading(true);
        await deleteDoc(doc(db, `posts/${id}`));
        setLoading(false);
        navi('/post/list')

    }
 

  if(loading) return <h1 className='text-center my-5'><Spinner animation="border" variant="primary"/></h1>
  return (
    <>
    <Row className='justify-content-center my-5'>
        <h1 className='text-center'>게시글정보</h1>
        <Col xs={12} md={10} lg={8}>
            
                {email===sessionStorage.getItem('email') &&
                    <div className='text-end mb-2'>
                        <Button onClick={()=>navi(`/post/update/${id}`)} className='me-2'>수정</Button>
                        <Button variant='danger' onClick={onClickDelete}>삭제</Button>
                    </div>     
                }
            
            <Card>
                <Card.Body>
                    <h5>{title}</h5>
                    <hr/>
                    <div style={{ whiteSpace: "pre-wrap"}}>{body}</div>
                </Card.Body>
                <Card.Footer className='text-muted'>
                    Posted {date} by {email}
                </Card.Footer>
            </Card>
        </Col>
    </Row>
    {/**** 댓글 목록 *****/}
    <ListPage id={id}/>
    </>
  )
}

export default ReadPage