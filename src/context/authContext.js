import React, {createContext} from "react";
import {Base_URL} from "../config";

export const AuthContext = createContext();
// https://youtu.be/kXVJYXd3C8k
export const AuthProvider = ({children}) => {

    const register = (email, lastName, firstName, BirthDate, bloodType, Login, password) => {
        fetch(`${Base_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email : email,
                lastName : lastName,
                firstName : firstName,
                BirthDate : BirthDate,
                bloodType : bloodType,
                Login : Login,
                password : password
            })
        })
        .then( res => {
            let userInfos = res.json();
            console.log(userInfos);
        })
        .catch( err => console.log(err));
    }

    return (
        <AuthContext.Provider value={{
            register
        }}>{children}</AuthContext.Provider>
    );
};