import React from 'react';
import { View, Text, Pressable, StyleSheet , Image, TextInput } from 'react-native';

export default function SearchBar() 
{
    const [text, onChangeText] = React.useState("Useless Text");
    const [number, onChangeNumber] = React.useState(null);  
    return (
        <View style={styles.searchBarre}>
        <Image source={require('../images/magnifyingGlassSearch.png')} style= {styles.imgSearchBarre}/>
          <TextInput style={styles.textSearchBarre}
            onChangeText={onChangeNumber}
            value={number}
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
    marginLeft: 50,
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