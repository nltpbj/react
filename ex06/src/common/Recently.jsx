import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function SampleNextArrow(props) {

  
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ color:'gray' , fontSize:'2.5rem'}}
        onClick={onClick}>
        <BiChevronRight/>
     </div>
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{color:'gray' , fontSize:'2.5rem'}}
        onClick={onClick}>
        <BiChevronLeft/>
      </div>
    );
  }

const Recently = ({goods}) => {
 
 
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplaySpeed:5000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
 
  };




  return (
    <Slider {...settings} >
        {goods.map(good=>
            <Col key={good.gid}  >
                <Card className='me-2'>
                    <Card.Body>
                        <Link to={`/goods/read/${good.gid}`}>
                          <img src={good.image} width='100%'/>
                        </Link>
                    </Card.Body>
                </Card>
            </Col>
        )}
    </Slider>
  )
}

export default Recently