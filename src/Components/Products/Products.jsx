import React, { useState } from 'react'
import Loading from '../Loading'
import { featuredProduct, useProduct } from '../../useProduct'
import { Product } from '../Product';
import { Helmet } from 'react-helmet';



export default function Products() {


    let { data, isLoading, error, isError } = useProduct('product', featuredProduct)
    console.log(data?.data?.data);

    let [searchedArr, setSearchedArr] = useState([])
    function search(e) {
        let term = e.target.value
        let newArr = data?.filter((ele) => ele?.title.toLowerCase().trim().includes(term.toLowerCase().trim()))
        setSearchedArr(newArr)
    }
    if (isLoading)
        return <Loading></Loading>
    if (isError)
        return <h2>{error.message}</h2>;
    return (
        <>
            <Helmet>
                <title>Products</title>
                <meta name="description" content="Helmet application" />
            </Helmet>

            <div className='w-75 mx-auto main-color p-5 my-5' onChange={search}>
                <input type="text" className='form-control ' />
            </div>
            <div className="row">
                {
                    searchedArr.length ? searchedArr?.map((prod) => <Product key={prod._id} prod={prod}></Product>) : data?.map((prod) => <Product key={prod._id} prod={prod}></Product>)
                }

            </div>
        </>
    )
}

