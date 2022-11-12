import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import RadioButton from '../components/RadioButton';

export default function CreateAccountTest() {

  const typeBlood = [
    { value: 'A', key: 'A'},
    { value: 'B', key: 'B'},
    { value: 'AB', key: 'AB'},
    { value: 'O', key: 'O'},
  ];

  const rH = [
    { value: '+', key: '+' },
    { value: '-', key: '-' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Blood Type</Text>
      <View style={styles.radioButton}>
        <View>
          <RadioButton data={typeBlood}/>
        </View>
        <View style={styles.space}>
            <RadioButton data={rH}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph:
  {
    fontWeight: 'bold',
    fontSize: 20,
  },
  radioButton: {
    flexDirection: 'row',
  },
  space:{
    marginLeft: 25,
  },
});