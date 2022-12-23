import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from "react";
import { View, StyleSheet, Image, Text, Pressable, Button, Alert } from 'react-native';

import NotificationButton from './notificationButton'
import { AuthContext } from '../context/authContext';
import { DonationUserContext } from '../context/donationUserContext';

// mise en page du menu drawer de gauche
export default function CustomDrawer (props) {
    const { user, logout } = React.useContext(AuthContext);
    const {getLastDonationOfTypeOfUser} = React.useContext(DonationUserContext);

    function disconnectButton(){
        // ajouter la suppression du user actuel
        Alert.alert('Disconnect ?', '', [
            {text: 'Yes', onPress: () => logout()},
            {text: 'No'},
          ]);
    }

    return (
        <View style={styles.container}>

            <Pressable style={styles.content} 
                onPress={async() => {
                    await getLastDonationOfTypeOfUser(user.id)
                    props.navigation.navigate('AppStack', { screen: 'Account' })}
                }>
                <Image source={require('../images/user_account.png')} style={styles.image} />
                <Text style={styles.text}>{user.firstName} {user.lastName}</Text>
            </Pressable>

            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                
            </DrawerContentScrollView>

            <View style={styles.middleSection}>
                <NotificationButton />
            </View>

            
            <Pressable onPress={disconnectButton}>
                <View style={styles.disconnectButton}>
                    <Text style={styles.disconnectText}> Disconnect </Text>
                </View>
            </Pressable>
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
    },
    middleSection: {
        alignContent: 'center',
        paddingBottom: 100,
    },
    disconnectText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
        marginLeft: 10,
    },
    disconnectButton: {
        backgroundColor: 'red',
        margin: 20,
        padding: 10,
        borderRadius: 10,
    }
});    