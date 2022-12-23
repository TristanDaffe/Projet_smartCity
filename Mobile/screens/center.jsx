import React from "react";
import {  View, Text, StyleSheet ,SafeAreaView , Button, TextInput , Image, Alert } from 'react-native';

import { DonationCenterContext } from '../context/donationCenterContext';
import TopBar from '../components/topBar/topBarArrow';
import CenterTable from '../components/CenterTable';

export default function Center ( {route,navigation})  {
  const [center, setCenter] = React.useState(null);
  const {donationCenters} = React.useContext(DonationCenterContext);
  
  const [filteredData, setFilteredData] = React.useState(donationCenters);

  const type = route.params;


  const returnCenter = (newCenter) => {
    setCenter(newCenter);
  }

  const searchFilter = (text) => {
    if(text)
    {
      const newdata = donationCenters.filter(item => {
        const itemData = item.name.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
      setFilteredData(newdata);
    }
    else
    {
      setFilteredData(donationCenters)
    }
  }
  
    return (
      <SafeAreaView>
        <TopBar onclick={navigation.goBack}/>
          <View style={styles.lineCenter}>
            <Text style={styles.title}>Select a center</Text>
            <View style={styles.searchBarre}>
            <Image source={require('../images/magnifyingGlassSearch.png')} style= {styles.imgSearchBarre}/>
            <TextInput style={styles.textSearchBarre}
                onChangeText={(text) => searchFilter(text)}
                placeholder= "search(center)"
              />
            </View>
          </View>
          <View style={styles.table}>
              <CenterTable data = {filteredData} type = {type} returnCenter = {returnCenter}></CenterTable>
          </View>
          {console.log(center)}
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
      fontSize: 25,
      marginLeft: 20,
      marginRight : 8,
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