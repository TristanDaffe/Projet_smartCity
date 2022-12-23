import React, {createContext, useContext, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BASE_URL} from "../config";
import { Alert } from "react-native";
import axios from "axios";
import { AuthContext } from "./authContext";

export const DonationCenterContext = createContext();

export const DonationCenterProvider = ({children}) => {
    const [donationCenters, setDonationCenters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const {token} = useContext(AuthContext)
    
    const allDonationCenter = () => {
        setIsLoading(true);
        axios
            .get(`${BASE_URL}/center/all`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
            })
            .then( res => {
                setDonationCenters(res.data);
                AsyncStorage.setItem('donationCenters', JSON.stringify(res.data));
            })
            .catch( err => {
                Alert.alert("Error", err.response.data);
            })
            .finally( () => {
                setIsLoading(false);
            })
    } 

    return (
        <DonationCenterContext.Provider value={{
            isLoading,
            donationCenters,
            allDonationCenter
        }}>{children}</DonationCenterContext.Provider>);
}