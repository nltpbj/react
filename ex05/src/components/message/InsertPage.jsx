import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const InsertPage = () => {
  const [message, setMessage] = useState('');
  const [receiver, setReceiver] = useState('');
  const [user, setUsers ] = useState([]);
  const CallAPI = async() => {
    const res=await axios.get('/users')
    //console.log(res.data);
    setUsers(res.data);
  }

  useEffect(()=>{
    CallAPI();
  }, []);

  const onSend = async() => {
    if(message===""){
      alert("메세지 내용을 입력하세요");
      return;
    }
    //메세지 보내기
    await axios.post("/message/insert", {
      sender:sessionStorage.getItem('uid'),
      receiver, 
      message
    });
    alert("메세지 전송완료");
    window.location.href='/message';
  }

  return (
    <div className='my-5'>
        <h1 className='text-center mb-5'>메세지작성</h1>
        <div className='mb-2'>
          <Form.Select value={receiver} onChange={(e)=>setReceiver(e.target.value)}>
            {user.map(user=>
            <option key={user.uid} value={user.uid}>
              {user.uname} ({user.uid})
            </option>
            )}
          </Form.Select>
        </div>
        <div>
          <Form.Control onChange={(e)=>setMessage(e.target.value)} value={message} as="textarea" rows={10}/>
        </div>
        <div className='text-end mt-2'> 
          <Button className='px-5' onClick={onSend}>보내기</Button>
        </div>
    </div>
  )
}

export default InsertPage