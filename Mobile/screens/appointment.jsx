import React, { useState } from "react";
import {  View, Text, StyleSheet, Image, TextInput } from 'react-native';

import TopBarDrawer from '../components/topBar/topBarDrawer';
import SearchBar from '../components/SearchBar';
import { AuthContext } from '../context/authContext';
import AppointmentTable from '../components/AppointmentTableTest';

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
        <View style={styles.table}>
          <AppointmentTable></AppointmentTable>
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
      marginRight:60,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 30,
      alignSelf: 'center',
      marginTop: 20,
    },
    table: {
      marginLeft: 5,
      alignSelf: 'center',
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