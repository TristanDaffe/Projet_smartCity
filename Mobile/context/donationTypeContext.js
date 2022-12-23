import React, {createContext, useState , useContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BASE_URL} from "../config";
import { Alert } from "react-native";
import axios from "axios";
import { AuthContext } from "./authContext";

export const DonationTypesContext = createContext();

export const DonationTypeProvider = ({children}) => {
    const [donationTypes, setDonationTypes] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {token} = useContext(AuthContext)

    const getDonationTypes = () => {
        setIsLoading(true);
        axios
            .get(`${BASE_URL}/donationtype/all` ,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },        
            })
            .then( res => {
                setDonationTypes(res.data);
                AsyncStorage.setItem('donationTypes', JSON.stringify(res.data));
            })
            .catch( err => {
                Alert.alert("Error", err.message);
            })
            .finally( () => {
                setIsLoading(false);
            })
    } 

    return (
        <DonationTypesContext.Provider value={{
            donationTypes, 
            isLoading, 
            getDonationTypes
        }}>{children}</DonationTypesContext.Provider>);
}