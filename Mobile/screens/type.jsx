import React, { useState } from "react";
import {  View, Text, StyleSheet,ScrollView,SafeAreaView , Button} from 'react-native';

import TopBarDrawer from '../components/topBar/topBarDrawer';
import MultiButton from '../components/MultiButton';

export default function Type ( {navigation} )  {   
    return (
      <SafeAreaView>
        <TopBarDrawer onclick={navigation.toggleDrawer}/>
        <MultiButton style={{alignSelf: 'center'}}></MultiButton>
        <View style={styles.button}>
        <Button 
          title='Next' 
          color='red'
          style={styles.button} 
          onPress={() => navigation.navigate('Center')}></Button>
        </View> 
      </SafeAreaView>
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
      marginBottom: 20,
    },
    button: {
        width: "90%",
        marginTop: 30,
        marginLeft: 20,
        height: 300,
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