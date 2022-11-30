import React, { useContext } from "react";
import {  View, Text, StyleSheet, Alert, Button  } from 'react-native';

import { AuthContext } from "../../context/authContext";
import {BloodContext} from "../../context/bloodContext";

export default function TestTris ( )  {   

  const {user} = useContext(AuthContext);
  const {getBloods} = useContext(BloodContext);
  const bloods = getBloods();

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