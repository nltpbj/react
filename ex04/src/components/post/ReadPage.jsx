import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Row, Col, Button } from 'react-bootstrap';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Spinner from 'react-bootstrap/Spinner';
import { app } from '../../firebaseInit';

const ReadPage = () => {
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

  if(loading) return <h1 className='text-center my-5'><Spinner animation="border" variant="primary"/></h1>
  return (
    <Row className='justify-content-center my-5'>
        <h1 className='text-center'>게시글정보</h1>
        <Col xs={10} md={8} lg={7}>
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
  )
}

export default ReadPage