import { createContext, useState } from "react";


export const userContext = createContext(null);


export function UserContextProvider({ children }) {

    let [user, setIsUser] = useState(null)
    let [login, setLogin] = useState(null)
    let [isOpen, setOpen] = useState(false)
    const [cartId, setCartId] = useState(null)
    return <userContext.Provider value={{ user, setIsUser, login, setLogin, isOpen, setOpen, cartId, setCartId }}>
        {children}
    </userContext.Provider>
}