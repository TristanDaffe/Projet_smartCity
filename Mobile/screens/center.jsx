import React, { useState } from "react";
import {  View, Text, StyleSheet,ScrollView,SafeAreaView , Button, TextInput , Image, Alert } from 'react-native';

import { DonationCenterContext } from '../context/donationCenterContext';
import { BloodContext } from '../context/bloodContext';
import TopBar from '../components/topBar/topBarArrow';
import CenterTable from '../components/CenterTable';
import { useDispatch , useSelector } from "react-redux";

import {setCenters} from "../redux/actions/center";
import {getCenters} from "../redux/selectors"

const tab =[
  {id:1,center: "Don de sang à Marche-en-Famenne",address: "Rue je sais pas quoi",url: "https://www.croix-rouge.be",phoneNumber: "0491569536"},
  {id:2,center: "Don de sang à Namur",address: "Rue je sais pas quoi",url: "https://www.croix-rouge.be",phoneNumber: "0491569536"},
  {id:3,center: "Don de sang à Wavre",address: "Rue je sais pas quoi",url: "https://www.croix-rouge.be",phoneNumber: "0491569536"},
  {id:4,center: "Don de sang à Zamur",address: "Rue je sais pas quoi",url: "https://www.croix-rouge.be",phoneNumber: "0491569536"},
  {id:5,center: "Don de sang à Namur",address: "Rue je sais pas quoi",url: "https://www.croix-rouge.be",phoneNumber: "0491569536"},
  {id:6,center: "Don de sang à Namur",address: "Rue je sais pas quoi",url: "https://www.croix-rouge.be",phoneNumber: "0491569536"},
  {id:7,center: "Don de sang à Namur",address: "Rue je sais pas quoi",url: "https://www.croix-rouge.be",phoneNumber: "0491569536"},
  {id:8,center: "Don de sang à Namur",address: "Rue je sais pas quoi",url: "https://www.croix-rouge.be",phoneNumber: "0491569536"},
  {id:9,center: "Don de sang à Namur",address: "Rue je sais pas quoi",url: "https://www.croix-rouge.be",phoneNumber: "0491569536"},
  {id:10,center: "Don de sang à Namur",address: "Rue je sais pas quoi",url: "https://www.croix-rouge.be",phoneNumber: "0491569536"},
  {id:11,center: "Don de sang à Namur",address: "Rue je sais pas quoi",url: "https://www.croix-rouge.be",phoneNumber: "0491569536"},
  {id:12,center: "Don de sang à Namur",address: "Rue je sais pas quoi",url: "https://www.croix-rouge.be",phoneNumber: "0491569536"},
  {id:13,center: "Don de sang à Namur",address: "Rue je sais pas quoi",url: "https://www.croix-rouge.be",phoneNumber: "0491569536"},
  {id:14,center: "Don de sang à Namur",address: "Rue je sais pas quoi",url: "https://www.croix-rouge.be",phoneNumber: "0491569536"},
  {id:15,center: "Don de sang à Louvain",address: "Rue je sais pas quoi",url: "https://www.croix-rouge.be",phoneNumber: "0491569536"},
];

export default function Center ( {route,navigation})  {
  const [filteredData, setFilteredData] = React.useState(tab);
  const [center, setCenter] = React.useState(null);
  const {allDonationCenter ,donationCenters} = React.useContext(DonationCenterContext);
  const {getBloods,bloods} = React.useContext(BloodContext);

  const dispatch = useDispatch();
  dispatch(setCenters(tab));
  const allcenters = useSelector(getCenters);

  const type = route.params;


  const getAllDonationCenter = async() => {
    await allDonationCenter()
  }


  const returnCenter = (newCenter) => {
    setCenter(newCenter);
  }

  const searchFilter = (text) => {
    if(text)
    {
          const newdata = allcenters.filter(item => {
          const itemData = item.center.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;

      })
      setFilteredData(newdata);
    }
    else
    {
      setFilteredData(allcenters)
    }
  }
  
    return (
      <SafeAreaView>
        <TopBar onclick={navigation.goBack}/>
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
            <Button  
              title='Centers' 
              color='red' 
              onPress={() => getAllDonationCenter()}></Button>
          </View>
          <View style={styles.table}>
              <CenterTable data = {filteredData} returnCenter = {returnCenter}></CenterTable>
          </View>
          <View style={styles.button}>
              <Button 
                title='Next' 
                color='red'
                style={styles.button} 
                onPress={() => {
                  if(center != null)
                  {
                    navigation.navigate('Calendar' , {type: type , center : center})
                  }
                  else
                  {
                    Alert.alert("Missing value !" , "The center is missing")
                  }
                }}>
                </Button>
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
        alignSelf: 'center',
        height: '60%',
      },
    button: {
        width: "90%",
        marginTop: 30,
        marginLeft: 20,
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