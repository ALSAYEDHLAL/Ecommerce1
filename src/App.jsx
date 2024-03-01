import React, { Suspense, useContext, useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Brands from './Components/Brands/Brands';
import NotFound from './Components/NotFound/NotFound';
import Home from './Components/Home/Home';
import Categories from './Components/Categories/Categories';
import { userContext } from './UserContext';
import ProtectedRoute from './ProtectedRoute';
import Cart from './Components/Cart/Cart.js';
import ProductDetails from './Components/ProductDetails.jsx';
import Orders from './Orders.jsx';


import { lazy } from 'react';
import Loading from './Components/Loading.jsx';
import ForgotPassword from './Components/Login/ForgotPassword.jsx';
import ForgotPasswordCode from './Components/Login/ForgotPasswordCode.jsx';
import ResetPassword from './Components/Login/ResetPassword.jsx';
import WishList from './Components/WishList/WishList.jsx';
import CheckOut from './Components/CheckOut/CheckOut.jsx';

const Products = lazy(() => import('./Components/Products/Products'));



export default function App() {
  let { setIsUser, setLogin } = useContext(userContext)
  //handel refersh
  useEffect(() => {
    if (localStorage.getItem('userToken'))
      setIsUser(localStorage.getItem('userToken'))
    setLogin(localStorage.getItem('userName'))
  }, [])

  const routes = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        { index: true, element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute><Suspense fallback={<Loading />}><Products /></Suspense></ProtectedRoute> },
        { path: 'productDetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: 'forgotPassword', element: <ForgotPassword /> },
        { path: 'forgotPasswordCode', element: <ForgotPasswordCode /> },
        { path: 'resetPassword', element: <ResetPassword /> },
        { path: 'home', element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'wishList', element: <ProtectedRoute><WishList /></ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'checkout', element: <ProtectedRoute><CheckOut /></ProtectedRoute> },

        { path: 'allOrders', element: <ProtectedRoute><Orders /></ProtectedRoute> },
        { path: '*', element: <NotFound /> },

      ]
    }
  ])

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

