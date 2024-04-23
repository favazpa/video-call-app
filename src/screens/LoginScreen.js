import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const handleLogin = async () => {
    if (email && password) {
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(email)) {
        setErrorMsg('That email address is invalid1!');
        return;
      } else {
        setErrorMsg('');
      }
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async () => {
          console.log('User account created & signed in!');

          const atIndex = email.indexOf('@');
          const userName = email.substring(0, atIndex);

          await firestore()
            .collection('Users')
            .add({
              email: email,
              userName,
            })
            .then(() => {
              console.log('User added!');
            })
            .catch(err => {
              console.log('error while adding user', err);
            });
        })
        .catch(async error => {
          console.log('error', error);
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            await auth()
              .signInWithEmailAndPassword(email, password)
              .then(() => {
                console.log('signed in sussessfully');
              })
              .catch(error => {
                console.log(error);
                setErrorMsg(
                  'Incorrect password, please contact admin for resetting',
                );
              });
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            setErrorMsg('That email address is invalid!');
          }

          if (error.code === 'auth/weak-password') {
            console.log('That password is weak,minimum 6 characters!');
            setErrorMsg('Your password is weak,minimum 6 characters!');
          }
        });
    } else if (!email) {
      setErrorMsg('Email is required!');
    } else if (!password) {
      setErrorMsg('Password is required!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginHeader}>LOGIN/SIGNUP</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor={'gray'}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor={'gray'}
          value={password}
          onChangeText={setPassword}
        />

        {errorMsg && <Text style={styles.errTxt}>{errorMsg}</Text>}
      </View>

      <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    gap: 20,
    paddingHorizontal: 16,
  },
  loginHeader: {
    fontSize: 20,
    color: 'black',
    fontWeight: '900',
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    color: 'black',
  },
  inputContainer: {
    gap: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '50%',
    height: 50,
    backgroundColor: 'cyan',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '400',
  },
  errTxt: {color: 'red', alignSelf: 'flex-start'},
});
