// HomeScreen.js
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState('all'); // 'all', 'home', 'gym'

  const workouts = [
    {
      title: 'High-Intensity Interval Training (HIIT)',
      duration: 30,
      kcalBurns: 300,
      details: `
        High-Intensity Interval Training (HIIT) is a cardiovascular exercise strategy alternating between short bursts of intense anaerobic exercise and less intense recovery periods.
        This workout involves rapid, challenging movements that elevate your heart rate and boost calorie burn.
      `,
      gif: 'https://cdn.discordapp.com/attachments/691700661271920642/1173906494543106089/caption.gif?ex=6565a89e&is=6553339e&hm=5bbedf43b13d8711cc4df3aa3cf74e7969ab5e4bd1cd83aa89db095a8b1a2e9c&',
      tag: 'home',
    },
    {
      title: 'Full Body Strength Training',
      duration: 45,
      kcalBurns: 400,
      details: `
        Full Body Strength Training is a comprehensive workout targeting major muscle groups in the body. It involves exercises like squats, deadlifts, and bench presses.
        This workout helps build muscle strength and endurance.
      `,
      gif: 'https://cdn.discordapp.com/attachments/691700661271920642/1173905780479627314/caption.gif?ex=6565a7f4&is=655332f4&hm=72eee50cd9d2378398c04efd1d7fbe938daaa22621cf08c378cd7fe63f4f32c3&',
      tag: 'gym',
    },
    {
      title: 'Yoga Flow',
      duration: 60,
      kcalBurns: 250,
      details: `
        Yoga Flow is a gentle yet effective workout that combines various yoga poses and sequences.
        It focuses on flexibility, balance, and relaxation, making it suitable for all fitness levels.
      `,
      gif: 'https://example.com/yoga-flow.gif',
      tag: 'home',
    },
    {
      title: 'Circuit Training',
      duration:  40,
      kcalBurns: 350,
      details: `
        Circuit Training involves a series of exercises targeting different muscle groups with minimal rest between sets.
        It provides a full-body workout, improves cardiovascular health, and enhances endurance.
      `,
      gif: 'https://example.com/circuit-training.gif',
      tag: 'gym',
    },
    {
      title: 'Running Intervals',
      duration: 20,
      kcalBurns: 200,
      details: `
        Running Intervals alternates between periods of sprinting and jogging.
        It's an excellent cardio workout, promoting fat burn and boosting overall cardiovascular fitness.
      `,
      gif: 'https://example.com/running-intervals.gif',
      tag: 'gym',
    },
    {
      title: 'Bodyweight Cardio Blast',
      duration: 20,
      kcalBurns: 250,
      details: `
        Bodyweight Cardio Blast is a high-energy workout that requires no equipment.
        It includes exercises like jumping jacks, burpees, and mountain climbers to get your heart pumping.
      `,
      gif: 'https://example.com/bodyweight-cardio.gif',
      tag: 'home',
    },
    {
      title: 'Dumbbell Strength Training',
      duration: 40,
      kcalBurns: 350,
      details: `
        Dumbbell Strength Training focuses on building muscle using dumbbells.
        Perform exercises like dumbbell squats, lunges, and bicep curls for a full-body workout.
      `,
      gif: 'https://example.com/dumbbell-strength.gif',
      tag: 'gym',
    },
    {
      title: 'Yoga for Flexibility',
      duration: 30,
      kcalBurns: 200,
      details: `
        Yoga for Flexibility is a gentle workout that enhances flexibility and promotes relaxation.
        Follow a sequence of yoga poses to improve your overall range of motion.
      `,
      gif: 'https://example.com/yoga-flexibility.gif',
      tag: 'home',
      tag2:'lose'
    },
    {
      title: 'Barbell Powerlifting',
      duration: 60,
      kcalBurns: 450,
      details: `
        Barbell Powerlifting is a strength-focused workout using a barbell.
        Lift heavy with exercises like squats, deadlifts, and bench presses for maximum muscle engagement.
      `,
      gif: 'https://example.com/barbell-powerlifting.gif',
      tag: 'gym',
    },
    // Add more workouts as needed
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
  Hello, Toji <Icon name="hat-wizard" size={20} color="gold" />
</Text>

      </View>
      <View style={styles.trackerContainer}>
        <View style={styles.tracker}>
          <Text style={styles.trackerLabel}>Kcal Burned</Text>
          <Text style={styles.trackerValue}>500</Text>
        </View>
        <View style={styles.tracker}>
          <Text style={styles.trackerLabel}>Minutes</Text>
          <Text style={styles.trackerValue}>45</Text>
        </View>
        <View style={styles.tracker}>
          <Text style={styles.trackerLabel}>Workouts</Text>
          <Text style={styles.trackerValue}>3</Text>
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
            <Text style={styles.recommendedWorkoutDuration}>{workout.duration}</Text>
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
