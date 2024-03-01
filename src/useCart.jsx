
import axios from 'axios'
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from 'react-query'

let baseUrl = "https://ecommerce.routemisr.com/api/v1"
let token = localStorage.getItem('userToken')

//add to cart
export function AddToCart(productId) {
    return axios.post(`${baseUrl}/cart`, { productId }, {
        headers: {
            token
        }
    })
}



//get cart
export function getCart() {

    return axios.get(`${baseUrl}/cart`, {
        headers: {
            token
        }

    })

}
//delete cart 
export function deleteCart(id) {
    return axios.delete(`${baseUrl}/cart/${id}`, {
        headers: {
            token
        }
    })
}



//update cart

export function updateCart({ id, count }) {
    return axios.put(`${baseUrl}/cart/${id}`, { count }, {
        headers: {
            'Content-type': 'application/json',
            token
        }
    })
}

export function useCartCrud(fn) {
    const queryClient = useQueryClient()
    return useMutation(fn, {
        onSuccess: (data) => {
            toast.success(data?.data?.message)
            queryClient.invalidateQueries('getCart')
        },
        onError: (data) => {
            toast.error(data?.message)
        }
    })
}

export function useCart(key, fn) {
    return useQuery(key, fn)
}

//checkout online 
export function checkout({ id, shippingAddress }) {
    return axios.post(`${baseUrl}/orders/checkout-session/${id}?url=http://localhost:3000`,
        { shippingAddress },
        {
            headers: {
                'Content-type': 'application/json',
                token
            }
        })
}

//checkout
export function checkout1({ id, shippingAddress }) {
    return axios.post(`${baseUrl}/orders/${id}?url=http://localhost:3000`,
        { shippingAddress },
        {
            headers: {
                'Content-type': 'application/json',
                token
            }
        })
}
