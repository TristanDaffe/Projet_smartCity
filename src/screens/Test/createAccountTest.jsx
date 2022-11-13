import React from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';
import RadioButton from '../../components/RadioButton';
import TextField from '../../components/textField';
import TextPressable from '../../components/textPressable';

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
      <View style={styles.container}>
        <Image source={require('../../images/user_account.png')} style= {styles.image}/>
        <Text style={styles.title}>Email</Text>
          <TextField></TextField>
        <Text style={styles.title}>Last Name</Text>
          <TextField></TextField>
        <Text style={styles.title}>First Name</Text>
          <TextField></TextField>
        <Text style={styles.title}>Birth Date</Text>
          <TextField placeHolder="DD/MM/YYYY" ></TextField>
        <Text style={styles.title}>Blood Type</Text>
        <View style={styles.radioButton}>
          <View>
            <RadioButton data={typeBlood}/>
          </View>
          <View style={styles.spaceRadioButton}>
              <RadioButton data={rH}/>
          </View>
        </View>
        <Text style={styles.title}>Login</Text>
          <TextField></TextField>
        <Text style={styles.title}>Password</Text>
          <TextField></TextField>
          <Button title='Create Account' color='red'></Button>
          <View style= {styles.lineAccount}>
            <Text style={styles.text}>Already have an account ?  </Text>
            <TextPressable text={"Login"}></TextPressable>
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
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'left',
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
  },
  radioButton: {
    flexDirection: 'row',
  },
  spaceRadioButton:{
    marginLeft: 50,
  },
  image:{
    height: 100,
    width: 100,
    alignSelf: 'center',
  },
  button:{
    color: 'red',
    height: 25,
    width: 100,
  },
  lineAccount: {
    flexDirection: 'row',
    marginTop: 20,
    alignSelf: 'center',
  },
});