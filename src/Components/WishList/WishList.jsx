import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'

import { Vortex } from 'react-loader-spinner';

import { Toaster } from 'react-hot-toast';
import { wishListContext } from '../../Context/WishlistContext';


export default function WishList() {

    const [wishlist, setWishlist] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    let { setWishList } = useContext(wishListContext);


    function addCart(id) {

    }

    // display Wishlist Product

    async function getWishlist() {
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
                headers: {
                    token: localStorage.getItem("userToken")
                }
            })
            setWishlist(data?.data);
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    }

    // delete Wishlist Product
    async function removeWishlistProduct(productId) {
        setIsLoading(true)
        const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/` + productId, {
            headers: {
                token: localStorage.getItem("userToken")
            }
        })
        setWishlist(data?.data);
        if (data?.data) {
            getWishlist()

        }

    }

    useEffect(() => {
        getWishlist()
    }, [])

    return (
        <>
            <div><Toaster /></div>
            {isLoading ?
                <div className=" d-flex justify-content-center mt-5 pt-5">
                    <div className="mt-5 pt-5">
                        <Vortex
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="vortex-loading"
                            wrapperStyle={{}}
                            wrapperClass="vortex-wrapper"
                            colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                        />
                    </div>
                </div> :
                <>
                    {wishlist.length > 0 ?
                        <div className="container pt-5 my-5">
                            <div className=" d-flex justify-content-between">
                                <div className="fw-bold px-1"><h2>My wish List</h2></div>
                                <div className=' fw-bold px-1'>total number of items : <span >{wishlist.length}</span></div>
                            </div>

                            {wishlist.map((wishProduct) => {
                                return <div key={wishProduct._id} className="card-product shadow rounded-2 my-3">
                                    <div className="row align-items-center">
                                        <div className="col-md-2">
                                            <img className='w-100' key={wishProduct._id} src={wishProduct.imageCover} alt="" />
                                        </div>
                                        <div className="col-md-8  px-sm-4">
                                            <h3 >{wishProduct.title}</h3>
                                            <p className={"pt-2"}>price : <span className=' text-main'>{wishProduct.price}</span></p>
                                            <button onClick={() => removeWishlistProduct(wishProduct._id)} className={` text-danger btn`}>
                                                <i className={'fa-solid fa-trash text-danger'}></i> Remove</button>
                                        </div>
                                        <div className="col-md-2">
                                            <div>
                                                <button className='btn bg-main text-white'> <i className="fa-solid fa-plus"></i> add to cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}

                        </div >

                        : <h2 className=' alert alert-warning text-center my-5'>No products in yuor WishList</h2>
                    }
                </>
            }


        </>
    )
}
