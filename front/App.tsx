import React, { useEffect, useState } from 'react';
import { NavigationContainer,LinkingOptions  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './pages/LoginScreen';
import HomeScreen from './pages/HomeScreen';
import AfLogin from './pages/AfLogin';
import Register from './pages/Register';
import ForgetPasswordScreen from './pages/ForgetPassword';
import ResetPasswordScreen from './pages/ResetPassword';
import VehicleOwnerHome from './pages/VehiclOwners/VehicleOwnerHome';
import { RootStackParamList } from './src/navigationTypes';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MechanicHome from './pages/Mechanic/MechanicHome';
const Stack = createStackNavigator<RootStackParamList>();

// Configure Deep Linking
const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['mechanixhub://'], // Adjust according to your app's domain
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

  const [initialdRoute,setInitialRoute]=useState<null | string>(null); 


  useEffect(()=>
  {
    let isMounted = true; // Prevents state update after unmount
    const checkUser=async()=>
    {
      try 
      {
        const role=await AsyncStorage.getItem("userRole");
        console.log("Retrieved user role:", role);

        if (isMounted)
        {
          if(role==="Mechanic")
            {
              setInitialRoute("MechanicHome");
            }
            else if(role==="vehicleOwner")
            {
              setInitialRoute("VehicleOwnerHome");
            }
            else
            {
              setInitialRoute("AfLogin");
            }
        }
      } catch (error) 
      {
        console.error("Error retrieving user role:", error);  
        if (isMounted) {
          setInitialRoute("AfLogin"); // Default if AsyncStorage fails
        }
      }
      

    };
    checkUser(); // ✅ Call the function inside useEffect
    return () => { isMounted = false }; // Cleanup function
  },[]);

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AfLogin" component={AfLogin} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
        <Stack.Screen name="VehicleOwnerHome" component={VehicleOwnerHome} />
        <Stack.Screen name="MechanicHome" component={MechanicHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}