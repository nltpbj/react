import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import RouterPage from './RouterPage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';


const MenuPage = () => {
    const uid= sessionStorage.getItem('uid');
    const navi = useNavigate();
    const[user, SetUser] = useState('');

    const callAPI = async() => {
        const url=`/users/read/${uid}`;
        const res=await axios.get(url);
        const {uname} = res.data;
        SetUser(res.data);
       // console.log(uname);
    }

    useEffect(()=>{
        if(uid) callAPI();
    }, [uid]);

    const onClickLogout = (e) => {
        e.preventDefault();
        if(window.confirm("정말로 로그아웃 하실래요?")){
            sessionStorage.clear();
            navi("/");
        }
    }
    return (
        <>
        <Navbar expand="lg" className="bg-success" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/">React&Node</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className='me-auto'>
                <Nav.Link href="/books/search">도서검색</Nav.Link>
                <Nav.Link href="/books/list">도서목록</Nav.Link>
              </Nav>
              {uid ?
              <>
              <Nav>
                <Nav.Link href='/users/mypage' className='active'>{user.uname}님</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href='#' onClick={onClickLogout}>로그아웃</Nav.Link>
              </Nav>
              </>
              :
              <Nav>
                <Nav.Link href='/users/login'>로그인</Nav.Link>
              </Nav>
              }
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <RouterPage/>
        </>
      );
}

export default MenuPage