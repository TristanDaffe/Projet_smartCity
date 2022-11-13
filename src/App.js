import 'react-native-gesture-handler';
import React from 'react';
import {  View, StyleSheet, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { setStatusBarStyle } from 'expo-status-bar';

import AppStack from './routes/appStack';
import LoginRegisterStack from './routes/loginRegisterStack';

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
          <Stack.Screen name="LoginRegisterStack" component={LoginRegisterStack} />
          <Stack.Screen name="AppStack" component={AppStack} />
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
});
