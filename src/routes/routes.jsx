import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import AppStack from './appStack';
import Login from '../screens/loginAccount';
import Register from '../screens/createAccount';

import { AuthContext } from '../context/authContext';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const { user } = React.useContext(AuthContext);

    return (      
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false,}}>
          {/* le gestion des écrans se fait via si un user est login ou pas */}
          {user.login ? (
            <>
            {/* si user login alors on affiche le drawer */}
              <Stack.Screen name="AppStack" component={AppStack} />
            </>
            ) : (
            <>
            {/* sinon on affiche les écrans de login et register */}
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      );
}