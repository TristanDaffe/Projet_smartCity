import React, { useState } from "react";
import {  View, Text, StyleSheet  } from 'react-native';

import TopBarDrawer from '../components/topBarDrawer';
import Test from './Test/loginAccountTest'

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