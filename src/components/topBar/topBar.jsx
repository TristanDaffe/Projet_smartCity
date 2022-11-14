import React from "react";
import { Text, View, StyleSheet, Pressable, Animated, Easing } from 'react-native';

export default function TopBar (props) {   
    let rotateValueHolder = new Animated.Value(0);
    
    const startImageRotationFunction = () => {
        rotateValueHolder.setValue(0)
        Animated.timing(rotateValueHolder, {
            totValue: 1,
            duration: 10000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start( () => startImageRotationFunction())};

    const rotateData = rotateValueHolder.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.text}>Croix rouge  </Text>
                <Pressable onPress={startImageRotationFunction}>
                <Animated.Image 
                    style={[styles.image, {transform: [{rotate: rotateData}]}]} 
                    source={require('../../images/logo_croix_rouge.png')} 
                />
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection : 'row',
        padding: 10,
        backgroundColor: 'white',
        alignItems: 'flex-start',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',

        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    image: {
        width: 50,
        height: 50,
    },
});