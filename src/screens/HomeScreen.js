import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {fetchUsers} from '../services/api';
import ContactItem from '../components/ContactItem';

const HomeScreen = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    const res = await fetchUsers();
    setUsers(res);
  };

  const renderItem = ({item}) => {
    return <ContactItem email={item._data.email.toLowerCase()} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderItem}
        contentContainerStyle={{gap: 10}}
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
