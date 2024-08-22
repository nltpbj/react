import './App.css';
import { Container } from 'react-bootstrap';
import MenuPage from './components/MenuPage';
import Toppage from './components/Toppage';
import Bottompage from './components/Bottompage';

function App() {
  return (
    
      <Container>
        <Toppage/>
        <MenuPage/>
        <Bottompage/>
      </Container>
    
  );
}

export default App;