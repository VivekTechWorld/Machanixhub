import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationProps } from '../src/navigationTypes';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from 'react';



const HomeScreen: React.FC<NavigationProps<'Home'>> = ({ navigation }) => {
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        navigation.replace("AfLogin"); // Redirect if no token
      }
    };
    checkAuth();
  }, []);
  
  return (
    <View>
    <Text>Welcome to the Home Page!</Text>
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
