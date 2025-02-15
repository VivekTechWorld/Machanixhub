import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationProps } from '../src/navigationTypes';

const Register: React.FC<NavigationProps<'Register'>> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
      <Text style={styles.text}>Welcome to the Register Page!</Text>
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

export default Register;
