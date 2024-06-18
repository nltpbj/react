import { type } from '@testing-library/user-event/dist/type';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import Spinner from 'react-bootstrap/Spinner';

const DeletePage = () => {
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(0);
    const uid = sessionStorage.getItem('uid');
    const [list, setList] = useState([]);

    const callAPI = async () => {
        const res=await axios.get(`/message/delete/list/${uid}`);
        console.log(res.data);
        const data=res.data.map(msg=>msg && {...msg, checked:false, 
            type:uid===msg.sender?'send':'receive'});
        setList(data);
    }

    const onChangeAll = (e) => {
        const data = list.map(msg => msg && { ...msg, checked: e.target.checked });
        setList(data);
    }

    const onChangeSingle = (e, mid) => {
        const data=list.map(msg=>msg.mid===mid ? {...msg, checked:e.target.checked}: msg);
        setList(data);
    }

    useEffect(() => {
        callAPI();
    }, []);

    useEffect(() => {
        let cnt=0;
        list.forEach(msg=>msg.checked && cnt++);
        setChecked(cnt);
    }, [list]);

    const onReset = () => {
        if(checked===0){
            alert("복원할 메세지를 선택하세요");
            return;
        }

        let cnt=0;
        setLoading(true);
        list.forEach(async msg=>{
            if(msg.checked){
                await axios.post(`/message/reset/delete/${msg.mid}?type=${msg.type}`);
                cnt++;
            }
            if(cnt===checked) callAPI();
            setTimeout(()=>{
                setLoading(false);
            }, 1000);
        });
    }
    if(loading) return <h1 className='text-center my-5'><Spinner animation="border" variant="primary"/></h1>
    return (
        <div>
            <h1 className='text-center'>휴지통</h1>
            <div>
                <input type='checkbox' onChange={onChangeAll} checked={list.length>0 && checked===list.length} />
                <Button size='sm' className='mx-2' variant='outline-danger'>영구삭제</Button>
                <Button onClick={onReset}
                    size='sm' className='mx-2' variant='outline-success'>복원</Button>
                <hr />
            </div>
            <Table hover>
                <tbody>
                    {list.map(msg =>
                        <tr key={msg.mid}>
                            <td><input onChange={(e)=>{onChangeSingle(e, msg.mid)}}
                                type='checkbox' checked={msg.checked}  /></td>
                            <td>{msg.sendDelete === 1 ? `${msg.mid} 받은메세지:${msg.receiver}` : `${msg.mid} 보낸메세지:${msg.sender}`}</td>
                            <td>{msg.message.substring(0, 30)}</td>
                            <td>{msg.sendDate}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            
        </div>
        
    )
}

export default DeletePage