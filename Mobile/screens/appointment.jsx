import React, { useState } from "react";
import {  View, Text, StyleSheet, Image, TextInput } from 'react-native';

import TopBarDrawer from '../components/topBar/topBarDrawer';
import SearchBar from '../components/SearchBar';
import { AuthContext } from '../context/authContext';
import AppointmentTable from '../components/AppointmentTableTest';

const appointment1 = {
  center: "Don de sang Croix-Rouge Namur",
  type: "Blood",
  date: "21/02/2022",
};

const appointment2 = {
  center: "Don de sang Croix-Rouge Namur",
  type: "Plasma",
  date: "24/04/2022",
};

const appointment3 = {
  center: "Don de sang Croix-Rouge Namur",
  type: "Plasma",
  date: "05/06/2022",
};

const appointment4 = {
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "14/07/2022",
};

const appointment5 = {
  center: "Don de sang Croix-Rouge Namur",
  type: "Blood",
  date: "15/09/2022",
};

const appointment6 = {
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "18/11/2022",
};

const appointment7 = {
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "20/12/2022",
};

const appointment8 = {
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "21/12/2022",
};  

const appointment9 = {
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "22/12/2022",
};

const appointment10 = {
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "23/12/2022",
};

const appointment11 = {
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "24/12/2022",
};

const appointment12 = {
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "25/12/2022",
};

const appointment13 = {
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "26/12/2022",
};

const appointment14 = {
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "27/12/2022",
};

const appointment15 = {
  center: "Don de sang Croix-Rouge Namur",
  type: "Blood",
  date: "28/12/2022",
};

const appointment16 = {
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "29/12/2022",
};

const appointment17 = {
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "30/12/2022",
};

const appointment18 = {
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "31/12/2022",
};

const appointment19 = {
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "01/01/2023",
};

const appointment20 = {
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "02/01/2023",
};


// ça c'est ce qu'on get de l'API
const appointments_raw = [
  [
    appointment1,
    appointment2,
    appointment3,
    appointment4,
    appointment5,
    appointment6,
    appointment7,
    appointment8,
    appointment9,
    appointment10,
    appointment11,
    appointment12,
    appointment13,
    appointment14,
    appointment15,
    appointment16,
    appointment17,
    appointment18,
    appointment19,
    appointment20,


  ]
];

const data =[
  {id : 1 ,center: "Don de sang à Marche-en-Famenne",type: "Plasma",date: "01/01/2023"},
  {id : 2 ,center: "Don de sang à Marche-en-Famenne",type: "Blood",date: "01/01/2023"},
  {id : 3 ,center: "Don de sang à Marche-en-Famenne",type: "Plasma",date: "01/01/2023"}
];

// ça c'est converti pour la table
let appoitmentData = appointments_raw[0].map((appointment) => {
  return [appointment.center, appointment.type, appointment.date];
});

export default function Appointment ( {navigation} )  {

    const {user} = React.useContext(AuthContext);

    const [data, setData] = React.useState(null);  // Quand il y aura accès à l'api
    const [filteredData, setFilteredData] = React.useState(appoitmentData);
  
    const searchFilter = (text) => {
      if(text)
      {
            const newdata = appoitmentData.filter(item => {
            const itemData = item[1].toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
  
        })
        setFilteredData(newdata);
      }
      else
      {
        setFilteredData(appoitmentData)
      }
    }
    return (
      <View>
        <TopBarDrawer onclick={navigation.toggleDrawer}/>
        <Text style={styles.title}>Appointment Made</Text>
        <View style={styles.lineCenter}>
          <Image source={require('../images/user_account.png')} style= {styles.image}/>
          <Text style={styles.textName}>{user.firstName} {user.lastName}</Text>
        </View>
        <View style={styles.lineSearch}>
          <Text style={styles.textBrowsing}>Browsing</Text>
          <View style={styles.searchBarre}>
          <Image source={require('../images/magnifyingGlassSearch.png')} style= {styles.imgSearchBarre}/>
          <TextInput style={styles.textSearchBarre}
              onChangeText={(text) => searchFilter(text)}
              value={filteredData}
              placeholder= "search(type)"
            />
          </View>
        </View>
        <View style={styles.table}>
          <AppointmentTable data ={filteredData}></AppointmentTable>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    textName: {
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 30,
    },
    textBrowsing: {
      fontWeight: 'bold',
      fontSize: 30,
      marginRight:60,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 30,
      alignSelf: 'center',
      marginTop: 20,
    },
    table: {
      marginLeft: 5,
      alignSelf: 'center',
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