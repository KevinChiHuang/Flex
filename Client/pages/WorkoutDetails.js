// In WorkoutDetailsScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const WorkoutDetailsScreen = ({ route, navigation }) => {
  const { title, duration, kcalBurns, details, gif } = route.params;

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
});

export default WorkoutDetailsScreen;
