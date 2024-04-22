import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fetchUsers} from '../services/api';
import ContactItem from '../components/ContactItem';
import auth from '@react-native-firebase/auth';

const HomeScreen = () => {
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    try {
      setRefreshing(true);
      const currentUser = auth().currentUser;
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
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
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
});
