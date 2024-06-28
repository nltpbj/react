import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Rating } from '@mui/material'
import axios from 'axios';

const Review = ({gid}) => {
    const uid=sessionStorage.getItem('uid');
    const [list, setList] = useState([]);
    const [rating, setRating] = useState(0);
    const [contents, setContents] = useState('');

    const callAPI = async() => {
        const res=await axios.get(`/review/list/${gid}`);
        //console.log(res.data);
        const data=res.data.map(review=>review && {...review, isEdit:false});
        setList(data);
    }

    useEffect(()=>{
        callAPI();
    }, []);

    const onInsert = async() => {
        if(contents===''){
            alert("리뷰내용을 입력하세요!");
            return;
        }
        //리뷰등록
        await axios.post('/review/insert', {gid, uid, rating, contents});
        alert('댓글등록');
        setRating(0);
        setContents('');
    }

    const onDelete = async(rid) => {
        if(!window.confirm(`${rid}번 리뷰를 삭제하실래요?`)) return;
        await axios.post(`/review/delete/${rid}`);
        callAPI();
    }

    const onUpdate = (rid) => {
        const data=list.map(r=>r.rid===rid ? {...r, isEdit:true}: r);
        setList(data);

    }
     
    
  return (
    <div>
        <div>
            {sessionStorage.getItem('uid') ?
            <div>
            <Rating
                name="simple-controlled"
                value={rating}
                precision={0.5}
                    size='large'
                    onChange={(e, newValue)=>setRating(newValue)}/>
                <Form.Control  value={contents} onChange={(e)=>setContents(e.target.value)}
                    as='textarea' rows={5} placeholder='내용을 입력하세요'/>  
                <div className='mt-2 text-end'>
                    <Button onClick={onInsert}
                        variant='outline-dark'>등록</Button>  
                </div>
            </div>
            :
            <div>
                <Button>리뷰등록</Button>
            </div>
        }
        </div>
        <div>
            {list.map(review=>
                <Row key={review.rid}>
                    <Col>{review.uid} {review.regDate}</Col>
                </Row>
            )}
        </div>
    </div>
  )
}

export default Review