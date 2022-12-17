import React, { useState } from "react";
import { Text, View, StyleSheet , SafeAreaView,TouchableOpacity} from "react-native";
import { FlatList } from "react-native-gesture-handler";

  const data =[
    {id:0,hours: "8:00-8:30"},
    {id:1,hours: "8:30-9:00"},
    {id:2,hours: "9:00-9:30"},
    {id:3,hours: "10:00-10:30"},
    {id:4,hours: "10:30-11:00"},
    {id:5,hours: "11:00-11:30"},
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

  const table = ()=>
  {
    const [selectedId, setSelectedId] = useState(null);
    const item =({item})=>
    {
        const backgroundColor = item.id === selectedId ? "red" : "white";
        const color = item.id === selectedId ? 'white' : 'black';
        return(

            <View>
                <Item
                    item={item}
                    onPress={() => setSelectedId(item.id)}
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
                {selectedId != null ?  console.log(data[selectedId].hours) : "" }
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
