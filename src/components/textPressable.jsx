import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';


export default function textPressable({text}) 
{
    return (
        <View>
            <Pressable>     
                <Text style={styles.text}>{text}</Text>
            </Pressable>
        </View>
      );
}

const styles = StyleSheet.create({
    text: {
      color: 'red',
      fontWeight: 'bold',
}})