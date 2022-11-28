import React from "react";
import {  View, ScrollView, Text, StyleSheet, Image  } from 'react-native';

import TopBar from '../components/topBar/topBarArrow';
import { AuthContext } from "../context/authContext";

export default function Account ( {navigation} )  {   

  const {user} = React.useContext(AuthContext);

  function timeBeforeDonation(time){
    if(time === '0')
     return 'You can donate now';
    return time;
  }
  
  return (
    <ScrollView style={styles.container}>
      <TopBar onclick={navigation.goBack}/>
        <View style={styles.info}>
        <Image source={require('../images/user_account.png')} style={styles.image} />

{/* Section du nom prénom et type de sang*/}
        <View style={styles.row}>
          <View>
            <Text style={styles.sectionTitle}>Name </Text>
            <View style={styles.section}>
              <Text style={styles.sectionText}>{user.first_name} {user.last_name}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.sectionTitle}>Blood type</Text>
            <Text style={styles.box}>{user.blood_type.type}{user.blood_type.rhesus}</Text>
          </View>
          <View />
        </View>

{/* Section de la date de naissance*/}
        <Text style={styles.sectionTitle}>Birth date</Text>
        <View style={styles.section}>
          <Text style={styles.sectionText}>{user.birthday}</Text>
        </View>

{/* Section de l'addresse mail*/}
        <Text style={styles.sectionTitle}>Email</Text>
        <View style={styles.section}>
          <Text style={styles.sectionText}>{user.email_address}</Text>
        </View>

{/* Section du login*/}
        <Text style={styles.sectionTitle}>Login</Text>
        <View style={styles.section}>
          <Text style={styles.sectionText}>{user.login}</Text>
        </View>

{/* Section du mot de passe*/}
        <Text style={styles.sectionTitle}>Password</Text>
        <View style={styles.section}>
          <Text style={styles.sectionText}>{user.password}</Text>
        </View>

{/* Section du temps avant la prochaine donation*/}
        <View style={styles.info}>
          <Text style={styles.sectionTitle}> Time before the next donation : </Text>

          <View style={styles.donation}>
            <Text style={styles.sectionTitle}>Blood: </Text>
            <Text style={styles.sectionText}>{timeBeforeDonation(user.timeBeforeBloodDonation)}</Text>
          </View>
          <View style={styles.donation}>
            <Text style={styles.sectionTitle}>Plasma: </Text>
            <Text style={styles.sectionText}>{timeBeforeDonation(user.timeBeforePlasmaDonation)}</Text>
          </View>
          <View style={styles.donation}>
            <Text style={styles.sectionTitle}>Plate: </Text>
            <Text style={styles.sectionText}>{timeBeforeDonation(user.timeBeforePlateletDonation)}</Text>
          </View>
        </View>

      </View>
    </ScrollView> 
  );
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