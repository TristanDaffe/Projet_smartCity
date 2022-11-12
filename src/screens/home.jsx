import React, { useState } from "react";
import {  View, Text, StyleSheet  } from 'react-native';

import TopBarDrawer from '../components/topBarDrawer';
import Test from './Test/createAccountTest'

export default function Home ( {navigation} )  {   
    return (
      <View>
        <TopBarDrawer onclick={navigation.toggleDrawer}/>
        <Text style={styles.text} >Home</Text>
        <Test/>
      </View>
    );
};

const styles = StyleSheet.create({
    text: {
      alignSelf: 'center',
    }
});