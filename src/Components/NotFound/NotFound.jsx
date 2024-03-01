import React from 'react'
import img from "../../assests/images/error.svg"
export default function NotFound() {
    return (
        <div className='py-4 text-center'>
            <img src={img} alt='' className='w-50' />
        </div>
    )
}
