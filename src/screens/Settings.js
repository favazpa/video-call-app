import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn';
const Settings = () => {
  const currentUser = auth().currentUser;

  const onLogout = async () => {
    auth()
      .signOut()
      .then(() => {
        return ZegoUIKitPrebuiltCallService.uninit();
      });
  };
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.user}>USER</Text>
        <Text style={styles.email}>{currentUser.email}</Text>
      </View>

      <TouchableOpacity onPress={() => onLogout()} style={styles.btn}>
        <Text style={styles.btnTxt}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center', gap: 30},
  user: {fontSize: 16, color: 'gray', fontWeight: 'bold'},
  email: {fontSize: 16, color: 'black', fontWeight: 'bold'},
  btn: {
    width: '50%',
    borderRadius: 8,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  btnTxt: {fontSize: 16, color: 'white', fontWeight: 'bold'},
});
