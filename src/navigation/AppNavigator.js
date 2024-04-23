import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREENS} from './Routes';
import HomeScreen from '../screens/HomeScreen';
import VideoCallingScreen from '../screens/VideoCallingScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import CallHistory from '../screens/CallHistory';
import {Text} from 'react-native';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{tabBarIcon: () => <Text style={{color: 'black'}}>📞</Text>}}
        name={SCREENS.HOME_TAB}
        component={HomeScreen}
      />
      <Tab.Screen
        options={{tabBarIcon: () => <Text style={{color: 'black'}}>📝</Text>}}
        name={SCREENS.CALL_HISTORY}
        component={CallHistory}
      />
      {/* <Tab.Screen
        options={{tabBarIcon: () => <Text style={{color: 'black'}}>⚙️</Text>}}
        name={SCREENS.Settings}
        component={Settings}
      /> */}
    </Tab.Navigator>
  );
}

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={SCREENS.TABS} component={MyTabs} />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={SCREENS.VIDEO_CALL}
        component={VideoCallingScreen}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name={SCREENS.CALL_WAITING_SCREEN}
        component={ZegoUIKitPrebuiltCallWaitingScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={SCREENS.IN_CALL_SCREEN}
        component={ZegoUIKitPrebuiltCallInCallScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
