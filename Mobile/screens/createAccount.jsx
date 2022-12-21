import React from 'react';
import { Text, View, StyleSheet, Image, Button, Pressable, ScrollView, KeyboardAvoidingView, Alert} from 'react-native';

import { TextInput } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import TopBar from '../components/topBar/topBar';

import { AuthContext } from '../context/authContext';

export default function CreateAccountTest({navigation}) {

  const [email, setEmail] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [birthdate, setBirthdate] = React.useState('');
  const [bloodType, setBloodType] = React.useState('');
  const [rhesus, setRhesus] = React.useState('');
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');

  const {isLoading, register} = React.useContext(AuthContext);

  function handleRegister () {
    register(email, lastName, firstName, birthdate, bloodType, rhesus, login, password);
  }

  // temoporaire pour tester le bouton (viendra de la DB)
  const bloodTypeDB = [
    { value: 'A', key: 'A'},
    { value: 'B', key: 'B'},
    { value: 'AB', key: 'AB'},
    { value: 'O', key: 'O'},
  ];

  const rhesusDB = [
    { value: '+', key: '+' },
    { value: '-', key: '-' },
  ];

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : null}
    keyboardVerticalOffset={0}>

    <ScrollView>
      <TopBar />
      <View style={styles.container}>
        {/* spinner pour le temps de chargement lors de la requête à l'api */}
        <Spinner visible={isLoading}/>
        <Image source={require('../images/user_account.png')} style= {styles.image}/>

        <Text style={styles.title}>Email</Text>
          <TextInput 
            style={styles.textField}  
            keyboardType={'email-address'} 
            onChangeText={text => setEmail(text)}>
          </TextInput>

        <Text style={styles.title}>Last Name</Text>
          <TextInput 
            style={styles.textField}
            onChangeText={text => setLastName(text)}
          >
          </TextInput>
        <Text style={styles.title}>First Name</Text>
          <TextInput 
            style={styles.textField}
            onChangeText={text => setFirstName(text)}
          >
          </TextInput>

        <Text style={styles.title}>Birth Date</Text>
          <TextInput 
            style={styles.textField}
            placeholder="DD/MM/YYYY"
            keyboardType={'numbers-and-punctuation'}
            onChangeText={text => setBirthdate(text)}
          >
          </TextInput>

        <Text style={styles.title}>Blood Type</Text>
        <View style={styles.radioButton}>
          <View style={styles.button}>
            {bloodTypeDB.map((type) => {
              return (
                  <Pressable
                      style={ type.value === bloodType ? styles.selected : ""}
                      key= {type.value}
                      onPress={() => setBloodType(type.value)}
                      >     
                      <Text style={styles.option}>{type.value}</Text>
                  </Pressable>
              );
            })}
          </View>
          <View style={styles.spaceRadioButton}>
          <View style={styles.button}>
            {rhesusDB.map((rh) => {
              return (
                  <Pressable
                      style={ rh.value === rhesus ? styles.selected : ""}
                      key= {rh.value}
                      onPress={() => setRhesus(rh.value)}
                      >     
                      <Text style={styles.option}>{rh.value}</Text>
                  </Pressable>
              );
            })}
          </View>
          </View>
        </View>

        <Text style={styles.title}>Login</Text>
          <TextInput 
            style={styles.textField}
            onChangeText={text => setLogin(text)}  
          >
          </TextInput>
        <Text style={styles.title}>Password</Text>
          <TextInput 
            style={styles.textField}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            >
          </TextInput>

        <Button title='Create account' color='red' 
          onPress={handleRegister}>
        </Button>

        <View style= {styles.lineAccount}>
          <Text style={styles.text}>Already have an account ?  </Text>
        <View style= {styles.lineAccount}>
        </View>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.textPress}>Login</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>

    </KeyboardAvoidingView>
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
    alignItems: 'center',
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
  textPress: {
    fontSize: 15,
    textAlign: 'center',
    color: 'red',
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
  option: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    height: 30,
    width: 50,
    borderWidth: 3,
  },
  button: {
    flexDirection: 'row',
  },
  unselected: {
    backgroundColor: 'white',
  },
  selected: {
    backgroundColor: '#e90707',
  },
});
