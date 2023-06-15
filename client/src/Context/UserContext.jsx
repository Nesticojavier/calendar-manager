import { createContext, useState } from 'react'
import Cookies from "js-cookie";

export const UserContext = createContext();


export function UserContextProvider(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get("token"))

    const changeLoggedIn = (value) => {
        setIsLoggedIn(value);
    };

    return (
        <UserContext.Provider value={{
            isLoggedIn,
            changeLoggedIn
        }}>
            {props.children}
        </UserContext.Provider>
    )
}
