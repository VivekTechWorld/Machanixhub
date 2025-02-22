import React from 'react';
import { NavigationContainer,LinkingOptions  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './pages/LoginScreen';
import HomeScreen from './pages/HomeScreen';
import AfLogin from './pages/AfLogin';
import Register from './pages/Register';
import ForgetPasswordScreen from './pages/ForgetPassword';
import ResetPasswordScreen from './pages/ResetPassword';
import { RootStackParamList } from './src/navigationTypes';

const Stack = createStackNavigator<RootStackParamList>();

// Configure Deep Linking
const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['mechanixhub://', 'resetpassword/${token}'], // Adjust according to your app's domain
  config: {
    screens: {
      Login: 'login',
      Home: 'home',
      AfLogin: 'aflogin',
      Register: 'register',
      ForgetPassword: 'forgetpassword',
      // ResetPasswordScreen: 'resetpassword/:token', // Capture token from URL
      ResetPasswordScreen: {
        path: 'resetpassword/:token',  // Capture token
        parse: {
          token: (token: string) => token,
          userType: (userType: string) => userType, // Capture userType from query params
        },
      },
    },
  },
};


export default function App() {
  return (
    <NavigationContainer linking={linking} fallback={'Login'}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AfLogin" component={AfLogin} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}