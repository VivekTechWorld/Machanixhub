// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image,Alert,Button} from 'react-native';
// // import { Ionicons } from '@expo/vector-icons';
// import { NavigationProps } from '../src/navigationTypes';
// import { API_URL } from '@env';
// import { GoogleSignin,SignInResponse } from '@react-native-google-signin/google-signin';
// import axios from 'axios';
// // Google Sign-In Config
// GoogleSignin.configure({
//   webClientId: '644191120627-jbjk7n6rfq9e63t9n1jjbmkbjprbqmot.apps.googleusercontent.com',  // Required for authentication
//   offlineAccess: true,
//   forceCodeForRefreshToken: true,
//   // androidClientId: '484796592785-5e5sr9f77rd74dei6evade1219ecf1ao.apps.googleusercontent.com' // Add this line
// });

// // Define the type for user information
// interface GoogleUserInfo {
//   id: string;
//   email: string;
//   name: string;
// }

//  const LoginScreen : React.FC<NavigationProps<'Login'>> = ({ navigation }) => {

//   // Function to handle Google Sign-In
//   const handleGoogleSignIn = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       const userInfo: SignInResponse  = await GoogleSignin.signIn();  // Explicitly typing userInfo

//       console.log("Google User Info:", userInfo);  // Debugging

//       // ✅ Correct way to access user details
//       // const { idToken } = userInfo; 

//       const { id, email, name } = userInfo.data?.user ?? {};  // Safely access properties

//       // Send user data to the backend
//       const response = await axios.post(`${API_URL}/api/users/register`, {
//         googleId: id,
//         email,
//         name,
//       });

//       if (response.data.success) {
//         Alert.alert("Login Successful!", `Welcome, ${name}`);
//         navigation.navigate('Home'); // Navigate to home after login
//       } else {
//         Alert.alert("Login Failed", "Please try again.");
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert("Error", "Something went wrong.");
//     }
//   };




//   return (
//     <View style={styles.container}>
//       {/* Logo */}
//       <Image source={require('../assets/logo.png')} style={styles.logo} />

//       {/* App Name */}
//       <Text style={styles.appName}>MechanixHub</Text>
//       <Text style={styles.subtitle}>Mobile Service</Text>

//        {/* Sign Up Navigation */}
//        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('AfLogin')}>
//         <Text style={styles.loginButtonText}>Login</Text>
//       </TouchableOpacity>

//        {/* Sign Up Navigation */}
//        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Register')}>
//         <Text style={styles.loginButtonText}>Dont't have account</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
// // ✅ **Styles**
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   logo: {
//     width: 120,
//     height: 120,
//     marginBottom: 10,
//   },
//   appName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#0a3d91',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: 'gray',
//     marginBottom: 30,
//   },
//   loginButton: {
//     backgroundColor: '#5a67f2',
//     paddingVertical: 12,
//     borderRadius: 30,
//     alignItems: 'center',
//     width: '80%',
//     marginBottom: 15,
//   },
//   loginButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   signUpText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   signUpLink: {
//     color: '#007BFF',
//     fontWeight: 'bold',
//     textDecorationLine: 'underline',
//   },
// });

// export default LoginScreen;


import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { NavigationProps } from '../src/navigationTypes';

const LoginScreen: React.FC<NavigationProps<'Login'>> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      {/* App Name */}
      <Text style={styles.appName}>MechanixHub</Text>
      <Text style={styles.subtitle}>Mobile Service</Text>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('AfLogin')}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Sign Up Navigation */}
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.loginButtonText}>Don't have an account?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 170,
    height: 200,
    marginBottom: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0a3d91',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: '#5a67f2',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    width: '80%',
    marginBottom: 15,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default LoginScreen;