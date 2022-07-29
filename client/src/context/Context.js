import { createContext, useEffect, useState } from "react"



export const GoogleContext = createContext(null);
export const GoogleContextProvider = ({children}) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async()=> {
            fetch(`auth/login/success`, {
                method: "GET",
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true
                  },
            }).then(response => {
                if(response.status == 200) {
                    return response.json();
                } else {
                    throw new Error("auth has been failed")
                }
            }).then(resObj=> {
                setUser(resObj.user);
            }).catch(error=> {
                console.log(error);
            });
        }
        getUser();
        
    }, []);

    return (
        <GoogleContext.Provider value={user}>
            {children}
        </GoogleContext.Provider>
    );
}