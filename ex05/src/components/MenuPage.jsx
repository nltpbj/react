import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import BBSRouter from './router/BBSRouter';
import UserRouter from './router/UserRouter';
import MessagePage from './message/MessagePage';

const MenuPage = () => {
    const photo = sessionStorage.getItem('photo') && `/display?file=${sessionStorage.getItem('photo')}`;
    const uid = sessionStorage.getItem('uid');
    const uname = sessionStorage.getItem('uname');

    const onLogout = (e) => {
        e.preventDefault();
        if (!window.confirm("로그아웃하실래요?")) return;
        sessionStorage.clear();
        window.location.href = '/';
    }

    return (
        <>
            <Navbar expand="lg" bg="success" variant='dark'>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Home</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/bbs/list">
                                <Nav.Link>게시판</Nav.Link>
                            </LinkContainer>
                        </Nav>
                        <Nav className="ms-auto">
                            {uid ? (
                                <>
                                    <LinkContainer to="/message">
                                        <Nav.Link>메세지</Nav.Link>
                                    </LinkContainer>
                                    <Nav.Link>
                                        <img src={photo || 'http://via.placeholder.com'} width="30px" alt="profile" />
                                    </Nav.Link>
                                    <LinkContainer to="/users/read">
                                        <Nav.Link>{uname}님</Nav.Link>
                                    </LinkContainer>
                                    <Nav.Link href="#" onClick={onLogout}>로그아웃</Nav.Link>
                                </>
                            ) : (
                                <LinkContainer to="/users/login">
                                    <Nav.Link>로그인</Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path="/bbs/*" element={<BBSRouter />} />
                <Route path='/users/*' element={<UserRouter />} />
                <Route path='/message/*' element={<MessagePage />}></Route>
            </Routes>
        </>
    )
}

export default MenuPage;
