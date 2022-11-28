import React, { useContext } from "react";
import {  View, Text, StyleSheet, Alert, Button  } from 'react-native';

import { AuthContext } from "../../context/authContext";

export default function TestTris ( )  {   

  const {user} = useContext(AuthContext);

  const pressHandler = () => {
    Alert.alert('You pressed the  button', 'texte de l"alerte', [
      {text: 'Yes', onPress: () => console.log('Yes')},
      {text: 'No', onPress: () => console.log('No Pressed')},
    ]);
  }
    return (
      <View style={styles.container}>
        <Text> id : {user.id} </Text>
        <Text> firstName : {user.firstName} </Text>
        <Text> lastName : {user.lastName} </Text>
        <Text> email : {user.email} </Text>
        <Text> birthday : {user.birthday} </Text>
        <Text> bloodtype {user.bloodtype} </Text>
        <Text> login = {user.login} </Text>
        <Text> password : {user.password} </Text>
        <Button title='bouton alert' onPress={pressHandler} />
    
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});