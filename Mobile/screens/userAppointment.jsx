import React, { useEffect } from "react";
import {  View, Text, StyleSheet, Image, TextInput } from 'react-native';

import TopBar from '../components/topBar/topBarArrow';
import { AuthContext } from '../context/authContext';
import AppointmentTable from '../components/AppointmentTableTest';
import { DonationUserContext } from '../context/donationUserContext';

import { useDispatch , useSelector } from "react-redux";

import {setUserDonation} from "../redux/actions/userDonation";
import {getUserDonations} from "../redux/selectors"


export default function Appointment  ( {navigation} )  {

    const {user} = React.useContext(AuthContext);
    const {donationsUser} = React.useContext(DonationUserContext);
    
    useEffect(() => {
      console.log("useEffect appointment")
    }, []);

    return (
      <View>
        <TopBar onclick={navigation.goBack}/>
        <Text style={styles.title}>Appointment Made</Text>
        <View style={styles.lineCenter}>
          <Image source={require('../images/user_account.png')} style= {styles.image}/>
          <Text style={styles.textName}>{user.firstName} {user.lastName}</Text>
        </View>
        <View style={styles.table}>
          <AppointmentTable data ={donationsUser}></AppointmentTable>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    textName: {
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 30,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 30,
      alignSelf: 'center',
      marginTop: 20,
    },
    table: {
      marginTop : '4%',
      marginLeft: '3%',
      alignSelf: 'center',
    },
    lineCenter: {
      flexDirection: 'row',
      marginTop: 10,
      alignSelf: 'center',
    },
    image:{
      height: 80,
      width: 80,
      marginRight: 10,
    },
});