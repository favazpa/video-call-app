import React from 'react';
import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {StyleSheet, View} from 'react-native';
import {navigate} from '../navigation/NavigationService';
import {SCREENS} from '../navigation/Routes';
import KeyCenter from '../../KeyCenter';

export default function VideoCallingScreen({route}) {
  const {email, callingId} = route.params;

  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltCall
        appID={KeyCenter.appID}
        appSign={KeyCenter.appSign}
        userID={email}
        userName={email}
        callID={callingId}
        config={{
          ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
          onOnlySelfInRoom: () => {
            navigate(SCREENS.HOME_TAB);
          },
          onHangUp: () => {
            navigate(SCREENS.HOME_TAB);
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
