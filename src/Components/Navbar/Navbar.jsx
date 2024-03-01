
import React, { useContext } from 'react'
import logo from "../../assests/images/freshcart-logo.svg"
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../../UserContext'
import { getCart, useCart } from '../../useCart'



export default function Navbar() {
    let { data } = useCart('getCart', getCart)
    let { user, setIsUser, setOpen, login } = useContext(userContext)


    let navigate = useNavigate()

    function LogOut() {
        setIsUser(null)
        localStorage.removeItem('userToken')
        navigate('/')
    }


    return (
        <>
            <nav
                className=" navbar navbar-expand-sm navbar-light bg-light "
            >
                <div className="container">
                    <Link className="navbar-brand" to="home">
                        <img src={logo} alt='logo' />
                    </Link>
                    <button
                        className="navbar-toggler d-lg-none"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapsibleNavId"
                        aria-controls="collapsibleNavId"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavId">
                        {user ? <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to="home" >Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="products" >Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="categories" >Categories</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="wishList" >WishList</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="brands" >Brands</Link>
                            </li>
                        </ul> : ''}


                        <ul className="navbar-nav ms-auto pt-2 mt-2 mt-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" href="http://www.facebook.com" >
                                    <i className='fa-brands fa-facebook'></i>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="http://www.twitter.com" >
                                    <i className='fa-brands fa-twitter'></i>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="http://www.youtube.com" >
                                    <i className='fa-brands fa-youtube'></i>
                                </a>
                            </li>
                            {!user ? <>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="" >Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="register">Register</Link>
                                </li>
                            </> : <li className="nav-item">
                                <span className="nav-link cursor-pointer" onClick={LogOut}>Logout</span>
                            </li>}


                            <li className="nav-item position-relative" data-bs-toggle={!user ? "modal" : ""} onClick={() => { setOpen(true) }} data-bs-target="#exampleModal">
                                <Link className="nav-link" to="cart"
                                >
                                    <i className="fa-solid fa-cart-shopping"></i>
                                </Link>
                                <span className='d-inline-block cart d-flex justify-content-center align-items-center position-absolute  rounded-circle '>{data?.data?.numOfCartItems}</span>
                            </li>




                            {user ? <li className="nav-item profile">
                                <span className="nav-link ms-5 d-flex" >
                                    <span className='fw-bolder'>Hi<br /></span><span className='mx-1'> {login} </span>
                                </span>
                            </li> : ""}
                        </ul>

                    </div>
                </div>
            </nav >





            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-body">
                            <p>Please Login First ...</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

