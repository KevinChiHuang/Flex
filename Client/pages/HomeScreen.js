// HomeScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { useIsFocused } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const focused = useIsFocused();
  const [workOutInfo, setWorkOutInfo] = useState({
    kcalBurns: null,
    duration: null,
    workoutNumber: null,
  });


  const getProfileData = () => {
    var userId;
    SecureStore.getItemAsync('user_id').then(user_id => {
      userId = user_id;

      const User = {
        user_id: userId,
      }
      axios.post('http://142.3.179.23:2000/profile', User).then(response => {
        //we are initializig profile data to the data we have stored for the user in back end through our endpoint via post
        setWorkOutInfo(prev => ({
          kcalBurns: response.data.userProfile.kcalBurns,
          duration: response.data.userProfile.duration,
          workoutNumber: response.data.userProfile.workoutNumber,
        }))
      })
    })
  }

  const [hatColor, setHatColor] = useState('bronze');

 useEffect(() => {
    console.log('triggered');
    getProfileData();

    if (workOutInfo.workoutNumber < 5) {
      setHatColor('bronze');
    } else if (workOutInfo.workoutNumber <= 10) {
      setHatColor('silver');
    } else {
      setHatColor('gold');
    }
  }, [focused])

  const workouts = [
    {
      title: 'High-Intensity Interval Training (HIIT)',
      duration: 25,
      kcalBurns: 350,
      details: `
        High-Intensity Interval Training (HIIT) is a cardiovascular exercise strategy alternating between short bursts of intense anaerobic exercise and less intense recovery periods.
        This workout involves rapid, challenging movements that elevate your heart rate and boost calorie burn.
      `,
      gif: 'https://media1.tenor.com/m/9fUhv3K31_AAAAAC/liift-hiit.gif',
      tag: 'home',
    },
    {
      title: 'Full Body Strength Training',
      duration: 50,
      kcalBurns: 450,
      details: `
        Full Body Strength Training is a comprehensive workout targeting major muscle groups in the body. It involves exercises like squats, deadlifts, and bench presses.
        This workout helps build muscle strength and endurance.
      `,
      gif: 'https://media1.tenor.com/m/6ZBrZmAYv8gAAAAC/deadlift-workout.gif',
      tag: 'gym',
    },
    {
      title: 'Yoga Flow',
      duration: 45,
      kcalBurns: 300,
      details: `
        Yoga Flow is a gentle yet effective workout that combines various yoga poses and sequences.
        It focuses on flexibility, balance, and relaxation, making it suitable for all fitness levels.
      `,
      gif: 'https://media1.tenor.com/m/8hv0a97NkX0AAAAC/krystel-hendrikse-krystel.gif',
      tag: 'home',
    },
    {
      title: 'Circuit Training',
      duration: 35,
      kcalBurns: 400,
      details: `
        Circuit Training involves a series of exercises targeting different muscle groups with minimal rest between sets.
        It provides a full-body workout, improves cardiovascular health, and enhances endurance.
      `,
      gif: 'https://media1.tenor.com/m/vQESpWA6A4UAAAAC/workout-jonas-brothers-olympic-dreams.gif',
      tag: 'gym',
    },
    {
      title: 'Running Intervals',
      duration: 30,
      kcalBurns: 250,
      details: `
        Running Intervals alternates between periods of sprinting and jogging.
        It's an excellent cardio workout, promoting fat burn and boosting overall cardiovascular fitness.
      `,
      gif: 'https://media1.tenor.com/m/QXSgKyaBrjAAAAAd/running-inter-miami-cf.gif',
      tag: 'gym',
    },
    {
      title: 'Bodyweight Cardio Blast',
      duration: 15,
      kcalBurns: 200,
      details: `
        Bodyweight Cardio Blast is a high-energy workout that requires no equipment.
        It includes exercises like jumping jacks, burpees, and mountain climbers to get your heart pumping.
      `,
      gif: 'https://media1.tenor.com/m/gI-8qCUEko8AAAAC/pushup.gif',
      tag: 'home',
    },
    {
      title: 'Dumbbell Strength Training',
      duration: 45,
      kcalBurns: 400,
      details: `
        Dumbbell Strength Training focuses on building muscle using dumbbells.
        Perform exercises like dumbbell squats, lunges, and bicep curls for a full-body workout.
      `,
      gif: 'https://media1.tenor.com/m/y_Z2oZ35sP8AAAAd/skull-crusher-dumbells.gif',
      tag: 'gym',
    },
    {
      title: 'Yoga for Flexibility',
      duration: 40,
      kcalBurns: 300,
      details: `
        Yoga for Flexibility is a gentle workout that enhances flexibility and promotes relaxation.
        Follow a sequence of yoga poses to improve your overall range of motion.
      `,
      gif: 'https://media1.tenor.com/m/HASljMHa9YIAAAAC/krystel-hendrikse-krystel.gif',
      tag: 'home',
      
    },
    {
      title: 'Barbell Powerlifting',
      duration: 55,
      kcalBurns: 500,
      details: `
        Barbell Powerlifting is a strength-focused workout using a barbell.
        Lift heavy with exercises like squats, deadlifts, and bench presses for maximum muscle engagement.
      `,
      gif: 'https://media1.tenor.com/m/KYKOBIILxlgAAAAd/carry-the-weight-mattie-rogers.gif',
      tag: 'gym',
    },
    {
      title: 'Jump Rope Cardio',
      duration: 20,
      kcalBurns: 150,
      details: `
        Jump Rope Cardio is a quick and effective cardio workout using a jump rope.
        It improves coordination and burns calories in a short amount of time.
      `,
      gif: 'https://media1.tenor.com/m/ngRFgZOHi8UAAAAd/jump-rope-jordan-preisinger.gif',
      tag: 'home',
    },
    {
      title: 'Kettlebell Circuit',
      duration: 30,
      kcalBurns: 300,
      details: `
        Kettlebell Circuit involves dynamic exercises with a kettlebell, targeting multiple muscle groups.
        It provides a full-body workout and enhances both strength and cardiovascular fitness.
      `,
      gif: 'https://media1.tenor.com/m/afX3K-ukaLgAAAAd/lifting-kettlebell-jordan-preisinger.gif',
      tag: 'gym',
    },
];

  const navigateToWorkoutDetails = (workout) => {
    navigation.navigate('WorkoutDetails', workout);
  };

  const filteredWorkouts = selectedFilter === 'all' ? workouts : workouts.filter(workout => workout.tag === selectedFilter);

  return (
    <View style={styles.container}>
      <View style={styles.profileIcon}>
        <Image
          source={require('../assets/logo.png')} // Replace with the actual user profile image
          style={styles.profileImage}
        />
       <Text style={styles.userName}>
          Welcome Flexies!{' '}
          <Icon
            name="hat-wizard"
            size={20}
            color={
              hatColor === 'bronze'
                ? '#cd7f32' // Bronze color
                : hatColor === 'silver'
                ? '#C0C0C0' // Silver color
                : hatColor === 'gold'
                ? 'gold' // Gold color
                : 'black' // Default color (change as needed)
            }
          />
        </Text>

      </View>
      <View style={styles.trackerContainer}>
        <View style={styles.tracker}>
          <Text style={styles.trackerLabel}>Kcal Burned</Text>
          <Text style={styles.trackerValue}>{workOutInfo.kcalBurns}</Text>
        </View>
        <View style={styles.tracker}>
          <Text style={styles.trackerLabel}>Minutes</Text>
          <Text style={styles.trackerValue}>{workOutInfo.duration}</Text>
        </View>
        <View style={styles.tracker}>
          <Text style={styles.trackerLabel}>Workouts</Text>
          <Text style={styles.trackerValue}>{workOutInfo.workoutNumber}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.filterButtons}>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'all' && styles.selectedFilter]}
            onPress={() => setSelectedFilter('all')}
          >
            <Text style={styles.buttonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'home' && styles.selectedFilter]}
            onPress={() => setSelectedFilter('home')}
          >
            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'gym' && styles.selectedFilter]}
            onPress={() => setSelectedFilter('gym')}
          >
            <Text style={styles.buttonText}>Gym</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Recommended Workouts</Text>
        {filteredWorkouts.map((workout, index) => (
          <TouchableOpacity
            key={index}
            style={styles.recommendedWorkoutCard}
            onPress={() => navigateToWorkoutDetails(workout)}
          >
            <Text style={styles.recommendedWorkoutTitle}>{workout.title}</Text>
            <Text style={styles.recommendedWorkoutDuration}>{workout.duration} Minutes</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.navigationContainer}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <View style={styles.separator}></View>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ProfileScreen')}>
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
    justifyContent: 'space-between',
  },
  scrollContainer: {
    flexGrow: 1,
    marginTop: 10,
  },
  profileIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: 40,
  },
  userName: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 40,
  },
  trackerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  tracker: {
    flex: 1,
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  trackerLabel: {
    color: 'white',
  },
  trackerValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recommendedWorkoutCard: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  recommendedWorkoutTitle: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recommendedWorkoutDuration: {
    color: 'white',
  },
  filterButtons: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  filterButton: {
    flex: 1,
    backgroundColor: '#555',
    padding: 8,
    borderRadius: 5,
    marginRight: 5,
  },
  selectedFilter: {
    backgroundColor: '#777', // or any color to indicate selection
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