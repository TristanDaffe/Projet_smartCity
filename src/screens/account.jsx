import React, { useState } from "react";
import {  View, Text, StyleSheet  } from 'react-native';

import TopBar from '../components/topBar/topBarArrow';

export default function Account ( {navigation} )  {   
    return (
      <View>
        <TopBar onclick={navigation.goBack}/>
        <Text style={styles.text} >compte</Text>
      </View>
    );
};

const styles = StyleSheet.create({
    text: {
      alignSelf: 'center',
    }
}); 