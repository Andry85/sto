import { createContext, useEffect, useState } from "react";
import axios from "axios";



export const GoogleContext = createContext(null);
export const GoogleContextProvider = ({children}) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async()=> {
            const res = await axios.get(`${process.env.REACT_APP_DOMAIN_HTTP}/auth/login/success`, { 
                withCredentials: true 
            });
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