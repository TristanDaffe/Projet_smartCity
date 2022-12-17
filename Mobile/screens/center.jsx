import React, { useState } from "react";
import {  View, Text, StyleSheet,ScrollView,SafeAreaView , Button, TextInput , Image} from 'react-native';

import TopBarDrawer from '../components/topBar/topBarDrawer';
import CenterTable from '../components/CenterTable';
import { DonationCenterContext } from '../context/donationCenterContext';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BASE_URL} from "../config";
import { Alert } from "react-native";

const tab =[
  {id:0,center: "Don de sang à Marche-en-Famenne",address: "Rue je sais pas quoi",url: "https://www.croix-rouge.be",phoneNumber: "0491569536"},
  {id:1,center: "Don de sang à Marche-en-Famenne",address: "Rue je sais pas quoi",url: "https://www.croix-rouge.be",phoneNumber: "0491569536"},
  {id:2,center: "Don de sang à Namur",address: "Rue je sais pas quoi",url: "https://www.croix-rouge.be",phoneNumber: "0491569536"},
  {id:3,center: "Don de sang à Wavre",address: "Rue je sais pas quoi",url: "https://www.croix-rouge.be",phoneNumber: "0491569536"},
  {id:4,center: "Don de sang à Zamur",address: "Rue je sais pas quoi",url: "https://www.croix-rouge.be",phoneNumber: "0491569536"},
  {id:5,center: "Don de sang à Namur",address: "Rue je sais pas quoi",url: "https://www.croix-rouge.be",phoneNumber: "0491569536"},
  {id:6,center: "Don de sang à Namur",address: "Rue je sais pas quoi",url: "https://www.croix-rouge.be",phoneNumber: "0491569536"},
  {id:7,center: "Don de sang à Namur",address: "Rue je sais pas quoi",url: "https://www.croix-rouge.be",phoneNumber: "0491569536"},
  {id:8,center: "Don de sang à Namur",address: "Rue je sais pas quoi",url: "https://www.croix-rouge.be",phoneNumber: "0491569536"},
  {id:9,center: "Don de sang à Namur",address: "Rue je sais pas quoi",url: "https://www.croix-rouge.be",phoneNumber: "0491569536"},
  {id:11,center: "Don de sang à Namur",address: "Rue je sais pas quoi",url: "https://www.croix-rouge.be",phoneNumber: "0491569536"},
  {id:12,center: "Don de sang à Namur",address: "Rue je sais pas quoi",url: "https://www.croix-rouge.be",phoneNumber: "0491569536"},
  {id:13,center: "Don de sang à Namur",address: "Rue je sais pas quoi",url: "https://www.croix-rouge.be",phoneNumber: "0491569536"},
  {id:14,center: "Don de sang à Namur",address: "Rue je sais pas quoi",url: "https://www.croix-rouge.be",phoneNumber: "0491569536"},
  {id:15,center: "Don de sang à Namur",address: "Rue je sais pas quoi",url: "https://www.croix-rouge.be",phoneNumber: "0491569536"},
  {id:16,center: "Don de sang à Namur",address: "Rue je sais pas quoi",url: "https://www.croix-rouge.be",phoneNumber: "0491569536"},
];


export default function Center ( {navigation} )  { 
  const [data, setData] = React.useState(null);  // Quand il y aura accès à l'api
  const [filteredData, setFilteredData] = React.useState(tab);

  const searchFilter = (text) => {
    if(text)
    {
          const newdata = tab.filter(item => {
          const itemData = item.center.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;

      })
      setFilteredData(newdata);
    }
    else
    {
      setFilteredData(tab)
    }
  }
  
    return (
      <SafeAreaView>
        <TopBarDrawer onclick={navigation.toggleDrawer}/>
        <View style={styles.lineCenter}>
          <Text style={styles.title}>Center</Text>
          <View style={styles.searchBarre}>
          <Image source={require('../images/magnifyingGlassSearch.png')} style= {styles.imgSearchBarre}/>
          <TextInput style={styles.textSearchBarre}
              onChangeText={(text) => searchFilter(text)}
              value={filteredData}
              placeholder= "search(center)"
            />
          </View>
        </View>
        <View style={styles.table}>
        <CenterTable data = {filteredData}></CenterTable>
        </View>
        <View style={styles.button}>
        <Button 
          title='Next' 
          color='red'
          style={styles.button} 
          onPress={() => navigation.navigate('Calendar')}></Button>
        </View> 
      </SafeAreaView>
    );
    
};

const styles = StyleSheet.create({
    textName: {
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 30,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 30,
      marginLeft: 20,
      marginRight : 90,
    },
    table: {
        marginLeft: 5,
        alignSelf: 'center',
      },
    button: {
        width: "90%",
        marginTop: 30,
        marginLeft: 20,
        height: 300,
      },
    lineCenter: {
      flexDirection: 'row',
      marginTop: 50,
      marginBottom: 20,
      alignSelf: 'center',
    },
    searchBarre: {
      height: 45,
      fontSize: 15,
      width: 200,
      marginBottom : 5,
      borderWidth: 1,
      padding: 10,
      borderWidth: 3,
      borderRadius: 25,
      flexDirection: 'row',
      right: 0,
      },
      imgSearchBarre: {
      height: 20,
      width: 20,
      },
      textSearchBarre: {
      marginLeft: 3,
      width: 150,
      height: 20,
      },
  });