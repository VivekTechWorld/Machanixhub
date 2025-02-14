import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image,Alert,Button} from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import { NavigationProps } from '../src/navigationTypes';
import { API_URL } from '@env';
import { GoogleSignin,SignInResponse } from '@react-native-google-signin/google-signin';
import axios from 'axios';
// Google Sign-In Config
GoogleSignin.configure({
  webClientId: '644191120627-jbjk7n6rfq9e63t9n1jjbmkbjprbqmot.apps.googleusercontent.com',  // Required for authentication
  offlineAccess: true,
  forceCodeForRefreshToken: true,
  // androidClientId: '484796592785-5e5sr9f77rd74dei6evade1219ecf1ao.apps.googleusercontent.com' // Add this line
});

// Define the type for user information
interface GoogleUserInfo {
  id: string;
  email: string;
  name: string;
}

 const LoginScreen : React.FC<NavigationProps<'Login'>> = ({ navigation }) => {

  // Function to handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo: SignInResponse  = await GoogleSignin.signIn();  // Explicitly typing userInfo

      console.log("Google User Info:", userInfo);  // Debugging

      // ✅ Correct way to access user details
      // const { idToken } = userInfo; 

      const { id, email, name } = userInfo.data?.user ?? {};  // Safely access properties

      // Send user data to the backend
      const response = await axios.post(`${API_URL}/api/users/register`, {
        googleId: id,
        email,
        name,
      });

      if (response.data.success) {
        Alert.alert("Login Successful!", `Welcome, ${name}`);
        navigation.navigate('Home'); // Navigate to home after login
      } else {
        Alert.alert("Login Failed", "Please try again.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong.");
    }
  };




  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={ require('../assets/logo.png')} style={styles.logo} />

      {/* App Name */}
      <Text style={styles.appName}>MechanixHub</Text>
      <Text style={styles.subtitle}>Mobile Service</Text>

      {/* Sign Up Text */}
      <Text style={styles.signUpText}>Sign Up</Text>
      <Text style={styles.description}>Continue with Mail</Text>


    <TouchableOpacity  style={styles.mailButton} onPress={handleGoogleSignIn}>
        <Text style={styles.mailButtonText}>Continue with Google</Text>
      </TouchableOpacity>

    <TouchableOpacity 
      style={styles.vehicleButton} 
      onPress={() => navigation.navigate('Home')}>
      <Text style={styles.vehicleButtonText}>Sign as Vehicle Owner</Text>
    </TouchableOpacity>

    </View>
  );
};

// ✅ **Styles**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  appName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0a3d91',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 30,
  },
  signUpText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  mailButton: {
    flexDirection: 'row',
    backgroundColor: '#5a67f2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    width: '80%',
    justifyContent: 'center',
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  mailButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  vehicleButton: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '80%',
    alignItems: 'center',
  },
  vehicleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
}
);

export default LoginScreen;
