import React, { useState } from "react";
import {  View, Text, StyleSheet,ScrollView,SafeAreaView , Button} from 'react-native';

import TopBarDrawer from '../components/topBar/topBarDrawer';
import SearchBar from '../components/SearchBar';
import CenterTable from '../components/CenterTable';

export default function Center ( {navigation} )  {   
    return (
      <SafeAreaView>
        <TopBarDrawer onclick={navigation.toggleDrawer}/>
        <Text style={styles.title}>Center</Text>
        <View  style={{marginLeft:'50%'}}>
            <SearchBar></SearchBar>
        </View>
        <View style={styles.table}>
        <CenterTable></CenterTable>
        </View>
        <View style={styles.button}>
        <Button 
          title='Next' 
          color='red'
          style={styles.button} 
          onPress={() => navigation.navigate('Calendar')}></Button>
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