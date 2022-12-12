import React, { useState } from "react";
import {  View, Text, StyleSheet, Image, TextInput } from 'react-native';

import TopBarDrawer from '../components/topBar/topBarDrawer';
import SearchBar from '../components/SearchBar';
import { AuthContext } from '../context/authContext';
import TableApp from '../components/AppointmentTable';

export default function Appointment ( {navigation} )  {

    const {user} = React.useContext(AuthContext);

    return (
      <View>
        <TopBarDrawer onclick={navigation.toggleDrawer}/>
        <Text style={styles.title}>Appointment Made</Text>
        <View style={styles.lineCenter}>
          <Image source={require('../images/user_account.png')} style= {styles.image}/>
          <Text style={styles.textName}>{user.firstName} {user.lastName}</Text>
        </View>
        <View style={styles.lineSearch}>
          <Text style={styles.textBrowsing}>Browsing</Text>
          <SearchBar></SearchBar>
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
    textBrowsing: {
      fontWeight: 'bold',
      fontSize: 30,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 30,
      alignSelf: 'center',
      marginTop: 20,
    },
    textResponseBlood: {
      fontWeight: 'bold',
      color:'red',
      fontSize: 25,
      textAlign: 'left',
      marginTop: 25,
      alignSelf: 'center',
      borderWidth: 1,
      borderWidth: 2,
      borderRadius: 5,
      paddingLeft: 100,
      paddingRight: 100,
      paddingTop: 10,
      paddingBottom: 10,
    },
    lineCenter: {
      flexDirection: 'row',
      marginTop: 10,
      alignSelf: 'center',
    },
    lineSearch: {
      flexDirection: 'row',
      marginTop: 20,
      alignSelf: 'center',
    },
    image:{
      height: 80,
      width: 80,
      marginRight: 10,
    },
});