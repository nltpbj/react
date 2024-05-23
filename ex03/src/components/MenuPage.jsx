import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const MenuPage = () => {
    return (
        <Navbar expand="lg" bg="success" variant='dark'>
          <Container fluid>
            <Navbar.Brand href="#">로고</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll>
                <Nav.Link href="#action1">도서검색</Nav.Link>
                <Nav.Link href="#action2">지역검색</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href='#action1'>로그인</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    }
export default MenuPage