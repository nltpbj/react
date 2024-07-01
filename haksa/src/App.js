import logo from './logo.svg';
import './App.css';
import MenuPage from './common/MenuPage';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import { BoxContext } from './context/BoxContext';
import Box from './common/Box';
import { Link } from 'react-router-dom';

function App() {
  const [box, setBox] = useState({
    show:false,
    message:'',
    action:null
  });

  return (
    <BoxContext.Provider value={{box, setBox}}>
    <Container>
      <MenuPage/>
    </Container>
      {box.show && <Box box={box} setBox={setBox}/>}
    </BoxContext.Provider>
       
    
  );
}

export default App;
