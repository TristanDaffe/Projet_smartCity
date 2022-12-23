import React, { useEffect } from "react";
import {  View, Text, StyleSheet, Image, TextInput } from 'react-native';

import TopBarDrawer from '../components/topBar/topBarDrawer';
import { AuthContext } from '../context/authContext';
import AppointmentTable from '../components/AppointmentTableTest';
import { DonationUserContext } from '../context/donationUserContext';

import { useDispatch , useSelector } from "react-redux";

import {setUserDonation} from "../redux/actions/userDonation";
import {getUserDonations} from "../redux/selectors"

const appointment1 = {
  id:1,
  center: "Don de sang Croix-Rouge Namur",
  type: "Blood",
  date: "21/02/2022",
  hour: "8:00-8:30",
};

const appointment2 = {
  id:2,
  center: "Don de sang Croix-Rouge Namur",
  type: "Plasma",
  date: "24/04/2022",
  hour: "8:00-8:30",
};

const appointment3 = {
  id:3,
  center: "Don de sang Croix-Rouge Namur",
  type: "Plasma",
  date: "05/06/2022",
  hour: "8:00-8:30",
};

const appointment4 = {
  id:4,
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "14/07/2022",
  hour: "8:00-8:30",
};

const appointment5 = {
  id:5,
  center: "Don de sang Croix-Rouge Namur",
  type: "Blood",
  date: "15/09/2022",
  hour: "8:00-8:30",
};

const appointment6 = {
  id:6,
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "18/11/2022",
  hour: "8:00-8:30",
};

const appointment7 = {
  id:7,
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "20/12/2022",
  hour: "8:00-8:30",
};

const appointment8 = {
  id:8,
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "21/12/2022",
  hour: "8:00-8:30",
};  

const appointment9 = {
  id:9,
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "22/12/2022",
  hour: "8:00-8:30",
};

const appointment10 = {
  id:10,
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "23/12/2022",
  hour: "8:00-8:30",
};

const appointment11 = {
  id:11,
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "24/12/2022",
  hour: "8:00-8:30",
};

const appointment12 = {
  id:12,
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "25/12/2022",
  hour: "8:00-8:30",
};

const appointment13 = {
  id:13,
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "26/12/2022",
  hour: "8:00-8:30",
};

const appointment14 = {
  id:14,
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "27/12/2022",
  hour: "8:00-8:30",
};

const appointment15 = {
  id:15,
  center: "Don de sang Croix-Rouge Namur",
  type: "Blood",
  date: "28/12/2022",
  hour: "8:00-8:30",
};

const appointment16 = {
  id:16,
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "29/12/2022",
  hour: "8:00-8:30",
};

const appointment17 = {
  id:17,
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "30/12/2022",
  hour: "8:00-8:30",
};

const appointment18 = {
  id:18,
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "31/12/2022",
  hour: "8:00-8:30",
};

const appointment19 = {
  id:19,
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "01/01/2023",
  hour: "8:00-8:30",
};

const appointment20 = {
  id:20,
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "02/01/2023",
  hour: "8:00-8:30",
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

export default function Appointment  ( {navigation} )  {

    const {user} = React.useContext(AuthContext);
    const [filteredData, setFilteredData] = React.useState(allUserDonations);
    const {getDonationsOfUser ,donationsUser} = React.useContext(DonationUserContext);
    
    useEffect(() => {
      console.log("useEffect appointment")
      getDonationsOfUser(user.id)
    }, []);

    const dispatch = useDispatch();

    dispatch(setUserDonation(donationsUser));

    const allUserDonations = useSelector(getUserDonations);
  
    const searchFilter = (text) => {
      if(text)
      {
            const newdata = allUserDonations.filter(item => {
            const itemData = item.name.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
  
        })
        setFilteredData(newdata);
      }
      else
      {
        setFilteredData(allUserDonations)
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
      marginLeft: '3%',
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