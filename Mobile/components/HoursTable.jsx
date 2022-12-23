import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet , SafeAreaView,TouchableOpacity} from "react-native";
import { FlatList } from "react-native-gesture-handler";

  const data =[
    {id:1,hours: "08:00"},
    {id:2,hours: "08:30"},
    {id:3,hours: "09:00"},
    {id:4,hours: "10:00"},
    {id:5,hours: "10:30"},
    {id:6,hours: "11:00"},
    {id:6,hours: "11:30"},
    {id:6,hours: "12:00"},
    {id:6,hours: "13:00"},
    {id:6,hours: "13:30"},
    {id:6,hours: "14:00"},
    {id:6,hours: "14:30"},
    {id:6,hours: "15:00"},
    {id:6,hours: "15:30"},
    {id:6,hours: "16:00"},
    {id:6,hours: "16:30"},
  ];

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <View style={styles.containerItem}>
            <View style={styles.case}>
                <Text>{item.hours}</Text>
            </View>
        </View>
    </TouchableOpacity>
  );


  const table = ({returnHours})=>
  {
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
      selectedId != null ? returnHours((data[selectedId-1].hours)) : ""
    });

    const item =({item})=>
    {
        const backgroundColor = item.id === selectedId ? "red" : "white";
        const color = item.id === selectedId ? 'white' : 'black';
        return(

            <View>
                <Item
                    item={item}
                    onPress={() => {
                      setSelectedId(item.id)
                    }}
                    backgroundColor={{ backgroundColor }}
                    textColor={{ color }}
                >
                </Item>
            </View>
        )
    }

    return (
              <SafeAreaView style={styles.container}>
                <FlatList 
                data = {data}
                renderItem ={item}
                keyExtractor ={(item,index) => index.toString()}
                >
                </FlatList>
              </SafeAreaView>

    )
  }
  export default table
  
const styles = StyleSheet.create({
  item: {
      borderWidth: 1,
      alignItems: 'center',
  },
  case: 
  {
    width:350,
    height:50,
    borderWidth: 1,
    textAlign: 'center',
  },
  title: 
  {
    width: 300,
    alignItems: 'center',
    borderWidth: 2,
  },
  containerItem: {
      flexDirection : 'row',
      width: '100%',
  },
  container:
  {
    maxHeight: 175,
    flex:1,
  },
  table : {
      justifyContent : 'center',
      marginTop : 10,
      flexGrow: 1,
      paddingBottom: 5,
  },
});
