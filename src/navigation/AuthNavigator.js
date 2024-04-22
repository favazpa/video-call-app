import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREENS} from './Routes';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={SCREENS.LOGIN}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={SCREENS.LOGIN}
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
