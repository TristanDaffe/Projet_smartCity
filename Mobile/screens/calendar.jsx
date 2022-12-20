import React, { useState } from "react";
import {  View, Text, StyleSheet,ScrollView,SafeAreaView , Button , Dimensions, Alert} from 'react-native';
import {Calendar} from 'react-native-calendars';
import dateFns from "date-fns";

import TopBar from '../components/topBar/topBarArrow';
import HoursTable from '../components/HoursTable';

const windowHeight = Dimensions.get('window').height;

const format = (date = new Date()) => dateFns.format(date, 'YYYY-MM-DD h');

export default function CalendarTest ( {route,navigation} )  
{ 
  var day = new Date().getDate();
  var month = new Date().getMonth();
  var year = new Date().getFullYear();
  const baseDate = new Date();

  const [date, setDate] = React.useState(null);  
  const [hours, setHours] = React.useState(null);  

  const {type,center} = route.params;

  const returnHours = (newHours) => {
    setHours(newHours);
  }

    return (
        <View style= {styles.container}>
        <TopBar onclick={navigation.goBack}/>
        <Text style={styles.title}>Calendar</Text>
        <SafeAreaView>
        <Calendar
            onDayPress={day => {
              setDate(day.dateString);             
            }}
          minDate={baseDate.toDateString()}
          theme={{
  
            selectedDayBackgroundColor: '#ff6666',
  
            textDisabledColor: '#729DAF',
  
            textMonthFontWeight: 'bold',
  
            arrowColor: '#ff6666',
          }}
        />
        </SafeAreaView>
        <Text style={styles.title2}>Hours</Text>
        <View style={styles.table}>
        <HoursTable returnHours = {returnHours}></HoursTable>
        </View>
        <View style={styles.button}>
        <Button 
          title='Next' 
          color='red'
          style={styles.button} 
          onPress={() => {
            if(date != null && hours != null)
            {
              navigation.navigate('RecapAppointment' , {date : date , hours : hours , center : center , type : type})
            }
            else
            {
              if (hours == null) {
                Alert.alert("Missing value !" , "The hours is missing")
              }
              else
              {
                Alert.alert("Missing value !" , "The date is missing")
              }
            }
          }}>
          </Button>
        </View> 
        </View> 
    );
};

const styles = StyleSheet.create({
    container:
    {
      maxHeight: windowHeight,
    },
    textName: {
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 30,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 30,
      marginTop: 30,
      marginLeft: 20,
      marginBottom: 10,
    },
    title2: {
      fontWeight: 'bold',
      fontSize: 30,
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 20,
    },
    table: {
        marginLeft: 5,
        alignSelf: 'center',
        maxHeight: '20%',
      },
    button: {
        width: "90%",
        marginTop: 30,
        marginLeft: 20,
      },
    lineCenter: {
      flexDirection: 'row',
      marginTop: 10,
      alignSelf: 'center',
    },
  });