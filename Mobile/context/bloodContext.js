import React, {createContext, useState , useContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BASE_URL} from "../config";
import { Alert } from "react-native";
import axios from "axios";
import { AuthContext } from "./authContext";

export const BloodContext = createContext();

export const BloodProvider = ({children}) => {
    const [bloods, setBloods] = useState([]);
    const [bloodTypes, setBloodTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const {token} = useContext(AuthContext)

    const getBloods = () => {
        setIsLoading(true);
        axios
            .get(`${BASE_URL}/bloodtype/all` ,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },        
            })
            .then( res => {
                setBloods(res.data);
                AsyncStorage.setItem('bloods', JSON.stringify(res.data));
            })
            .catch( err => {
                Alert.alert("Error", err.response.data);
            })
            .finally( () => {
                setIsLoading(false);
            })
    } 

    const getBloodsTypes = () => {
        setIsLoading(true);
        axios
            .get(`${BASE_URL}/bloodtype/all` ,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    },
            })
            .then( res => {
                setBloodTypes(res.data);
                AsyncStorage.setItem('bloodsType', JSON.stringify(res.data));
            })
            .catch( err => {
                Alert.alert("Error", err.response.data);
            })
            .finally( () => {
                setIsLoading(false);
            })
        }

    return (
        <BloodContext.Provider value={{
            bloods, 
            bloodTypes,
            isLoading, 
            getBloods,
            getBloodsTypes
        }}>{children}</BloodContext.Provider>);
}