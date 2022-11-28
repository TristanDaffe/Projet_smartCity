import React, {createContext, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BASE_URL} from "../config";
import { Alert } from "react-native";
import axios from "axios";

export const AuthContext = createContext();
// https://youtu.be/kXVJYXd3C8k
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const register = (email, lastName, firstName, BirthDate, bloodType, Login, password) => {
        setIsLoading(true);
        // requête à l'API pour créer un utilisateur
        axios
            .post(`${BASE_URL}/register`, {
                email,
                lastName,
                firstName,
                BirthDate,
                bloodType,
                Login,
                password
        })
        .then( res => {
            let userInfos = res.json();
            setUser(userInfos);
            AsyncStorage.setItem('user', JSON.stringify(userInfos));  
        })
        .catch( err => {
            // gestion des erreurs (remplacer le console.log)
            Alert.alert("Erreur lors de l'enregistrement");
        })
        .finally( () =>{
            setIsLoading(false);
    });
    }

    const login = (loginUser, password) => {
        setIsLoading(true);
        // requête à l'API pour se connecter
        axios
            .post(`http://172.20.10.6:3001/user`, {
                login: loginUser,
                password: password
            })
            .then( res => {
                let userInfo = res.data;
                setUser(userInfo);
                AsyncStorage.setItem('user', JSON.stringify(userInfo));
            })
            .catch( err => {
                console.log(err)
                // gestion des erreurs (remplacer le console.log)
                Alert.alert("Error");

                
            })
            .finally( () => {
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