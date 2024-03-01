import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Circles } from 'react-loader-spinner'
import { NavLink, useNavigate } from 'react-router-dom'
import { userContext } from '../../UserContext';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom'




export default function Login() {
    let { user, setIsUser, setLogin } = useContext(userContext)
    const navigate = useNavigate()
    let [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')

    async function getLogin(values) {
        console.log(values);
        try {
            setIsLoading(true)
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
            if (data.message === 'success') {
                setIsUser(data.token)
                setLogin(data.user.name)
                localStorage.setItem('userToken', data.token)
                localStorage.setItem('userName', data.user.name)
                navigate("/home")
                // console.log(data);
                setMessage('')
                setIsLoading(false)
            }
        } catch (error) {
            setMessage(error.response.data.message);
            setIsLoading(false)
        }
    }

    const validationSchema = Yup.object(
        {
            email: Yup.string().email("email is not valid").required("email is required"),
            password: Yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{3,8}$/, "password must start with capital letter"),

        }
    )


    let formik = useFormik({
        initialValues: {

            email: "",
            password: "",

        },
        validationSchema,
        onSubmit: getLogin
    });




    return (
        <>
            <Helmet>
                <title>Login</title>
                <meta name="description" content="Helmet application" />
            </Helmet>

            <div className='mt-5'>
                <h4>Login Now :</h4>
                <form className='w-75 mx-auto my-4' onSubmit={formik.handleSubmit}>
                    {message ? <p className='alert alert-danger'>{message}</p> : ''}


                    <label htmlFor='email'>email:</label>
                    <input className='form-control mb-3' type='email' id='email'
                        value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />

                    {formik.errors.email && formik.touched.email ? <p className='alert alert-danger'>
                        {formik.errors.email} </p> : ''}

                    <label htmlFor='password'>password:</label>
                    <input className='form-control mb-3' type='password' id='password'
                        value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />

                    {formik.errors.password && formik.touched.password ? <p className='alert alert-danger'>
                        {formik.errors.password} </p> : ''}

                    <div className='d-flex justify-content-center align-content-between'>
                        <NavLink className="forget" to="forgotPassword">forget your password ?</NavLink>

                        <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-2 ms-auto d-block'>{isLoading ?
                            <Circles
                                height="25"
                                width="40"
                                color="#fff"
                                ariaLabel="circles-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />
                            : 'Login'}</button>
                    </div>



                </form>


            </div>

        </>
    )
}
