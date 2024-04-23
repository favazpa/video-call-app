import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fetchUsers} from '../services/api';
import ContactItem from '../components/ContactItem';
import auth from '@react-native-firebase/auth';

import * as ZIM from 'zego-zim-react-native';

import ZegoUIKitPrebuiltCallService, {
  ZegoMenuBarButtonName,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

import KeyCenter from '../../KeyCenter';

import {navigate} from '../navigation/NavigationService';
import {SCREENS} from '../navigation/Routes';

const HomeScreen = () => {
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const currentUser = auth().currentUser;

  useEffect(() => {
    getUsers();
    onUserLogin(currentUser?.email, currentUser?.email);
  }, []);

  const avatarBuilder = ({userInfo}) => {
    return (
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatarImage}
          resizeMode="cover"
          source={{uri: `https://robohash.org/${userInfo.userID}.png`}}
        />
      </View>
    );
  };

  const onUserLogin = async (userID, userName, props) => {
    return ZegoUIKitPrebuiltCallService.init(
      KeyCenter.appID,
      KeyCenter.appSign,
      userID,
      userName,
      [ZIM],
      {
        ringtoneConfig: {
          incomingCallFileName: 'zego_incoming.mp3',
          outgoingCallFileName: 'zego_outgoing.mp3',
        },
        androidNotificationConfig: {
          channelID: 'ZegoUIKit',
          channelName: 'ZegoUIKit',
        },
        avatarBuilder: avatarBuilder,
        requireConfig: data => {
          return {
            timingConfig: {
              isDurationVisible: true,
              onDurationUpdate: duration => {
                console.log(
                  '########CallWithInvitation onDurationUpdate',
                  duration,
                );
                if (duration === 10 * 60) {
                  ZegoUIKitPrebuiltCallService.hangUp();
                }
              },
            },
            topMenuBarConfig: {
              buttons: [ZegoMenuBarButtonName.minimizingButton],
            },
            onWindowMinimized: () => {
              console.log('[Demo]CallInvitation onWindowMinimized');
              navigate(SCREENS.HOME_TAB);
            },
            onWindowMaximized: () => {
              console.log('[Demo]CallInvitation onWindowMaximized');
              navigate('ZegoUIKitPrebuiltCallInCallScreen');
            },
          };
        },
      },
    );
  };
  const getUsers = async () => {
    try {
      setRefreshing(true);

      const usersList = await fetchUsers();
      usersList.sort((a, b) => {
        if (a?._data?.email?.toLowerCase() === currentUser?.email) {
          return -1;
        } else if (b?._data?.email?.toLowerCase() === currentUser?.email) {
          return 1;
        } else {
          return 0;
        }
      });
      setUsers(usersList);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const renderItem = ({item}) => {
    return <ContactItem email={item?._data.email?.toLowerCase()} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderItem}
        contentContainerStyle={{gap: 10}}
        ListFooterComponent={
          users.length <= 1 ? (
            <View style={styles.footerContainer}>
              <Text style={{color: 'gray'}}>
                No Contacts available, Please register them
              </Text>
            </View>
          ) : null
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getUsers} />
        }
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    gap: 16,
  },
  avatarContainer: {width: '100%', height: '100%'},
  avatarImage: {width: '100%', height: '100%'},
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
