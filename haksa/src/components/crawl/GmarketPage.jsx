import React, { useContext, useState } from 'react'
import { Button, Col, Form, InputGroup, Row, Table } from 'react-bootstrap'
import { BoxContext } from '../../context/BoxContext';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

const GmarketPage = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');
    const {setBox} = useContext(BoxContext);

    const onSubmit = async(e) => {
        e.preventDefault();
        if(query===''){
            setBox({show:true, message:'검색어를 입력하세요'});
            return;
        }
        setLoading(true);
        const res=await axios.get(`/crawl/gmarket?query=${query}`);
        console.log(res.data);
        setList(res.data);
        setLoading(false);
    }

    if(loading) return <h1 className='text-center my-5'><Spinner animation="border" variant="primary"/></h1>
  return (
    <div>
        <h1 className='text-center mb-5'>지마켓 상품검색</h1>
        <Row cl>
            <Col xs={6} md={4} lg={3}>
            <form onSubmit={onSubmit} className='mb-3'>
                <InputGroup>
                    <Form.Control placeholder='검색어' value={query} onChange={(e)=>setQuery(e.target.value) }/>
                    <Button type='submit'>검색</Button>
                </InputGroup>
            </form>    
            </Col>
            <hr/>
            <Table>
                <tbody>
                    {list.map((pro, index)=>
                    <tr key={index}>
                        <td><img src={pro.image} width="100px"/></td>
                        <td>{pro.code}</td>
                        <td>
                            <div>{index + 1}. {pro.title}</div> 
                            <div>{pro.price}원</div>     
                        </td>
                        
                    </tr>
                    )}
                </tbody>
            </Table>
        </Row>
    </div>
  )
}

export default GmarketPage