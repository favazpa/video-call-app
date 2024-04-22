import React from 'react';
import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {StyleSheet, View} from 'react-native';
import {goBack} from '../navigation/NavigationService';

export default function VideoCallingScreen({route}) {
  const {email, callingId} = route.params;

  console.log('email', email);
  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltCall
        appID={906329135}
        appSign={
          '0d24039375d1752a8503e748e873afe34311ece909db38d6c7a3e26a915a0cd9'
        }
        userID={email} // userID can be something like a phone number or the user id on your own user system.
        userName={email}
        callID={callingId} // callID can be any unique string.
        config={{
          // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
          ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
          onOnlySelfInRoom: () => {
            // props.navigation.navigate('HomePage');
            goBack();
          },
          onHangUp: () => {
            goBack();
            // props.navigation.navigate('HomePage');
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
