import React, { useContext, useState } from 'react'
import { userContext } from '../../UserContext'
import { cashOrder, checkout, deleteCart, getCart, updateCart, useCart, useCartCrud } from '../../useCart'
import Loading from '../Loading';
import emptyImg from "../../assests/images/preview.png"
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function Cart() {
    let [details, setDetails] = useState('')
    let [phone, setPhone] = useState('')
    let [city, setCity] = useState('')

    let { isOpen, setOpen, setCartId } = useContext(userContext)
    let { data, isError, isLoading, error } = useCart('getCart', getCart)

    console.log(data?.data?.data._id);
    setCartId(data?.data?.data._id)
    let { mutate, data: deleteData } = useCartCrud(deleteCart)
    let { mutate: mutateUpdate, data: updateData } = useCartCrud(updateCart)
    let { mutate: mutateOnline, data: dataOnline } = useCartCrud(checkout)

    // console.log(deleteData);
    // console.log(updateData);

    function addAddress(e) {
        e.preventDefault()
        let shippingAddress = {
            details, phone, city
        }
        mutateOnline({ id: data?.data?.data?._id, shippingAddress })
        console.log(dataOnline);
        if (dataOnline?.data?.status === 'success')
            window.location.href = (dataOnline?.data?.session?.url);
    }





    if (isLoading)
        return <Loading></Loading>
    if (isError)
        return <div className='text-center m-4'>
            <h2 className='text-main'>Cart is empty</h2>
            <img src={emptyImg} alt='' />
        </div>



    return (

        <>

            <Helmet>
                <title>Cart</title>
                <meta name="description" content="Helmet application" />
            </Helmet>

            <aside className={data?.data?.numOfCartItems ? 'main-color' : '#fff'} style={isOpen ? { right: 0, transition: 'right .7s' } : { right: '-100%', transition: 'right .7s' }}>
                <i className='fa-solid fa-close p-3 fa-2x cursor-pointer' onClick={() => { setOpen(false) }}></i>

                <div className='container'>
                    {data?.data.numOfCartItems ? <>

                        <h2 className='text-main'>Number of cart items {data?.data.numOfCartItems}</h2>
                        <p>Total cart price <span className='fw-bolder mx-3'>{data?.data?.data?.totalCartPrice}</span></p>
                        {data?.data?.data?.products.map((prod) => <div className='row align-items-center justify-content-between gy-2'
                            key={prod.product._id} >
                            <div className="col-md-8">
                                <div className='row gy-3 align-items-center '>
                                    <div className='col-md-2'>
                                        <img src={prod.product.imageCover} className='w-100 my-3' alt='' />
                                    </div>
                                    <div className='col-md-10'>
                                        <p>{prod.product.title}</p>
                                        <p className='text-main'>{prod.price} EGP</p>
                                        <p className='cursor-pointer' onClick={() => { mutate(prod.product._id) }}><i className='fa-solid fa-trash text-main '> </i> Remove</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 d-flex justify-content-end">
                                <div>
                                    <button className='btn bg-main p-1 text-white'
                                        onClick={() => { mutateUpdate({ id: prod.product._id, count: prod.count + 1 }) }}> + </button>
                                    <span className='mx-2'>{prod.count}</span>
                                    <button className='btn bg-danger p-1 text-white' onClick={() => prod.count === 1 ? mutate(prod.product._id)
                                        : mutateUpdate({ id: prod.product._id, count: (prod.count) > 0 ? prod.count - 1 : prod.count })}> - </button>
                                </div>
                            </div>

                        </div>)}

                        <Link to={"/checkout"} className='btn btn-success bg-main ms-auto d-block'>CheckOut</Link>
                        <button data-bs-toggle="modal"
                            data-bs-target="#modalId"
                            className='btn bg-success my-3 d-block w-100'>Online Checkout</button>

                        {/* modal */}
                        <div
                            className="modal fade"
                            id="modalId"
                            tabindex="-1"
                            data-bs-backdrop="static"
                            data-bs-keyboard="false"

                            role="dialog"
                            aria-labelledby="modalTitleId"
                            aria-hidden="true"
                        >
                            <div
                                className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm"
                                role="document"
                            >
                                <div className="modal-content">
                                    <div className="modal-header">

                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        <form>
                                            <input type='text' className='form-control' placeholder='details' onChange={(e) => { setDetails(e.target.value) }} />
                                            <input type='text' className='form-control' placeholder='phone' onChange={(e) => { setPhone(e.target.value) }} />
                                            <input type='text' className='form-control' placeholder='city' onChange={(e) => { setCity(e.target.value) }} />
                                            <button onClick={addAddress}
                                                type='submit' className='btn btn-danger mt-2'>Add address</button>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>







                    </> : <div className='text-center m-4'>
                        <h2 className='text-main'>Cart is empty</h2>
                        <img src={emptyImg} alt='' />

                    </div>}
                </div>
            </aside >

        </>
    )
}






