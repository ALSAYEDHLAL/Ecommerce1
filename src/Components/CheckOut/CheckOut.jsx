import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { userContext } from '../../UserContext'
import axios from 'axios'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function CheckOut() {
    const navigate = useNavigate
    const { cartId } = useContext(userContext)
    const headers = {
        token: localStorage.getItem("token"),
    }
    const initialValues = {
        details: "",
        phone: "",
        city: ""
    }
    const formik = useFormik({
        initialValues,
        onSubmit: (values) => handlePayment(values)
    })

    async function handlePayment(shippingAddress) {
        console.log(shippingAddress, cartId);
        const endpoint = `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;


        const { data } = await axios.post(endpoint,
            { shippingAddress },
            { headers },
        )
        console.log(data)

    }



    return (
        <section className='py-5'>
            <div className='container'>
                <h2 >CheckOut</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className='form-group mb-3'>
                        <label htmlFor='phone'>Phone</label>
                        <input type='tel' className='form-control' id='phone' name='phone'
                            value={formik.values.phone} onChange={formik.handleChange} />
                    </div>

                    <div className='form-group mb-3'>
                        <label htmlFor='city'>City</label>
                        <input type='text' className='form-control' id='city' name='city'
                            value={formik.values.city} onChange={formik.handleChange} />
                    </div>

                    <div className='form-group mb-3'>
                        <label htmlFor='details'>Details</label>
                        <textarea type='text' className='form-control' id='details' rows={3} cols="30"
                            value={formik.values.details} onChange={formik.handleChange} />
                    </div>

                    <button type='submit'
                        className='btn btn-success bg-main'>Cash Payment</button>
                </form>
            </div>

        </section>
    )
}
