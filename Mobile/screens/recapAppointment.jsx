import React, { useState } from "react";
import {  View, Text, StyleSheet,ScrollView,SafeAreaView , Button} from 'react-native';

import TopBar from '../components/topBar/topBarArrow';
import ConfirmationButton from '../components/confirmButton';

export default function RecapAppointment ( {route,navigation} )  { 
  
  const {date,hours,center,type} = route.params;

    return (
        <View>
        <TopBar onclick={navigation.goBack}/>
        <Text style={styles.title}>Appointment</Text>
        <Text style={styles.category}>Donation Type :</Text>
        <Text style={styles.response}>{type}</Text>
        <Text style={styles.category}>Date :</Text>
        <Text style={styles.response}>{date}</Text>
        <Text style={styles.category}>Time :</Text>
        <Text style={styles.response}>{hours}</Text>
        <Text style={styles.category}>Center :</Text>
        <Text style={styles.lastResponse}>{center}</Text>
          <ConfirmationButton name="Make this Appointment"></ConfirmationButton>
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
      marginTop: 50,
      alignSelf:'center',
      marginBottom: 40,
    },
    category: {
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 20,
        marginLeft: 40,
        color: 'red',
      },
    response:
    {
        fontSize: 20,
        marginTop: 5,
        marginLeft: 40,
        maxWidth: 300,
    },
    lastResponse:
    {
        fontSize: 20,
        marginTop: 5,
        marginLeft: 40,
        maxWidth: 300,
        marginBottom: 130,
    },
    table: {
        marginLeft: 5,
        alignSelf: 'center',
      },
    button: {
        marginTop: 150,
      },
    lineCenter: {
      flexDirection: 'row',
      marginTop: 10,
      alignSelf: 'center',
    },
  });