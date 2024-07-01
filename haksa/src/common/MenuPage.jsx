import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RouterPage from '../router/RouterPage';

const MenuPage = () => {
  const [showDropdownHome, setShowDropdownHome] = useState(false);
  const [showDropdownLeisure, setShowDropdownLeisure] = useState(false);

  const handleMouseOver = (setShowDropdown) => {
    setShowDropdown(true);
  };

  const handleMouseLeave = (setShowDropdown) => {
    setShowDropdown(false);
  };




  return (
    <div>

    <div className="background-image">

      <div className='container my-5'>
        <div  
          className='d-inline-block me-5'
          onMouseEnter={() => handleMouseOver(setShowDropdownHome)}
          onMouseLeave={() => handleMouseLeave(setShowDropdownHome)}>

          <a className="nav-link nav-link-custom" href="#">학사관리</a>
          {showDropdownHome && (
            <div className="dropdown-menu show">
              <Link className="dropdown-item" to="/stu">학생관리</Link>
              <Link className="dropdown-item" to="/cou">강좌관리</Link>
            </div>
          )}
        </div>

        <div 
          className='d-inline-block me-5'
          onMouseEnter={() => handleMouseOver(setShowDropdownLeisure)}
          onMouseLeave={() => handleMouseLeave(setShowDropdownLeisure)}>
          
          <a className="nav-link nav-link-custom" href="#">여가생활</a>
          {showDropdownLeisure && (
            <div className="dropdown-menu show">
              <Link className="dropdown-item" to="/crawl/cgv" >뮤비차트</Link>
              <Link className="dropdown-item" to="/crawl/gmarket">상품검색</Link>
            </div>
            
          )}
        </div>
     <span className='tlqkf'>
      <Link to="/" className='me-3'>
            <img src="/image/logo.png" alt="Description" className="logo-image"/>
      </Link>
        </span>
        <hr/>
      </div>
   
    </div>
    <RouterPage/>
    </div>
  );
}


export default MenuPage;