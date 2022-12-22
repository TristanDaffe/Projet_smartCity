import 'react-native-gesture-handler';
import React from 'react';
import Constants from 'expo-constants';
import {  StatusBar, StyleSheet, View } from 'react-native';
import { setStatusBarStyle } from 'expo-status-bar';
import {Provider} from "react-redux";
import {store} from "./redux/store";

import Routes from './routes/routes';
import {AuthProvider} from './context/authContext';
import { DonationCenterProvider } from './context/donationCenterContext';
import { BloodProvider } from './context/bloodContext';

export default function App() {
  setStatusBarStyle('light-content');
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Provider store={store}>
      <AuthProvider>
        <DonationCenterProvider>
          <BloodProvider>
            <Routes />
          </BloodProvider>
        </DonationCenterProvider>
      </AuthProvider>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  }
});