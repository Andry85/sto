import { createContext, useEffect, useState } from "react";
import axios from "axios";

let reqInstance = axios.create({
    mode: 'no-cors',
    headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    },
    withCredentials: true
});



export const GoogleContext = createContext(null);
export const GoogleContextProvider = ({children}) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async()=> {
            const res = await reqInstance.get(`${process.env.REACT_APP_DOMAIN}/auth/login/success`);
            setUser(res.data.user);       
        }
        getUser();
        
    }, []);

    return (
        <GoogleContext.Provider value={user}>
            {children}
        </GoogleContext.Provider>
    );
}