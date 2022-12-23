import 'react-native-gesture-handler';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DrawerStack from './drawerStack';
import Account from '../screens/account';
import Type from '../screens/type';
import Center from '../screens/center';
import Calendar from '../screens/calendar';
import RecapAppointment from '../screens/recapAppointment';
import userAppointment from '../screens/userAppointment';

const Stack = createNativeStackNavigator();

// screens pour la navigation dans l'application
// le drawer, la page du compte et toute les autres pages qui en découleraient
export default function AppStack(props){
    return (
        <Stack.Navigator screenOptions={{ 
            headerShown: false,
            drawerActiveBackgroundColor: 'red',
            drawerActiveTintColor: 'white',
        }}>
            <Stack.Screen name="DrawerStack" component={DrawerStack} />
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="Type" component={Type} />
            <Stack.Screen name="Center" component={Center} />
            <Stack.Screen name="Calendar" component={Calendar} />
            <Stack.Screen name="RecapAppointment" component={RecapAppointment} />
            <Stack.Screen name="userAppointment" component={userAppointment} />
        </Stack.Navigator>
    )
}