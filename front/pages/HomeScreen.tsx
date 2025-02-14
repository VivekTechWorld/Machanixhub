import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationProps } from '../src/navigationTypes';

const HomeScreen: React.FC<NavigationProps<'Home'>> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to MechanixHub!</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
