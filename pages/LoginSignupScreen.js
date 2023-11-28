import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const LoginSignupScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = () => {
    // Placeholder for login/signup logic
    console.log(isLogin ? 'Logging in...' : 'Signing up...');

    // For now, always navigate to HomeScreen after pressing "Sign Up"
    navigation.replace('HomeScreen');
  };

  const toggleLoginSignup = () => {
    setIsLogin(!isLogin);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>{'Flex Avail'}</Text>
        <TextInput placeholder="Username" style={styles.input} />
        <TextInput placeholder="Password" secureTextEntry={true} style={styles.input} />
        {!isLogin && (
          <TextInput placeholder="Confirm Password" secureTextEntry={true} style={styles.input} />
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
