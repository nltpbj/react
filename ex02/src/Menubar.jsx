import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import RouterPage from './components/NrouterPage';
import { useNavigate } from 'react-router-dom';

const Menubar = () => {
    const navi = useNavigate();
    const onClickLogout = (e) => {
        e.preventDefault();
        if(window.confirm('정말로 로그아웃하실래요?')){
            sessionStorage.clear();
            navi('/');
        }
    }
    return (
        <>
            <Navbar bg="success" variant='dark' expand="lg">
                 <Container fluid>
                    <Navbar.Brand href="#">React</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll>
                        <Nav.Link href="/book/search">도서검색</Nav.Link>
                        <Nav.Link href="/local/search">지역검색</Nav.Link>
                    </Nav>      
                    {sessionStorage.getItem('email') ? 
                <>
                    <Nav>
                        <Nav.Link href='#'>{sessionStorage.getItem('email')}</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#" onClick={onClickLogout}>로그아웃</Nav.Link>
                    </Nav>
                </>
                    :
                    <Nav>
                         <Nav.Link href="/user/login">로그인</Nav.Link>
                    </Nav>
                }
                </Navbar.Collapse>
            </Container>
            </Navbar>
            <RouterPage/>
        </>
      );
}

export default Menubar