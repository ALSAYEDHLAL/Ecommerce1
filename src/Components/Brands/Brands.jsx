import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';
export default function Brands() {


    function getBrand() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)

    }

    let { data, refetch } = useQuery('brands', getBrand, {
        select: (data) => data?.data?.data,
        // enabled: false
    })
    console.log(data?.data?.data);

    return (
        <>
            <div className='container m-5'>

                <Helmet>
                    <title>Brands</title>
                    <meta name="description" content="Helmet application" />
                </Helmet>

                <div className='row g-4'>
                    <h2 className='cursor-pointer text-center fw-bolder text-main' onClick={() => refetch()}>All Brands</h2>
                    {data?.map((ele) => <div className='col-md-3' key={ele._id}>
                        <div className='items categories form-control btn-brdr shadow'>
                            <img src={ele.image} alt='' />
                            <p className='text-center p-3'>{ele.name}</p>
                        </div>
                    </div>)}
                </div>
            </div>

        </>
    )
}
