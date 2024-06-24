import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { BoxContext } from '../../context/BoxContext';

const CGVPage = () => {
    const {setBox} = useContext(BoxContext);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);

    const callAPI = async() =>{
        setLoading(true);
        const res= await axios.get('/crawl/cgv')
        console.log(res.data);
        setList(res.data);
        setLoading(false);
    }

    useEffect(()=>{
        callAPI();
    }, []);

    const onCilckDonwnload = async(url) => {
        await axios.post(`/crawl/cgv/download?image=${url}`);
        setBox({show:true, message:'이미지다운로드 완료'});
    }
   

if(loading) return <h1 className='text-center my-5'><Spinner animation="border" variant="primary"/></h1>
  return (
    <div>
        <Row>
            {list.map((cgv, index)=>
                <Col key={cgv.image} xs={6} md={4} lg={2} className='mb-2'>
                    <Card>
                        <Card.Header style={{ backgroundColor:'#FA5858'}}>
                        <span className='ellipsis text-center' style={{color:'white', fontSize:'1.5rem'}}>NO.{index+1}</span>
                        </Card.Header>
                        <Card.Body>
                            <img src={cgv.image} width="100%"/>
                            <Button className='mt-2 text-center' onClick={()=>onCilckDonwnload(cgv.image)}>이미지다운로드</Button>
                        </Card.Body>
                        <Card.Footer>
                            <span className='ellipsis' style={{fontSize:'0.8rem'}}>{cgv.title}</span>
                        </Card.Footer>
                    </Card>
                </Col>
            )}
        </Row>
    </div>
  )
}

export default CGVPage