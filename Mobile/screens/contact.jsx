import React, { useState } from "react";
import {  View, Text, StyleSheet, Image } from 'react-native';

import TopBarDrawer from '../components/topBar/topBarDrawer';

export default function Contact ( {navigation} )  {   
    return (
      <View>
        <TopBarDrawer onclick={navigation.toggleDrawer}/>
        <Text style={styles.title}>Contact Us</Text>
        <View style={styles.lineAccount}>
          <Image source={require('../images/phone_contact.png')} style= {styles.image}/>
          <Text style={styles.text}>081 58 96 32</Text>
        </View>
        <View style={styles.lineAccount}>
          <Image source={require('../images/mail_contact.png')} style= {styles.image}/>
          <Text style={styles.text}>donneurdesang@gmail.com</Text>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'left',
    alignSelf: 'center',
    marginTop: 30,
  },
  text: {
    alignSelf: 'center',
    fontSize: 20,
    textAlign: 'left',
    alignSelf: 'center',
  },
  lineAccount: {
    flexDirection: 'row',
    marginTop: 20,
    border: 'solid',
  },
  image:{
    height: 50,
    width: 50,
    marginLeft: 40,
    marginRight: 20,
    borderWidth: 1,
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
});