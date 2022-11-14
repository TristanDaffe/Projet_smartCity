import React, { useState } from "react";
import {  View, Text, StyleSheet, Alert, Button  } from 'react-native';


export default function TestTris ( {navigation} )  {   

  const pressHandler = () => {
    Alert.alert('You pressed the  button', 'texte de l"alerte', [
      {text: 'Yes', onPress: () => console.log('Yes')},
      {text: 'No', onPress: () => console.log('No Pressed')},
    ]);
  }
    return (
      <View>
        <Text> Bouh </Text>
        <Button title='bouton alert' onPress={pressHandler} />
    
      </View>
    );
};

const styles = StyleSheet.create({

});