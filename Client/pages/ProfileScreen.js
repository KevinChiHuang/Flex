import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider'; // Import Slider from the correct package
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const ProfileScreen = ({ navigation }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    age: 0,
    weight: 0,
    height: 0,
    gender: 0,
    goal: 0,
    equipment: 0,
    user_id: null,
  });


  const getProfileData = () => {
    var userId;
    SecureStore.getItemAsync('user_id').then(user_id => {
      userId = user_id;


      const User = {

        user_id: userId,

      }

      axios.post('http://142.3.179.23:2000/profile', User).then(response => {
        console.log(response.data);
        setProfileData(prev => ({

          age: response.data.userProfile.age,
          weight: response.data.userProfile.weight,
          height: response.data.userProfile.height,
          gender: response.data.userProfile.gender,
          goal: response.data.userProfile.goal,
          equipment: response.data.userProfile.equipment,
          user_id: response.data.userProfile.user_id,

        }))


      })
    })

  }






  useEffect(() => {
    getProfileData();
    console.log(profileData);

  }, [])







  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      console.log('Token: ' + value);
      var info = jwtDecode(value);
      console.log(value);
      if (value !== null) {



      }
    } catch (e) {
      // error reading value
    }
  };
  getData();

  const handleEditSave = async () => {

    SecureStore.getItemAsync('token')
      .then((token) => {
        // Decode the JWT if needed
        console.log('Stored JWT:', token);
      })
      .catch((error) => {
        console.error('Error retrieving JWT:', error);
      });
    SecureStore.getItemAsync('user_id')
      .then((user_id) => {
        // Decode the JWT if needed
        setProfileData({ ...profileData, user_id: user_id });
        console.log('Stored user_id:', user_id);
      })
      .catch((error) => {
        console.error('Error retrieving user_id:', error);
      });
    try {
      if (isEditMode) {
        // Save the edited data to the backend
        const response = await axios.post('http://142.3.179.23:2000/profile/update', profileData);

        // Handle the response, e.g., show a success message
        console.log('Profile update response:', response.data);
        getProfileData();
      }

      // Toggle back to view mode
      setIsEditMode(!isEditMode);
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={profileData.profilePicture} style={styles.profileImage} />
        <Text style={styles.username}>{profileData.username}</Text>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={handleEditSave}>
        <Text style={styles.editButtonText}>{isEditMode ? 'Save' : 'Edit'}</Text>
      </TouchableOpacity>

      <View style={styles.infoBars}>
        <View style={styles.infoBar}>
          <Text style={styles.infoLabel}>Age</Text>
          {isEditMode ? (
            <View>
              <Slider
                style={{ width: '100%', marginTop: 5 }}
                value={profileData.age}
                minimumValue={0}
                maximumValue={100}
                step={1}
                onValueChange={(value) => setProfileData({ ...profileData, age: value })}
              />
              <Text style={styles.sliderValue}>{profileData.age}</Text>
            </View>
          ) : (
            <View style={styles.infoValueBar}>
              <Text style={styles.infoValue}>{profileData.age}</Text>
            </View>
          )}
        </View>

        <View style={styles.infoBar}>
          <Text style={styles.infoLabel}>Weight</Text>
          {isEditMode ? (
            <View>
              <Slider
                style={{ width: '100%', marginTop: 5 }}
                value={profileData.weight}
                minimumValue={0}
                maximumValue={100}
                step={1}
                onValueChange={(value) => setProfileData({ ...profileData, weight: value })}
              />
              <Text style={styles.sliderValue}>{profileData.weight} kg</Text>
            </View>
          ) : (
            <View style={styles.infoValueBar}>
              <Text style={styles.infoValue}>{profileData.weight} kg</Text>
            </View>
          )}
        </View>

        <View style={styles.infoBar}>
          <Text style={styles.infoLabel}>Height</Text>
          {isEditMode ? (
            <View>
              <Slider
                style={{ width: '100%', marginTop: 5 }}
                value={profileData.height}
                minimumValue={0}
                maximumValue={250}
                step={1}
                onValueChange={(value) => setProfileData({ ...profileData, height: value })}
              />
              <Text style={styles.sliderValue}>{profileData.height} cm</Text>
            </View>
          ) : (
            <View style={styles.infoValueBar}>
              <Text style={styles.infoValue}>{profileData.height} cm</Text>
            </View>
          )}
        </View>

        <View style={styles.infoBar}>
          <Text style={styles.infoLabel}>Gender</Text>
          {isEditMode ? (
            <View>
              <Slider
                style={{ width: '100%', marginTop: 5 }}
                value={profileData.gender} // Assuming 'Male' is the default
                minimumValue={0}
                maximumValue={1}
                step={1}
                onValueChange={(value) =>
                  setProfileData({...profileData, gender: value })
                }
              />
              <Text style={styles.sliderValue}>{profileData.gender === 0 ? 'male' : 'female'}</Text>
            </View>
          ) : (
            <View style={styles.infoValueBar}>
              <Text style={styles.infoValue}>{profileData.gender === 0 ? 'male' : 'female'}</Text>
            </View>
          )}
        </View>

        <View style={styles.infoBar}>
          <Text style={styles.infoLabel}>Goal</Text>
          {isEditMode ? (
            <View>
              <Slider
                style={{ width: '100%', marginTop: 5 }}
                value={profileData.goal} // Assuming 'Gain Weight' is the default
                minimumValue={0}
                maximumValue={1}
                step={1}
                onValueChange={(value) =>
                  setProfileData({ ...profileData, goal: value})
                }
              />
              <Text style={styles.sliderValue}>{profileData.goal === 0 ? 'Gain Weight' : 'Lose Weight' }</Text>
            </View>
          ) : (
            <View style={styles.infoValueBar}>
              <Text style={styles.infoValue}>{profileData.goal === 0 ? 'Gain Weight' : 'Lose Weight' }</Text>
            </View>
          )}
        </View>

        <View style={styles.infoBar}>
          <Text style={styles.infoLabel}>Equipment</Text>
          {isEditMode ? (
            <View>
              <Slider
                style={{ width: '100%', marginTop: 5 }}
                value={profileData.equipment === 'Gym' ? 0 : 1} // Assuming 'Gym' is the default
                minimumValue={0}
                maximumValue={1}
                step={1}
                onValueChange={(value) =>
                  setProfileData({ ...profileData, equipment: value })
                }
              />
              <Text style={styles.sliderValue}>{profileData.equipment=== 0 ? 'Gym' : 'Home' }</Text>
            </View>
          ) : (
            <View style={styles.infoValueBar}>
              <Text style={styles.infoValue}>{profileData.equipment=== 0 ? 'Gym' : 'Home' }</Text>
            </View>
          )}
        </View>

        {/* ... Other info bars */}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Main')}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.navigationContainer}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <View style={styles.separator}></View>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ProfileScreen')}>
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#555',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  editButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  username: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
  },
  infoBars: {
    marginTop: 20,
  },
  infoBar: {
    marginBottom: 10,
  },
  infoLabel: {
    color: 'white',
    fontSize: 16,
  },
  infoValueBar: {
    backgroundColor: '#555',
    height: 25,
    borderRadius: 20,
    marginTop: 10,
  },
  infoValue: {
    color: 'white',
    textAlign: 'center',
    lineHeight: 20,
  },
  logoutButton: {
    backgroundColor: '#555',
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  separator: {
    width: 10,
  },
  navButton: {
    flex: 1,
    backgroundColor: '#555',
    padding: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sliderValue: {
    color: 'white', // Set the text color to white
    textAlign: 'center',
    marginTop: 0,
  },
});

export default ProfileScreen;
