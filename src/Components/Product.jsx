import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AddToCart, useCartCrud } from "../useCart";
import { wishListContext } from "../Context/WishlistContext";


export function Product({ prod }) {

    let [heart, setHeart] = useState(false)
    let { mutate } = useCartCrud(AddToCart)

    let { addToWishList } = useContext(wishListContext);

    function addWishList(id) {
        addToWishList(id)
        setHeart(!heart)
    }

    return <>

        <div className='col-md-2'>
            <div className='product cursor-pointer p-2'>

                <i className="fa-solid fa-heart fa-2x" style={heart ? { color: "green" } : { color: "unset" }}
                    onClick={() => addWishList(prod._id)}></i>

                <Link to={`/productDetails/${prod._id}`}>

                    <img src={prod.imageCover} className='w-100' alt={prod.title} />

                    <h2 className='h5 text-main'>{prod.category.name}</h2>
                    <p>{prod.title}</p>
                    <div className='box d-flex justify-content-between'>
                        <span>{prod.price} EGP</span>
                        <span>{prod.ratingsAverage} <i className='fa-solid fa-star rating-color'></i></span>
                    </div>
                </Link>
                <button className='btn bg-main text-white my-2'
                    onClick={() => { mutate(prod._id) }}>Add To Cart</button>
            </div>
        </div>
    </>
}