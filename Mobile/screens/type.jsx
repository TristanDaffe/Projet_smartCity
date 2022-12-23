import React, { useState , useEffect } from "react";
import {  View, Text, StyleSheet,SafeAreaView , Button, Alert} from 'react-native';
import { useDispatch , useSelector } from "react-redux";
import TopBar from '../components/topBar/topBarArrow';
import MultiButton from '../components/MultiButton';
import { ScrollView } from "react-native-gesture-handler";
import { DonationCenterContext } from '../context/donationCenterContext';
import { DonationUserContext } from "../context/donationUserContext";
import { AuthContext } from "../context/authContext";
import Spinner from "react-native-loading-spinner-overlay/lib";


export default function Type ( {navigation} )  {  
    
    const [type, setType] = React.useState(null);
    const {allDonationCenter , isLoading } = React.useContext(DonationCenterContext);

    const returnType = (newType) => {
      setType(newType);
    }
    

    return (
      <View>
        <Spinner visible = {isLoading}/>
        <TopBar onclick={navigation.goBack}/>
          <ScrollView horizontal={false}>
            <Text style={styles.type}>Type</Text>
              <ScrollView horizontal={true}>
              <MultiButton returnType = {returnType}></MultiButton>
              </ScrollView>
              <View style={styles.button}>
              <Button 
                title='Next' 
                color='red'
                style={styles.button} 
                onPress={async() =>{
                  if (type != null) {
                      await allDonationCenter();
                      navigation.navigate('Center', type);
                  }
                  else
                  {
                      Alert.alert("Missing value !" , "The blood type is missing")
                  }
                }}> 
                </Button>
              </View> 
          </ScrollView>
      </View>
    );
};

const styles = StyleSheet.create({
    container:
    {
      maxHeight: '100%',
    },
    type: {
      fontWeight: 'bold',
      fontSize: 30,
      marginTop: 50,
      marginLeft: 20,
      marginBottom: 20,
    },
    textName: {
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 30,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 30,
      marginTop: 50,
      marginLeft: 20,
      marginBottom: 20,
    },
    button: {
        width: "90%",
        marginTop: 30,
        marginLeft: 20,
        height: 200,
      },
    textResponseBlood: {
      fontWeight: 'bold',
      color:'red',
      fontSize: 25,
      textAlign: 'left',
      marginTop: 25,
      alignSelf: 'center',
      borderWidth: 1,
      borderWidth: 2,
      borderRadius: 5,
      paddingLeft: 100,
      paddingRight: 100,
      paddingTop: 10,
      paddingBottom: 10,
    },
    lineCenter: {
      flexDirection: 'row',
      marginTop: 10,
      alignSelf: 'center',
    },
    lineSearch: {
      flexDirection: 'row',
      marginTop: 20,
      alignSelf: 'center',
    },
    image:{
      height: 80,
      width: 80,
      marginRight: 10,
    },
  });