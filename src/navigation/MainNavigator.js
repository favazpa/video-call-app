// navigation/MainNavigator.js
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import {Platform, StatusBar} from 'react-native';
import {isReadyRef, navigationRef} from './NavigationService';
import {SafeAreaView} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';

const MainNavigator = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(user) {
    console.log('user', user);
    setUser(user);
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
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default MainNavigator;
