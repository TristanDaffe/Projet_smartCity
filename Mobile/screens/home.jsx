import React, { useState } from "react";
import {  View, Text, StyleSheet, Button, ScrollView, Image , SafeAreaView } from 'react-native';

import TopBarDrawer from '../components/topBar/topBarDrawer';
import Test from './Test/TestTris'

export default function Home ( {navigation} )  {   
    return (
      <View>
        <TopBarDrawer onclick={navigation.toggleDrawer}/>
          <SafeAreaView style={styles.container}>
            <Image source={require('../images/bloodDonation.png')} style= {styles.imgTop}/>
            <Text style={styles.title}>Why should you give blood ?</Text>
            <Text style={styles.text}>
              Because at present, no medicine can replace human blood or its components.
              Human blood is therefore still an irreplaceable product.
              Every day, hundreds of patients or accident victims need a transfusion to survive and recover.
              This is why we need your generosity and your donations every day !
            </Text>
            <Text style={styles.text3} fontWeight='bold'>You can donate now by simply clicking on this button !</Text>
            <Button  
              title='Make Appointment' 
              color='red' 
              onPress={() => navigation.navigate('Type')}></Button>
            {/* <Image source={require('../images/separationBar.png')} style= {styles.separator}/> */}
            {/* <Text style={styles.title}>How is blood donation going?</Text>
            <Text style={styles.text}>
              You will be given a confidential medical interview (free of charge) in order to assess whether
              the donation is safe for you or the recipient, based on :
            </Text>
            <Text style={styles.text2}>
              - your current state of health.
              </Text>
              <Text style={styles.text2}>
              - your medical and surgical history.
              </Text> */}
            <Test/>
          </SafeAreaView>
      </View>
    );
};

const styles = StyleSheet.create({
  container : 
  {
    height: 1000,
  },
  text: {
    alignSelf: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 30,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  text:{
    fontSize: 20,
    alignSelf: 'center',
    marginHorizontal: '4%',
    fontStyle: 'italic',
    marginBottom: 30,
  },
  text2:{
    fontSize: 20,
    alignSelf: 'center',
    fontStyle: 'bold',
  },
  text3:
  {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    marginHorizontal: '4%',
    marginBottom: 30,
  },
  img: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    marginBottom: 30,
    },
  imgTop: {
    height: 110,
    width: 400,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 10,
    },
  separator: {
    height : 80,
    width: 100,
    alignSelf: 'center',
    },

});