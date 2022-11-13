import 'react-native-gesture-handler';
import React from 'react';
import {  View, StyleSheet, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { setStatusBarStyle } from 'expo-status-bar';

import DrawerMenu from './components/drawer/drawerMenu';
import Account from './screens/account';
import Login from './screens/Test/loginAccountTest';
import Register from './screens/Test/createAccountTest';

const Stack = createNativeStackNavigator();

export default function App() {
  setStatusBarStyle('light-content');
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ 
            headerShown: false,
        }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="DrawerMenu" component={DrawerMenu} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Account" component={Account} />
        </Stack.Navigator>
      </NavigationContainer>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
    margin: -10,

    flex: 1,
    flexDirection : 'row',
    padding: 10,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  header: {
    flex: 1,
    height: Constants.statusBarHeight,
  },
  menu: {
      position: 'absolute',
      alignSelf: 'flex-start',
  }
});
