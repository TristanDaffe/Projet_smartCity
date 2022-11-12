import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import RadioButton from '../components/RadioButton';
import TopBarDrawer from '../components/topBarDrawer';

export default function CreateAccountTest({navigation}) {

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
    <View>
      <TopBarDrawer onclick={navigation.toggleDrawer}/>
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
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
  },
  paragraph: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'left',
  },
  radioButton: {
    flexDirection: 'row',
  },
  space:{
    marginLeft: 50,
  },
});