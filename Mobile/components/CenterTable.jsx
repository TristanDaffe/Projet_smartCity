import React, { useState , useEffect } from "react";
import { Text, View, StyleSheet , SafeAreaView,TouchableOpacity} from "react-native";
import { FlatList } from "react-native-gesture-handler";

  const Item = ({ item, onPress, backgroundColor, textColor }) => 
  {
    return(  
        <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
            <View style={styles.containerItem}>
                <View style={styles.case}>
                    <Text>{item.name}</Text>
                </View>
                <View style={styles.case}>
                    <Text>{item.street_name},{item.street_number}</Text>
                </View>
                <View style={styles.case}>
                    <Text>{item.email_address}</Text>
                </View>
                <View style={styles.case}>
                    <Text>{item.phone_number}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
  }


  const table = ({data,returnCenter,type})=>
  {
    const [selectedId, setSelectedId] = useState(null);
    
    let centers = [];
    data.map(center =>{
        let i = 0;
        while (i < center.donationTypeAvailable.length && center.donationTypeAvailable[i].name !== type.name) {
            i++;
        }
        if (i < center.donationTypeAvailable.length) {
            centers.push(center)
        }
    })

    useEffect(() => {
        selectedId != null ? returnCenter((centers[selectedId-1])) : ""
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
            data = {centers}
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
                <Text>EmailAddress</Text>
                </View>
                <View style={styles.title}>
                <Text>PhoneNumber</Text>
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
      borderWidth: 1,
      alignSelf: 'center',
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

