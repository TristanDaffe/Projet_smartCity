import React from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';
import TextField from '../components/textField';

import TopBar from '../components/topBar/topBar';

export default function LoginAccountTest({navigation}) {

  // fonction pour se connecter (à update quand api sera faite)
  function login() {
    navigation.navigate('DrawerMenu');
  }

  return (
    <View>
      <TopBar />
      <View style={styles.container}>
        <Image source={require('../images/user_account.png')} style= {styles.imageProfile}/>
        <Text style={styles.textGrey}>Welcome Back !</Text>
        <Text style={styles.title}>Login</Text>
          <TextField></TextField>
        <Text style={styles.title}>Password</Text>
          <TextField></TextField>
        {/*
          en commentaire car sais pas comment faire (discuter de si y a)
          <Text style={styles.text}>Forgot Password ?</Text> 
        */}
        <Button title='Log in' color='red' onPress={login}></Button>
        <View style= {styles.lineAccount}>
          <Text style= {styles.textGrey}>Don't have account ?  </Text>
          <Text onPress={() => navigation.navigate('Register')} style={styles.createAccountText}>create a new account</Text>
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
    textAlign: 'right',
    marginTop: 15,
    marginRight: 20,
    marginBottom: 10,
    color: 'grey'
  },
  lineAccount: {
    flexDirection: 'row',
    marginTop: 20,
    alignSelf: 'center',
  },
  textGrey: {
    fontSize: 15,
    textAlign: 'center',
    color: 'grey',
  },
  croixRougeText: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageCroixRouge:
  {
    height: 60,
    width: 60,
  },
  imageProfile:{
    height: 100,
    width: 100,
    alignSelf: 'center',
  },
  createAccountText:{
    color:'red',
    fontWeight: 'bold',
  }

});