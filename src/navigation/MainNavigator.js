import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import {Platform, StatusBar} from 'react-native';
import {isReadyRef, navigationRef} from './NavigationService';
import {SafeAreaView} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';

import {
  ZegoCallInvitationDialog,
  ZegoUIKitPrebuiltCallFloatingMinimizedView,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

const MainNavigator = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  function onAuthStateChanged(user) {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        animated={true}
        translucent
        backgroundColor={'white'}
        barStyle={Platform.OS === 'ios' ? 'light-content' : 'dark-content'}
      />

      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
        }}>
        <ZegoCallInvitationDialog />
        {user ? <AppNavigator /> : <AuthNavigator />}

        <ZegoUIKitPrebuiltCallFloatingMinimizedView />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default MainNavigator;
