import React from 'react'
import Slider from "react-slick";


import slide1 from "./assests/images/slider-image-1.jpeg"
import slide2 from "./assests/images/slider-image-2.jpeg"
import slide3 from "./assests/images/slider-image-3.jpeg"

import blog1 from "./assests/images/blog-img-1.jpeg"
import blog2 from "./assests/images/blog-img-2.jpeg"


export default function MainSlaider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 1000
    };



    return (
        <header>
            <div className='row gx-0'>
                <div className='col-md-9'>
                    <Slider {...settings}>
                        <img src={slide1} height={400} alt='' />
                        <img src={slide2} height={400} alt='' />
                        <img src={slide3} height={400} alt='' />
                    </Slider>
                </div>
                <div className='col-md-3'>

                    <img src={blog1} className='w-100' height={200} alt='' />
                    <img src={blog2} className='w-100' height={200} alt='' />


                </div>
            </div>
        </header>
    )
}

