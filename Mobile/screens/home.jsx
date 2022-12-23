import React, { useState } from "react";
import {  View, Text, StyleSheet, Button, ScrollView, Image , SafeAreaView } from 'react-native';

import TopBarDrawer from '../components/topBar/topBarDrawer';
import { DonationTypesContext } from '../context/donationTypeContext';
import Spinner from "react-native-loading-spinner-overlay/lib";
import { DonationUserContext } from "../context/donationUserContext";
import { AuthContext } from "../context/authContext";

export default function Home ( {navigation} )  {

  const {getDonationTypes , isLoading} = React.useContext(DonationTypesContext);
  const {getLastDonationOfTypeOfUser} = React.useContext(DonationUserContext);
  const {user} = React.useContext(AuthContext);
    return (
      <ScrollView>
        <Spinner visible = {isLoading}/>
        <TopBarDrawer onclick={navigation.toggleDrawer}/>
          <View>
            <Image source={require('../images/bloodDonation.png')} style= {styles.imgTop}/>
            <Text style={styles.title}>Why should you give blood ?</Text>
            <Text style={styles.text}>
              Because at present, no medicine can replace human blood or its components.
              Human blood is therefore still an irreplaceable product.
              Every day, hundreds of patients or accident victims need a transfusion to survive and recover.
              This is why we need your generosity and your donations every day !
            </Text>
            <Text style={styles.separator}>
              ___________________________________________
            </Text>
            <Text style={styles.title}>How is blood donation going ?</Text>
            <Text style={styles.text}>
              You will be given a confidential medical interview (free of charge) in order to assess whether
              the donation is safe for you or the recipient, based on :
            </Text>
            <Text style={styles.text2}>
              - your current state of health.
              </Text>
              <Text style={styles.text2}>
              - your medical and surgical history.
              </Text>
              <Text style={styles.text2}>
              -  medicines you are taking or have taken.
              </Text>
              <Text style={styles.text2}>
              -  any travel you have undertaken.
              </Text>
              <Text style={styles.text2}>
              -  any risky behaviour.
              </Text>
              <Text style={styles.text4}>
                Once the doctor has given his or her approval, you will be invited to donate blood.
                Depending on your blood volume, which is determined by your weight and height, we collect an average of between 430ml and 470ml of blood.
              </Text>
              <Text style={styles.text3} fontWeight='bold'>You can donate now by simply clicking on this button !</Text>
              <Button  
              title='Make Appointment' 
              color='red' 
              onPress={async() => 
                {
                  await getLastDonationOfTypeOfUser(user.id);
                  await getDonationTypes();
                  navigation.navigate('Type');
                }}
              style={styles.button}
              ></Button>
          </View>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
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
    marginHorizontal: '3%',
    fontStyle: 'italic',
    marginBottom: 30,
  },
  text2:{
    fontSize: 20,
    marginHorizontal: '5%',
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
  text4:{
    fontSize: 20,
    alignSelf: 'center',
    marginHorizontal: '3%',
    fontStyle: 'italic',
    marginTop: 30,
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
    alignSelf: 'center',
    },

});