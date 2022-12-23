import React, {createContext, useState , useContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BASE_URL} from "../config";
import { Alert } from "react-native";
import axios from "axios";
import { AuthContext } from "./authContext";

export const DonationUserContext = createContext();

export const DonationUserProvider = ({children}) => {
    const [donationsUser, setDonationsUser] = useState([]);
    const [lastDonationOfType, setLastDonationOfType] = useState([]);
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
                Alert.alert("Error", err.response.data);
            })
            .finally( () => {
                setIsLoading(false);
            })
    } 

    const getLastDonationOfTypeOfUser = (id) => {
        setIsLoading(true)
        axios
            .get(`${BASE_URL}/donation/user/${id}/last` ,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then( res => {
                setLastDonationOfType(res.data);
                AsyncStorage.setItem('lastDonationOfType', JSON.stringify(res.data));
            })
            .catch( err => {
                Alert.alert("Error", err.response.data);
            })
            .finally( () => {
                setIsLoading(false);
            })
        }

    const addDonation = async (donation) => {
        return await axios
          .post(`${BASE_URL}/donation`,{
            date: donation.date,
            hour: donation.hours,
            donationTypeId  : donation.type.id,
            userId: donation.user.id,
            donationCenterId: donation.center.id},
            {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then( res => {
                return res.data;
            })
            .catch( err => {
                Alert.alert("Error", err.response.data);
            })
      };

    return (
        <DonationUserContext.Provider value={{
            donationsUser, 
            lastDonationOfType,
            isLoading, 
            getDonationsOfUser,
            getLastDonationOfTypeOfUser,
            addDonation,
        }}>{children}</DonationUserContext.Provider>);
}