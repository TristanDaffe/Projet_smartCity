import { createDrawerNavigator } from '@react-navigation/drawer';
import React from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';

// les screens pour le drawer
import Appointment from '../../screens/appointment';
import Home from '../../screens/home';
import Stats from '../../screens/stats';
import Contact from '../../screens/contact';

import CustomDrawer from './customDrawer';

const Drawer = createDrawerNavigator();

// liste des drawers (liens) dans le menu

// contient leur nom, leur icone et leur lien vers un screen
// site pour les icons => https://ionic.io/ionicons

export default function DrawerMenu (props) {   
    return (
        <Drawer.Navigator 
            screenOptions={{ 
                headerShown: false,
                drawerActiveBackgroundColor: 'red',
                drawerActiveTintColor: 'white',
            }}
            drawerContent={props => <CustomDrawer {...props} />} >

            <Drawer.Screen name="Home" component={Home} 
                options={{
                    drawerIcon: ({color}) => (
                        <Ionicons name="home" color={color} size={24} />
                    )
            }}/>
            <Drawer.Screen name="Appointment" component={Appointment}
                options={{
                    drawerIcon: ({color}) => (
                        <Ionicons name="calendar-outline" color={color} size={24} />
                    )
            }}/>
            <Drawer.Screen name="Statistiques" component={Stats}
            options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="stats-chart-outline" color={color} size={24} />
                )
            }}/>
            <Drawer.Screen name="Contact us" component={Contact}
            options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="help-outline" color={color} size={24} />
                )
            }}/>
        </Drawer.Navigator>
    );
};
