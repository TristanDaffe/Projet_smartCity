import React, {createContext, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BASE_URL} from "../config";
import { Alert } from "react-native";
import axios from "axios";

export const BloodContext = createContext();

export const BloodProvider = ({children}) => {
    const [bloods, setBloods] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getBloods = () => {
        setIsLoading(true);
        axios
            .get(`${BASE_URL}/bloodtypes`)
            .then( res => {
                setBloods(res.data);
                AsyncStorage.setItem('bloods', JSON.stringify(res.data));
                // console.log("bloods");
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
        <BloodContext.Provider value={{
            bloods, 
            isLoading, 
            getBloods
        }}>{children}</BloodContext.Provider>);
}