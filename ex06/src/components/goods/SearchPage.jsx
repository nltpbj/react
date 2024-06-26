import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios';
import {Button, Col, Form, InputGroup, Row, Table} from 'react-bootstrap'
import Pagination from 'react-js-pagination';
import '../../common/Paging.css'
import { BoxContext } from '../../common/BoxContext';

const SearchPage = () => {
  const [checked, setCheked] = useState(0);
  const {setBox} = useContext(BoxContext);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('비비고');
  const [size, setSize] = useState(5);
  const [goods, setGoods]= useState([]);
  const [count, setCount] = useState(0);

  const callAPI = async()=> {
    const res=await axios.get(`/goods/search?query=${query}&page=${page}&size=${size}`);
    console.log(res.data);
    setGoods(res.data.items);
    const data=res.data.items.map(good=>good && {...good, checked:false});
    setGoods(data);
    setCount(res.data.total > 100 && 100);
  }

  useEffect(()=>{
    let cnt=0;
    goods.map(good=>good.checked && cnt++);
    setCheked(cnt);
  }, [goods]);

  useEffect(()=>{
    callAPI();
  }, [page]);

  const onSubmit = (e) => {
    e.preventDefault();
    if(query===''){
      setBox({
        show:true, 
        message:'검색어를 입력하세요',
        action2: ()=> {
          setGoods([]);
          setCount(0);
        }
      });
     
      }else{
      setPage(1);
      callAPI();
    }
  }


  const onInsert = (good) => {
    setBox({
      show:true,
      message: `${good.title}를 등록하실래요?`,
      action:async()=>{
        const res=await axios.post('/goods/insert', {
          gid:good.productId,
          title:removeTags(good.title),
          image:good.image,
          maker:good.maker,
          brand:good.brand,
          price:good.lprice
        });
          if(res.data===1) alert('등록완료');
          else alert('이미등록된 상품');
      }
    });
  }

  const onChangeAll = (e) => {
    const data=goods.map(good=>good && {...good, checked:e.target.checked});
    setGoods(data);
  }

    const onChangeSingle = (e, id)=> {
      const data=goods.map(good=>good.productId===id ? {...good, checked:e.target.checked}: good);
      setGoods(data);
    }

    const onCheckedInsert = () => {
      if(checked===0) {
        setBox({show:true, message:'등록할 상품을 선택하세요'});
        return;
      }

      setBox({
        show:true,
        message:`${checked}개 상품을 등록하실래요?`,
        action:()=>{
          let cnt=0;
          let inserted=0;
          goods.forEach(async good=>{
            if(good.checked){
              const res=await axios.post('/goods/insert',{
                gid:good.productId,
                title:removeTags(good.title),
                image:good.image,maker:good.maker,
                brand:good.brand,price:good.lprice
              });
              if(res.data===1) inserted++;
              cnt++;
              if(checked==cnt){
                setBox({
                  show:true, 
                  message:`${inserted}개 상품등록완료!`,
                  action2:()=>{
                    const data=goods.map(good=>good && {...good, checked:false});
                    setGoods(data);
                  }
                });
              }
            }
          });
        }
      });
     
    }

    const onClickImage = async(image) => {
      if(!window.confirm(`${image} 다운로드 하실래요?`)) return;
      await axios.post(`/download?file=${image}`);
      alert("다운로드완료");
    }
    
    /**  */
    const removeTags = (html) => {
      const doc=new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || '';
    }

  return (
    <div>
      <h1 className='text-center my-5'>상품검색</h1>
      <Row>
        <Col>
        <input checked={goods.length===checked}
            type="checkbox" className='mx-2' onChange={onChangeAll}/>
          <Button onClick={onCheckedInsert}>전체상품등록</Button>
        </Col>
        <Col xs={6} md={5} lg={4}>
          <form onSubmit={onSubmit}>
            <InputGroup className='mb-4'>
              <Form.Control value={query} onChange={(e)=>setQuery(e.target.value)}/>
                <Button type='submit'>검색</Button>
            </InputGroup>
          </form>
        </Col>
      </Row>
      <Table>
        <tbody>
          {goods.map(good=>
            <tr key={good.productId}>
                <td><input onChange={(e)=>onChangeSingle(e, good.productId)}
                    type='checkbox' checked={good.checked}/></td>
                <td><img onClick={()=>onClickImage(good.image)}
                  src={good.image} width="100px"/></td>
                <td><div dangerouslySetInnerHTML={{__html:good.title}}/><div>{good.lprice}원</div></td>
                <td>{good.maker}</td>
                <td>{good.brand}</td>
                <td><Button onClick={()=>onInsert(good)} size='sm'>상품등록</Button></td>
            </tr>
          )}
        </tbody>
      </Table>
      {count > size &&
        <Pagination
            activePage={page}
            itemsCountPerPage={size}
            totalItemsCount={count}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={ (e)=>setPage(e) }/>
      }
    </div>
  )
}

export default SearchPage