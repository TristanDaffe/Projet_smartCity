import React from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';
import TextField from '../../components/textField';
import TextPressable from '../../components/textPressable';

export default function LoginAccountTest({navigation}) {

  return (
    <View>
      <View style={styles.container}>
        <View style= {styles.lineAccount}>
          <Text style= {styles.croixRougeText}>Croix Rouge   </Text>
          <Image source={require('../../images/logo_croix_rouge.png')} style= {styles.imageCroixRouge}/>
        </View>
        <Image source={require('../../images/user_account.png')} style= {styles.imageProfile}/>
        <Text style={styles.welcomeText}>Welcome Back !</Text>
        <Text style={styles.title}>Login</Text>
          <TextField></TextField>
        <Text style={styles.title}>Password</Text>
          <TextField></TextField>
        <Text style={styles.text}>Forgot Password ?</Text>
        <Button title='Log in' color='red' onPress={() => navigation.navigate('DrawerMenu')}></Button>
        <View style= {styles.lineAccount}>
          <Text style= {styles.textAccount}>Don't have account ?  </Text>
          <TextPressable text={"create a new account"}></TextPressable>
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
  textAccount: {
    fontSize: 15,
    textAlign: 'center',
    color: 'grey',
  },
  welcomeText: {
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

});