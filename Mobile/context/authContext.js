import React, {createContext, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Base_URL} from "../config";

export const AuthContext = createContext();
// https://youtu.be/kXVJYXd3C8k
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const register = (email, lastName, firstName, BirthDate, bloodType, Login, password) => {
        setIsLoading(true);
        // requête à l'API pour créer un utilisateur
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
            setUser(userInfos);
            AsyncStorage.setItem('user', JSON.stringify(userInfos));            
console.log(userInfos);
        })
        .catch( err => {
            // gestion des erreurs (remplacer le console.log)
console.log(err);
        })
        .finally( () =>{
            setIsLoading(false);
    });
    }

    const login = (LoginUser, password) => {
        setIsLoading(true);
        // requête à l'API pour se connecter
        fetch(`${Base_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Login : LoginUser,
                password : password
            })
        })
        .then( res => {
            let userInfos = res.json();
            setUser(userInfos);
            AsyncStorage.setItem('user', JSON.stringify(userInfos));            
        })
        .catch( err => {
            // gestion des erreurs (remplacer le console.log)
console.log('user test : ', err);

// version de test sans requête à l'API
const userTest = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'test@truc.com',
    birthday: '01/01/2000',
    login: 'johnDoe',
    password: '123456',
    bloodType: 'O+',

    timeBeforeBloodDonation: '3 months',
    timeBeforePlasmaDonation: '2 weeks',
    timeBeforePlateletDonation: '0',
};
setUser(userTest);
AsyncStorage.setItem('user', JSON.stringify(userTest));
        })
        .finally( () =>{
            setIsLoading(false);
        });
    }

    const logout = () => {
        setIsLoading(true);
        AsyncStorage.removeItem('user');
        setUser({});
        setIsLoading(false);
    }
    
    return (
        <AuthContext.Provider value={{
            isLoading,
            user,
            register,
            login,
            logout
        }}>{children}</AuthContext.Provider>
    );
};