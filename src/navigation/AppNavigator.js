// navigation/AuthNavigator.js

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREENS} from './Routes';
import HomeScreen from '../screens/HomeScreen';
import VideoCallingScreen from '../screens/VideoCallingScreen';

import * as ZIM from 'zego-zim-react-native';
import ZegoUIKitPrebuiltCallService, {
  ZegoCallInvitationDialog,
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen,
  ZegoSendCallInvitationButton,
  ZegoMenuBarButtonName,
  ZegoUIKitPrebuiltCallFloatingMinimizedView,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

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

      <Stack.Screen
        options={{headerShown: false}}
        // DO NOT change the name
        name="ZegoUIKitPrebuiltCallWaitingScreen"
        component={ZegoUIKitPrebuiltCallWaitingScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        // DO NOT change the name
        name="ZegoUIKitPrebuiltCallInCallScreen"
        component={ZegoUIKitPrebuiltCallInCallScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
