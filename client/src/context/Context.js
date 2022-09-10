import { createContext, useEffect, useState } from "react";
import axios from "axios";
import {REACT_APP_DOMAIN_VAR} from '../host';



export const GoogleContext = createContext(null);
export const GoogleContextProvider = ({children}) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async()=> {
            const res = await axios.get(`${REACT_APP_DOMAIN_VAR}/auth/login/success`, { 
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