import React from "react";
import { Text, View, StyleSheet , SafeAreaView} from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { format } from "date-fns";

  const table = ({data})=>
  {
    const item =({item})=>
    {
        var date = new Date(item.date);
        var formattedDate = format(date, "yyyy-MM-dd");

        return(

            <View style={styles.containerItem}>
                <View style={styles.item}>
                    <Text>{formattedDate}</Text>
                </View>
                <View style={styles.item}>
                    <Text>{item.hour}</Text>
                </View>
                <View style={styles.item}>
                    <Text>{item.name}</Text>
                </View>
                <View style={styles.item}>
                    <Text>{item.donation_center_name}</Text>
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
                    <Text>Hour</Text>
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
      width: '24%',
      backgroundColor: 'gainsboro',
      borderWidth: 1,
      alignItems: 'center',
  },
  title: 
  {
    width: '24%',
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
});

