import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { Card, Col } from 'react-bootstrap';


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


  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
 
  };


const Recently = () => {
    const callAPI = async() => {
        const res =await axios.get(`/goods/list?page=1&size=5`);
        console.log(res.data.list);
        setGoods(res.data.list);
    }


    const [goods, setGoods] = useState([]);


    useEffect(()=> {
        callAPI();
    }, []);

  return (
    <Slider {...settings} >
        {goods.map(good=>
            <Col key={good.gid}  >
                <Card className='me-2'>
                    <Card.Body>
                        <img src={good.image} width='100%'/>
                    </Card.Body>
                </Card>
            </Col>
        )}
    </Slider>
  )
}

export default Recently