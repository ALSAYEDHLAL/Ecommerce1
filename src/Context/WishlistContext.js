import axios from "axios";
import toast from "react-hot-toast";
import { createContext } from "react";



export let wishListContext = createContext();


export default function WishListContextProvider(props) {


    function addToWishList(id) {

        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            productId: id
        }, {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }).then((data) => {
            toast.success(' Product Add WishList Success!')
            console.log(data);
        }).catch((err) => {
            toast.err("This didn't work.")
        })
    }


    return <wishListContext.Provider value={{ addToWishList }}>

        {props.children}

    </wishListContext.Provider>
}