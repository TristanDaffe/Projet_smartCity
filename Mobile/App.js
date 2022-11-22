import 'react-native-gesture-handler';
import React from 'react';
import Constants from 'expo-constants';
import {  StatusBar, StyleSheet, View } from 'react-native';
import { setStatusBarStyle } from 'expo-status-bar';

import Routes from './routes/routes';
import {AuthProvider} from './context/authContext';

export default function App() {
  setStatusBarStyle('light-content');
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  }
});