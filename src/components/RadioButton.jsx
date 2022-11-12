import React from 'react';
import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from 'react-native';


export default function RadioButton({ data }) 
{
    const [userOption, setUserOption] = useState(null);

    return (
        <View style={styles.button}>
          {data.map((item) => {
            return (
                <Pressable
                    style={ item.value === userOption ? styles.selected : styles.unselected}
                    onPress={() => setUserOption(item.value)}
                    key= {item.key}
                    >     
                    <Text style={styles.option}>{item.value}</Text>
                 </Pressable>
            );
          })}
        </View>
      );
}

const styles = StyleSheet.create({
  option: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    height: 30,
    width: 50,
    borderWidth: 3,
  },
  button: {
    flexDirection: 'row',
  },
  unselected: {
    backgroundColor: 'white',
  },
  selected: {
    backgroundColor: '#e90707',
  },
});