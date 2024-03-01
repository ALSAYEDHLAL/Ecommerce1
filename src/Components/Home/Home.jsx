import React from 'react'
import Loading from '../Loading'
import { featuredProduct, useProduct } from '../../useProduct'
import { Product } from '../Product';
import MainSlaider from '../../MainSlaider';
import CategorySlider from '../../CategorySlider';
import { Helmet } from 'react-helmet';


export default function Home() {

    let { data, isLoading, error, isError } = useProduct('product', featuredProduct)
    console.log(data?.data?.data);
    if (isLoading)
        return <Loading></Loading>
    if (isError)
        return <h2>{error.message}</h2>;


    return (
        <>
            <div className='container m-5'>

                <Helmet>
                    <title>Home</title>
                    <meta name="description" content="Helmet application" />
                </Helmet>
                <MainSlaider />
                <CategorySlider />
                <div className='row gy-4'>
                    {data?.map((prod) => <Product key={prod._id} prod={prod}></Product>)}
                </div>
            </div>

        </>
    )

}




