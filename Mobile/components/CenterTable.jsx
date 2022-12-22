import React, { useState , useEffect } from "react";
import { Text, View, StyleSheet , SafeAreaView,TouchableOpacity} from "react-native";
import { FlatList } from "react-native-gesture-handler";

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <View style={styles.containerItem}>
            <View style={styles.case}>
                <Text>{item.center}</Text>
            </View>
            <View style={styles.case}>
                <Text>{item.address}</Text>
            </View>
            <View style={styles.case}>
                <Text>{item.url}</Text>
            </View>
            <View style={styles.case}>
                <Text>{item.phoneNumber}</Text>
            </View>
        </View>
    </TouchableOpacity>
  );

  const table = ({data,returnCenter})=>
  {
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        selectedId != null ? returnCenter((data[selectedId-1].center)) : ""
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
                ListHeaderComponent={            
                <View style={styles.containerItem}>
                <View style={styles.title}>
                    <Text>Center</Text>
                </View>
                <View style={styles.title}>
                    <Text>Address</Text>
                </View>
                <View style={styles.title}>
                    <Text>Url</Text>
                </View>
                <View style={styles.title}>
                    <Text>PhoneNumber</Text>
                </View>
            </View>}
                >
                </FlatList>
                 {/* {selectedId != null ?  console.log(data[selectedId-1]) : "" } */}
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
    width:100,
    borderWidth: 1,
  },
  title: 
  {
    width: 100,
    alignItems: 'center',
    borderWidth: 2,
  },
  containerItem: {
      flexDirection : 'row',
      width: '100%',
  },
  container:
  {
    maxHeight: 500,
    flex:1,
  },
  table : {
      justifyContent : 'center',
      marginTop : 10,
      flexGrow: 1,
      paddingBottom: 5,
  },
});

