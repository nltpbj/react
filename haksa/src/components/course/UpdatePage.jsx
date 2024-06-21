import React, { useContext } from 'react'
import { Card, InputGroup, Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BoxContext } from '../../context/BoxContext';

const UpdatePage = () => {
    const navi = useNavigate();
    const {setBox} = useContext(BoxContext);
    const {lcode} = useParams();
    const [list, setList] = useState([]);
    const [form, setForm] = useState('');
    const [coures, setCoures] = useState('');
    const {lname, room, instructor, pname, persons, capacity, dept, hours} = form;

    const callAPI = async() => {
        const res=await axios.get(`/cou/${lcode}`);
        console.log(res.data);
        setForm(res.data);

        const res1=await axios.get(`/pro?page=1&size=100&word=${res.data.dept}`);
        setList(res1.data.list);
    }

    useEffect(()=>{
        callAPI();
    }, []);

    const onChangeForm = (e) => {
        setForm({...form, [e.target.name]:e.target.value});
    }

    const onClickCancel = () => {
        if(JSON.stringify(coures)===JSON.stringify(form)) return;
        setBox({
            show:true,
            message: '정말로 취소하실래요?',
            action:()=> setForm(coures)
        });

    }

    const onClickUpdate = () => {
        if(JSON.stringify(coures)===JSON.stringify(form)) return;
        setBox ({
            show:true,
            message: '변경된 정보를 수정하실래요?',
            action: async()=>{
                await axios.post('/cou/update', form);
                navi(`/cou/read/${lcode}`);
            }
        })
    }

  return (
    <Row>
        <Col xs={12} md={10} lg={8}>
            <Card>
                <Card.Header>
                    <h2 className='text-center'>강좌정보 수정</h2>
                </Card.Header>
                <Card.Body>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text >강좌번호</InputGroup.Text>
                            <Form.Control readOnly value={lcode}/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                        <InputGroup.Text>강좌이름</InputGroup.Text>
                            <Form.Control  name='lname' value={lname} onChange={onChangeForm}/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                        <InputGroup.Text>강의실</InputGroup.Text>
                            <Form.Control  name='room' value={room} onChange={onChangeForm}/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                        <InputGroup.Text>최대수강</InputGroup.Text>
                            <Form.Control name='capacity' value={capacity} onChange={onChangeForm}/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                        <InputGroup.Text>강좌시수</InputGroup.Text>
                            <Form.Control name='hours' value={hours} onChange={onChangeForm}/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                        <InputGroup.Text>개설학과</InputGroup.Text>
                            <Form.Control name='dept' value={dept}  readOnly/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                        <InputGroup.Text>담당교수</InputGroup.Text>
                            <Form.Select value={instructor} name='instructor' onChange={onChangeForm}>
                                {list.map(pro=>
                                    <option key={pro.pcode} value={pro.pcode}>
                                        {pro.pname}: {pro.dept}
                                    </option>
                                )}
                            </Form.Select>
                        </InputGroup>
                        <div className='text-center mt-3'>
                        <Button onClick={onClickUpdate}
                            className='me-2'>정보수정</Button>
                        <Button onClick={onClickCancel}
                            className='btn-danger'>수정취소</Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    </Row>
  )
}

export default UpdatePage