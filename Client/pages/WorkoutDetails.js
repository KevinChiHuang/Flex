// In WorkoutDetailsScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const WorkoutDetailsScreen = ({ route, navigation }) => {
  const { title, duration, kcalBurns, details, gif } = route.params;

  // Dummy function to simulate workout completion
  const completeWorkout = () => {
    // In a real app, you would update the user's workout information in the database
    // For now, we'll just log a message
    console.log('Workout completed! Update user data in the database.');

    SecureStore.getItemAsync('user_id').then(user_id => {
      // Simulate updating workout data (replace this with actual logic)
      const updatedWorkoutData = {
        kcalBurns: kcalBurns,
        duration: duration, // Extract minutes from duration
        //workouts: 1, // Assuming the user completed one workout
        user_id: user_id
      };
      axios.post('http://142.3.179.23:2000/profile/updateWorkout', updatedWorkoutData);

      // Navigate back to HomeScreen and pass the updated data
      navigation.navigate('HomeScreen', updatedWorkoutData);
    });


  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.workoutTitle}>{title}</Text>
      <Text style={styles.workoutDescription}>
        {duration}
        {'\n\n'}
        Kcal Burned: {kcalBurns}
        {'\n\n'}
        Details: {details}
      </Text>

      <Image source={{ uri: gif }} style={styles.gif} />

      <TouchableOpacity
        style={styles.completeButton}
        onPress={completeWorkout}
      >
        <Text style={styles.completeButtonText}>Complete Workout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#555',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    top: 20,
    left: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 14,
  },
  workoutTitle: {
    color: 'white',
    fontSize: 24,
    marginBottom: 10,
  },
  workoutDescription: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  gif: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  completeButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  completeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WorkoutDetailsScreen;