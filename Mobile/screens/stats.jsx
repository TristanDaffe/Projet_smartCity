import React from "react";
import {  View, Text, StyleSheet, Image, Button } from 'react-native';
import Spinner from "react-native-loading-spinner-overlay/lib";

import TopBarDrawer from '../components/topBar/topBarDrawer';
import { AuthContext } from '../context/authContext';
import { DonationUserContext } from "../context/donationUserContext";

export default function Stats ( {navigation} )  {
  
    const {user} = React.useContext(AuthContext); 
    const {getDonationsOfUser, donationsUser, isLoading} = React.useContext(DonationUserContext);

    const quantityDonated = 0.5;
    const peopleSaveByDonation = 3;

    return (
      <View>
        <Spinner visible = {isLoading}/>
        <TopBarDrawer onclick={navigation.toggleDrawer}/>
        <View style={styles.line}>
          <Image source={require('../images/user_account.png')} style= {styles.image}/>
          <Text style={styles.title}>{user.firstName} {user.lastName}</Text>
        </View>
        <View>
          <Text style={styles.text}>BloodType :</Text>
          <Text style={styles.textResponseBlood}>{user.blood_type.type}{user.blood_type.rhesus}</Text>
        </View>
        <View>
          <Text style={styles.text}>Stats :</Text>
            <View>
              <View style={styles.containerStats}>
                <Text style={styles.textStatTop}>Litre of blood donated</Text>
                <Text style={styles.textStatBottom}>{(donationsUser.length | 0)* quantityDonated} L</Text>
              </View>
              <View style={styles.containerStats}>
                <Text style={styles.textStatTop}>Amount of people saved</Text>
                <Text style={styles.textStatBottom}>{(donationsUser.length | 0) * peopleSaveByDonation}</Text>
              </View>
              <View style={styles.containerStats}>
                <Text style={styles.textStatTop}>Amount of appointment</Text>
                <Text style={styles.textStatBottom}>{donationsUser.length | 0}</Text>
              </View>
            </View>
          </View>
          <Button title="refresh" onPress={() => getDonationsOfUser(user.id)}/>
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
    alignSelf: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'left',
    marginLeft: 25,
    marginTop: 25,
  },
  textStatTop: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'left',
    alignSelf: 'center',
  },
  textStatBottom: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 5,
    color:'red',
  },

  containerStats: {
    alignSelf: 'center',
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 30,
    width: 350,
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
  line: {
    flexDirection: 'row',
    marginTop: 30,
    alignSelf: 'center',
    border: 'solid',
  },
  image:{
    height: 80,
    width: 80,
    marginRight: 10,
  },
});