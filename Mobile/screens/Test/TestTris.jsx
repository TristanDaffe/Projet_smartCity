import React, { useContext } from "react";
import {  View, Text, StyleSheet, Alert, Button  } from 'react-native';

import { AuthContext } from "../../context/authContext";
import {BloodContext} from "../../context/bloodContext";

export default function TestTris ( )  {   

  const {user} = useContext(AuthContext);
  //const {getBloods} = useContext(BloodContext);
  //const bloods = getBloods();

    return (
      <View style={styles.container}>
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