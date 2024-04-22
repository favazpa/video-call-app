import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {navigate} from '../navigation/NavigationService';
import {SCREENS} from '../navigation/Routes';
import {generateCallingID} from '../utils';
import {ZegoSendCallInvitationButton} from '@zegocloud/zego-uikit-prebuilt-call-rn';

const ContactItem = ({email}) => {
  const [userImage, setUserImage] = useState('https://randomuser.me/api/');
  const [isSelfUser, setIsSelfUser] = useState(false);
  const [invitees, setInvitees] = useState([]);

  useEffect(() => {
    const currentUser = auth().currentUser;
    setIsSelfUser(currentUser.email === email);
    setInvitees(email ? email.split(',') : []);
    fetchRandomUser();
  }, []);

  const fetchRandomUser = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/');
      const data = await response.json();
      const imageUrl = data.results[0].picture.large;
      setUserImage(imageUrl);
    } catch (error) {
      console.error('Error fetching random user:', error);
    }
  };

  return (
    <View style={{gap: 5}}>
      <TouchableOpacity
        onPress={async () => {
          const callingId = await generateCallingID();
          navigate(SCREENS.VIDEO_CALL, {email, callingId});
        }}
        disabled={isSelfUser}
        style={styles.contactContainer}>
        <Image source={{uri: userImage}} style={styles.avatar} />
        <Text style={{color: 'gray', fontSize: 14, fontWeight: '500'}}>
          {email}
        </Text>

        <View style={{flex: 1}}>
          {!isSelfUser ? (
            <View style={{alignSelf: 'flex-end'}}>
              <ZegoSendCallInvitationButton
                invitees={invitees.map(inviteeID => {
                  console.log('invite idddd', inviteeID);
                  return {userID: inviteeID, userName: inviteeID};
                })}
                isVideoCall={true}
              />
            </View>
          ) : (
            <Text
              style={{
                fontSize: 12,
                fontWeight: '600',
                color: 'red',
                alignSelf: 'flex-end',
                borderWidth: 1,
                padding: 4,
                borderColor: 'red',
                borderRadius: 4,
              }}>
              Self card
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ContactItem;

const styles = StyleSheet.create({
  contactContainer: {
    width: '100%',
    padding: 16,

    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: 'cyan',
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#97C1FF',
  },
});
