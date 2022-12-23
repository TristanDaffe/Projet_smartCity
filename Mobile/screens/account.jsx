import React from "react";
import {  View, ScrollView, Text, StyleSheet, Image, Button, Alert} from 'react-native';

import TopBar from '../components/topBar/topBarArrow';
import { AuthContext } from "../context/authContext";
import { DonationUserContext } from "../context/donationUserContext";

export default function Account ( {navigation} )  {   

  const {user, token, deleteAccount} = React.useContext(AuthContext);
  const {lastDonationOfType} = React.useContext(DonationUserContext);

  function handleDelete() {
    Alert.alert('Are you sure you want to delete your account ?', "This can't be undo !", [
      {text: 'Yes', onPress: () => {deleteAccount()}},
      {text: 'No'},
    ]);
  }

  function timeBeforeDonation(date){
    let time = 0;
    if(date !== undefined){
      time = Math.floor((new Date(date.date) - new Date()) / (1000 * 60 * 60 * 24));
      if(time < 0){
        return 'You can donate now';
      }
      return time +" days";
    }
    else {
      return 'You can donate now';
  }
}
  {if(token !== null){
    return (<ScrollView style={styles.container}>
      <TopBar onclick={navigation.goBack}/>
        <View style={styles.info}>
        <Image source={require('../images/user_account.png')} style={styles.image} />

{/* Section du nom prénom et type de sang*/}
        <View style={styles.row}>
          <View>
            <Text style={styles.sectionTitle}>Name </Text>
            <View style={styles.section}>
              <Text style={styles.sectionText}>{user.firstName} {user.lastName}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.sectionTitle}>Blood type</Text>
            <Text style={styles.box}>{user.blood_type?.type}{user.blood_type?.rhesus}</Text>
          </View>
          <View />
        </View>

{/* Section de la date de naissance*/}
        <Text style={styles.sectionTitle}>Birth date</Text>
        <View style={styles.section}>
          <Text style={styles.sectionText}>{user.birthDay?.substring(0,10)}</Text>
        </View>

{/* Section de l'addresse mail*/}
        <Text style={styles.sectionTitle}>Email</Text>
        <View style={styles.section}>
          <Text style={styles.sectionText}>{user.emailAddress}</Text>
        </View>

{/* Section du login*/}
        <Text style={styles.sectionTitle}>Login</Text>
        <View style={styles.section}>
          <Text style={styles.sectionText}>{user.login}</Text>
        </View>

{/* Section du temps avant la prochaine donation*/}
        <View style={styles.info}>
          <Text style={styles.sectionTitle}>Time before the next donation : </Text>

          <View style={styles.donation}>
            <Text style={styles.sectionTitle}>Blood: </Text>
            <Text style={styles.sectionText}>{timeBeforeDonation(lastDonationOfType[0])}</Text>
          </View>
          <View style={styles.donation}>
            <Text style={styles.sectionTitle}>Plasma: </Text>
            <Text style={styles.sectionText}>{timeBeforeDonation(lastDonationOfType[1])}</Text>
          </View>
          <View style={styles.donation}>
            <Text style={styles.sectionTitle}>Plate: </Text>
            <Text style={styles.sectionText}>{timeBeforeDonation(lastDonationOfType[2])}</Text>
          </View>
        </View>
        <Button title="Delete account" onPress={() => handleDelete()} />
      </View>
    </ScrollView> )
    }
    else {
      return (
        <View>
          <Text> You are not logged in </Text>
        </View>
      )
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  info: {
    margin: 20,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  section: {
    margin: 10,
    padding: 5,
    borderWidth: 3,
    borderColor: 'red',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  sectionText: {
    fontSize: 20,
    alignItems: 'center',
  },
  box: {
    fontSize: 20,
    color: 'white',
    backgroundColor: 'red',
    borderColor: 'black',
    borderWidth: 3,
    textAlign: 'center',
    height: 30,
    width: 50,
  },
  donation: {
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
}); 