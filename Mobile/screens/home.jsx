import React, { useState } from "react";
import {  View, Text, StyleSheet, Button } from 'react-native';

import TopBarDrawer from '../components/topBar/topBarDrawer';
import Test from './Test/TestTris'

export default function Home ( {navigation} )  {   
    return (
      <View>
        <TopBarDrawer onclick={navigation.toggleDrawer}/>
        <Text style={styles.text} >Home</Text>
        <Button 
          title='Make Appointment' 
          color='red' 
          onPress={() => navigation.navigate('Type')}></Button>
        <Test/>
      </View>
    );
};

const styles = StyleSheet.create({
    text: {
      alignSelf: 'center',
    }
});