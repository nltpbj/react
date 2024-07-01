import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RouterPage from '../router/RouterPage';

const MenuPage = () => {
  const [showDropdownCompany, setShowDropdownCompany] = useState(false);
  const [showDropdownProduct, setShowDropdownProduct] = useState(false);
  const [showDropdownEmploy, setShowDropdownEmploy] = useState(false);

  const handleMouseOver = (setShowDropdown) => {
    setShowDropdown(true);
  };

  const handleMouseLeave = (setShowDropdown) => {
    setShowDropdown(false);
  };

  return (
    <div>
      <div className="background-image my-5">
        <div className='container my-5'>
          <nav className="d-flex align-items-center justify-content-between nav-border">
            <div
              className='d-inline-block me-3'
              onMouseEnter={() => handleMouseOver(setShowDropdownCompany)}
              onMouseLeave={() => handleMouseLeave(setShowDropdownCompany)}
            >
              <a className="nav-link nav-link-custom" href="#">회사소개</a>
              {showDropdownCompany && (
                <div className="dropdown-menu show">
                  <Link className="dropdown-item" to="/overview">회사개요</Link>
                  <Link className="dropdown-item" to="/histroy">회사연혁</Link>
                  <Link className="dropdown-item" to="/ceohello">CEO인사말</Link>
                </div>
              )}
            </div>

            <div
              className='d-inline-block me-3'
              onMouseEnter={() => handleMouseOver(setShowDropdownProduct)}
              onMouseLeave={() => handleMouseLeave(setShowDropdownProduct)}
            >
              <a className="nav-link nav-link-custom" href="#">제품</a>
              {showDropdownProduct && (
                <div className="dropdown-menu show">
                  <Link className="dropdown-item" to="/product/read">제품소개</Link>
                </div>
              )}
            </div>

            <div
              className='d-inline-block me-3'
              onMouseEnter={() => handleMouseOver(setShowDropdownEmploy)}
              onMouseLeave={() => handleMouseLeave(setShowDropdownEmploy)}
           >
              <a className="nav-link nav-link-custom" href="#">채용</a>
              {showDropdownEmploy && (
                <div className="dropdown-menu show">
                  <Link className="dropdown-item" to="/eee/hello">채용공고</Link>
                </div>
              )}
            </div>

            <span className='logo-custom'>
              <Link to="/" className='me-3'>
                <img src="/image/logo.png" alt="Description" className="logo-image" />
              </Link>
            </span>
          </nav>
        </div>
      </div>
      <RouterPage />
    </div>
  );
}


export default MenuPage;