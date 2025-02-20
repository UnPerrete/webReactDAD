import {LoginContext} from './LoginContext'
import { useState } from 'react'

export const LoginProvider = ({children}) =>{
    const [loginData,setLoginData] = useState({
        user: "",
        email: "",
        password: "",
    });

    const [theme,setTheme] = useState("light"); 

    const toggleTheme = () =>{
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    }

    const updateLoginData = (data) => {
        setLoginData(data);
    };

    return(
        <LoginContext.Provider value={{loginData,updateLoginData,theme,toggleTheme}}>
            {children}
        </LoginContext.Provider>
    );

}