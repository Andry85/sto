import { createContext, useReducer, useEffect, useState } from "react"
import Reducer from "./Reducer";

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false
}

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

    useEffect(() => {

        localStorage.setItem("user",  JSON.stringify(state.user))

    }, [state.user])
    


    return (
        <Context.Provider value = {{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch
        }}>
            {children}
        </Context.Provider>
    )
    
}

export const GoogleContext = createContext(null);
export const GoogleContextProvider = ({children}) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async()=> {
            fetch("http://localhost:5000/auth/login/success", {
                method: "GET",
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true
                  },
            }).then(response => {
                console.log(response, 'response');
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