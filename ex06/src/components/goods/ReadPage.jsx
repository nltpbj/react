import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Row, Col, Card} from 'react-bootstrap'
import GoodsInfo from './GoodsInfo';
import Spinner from 'react-bootstrap/Spinner';
import Recently from '../../common/Recently';

const ReadPage = () => {
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(false);
    const [goods, setGoods] = useState('');
    /** gid받아와서 param을 사용 */
    const param=useParams();
    /** 비구조할당이고 param이라는 object를  gid로 가져온다 */
    const {gid} = param;
    const {title, image, brand, maker, price, regDate, fmtprice} = goods; //비구조할당

    //console.log(param);

    const callAPI = async()=>{
        setLoading(true);
        const res=await axios.get(`/goods/read/${gid}`);
        //console.log(res.data);
        const data = {...res.data, 
            fmtprice:res.data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        setGoods(data);
        setLoading(false);
    }

    const callRelated = async() => {
        const res1=await axios.get(`/goods/related/list/${gid}`);
        //console.log(res1.data);
        setRelated(res1.data);
      }

    useEffect(()=>{
        callAPI();
        callRelated();
    }, []);

    if(loading) return <h1 className='text-center my-5'><Spinner animation="border" variant="primary"/></h1>
  return (
    <div>
        <Card className='mb-5'>
            <Card.Body>
                <Row>
                    <Col >
                        <Card >
                            <img src={image} width='250px'/>                   
                        </Card>
                    </Col>
                    <Col  style={{fontSize:'1.5rem'}} className='py-5'>
                        <div className='mb-2'>{title}</div>
                        <div  className='mb-2'>가격: {fmtprice}원</div>
                        <div  className='mb-2'>제조사: {maker}</div>
                        <div  className='mb-2'>등록일: {regDate}</div>
                    </Col>
                </Row>    
            </Card.Body>
        </Card>

       {related.length >=5 && 
        <div className='mt-5'>
          <h3>관련상품</h3>
          <Recently goods={related}/>
        </div>
      }
      <GoodsInfo goods={goods}/>
    </div>
  )
}

export default ReadPage