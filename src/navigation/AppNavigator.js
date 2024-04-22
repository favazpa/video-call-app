// navigation/AuthNavigator.js

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREENS} from './Routes';
import HomeScreen from '../screens/HomeScreen';
import VideoCallingScreen from '../screens/VideoCallingScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={SCREENS.HOME}>
      <Stack.Screen
        options={{
          title: 'Choose contact to call',
          //   headerShown: false,
        }}
        name={SCREENS.HOME}
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          //   title: 'Choose contact to call',
          headerShown: false,
        }}
        name={SCREENS.VIDEO_CALL}
        component={VideoCallingScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
