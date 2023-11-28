import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    username: 'Toji',
    age: 25,
    weight: 70,
    height: 175,
    gender: 'Male',
    goal: 'Gain Weight',
    equipment: 'Gym',
    profilePicture: require('../assets/logo.png'), // Replace with the actual path to your profile picture
  });

  const handleEditSave = () => {
    if (isEditMode) {
      // Save the edited data (e.g., update it in the state or send to server)
      // For now, we'll just toggle back to view mode
      setIsEditMode(false);
    } else {
      // Switch to edit mode
      setIsEditMode(true);
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
            <TextInput
              style={styles.infoValue}
              value={profileData.age.toString()}
              onChangeText={(text) => setProfileData({ ...profileData, age: parseInt(text) || 0 })}
            />
          ) : (
            <View style={styles.infoValueBar}>
              <Text style={styles.infoValue}>{profileData.age}</Text>
            </View>
          )}
        </View>
        <View style={styles.infoBar}>
          <Text style={styles.infoLabel}>Weight</Text>
          {isEditMode ? (
            <TextInput
              style={styles.infoValue}
              value={profileData.weight.toString()}
              onChangeText={(text) => setProfileData({ ...profileData, weight: parseInt(text) || 0 })}
            />
          ) : (
            <View style={styles.infoValueBar}>
              <Text style={styles.infoValue}>{profileData.weight} kg</Text>
            </View>
          )}
        </View>
        <View style={styles.infoBar}>
          <Text style={styles.infoLabel}>Height</Text>
          {isEditMode ? (
            <TextInput
              style={styles.infoValue}
              value={profileData.height.toString()}
              onChangeText={(text) => setProfileData({ ...profileData, height: parseInt(text) || 0 })}
            />
          ) : (
            <View style={styles.infoValueBar}>
              <Text style={styles.infoValue}>{profileData.height} cm</Text>
            </View>
          )}
        </View>
        <View style={styles.infoBar}>
          <Text style={styles.infoLabel}>Gender</Text>
          {isEditMode ? (
            <TextInput
              style={styles.infoValue}
              value={profileData.gender}
              onChangeText={(text) => setProfileData({ ...profileData, gender: text })}
            />
          ) : (
            <View style={styles.infoValueBar}>
              <Text style={styles.infoValue}>{profileData.gender}</Text>
            </View>
          )}
        </View>
        <View style={styles.infoBar}>
          <Text style={styles.infoLabel}>Goal</Text>
          {isEditMode ? (
            <TextInput
              style={styles.infoValue}
              value={profileData.goal}
              onChangeText={(text) => setProfileData({ ...profileData, goal: text })}
            />
          ) : (
            <View style={styles.infoValueBar}>
              <Text style={styles.infoValue}>{profileData.goal}</Text>
            </View>
          )}
        </View>
        <View style={styles.infoBar}>
          <Text style={styles.infoLabel}>Equipment</Text>
          {isEditMode ? (
            <TextInput
              style={styles.infoValue}
              value={profileData.equipment}
              onChangeText={(text) => setProfileData({ ...profileData, equipment: text })}
            />
          ) : (
            <View style={styles.infoValueBar}>
              <Text style={styles.infoValue}>{profileData.equipment}</Text>
            </View>
          )}
        </View>
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
    height: 20,
    borderRadius: 10,
    marginTop: 5,
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
});

export default ProfileScreen;
 