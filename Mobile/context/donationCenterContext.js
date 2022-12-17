import React, {createContext, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BASE_URL} from "../config";
import { Alert } from "react-native";
import axios from "axios";

export const DonationCenterContext = createContext();

export const DonationCenterProvider = ({children}) => {
    const [donationCenter, setDonationCenter] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getDonationCenter = () => {
        setIsLoading(true);
        axios
            .get(`${BASE_URL}/donation/all`)
            .then( res => {
                setDonationCenter(res.data);
                AsyncStorage.setItem('donationCenter', JSON.stringify(res.data));
                console.log("donationCenter");
                // const bloodsDB = res.data;
                // if(bloodsDB !== undefined){
                //     types = [];
                //     rhesus = [];
                //     bloodsDB.forEach(blood => {
                //         if(!types.includes(bloodsDB.type))
                //             types.push(bloodsDB.type);
                //         if(!rhesus.includes(bloodsDB.rhesus))
                //             rhesus.push(bloodsDB.rhesus);
                //     });
                //     setBloods({types, rhesus});
                //}
            })
            .catch( err => {
                Alert.alert("Error", err.message);
            })
            .finally( () => {
                setIsLoading(false);
            })
    } 

    return (
        <DonationCenterContext.Provider value={{
            donationCenter, 
            isLoading, 
            getDonationCenter
        }}>{children}</DonationCenterContext.Provider>);
}