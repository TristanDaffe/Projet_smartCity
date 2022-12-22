import React, {createContext, useState , useContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BASE_URL} from "../config";
import { Alert } from "react-native";
import axios from "axios";
import { AuthContext } from "./authContext";

export const DonationUserContext = createContext();

export const DonationUserProvider = ({children}) => {
    const [donationsUser, setDonationsUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const {token} = useContext(AuthContext)
    const getDonationsOfUser = (id) => {
        setIsLoading(true);
        axios
            .get(`${BASE_URL}/donation/user/${id}` ,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },        
            })
            .then( res => {
                setDonationsUser(res.data);
                AsyncStorage.setItem('donationsUser', JSON.stringify(res.data));
            })
            .catch( err => {
                Alert.alert("Error", err.message);
            })
            .finally( () => {
                setIsLoading(false);
            })
    } 

    return (
        <DonationUserContext.Provider value={{
            donationsUser, 
            isLoading, 
            getDonationsOfUser
        }}>{children}</DonationUserContext.Provider>);
}