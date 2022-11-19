import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import AppStack from './appStack';
import LoginRegisterStack from './loginRegisterStack';

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (      
    <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ 
            headerShown: false,
        }}>
          <Stack.Screen name="LoginRegisterStack" component={LoginRegisterStack} />
          <Stack.Screen name="AppStack" component={AppStack} />
        </Stack.Navigator>
      </NavigationContainer>
      );
}