import firestore from '@react-native-firebase/firestore';
export const fetchUsers = async () => {
  try {
    const users = await firestore().collection('Users').get();
    console.log('users data', users._docs);
    return users._docs;
  } catch (err) {
    console.log('errr', err);
  }
};
