import React, { useState } from "react";
import {  View, Text, StyleSheet,ScrollView,SafeAreaView , Button} from 'react-native';
import TopBarDrawer from '../components/topBar/topBarDrawer';

export default function Calendar ( {navigation} )  {   
    return (
        <View>
        <TopBarDrawer onclick={navigation.toggleDrawer}/>
        <Text>Coucou</Text>
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
      marginLeft: 20,
    },
    table: {
        marginLeft: 5,
        alignSelf: 'center',
      },
    button: {
        width: "90%",
        marginTop: 30,
        marginLeft: 20,
        height: 300,
      },
    lineCenter: {
      flexDirection: 'row',
      marginTop: 10,
      alignSelf: 'center',
    },
  });