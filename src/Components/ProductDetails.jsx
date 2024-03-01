import React from 'react'
import { useParams } from 'react-router-dom'
import { featuredSingleProduct, useProduct } from '../useProduct'
import Loading from './Loading'
import { AddToCart, useCartCrud } from "../useCart";
import Slider from 'react-slick/lib/slider';

export default function ProductDetails() {


    let { mutate } = useCartCrud(AddToCart)
    let { id } = useParams()
    let { isLoading, isError, error, data } = useProduct('productdetails',
        () => featuredSingleProduct(id))
    console.log(data);

    if (isLoading)
        return <Loading></Loading>
    if (isError)
        return <h2>{error.message}</h2>


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
        <div className='row align-items-center'>
            <div className='col-md-4'>
                {/* <img src={data?.imageCover} alt='imageCover' className='w-100' /> */}
                <Slider {...settings}>
                    {data?.images.map((img) => <img key={img} src={img} alt=''></img>)}
                </Slider>
            </div>
            <div className='col-md-8'>
                <h3 >{data?.title}</h3>
                <p>{data?.description}</p>

                <span className='text-main'>{data?.category?.name}</span>

                <div className='box d-flex justify-content-between'>
                    <span>{data?.price} EGP</span>
                    <span>{data?.ratingsAverage} <i className='fa-solid fa-star rating-color'></i></span>

                </div>
                <button className='btn bg-main text-white my-4 form-control'
                    onClick={() => { mutate(data?._id) }}>Add To Cart</button>
            </div>
        </div>
    )
}
