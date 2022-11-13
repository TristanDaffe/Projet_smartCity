import 'react-native-gesture-handler';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DrawerStack from './drawerStack';
import Account from '../screens/account';

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
        </Stack.Navigator>
    )
}