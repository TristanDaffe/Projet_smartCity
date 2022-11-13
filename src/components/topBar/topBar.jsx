import React from "react";
import { Text, View, StyleSheet, Image } from 'react-native';

export default function TopBar (props) {   
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.text}>Croix rouge  </Text>
                <Image style={styles.image} source={require('../../images/logo_croix_rouge.png')} />
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