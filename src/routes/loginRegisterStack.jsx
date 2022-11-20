import 'react-native-gesture-handler';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const Stack = createNativeStackNavigator();
// screens pour se connecter et créer un compte

export default function LoginRegisterStack(props){
    return (
        <Stack.Navigator screenOptions={{ 
            headerShown: false,
            drawerActiveBackgroundColor: 'red',
            drawerActiveTintColor: 'white',
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    )
}

