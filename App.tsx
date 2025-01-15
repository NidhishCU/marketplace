/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useState } from 'react';
import sdk from './sdk';




function App(): React.JSX.Element {

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handelSingup=async()=>{
    try {
      const response = await sdk.currentUser.create({
        email:email,
  password: password,
  firstName: fname,
  lastName: lname,
      });
      console.log(`User created successfully! User ID: ${response.data}`);
    } catch (error) {
     console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.title}>Market</Text>
        <Text style={styles.title2}>Place!</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.sign}>Singup</Text>
        <TextInput
          mode='outlined'
          placeholder='First Name'
          value={fname}
          onChangeText={(text)=>setFname(text)}
          style={{ marginTop: 60, borderRadius: 20 }}
          theme={{ roundness: 20 }}
        />
        <TextInput
          mode='outlined'
          placeholder='Last Name'
          value={lname}
          onChangeText={(text)=>setLname(text)}
          style={{ marginTop: 15, borderRadius: 20 }}
          theme={{ roundness: 20 }}

        />
        <TextInput
          mode='outlined'
          placeholder='Email'
          value={email}
          onChangeText={(text)=>{setEmail(text)}}
          style={{ marginTop: 15, borderRadius: 20 }}
          theme={{ roundness: 20 }}
        />
        <TextInput
          mode='outlined'
          placeholder='Password'
          value={password}
          onChangeText={(text)=>{setPassword(text)}}
          style={{ marginTop: 15, borderRadius: 20 }}
          theme={{ roundness: 20 }}
        />
        <Button mode='contained' style={styles.btn} onPress={handelSingup}>
          Singup
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  head: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    alignSelf: 'center',
    marginTop: 100
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    fontStyle: 'italic'
  },
  title2: {
    fontSize: 25,
    fontWeight: '700',
    color: 'blue'
  },
  body: {
    flex: 5,
    backgroundColor: '#2467B3',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    padding: 15
  },
  sign: {
    alignSelf: 'center',
    fontSize: 25,
    color: '#fff',
    fontWeight: 900
  },
  btn: {
    marginTop: 20,
    backgroundColor: 'green',
    width: '50%',
    alignSelf: 'center',
  }
})


export default App;
