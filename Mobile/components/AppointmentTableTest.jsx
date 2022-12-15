import React from "react";
import { Text, View, StyleSheet , SafeAreaView} from "react-native";
import { FlatList } from "react-native-gesture-handler";

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

  const table = ()=>
  {
    const item =({item})=>
    {
        return(

            <View style={styles.containerItem}>
                <View style={styles.item}>
                    <Text>{item[2]}</Text>
                </View>
                <View style={styles.item}>
                    <Text>{item[1]}</Text>
                </View>
                <View style={styles.item}>
                    <Text>{item[0]}</Text>
                </View>
            </View>
        )
    }

    return (
              <SafeAreaView style={styles.container}>
                <FlatList 
                data = {appoitmentData}
                renderItem ={item}
                keyExtractor ={(item,index) => index.toString()}
                ListHeaderComponent={            
                <View style={styles.containerItem}>
                <View style={styles.title}>
                    <Text>Date</Text>
                </View>
                <View style={styles.title}>
                    <Text>Type</Text>
                </View>
                <View style={styles.title}>
                    <Text>Center</Text>
                </View>
            </View>}
                >
                </FlatList>
              </SafeAreaView>

    )
  }
  export default table
  
const styles = StyleSheet.create({
  item: {
      width: '33%',
      backgroundColor: 'gainsboro',
      borderWidth: 1,
      alignItems: 'center',
  },
  title: 
  {
    width: '33%',
    alignItems: 'center',
    borderWidth: 2,
  },
  containerItem: {
      flexDirection : 'row',
  },
  container:
  {
    maxHeight: 500,
    flex:1,
  },
  table : {
      justifyContent : 'center',
      marginLeft: 3,
      marginTop : 10,
      flexGrow: 1,
      paddingBottom: 5,
  },
});

