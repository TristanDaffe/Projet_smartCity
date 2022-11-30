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
            .post(`${BASE_URL}/login`, {
                login: loginUser,
                password: password
            })
            .then( res => {
                let userInfo = res.data;
                setUser(userInfo);
                AsyncStorage.setItem('user', JSON.stringify(userInfo));
            })
            .catch( err => {
                // gestion des erreurs (remplacer le console.log)
                Alert.alert("Error", err.message);
/*
PARTIE POUR TEST SANS API
*/
                console.log(err);
                const userTest = {
                    id: 1,
                    first_name: "Jhon",
                    last_name: "Doe",
                    email_address: "test@jhon.doe",
                    birthday: "1990-01-01",
                    blood_type: {
                        id: 1,
                        type: "A",
                        rhesus: "+"
                    },
                    login: "jhon.doe",
                    password: "1234"
                }
                setUser(userTest);
                AsyncStorage.setItem('user', JSON.stringify(userTest));
/*
FIN PARTIE POUR TEST SANS API
*/
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