import React, { useState } from "react";
import {  View, Text, StyleSheet  } from 'react-native';

import TopBarDrawer from '../components/topBarDrawer';

export default function Stats ( {navigation} )  {   
    return (
      <View>
        <TopBarDrawer onclick={navigation.toggleDrawer}/>
        <Text style={styles.text}>stats</Text>
      </View>
    );
};

const styles = StyleSheet.create({
    text: {
      alignSelf: 'center',
    }
});