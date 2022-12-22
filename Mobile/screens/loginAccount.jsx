import React from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';

import TopBar from '../components/topBar/topBar';
import Separator from '../components/separator';

import { AuthContext } from '../context/authContext';
import { TextInput } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay/lib';

export default function LoginAccountTest({navigation}) {
  const [loginUser, setloginUser] = React.useState('');
  const [password, setPassword] = React.useState('');

  const {isLoading, login} = React.useContext(AuthContext);
  const all = React.useContext(AuthContext);

  return (
    <View>
      <TopBar />
      <Spinner visible={isLoading}/>
      <View style={styles.container}>
        <Image source={require('../images/user_account.png')} style= {styles.imageProfile}/>
        <Text style={styles.textGrey}>Welcome Back !</Text>
        <Text style={styles.title}>Login</Text>
          <TextInput 
            style={styles.textField}
            onChangeText={text => setloginUser(text)}
          >
          </TextInput>
        <Separator/>
        <Text style={styles.title}>Password</Text>
          <TextInput 
            style={styles.textField}
            password={true} 
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          >
          </TextInput>
        {/*
          en commentaire car sais pas comment faire (discuter de si y a)
          <Text style={styles.text}>Forgot Password ?</Text> 
        */}
        <Separator/>
        <Button 
          title='Log in' 
          color='red' 
          onPress={() => login(loginUser, password)}></Button>
        <View style= {styles.lineAccount}>
          <Text style= {styles.textGrey}>Don't have account ?  </Text>
          <Text 
            onPress={() => navigation.navigate('Register')} 
            style={styles.createAccountText}
            >
            create a new account
          </Text>
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
  },
  textField: {
    height: 45,
    fontSize: 15,
    width: 350,
    marginBottom : 5,
    marginTop: 5,
    borderWidth: 1,
    padding: 10,
    borderColor: "red",
    borderWidth: 3,
    borderRadius: 5,
  },
});