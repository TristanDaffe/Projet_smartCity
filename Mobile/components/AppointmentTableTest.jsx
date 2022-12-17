import React from "react";
import { Text, View, StyleSheet , SafeAreaView} from "react-native";
import { FlatList } from "react-native-gesture-handler";

  const table = ({data})=>
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
                data = {data}
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

