import React, { useEffect } from "react";
import {  View, Text, StyleSheet, Image, TextInput } from 'react-native';

import TopBarDrawer from '../components/topBar/topBarDrawer';
import { AuthContext } from '../context/authContext';
import AppointmentTable from '../components/AppointmentTableTest';
import { DonationUserContext } from '../context/donationUserContext';

import { useDispatch , useSelector } from "react-redux";

import {setUserDonation} from "../redux/actions/userDonation";
import {getUserDonations} from "../redux/selectors"


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