import React, { useEffect } from "react";
import {  View, Text, StyleSheet, Image, TextInput, Button } from 'react-native';

import TopBarDrawer from '../components/topBar/topBarDrawer';
import { AuthContext } from '../context/authContext';
import AppointmentTable from '../components/AppointmentTableTest';
import { DonationUserContext } from '../context/donationUserContext';

import Spinner from "react-native-loading-spinner-overlay/lib";


export default function Appointment  ( {navigation} )  {

    const {user} = React.useContext(AuthContext);
    const {getDonationsOfUser , isLoading} = React.useContext(DonationUserContext);

    return (

      <View>
        <Spinner visible = {isLoading}/>
        <TopBarDrawer onclick={navigation.toggleDrawer}/>
        <View style = {styles.container}>
          <Text style = {styles.textName}>Check your appointments</Text>
          <Button 
            title='Next' 
            color='red'
            style={styles.button} 
            onPress={() => {
                getDonationsOfUser(user.id)
                navigation.navigate('userAppointment');
              }}>
          </Button>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
   container : {
      marginVertical: "65%",
   }, 
  textName: {
      fontWeight: 'bold',
      fontSize: 30,
      alignSelf: "center",
    },
    button: {
      width: "90%",
      marginTop: 30,
      marginLeft: 20,
    },
});