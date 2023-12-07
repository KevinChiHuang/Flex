import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const LoginSignupScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');

  const data = {
    username: username,
    password: password,
  };


  const handleSubmit = () => {
    if (isLogin === true) {
      // Placeholder for login/signup logic
      console.log(isLogin ? 'Logging in...' : 'Signing up...');
      axios.post('http://142.3.179.23:2000/login', data)
        .then(response => {
          // Handle the response from the server
          console.log(response.data);
          if (response.data.status === 200) {
            //then save the token locally for later
            var token = response.data.token;
            var user_id = response.data.user_id;
            SecureStore.setItemAsync('token', token);
            SecureStore.setItemAsync('user_id', user_id);
          
            navigation.replace('HomeScreen');

          }
        })
        .catch(error => {
          // Handle errors
          console.error('Error:', error);
        });

      // For now, always navigate to HomeScreen after pressing "Sign Up"
      //navigation.replace('HomeScreen');
    }
    else{
      if(cpassword === password){
        axios.post('http://142.3.179.23:2000/signup', data).then(response =>{
          console.log(response.data)
          if(response.data.status === 200){
            const data = {
              user_id: response.data.user_id
            };
            axios.post('http://142.3.179.23:2000/profile/create', data).then(response =>{
              console.log(response.data)
            })
            setIsLogin(true);
          }
        })
      }
    }
  }


  const toggleLoginSignup = () => {
    setIsLogin(!isLogin);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>{'Flex Avail'}</Text>
        <TextInput placeholder="Username" value={username} onChangeText={(text) => setUsername(text)} style={styles.input} />
        <TextInput placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} style={styles.input} />
        {!isLogin && (
          <TextInput placeholder="Confirm Password" value={cpassword} onChangeText={(text) => setCpassword(text)} secureTextEntry={true} style={styles.input} />
        )}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.switchButton} onPress={toggleLoginSignup}>
          <Text style={styles.switchButtonText}>
            {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#555',
    width: '100%',
    padding: 15,
    marginBottom: 20,
    color: 'white',
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: '#555',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchButton: {
    marginTop: 10,
  },
  switchButtonText: {
    color: '#3498db', // Use a color that stands out
    fontSize: 14,
  },
});

export default LoginSignupScreen;