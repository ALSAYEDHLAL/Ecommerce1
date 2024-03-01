import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Circles, Rings } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet';


export default function Register() {
    const navigate = useNavigate()
    let [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')

    async function getRegister(values) {
        console.log(values);
        try {
            setIsLoading(true)
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
            if (data.message === 'success') {
                navigate("/")
                console.log(data);
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
            name: Yup.string().required("name is required").min(5, "min is 5 char").max(15, "max is 15 char"),
            email: Yup.string().email("email is not valid").required("email is required"),
            password: Yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{3,8}$/, "password must start with capital letter"),
            rePassword: Yup.string().required("rePassword is required").oneOf([Yup.ref("password")], "password not match"),
            phone: Yup.string().required("phone is required").matches(/^01[0125][0-9]{8}$/, "phone is not valid"),

        }
    )


    let formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
        },
        validationSchema,
        onSubmit: getRegister
    });




    return (
        <>
            <Helmet>
                <title>Register</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <div className='mt-5'>
                <h4>Register Now :</h4>
                {message ? <p className='alert alert-danger'>{message}</p> : ''}
                <form className='w-75 mx-auto my-4' onSubmit={formik.handleSubmit}>
                    <label htmlFor='name'>name:</label>
                    <input className='form-control mb-3' type='text' id='name'
                        value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />

                    {formik.errors.name && formik.touched.name ? <p className='alert alert-danger'>
                        {formik.errors.name} </p> : ''}

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

                    <label htmlFor='rePassword'>rePassword:</label>
                    <input className='form-control mb-3' type='password' id='rePassword'
                        value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />

                    {formik.errors.rePassword && formik.touched.rePassword ? <p className='alert alert-danger'>
                        {formik.errors.rePassword} </p> : ''}

                    <label htmlFor='phone'>phone:</label>
                    <input className='form-control mb-3' type='tel' id='phone'
                        value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />

                    {formik.errors.phone && formik.touched.phone ? <p className='alert alert-danger'>
                        {formik.errors.phone} </p> : ''}

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
                        : 'Register'}</button>
                </form>
            </div>

        </>
    )
}
