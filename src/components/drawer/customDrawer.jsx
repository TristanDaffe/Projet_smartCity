import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from "react";
import { View, StyleSheet, Image, Text, Pressable } from 'react-native';

// mise en page du menu drawer de gauche

export default function CustomDrawer (props) {
    return (
        <View style={styles.container}>

            <Pressable style={styles.content} onPress={() => props.navigation.navigate('Account')}>
                <Image source={require('../../images/user_account.png')} style={styles.image} />
                <Text style={styles.text}>Account</Text>
            </Pressable>

            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 5,
        borderColor: 'red',
    },
    content: {
        flexDirection : 'row',
        padding: 10,
        backgroundColor: 'red',
    },
    image: {
        width: 75,
        height: 75,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
        marginLeft: 10,
    }
});    