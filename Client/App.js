import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import { useState } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './pages/HomeScreen.js';
import ProfileScreen from './pages/ProfileScreen.js';
import LoginSignupScreen from './pages/LoginSignupScreen';
import WorkoutDetails from './pages/WorkoutDetails'; 

const Stack = createNativeStackNavigator();

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
            name="LoginSignupScreen"
            component={LoginSignupScreen}
            options={{ headerShown: false }}
          />
        <Stack.Screen component={Main} name = "Main" options={{headerShown: false}} />
        <Stack.Screen component={ProfileScreen} name="ProfileScreen" options={{ headerShown: false }} />
        <Stack.Screen component={WorkoutDetails} name="WorkoutDetails" options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const Main = ({navigation} ) => {
  return (
    
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000'
      }}>
       
    <View style={{marginTop: 90}}>
      <Text style= {{fontSize: 30, fontWeight: 'bold', color: '#ffffff'}}>Flex Avail</Text>
    </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={require('./assets/logo.png')}style={{width: 300, height: 300}} />
      </View>
    <TouchableOpacity onPress={()=> navigation.navigate('LoginSignupScreen')}
     style={{backgroundColor:'#AD40AF', padding:20, width:'90%', borderRadius: 5, flexDirection: 'row', justifyContent:'space-between', marginBottom: 70 }}>
      <Text style= {{color: '#ffffff'}}>Start Your Workout</Text>
      <MaterialIcons name="arrow-forward-ios" size = {22} color="#fff"></MaterialIcons>
    </TouchableOpacity>

    </SafeAreaView>
  );

};


export default App;