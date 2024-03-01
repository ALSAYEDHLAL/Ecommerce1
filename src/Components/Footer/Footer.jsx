import React from 'react'

export default function Footer() {
    return (
        <>
            <footer className=' navbar-light bg-light'>
                <div className='container mb-5'>
                    <h3 className='pt-2'>Get The Fresh CartApp</h3>
                    <p className='p-2'>we will send you a link, open it in your phone to download the app</p>
                    <form >
                        <div className='row '>
                            <div className='col-md-10'>
                                <input type='text' className='form-control' placeholder='email' />
                            </div>
                            <div className='col-md-2 '>
                                <button className='btn text-white bg-main'>Share App Link</button>
                            </div>
                        </div>
                    </form>
                </div>
            </footer>
        </>
    )
}
