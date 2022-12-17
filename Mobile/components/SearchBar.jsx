import React from 'react';
import { View, Text, Pressable, StyleSheet , Image, TextInput } from 'react-native';

export default function SearchBar(props) 
{
    const [data, setData] = React.useState(null);  
    const [filteredData, setFilteredData] = React.useState(null); 

    setData(props)
    const searchFilter = (text) => {
      if(text)
      {
            const newdata = data.filter(item => {
            const itemData = item.center ? item.center.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData);
        })
        setFilteredData(newdata);
      }
      else
      {
        setFilteredData(data)
      }
    }

    return (
        <View style={styles.searchBarre}>
        <Image source={require('../images/magnifyingGlassSearch.png')} style= {styles.imgSearchBarre}/>
          <TextInput style={styles.textSearchBarre}
            onChangeText={(text) => searchFilter(text)}
            value={filteredData}
            placeholder= "search"
          />
        </View>
      );
}

const styles = StyleSheet.create({
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