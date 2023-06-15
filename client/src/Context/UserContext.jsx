import { createContext, useState } from 'react'
import Cookies from "js-cookie";

export const UserContext = createContext();


export function UserContextProvider(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get("token"));

    const [profile, setProfile] = useState(null);

    const changeLoggedIn = (value) => {
        setIsLoggedIn(value);
    };

    const changeProfile = (value) => {
        setProfile(value);
    };



    return (
        <UserContext.Provider value={{
            isLoggedIn,
            changeLoggedIn,
            profile,
            changeProfile
        }}>
            {props.children}
        </UserContext.Provider>
    )
}
