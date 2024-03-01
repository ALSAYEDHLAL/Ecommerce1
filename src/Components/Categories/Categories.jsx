import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';



export default function Categories() {


    function getCategories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)

    }

    let { data } = useQuery('categories', getCategories, {
        select: (data) => data?.data?.data,
        // enabled: false
    })
    console.log(data?.data?.data);

    return (
        <>
            <div className='container m-5'>

                <Helmet>
                    <title>Categories</title>
                    <meta name="description" content="Helmet application" />
                </Helmet>

                <div className='row g-4'>

                    {data?.map((ele) => <div className='col-md-4 ' key={ele._id}>
                        <div className='items  categories form-control btn-brdr shadow '>
                            <div className='item '>
                                <img src={ele.image} alt='' className='w-100' height={300} />
                                <h2 className='text-center  m-3 pt-2 text-main'>{ele.name}</h2>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>

        </>
    )
}

