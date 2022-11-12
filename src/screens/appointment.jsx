import React, { useState } from "react";
import {  View, Text, StyleSheet  } from 'react-native';

import TopBarDrawer from '../components/topBarDrawer';

export default function Appointment ( {navigation} )  {   
    return (
      <View>
        <TopBarDrawer onclick={navigation.toggleDrawer}/>
        <Text style={styles.text}>Appointment</Text>
      </View>
    );
};

const styles = StyleSheet.create({
    text: {
      alignSelf: 'center',
    }
});