import React, {createContext, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BASE_URL} from "../config";
import { Alert } from "react-native";
import axios from "axios";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const register = (emailAddress, lastName, firstName, birthdate, bloodType, rhesus, login, password) => {
        setIsLoading(true);
        // requête à l'API pour créer un utilisateur
        axios
            .post(`${BASE_URL}/user/register`, {
                emailAddress,
                lastName,
                firstName,
                birthdate,
                bloodType,
                rhesus,
                login,
                password
        })
        .then( res => {
            let userInfo = res.data.user;
            let token = res.data.token;
            setUser(userInfo);
            setToken(token);
            AsyncStorage.setItem('user', JSON.stringify(userInfo));
            AsyncStorage.setItem('token', JSON.stringify(token));

        })
        .catch( err => {
            // gestion des erreurs
            Alert.alert("Erreur lors de l'enregistrement", err.message);
        })
        .finally( () =>{
            setIsLoading(false);
    });
    }

    const login = (loginUser, password) => {
        setIsLoading(true);
        // requête à l'API pour se connecter
        axios
            .post(`${BASE_URL}/user/login`, {
                login: loginUser,
                password: password
            })
            .then( res => {
                let userInfo = res.data.user;
                let token = res.data.token;
                setUser(userInfo);
                setToken(token);
                AsyncStorage.setItem('user', JSON.stringify(userInfo));
                AsyncStorage.setItem('token', JSON.stringify(token));
            })
            .catch( err => {
                // gestion des erreurs
                Alert.alert("Error", err.message);
            })
            .finally( () => {
                setIsLoading(false);
            });
    }

    const logout = () => {
        setIsLoading(true);
        
        AsyncStorage.removeItem('user');
        AsyncStorage.removeItem('token');
        setUser({});
        setToken(null);

        setIsLoading(false);
    }
    return (
        <AuthContext.Provider value={{
            isLoading,
            user,
            token,
            register,
            login,
            logout
        }}>{children}</AuthContext.Provider>
    );

};