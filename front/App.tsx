// import React, { useEffect, useState } from 'react';
// import { NavigationContainer,LinkingOptions  } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import LoginScreen from './pages/LoginScreen';
// import HomeScreen from './pages/HomeScreen';
// import AfLogin from './pages/AfLogin';
// import Register from './pages/Register';
// import ForgetPasswordScreen from './pages/ForgetPassword';
// import ResetPasswordScreen from './pages/ResetPassword';
// import VehicleOwnerHome from './pages/VehiclOwners/VehicleOwnerHome';
// import { RootStackParamList } from './src/navigationTypes';
// import { Text } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import MechanicHome from './pages/Mechanic/MechanicHome';
// const Stack = createStackNavigator<RootStackParamList>();

// // Configure Deep Linking
// const linking: LinkingOptions<RootStackParamList> = {
//   prefixes: ['mechanixhub://'], // Adjust according to your app's domain
//   config: {
//     screens: {
//       Login: 'login',
//       Home: 'home',
//       AfLogin: 'aflogin',
//       Register: 'register',
//       ForgetPassword: 'forgetpassword',
//       // ResetPasswordScreen: 'resetpassword/:token', // Capture token from URL
//       ResetPasswordScreen: {
//         path: 'resetpassword/:token',  // Capture token
//         parse: {
//           token: (token: string) => token,
//           userType: (userType: string) => userType, // Capture userType from query params
//         },
//       },
//     },
//   },
// };


// export default function App() {

//   const [initialdRoute,setInitialRoute]=useState<null | string>(null); 


//   useEffect(()=>
//   {
//     let isMounted = true; // Prevents state update after unmount
//     const checkUser=async()=>
//     {
//       try 
//       {
//         const role=await AsyncStorage.getItem("userRole");
//         console.log("Retrieved user role:", role);

//         if (isMounted)
//         {
//           if(role==="Mechanic")
//             {
//               setInitialRoute("MechanicHome");
//             }
//             else if(role==="vehicleOwner")
//             {
//               setInitialRoute("VehicleOwnerHome");
//             }
//             else
//             {
//               setInitialRoute("AfLogin");
//             }
//         }
//       } catch (error) 
//       {
//         console.error("Error retrieving user role:", error);  
//         if (isMounted) {
//           setInitialRoute("AfLogin"); // Default if AsyncStorage fails
//         }
//       }
      

//     };
//     checkUser(); // ✅ Call the function inside useEffect
//     return () => { isMounted = false }; // Cleanup function
//   },[]);

//   return (
//     <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="AfLogin" component={AfLogin} />
//         <Stack.Screen name="Register" component={Register} />
//         <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
//         <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
//         <Stack.Screen name="VehicleOwnerHome" component={VehicleOwnerHome} />
//         <Stack.Screen name="MechanicHome" component={MechanicHome} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }



// import React, { useEffect, useState } from 'react';
// import { NavigationContainer,LinkingOptions  } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import LoginScreen from './pages/LoginScreen';
// import HomeScreen from './pages/HomeScreen';
// import AfLogin from './pages/AfLogin';
// import Register from './pages/Register';
// import ForgetPasswordScreen from './pages/ForgetPassword';
// import ResetPasswordScreen from './pages/ResetPassword';
// import VehicleOwnerHome from './pages/VehiclOwners/VehicleOwnerHome';
// import { RootStackParamList } from './src/navigationTypes';
// import { Text } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import MechanicHome from './pages/Mechanic/MechanicHome';
// const Stack = createStackNavigator<RootStackParamList>();

// // Configure Deep Linking
// const linking: LinkingOptions<RootStackParamList> = {
//   prefixes: ['mechanixhub://'], // Adjust according to your app's domain
//   config: {
//     screens: {
//       Login: 'login',
//       Home: 'home',
//       AfLogin: 'aflogin',
//       Register: 'register',
//       ForgetPassword: 'forgetpassword',
//       // ResetPasswordScreen: 'resetpassword/:token', // Capture token from URL
//       ResetPasswordScreen: {
//         path: 'resetpassword/:token',  // Capture token
//         parse: {
//           token: (token: string) => token,
//           userType: (userType: string) => userType, // Capture userType from query params
//         },
//       },
//     },
//   },
// };


// export default function App() {

//   const [initialdRoute,setInitialRoute]=useState<null | string>(null); 


//   useEffect(()=>
//   {
//     let isMounted = true; // Prevents state update after unmount
//     const checkUser=async()=>
//     {
//       try 
//       {
//         const role=await AsyncStorage.getItem("userRole");
//         console.log("Retrieved user role:", role);

//         if (isMounted)
//         {
//           if(role==="Mechanic")
//             {
//               setInitialRoute("MechanicHome");
//             }
//             else if(role==="vehicleOwner")
//             {
//               setInitialRoute("VehicleOwnerHome");
//             }
//             else
//             {
//               setInitialRoute("AfLogin");
//             }
//         }
//       } catch (error) 
//       {
//         console.error("Error retrieving user role:", error);  
//         if (isMounted) {
//           setInitialRoute("AfLogin"); // Default if AsyncStorage fails
//         }
//       }
      

//     };
//     checkUser(); // ✅ Call the function inside useEffect
//     return () => { isMounted = false }; // Cleanup function
//   },[]);

//   return (
//     <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="AfLogin" component={AfLogin} />
//         <Stack.Screen name="Register" component={Register} />
//         <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
//         <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
//         <Stack.Screen name="VehicleOwnerHome" component={VehicleOwnerHome} />
//         <Stack.Screen name="MechanicHome" component={MechanicHome} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }


// import React from "react";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { NavigationContainer } from "@react-navigation/native";
// import HomeScreen from "./screens/HomeScreen";
// import ProfileScreen from "./screens/ProfileScreen";

// type RootDrawerParamList = {
//   Home: undefined;
//   Profile: undefined;
// };

// const Drawer = createDrawerNavigator<RootDrawerParamList>();

// const App: React.FC = () => {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="Home">
//         <Drawer.Screen name="Home" component={HomeScreen} />
//         <Drawer.Screen name="Profile" component={ProfileScreen} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;




import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, LinkingOptions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native";

import LoginScreen from "./pages/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import AfLogin from "./pages/AfLogin";
import Register from "./pages/Register";
import ForgetPasswordScreen from "./pages/ForgetPassword";
import ResetPasswordScreen from "./pages/ResetPassword";
import VehicleOwnerHome from "./pages/VehiclOwners/VehicleOwnerHome";
import MechanicHome from "./pages/Mechanic/MechanicHome";
import MechanicProfileScreen from "./pages/Mechanic/MechanicProfileScreen";
// import mechanicProfileScreen from "./pages/Mechanic/EditProfile";
import ProfileScreen from "./pages/VehiclOwners/EditProfile";
import { RootStackParamList } from "./src/navigationTypes";
import SelectLocationScreen from "./pages/SelectLocationScreen"; // Import the location screen
import VehicleOwnerTabs from "./pages/navigation/VehicleOwnerTabs"; // Import the VehicleOwnerTabs screen
import MessagingScreen from "./pages/MessagingScreen"; // Import the Messaging screen
import MechanicTabs from "./pages/navigation/MechanicTabs";
import chatScreen from "./pages/ChatScreen"; // ✅ Ensure this exists
import SelectBooking from "./pages/VehiclOwners/SelectBooking";
import adminHOmeScreen from "./pages/admin/HomeScreen";
import adminVehicleOwnerScreen from "./pages/admin/VehicleOwnerScreen";
import VehicleOwnerProfileScreen from "./pages/admin/VehicleOwnerProfileScreen";
import MechanicScreen from "./pages/admin/MechanicScreen";
import adminMechanicProfileScreen from "./pages/admin/MechanicProfileScreen";
import ChatBotScreen from "./pages/ChatBotScreen";
import MechanicMessageScreen from "./pages/Mechanic/MechanicMessageScreen";
import MessagingScreenVehicleOwner from "./pages/MessagingScreenVehicleOwner";


const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ["mechanixhub://"],
  config: {
    screens: {
      Login: "login",
      Home: "home",
      AfLogin: "aflogin",
      Register: "register",
      ForgetPassword: "forgetpassword",
      ResetPasswordScreen: {
        path: "resetpassword/:token",
        parse: {
          token: (token: string) => token,
          userType: (userType: string) => userType,
        },
      },
    },
  },
};

const VehicleOwnerDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="VehicleOwnerTabs">
      <Drawer.Screen name="VehicleOwnerTabs" component={VehicleOwnerTabs} />
      <Drawer.Screen name="VehicleOwnerHome" component={VehicleOwnerHome} />
      <Drawer.Screen name="EditProfile" component={ProfileScreen} />
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Ai Support" component={ChatBotScreen} />
    </Drawer.Navigator>
  );
};

const MechanicOwnerDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="MechanicTabs">
      <Drawer.Screen name="MechanicTabs" component={MechanicTabs} />
      <Drawer.Screen name="MechanicHome" component={MechanicHome} />
      <Drawer.Screen name="Profile" component={MechanicProfileScreen} />
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="EditProfile" component={MechanicProfileScreen} />
      <Drawer.Screen name="Ai Support" component={ChatBotScreen} />
    </Drawer.Navigator>
  );
};

export default function App() {
  const [initialRoute, setInitialRoute] = useState<null | string>(null);

  useEffect(() => {
    let isMounted = true;
    const checkUser = async () => {
      try {
        const role = await AsyncStorage.getItem("userRole");
        console.log("Retrieved user role:", role);
  
        if (isMounted) {
          if (role === "Mechanic") {
            setInitialRoute("MechanicHome");
          } else if (role === "vehicleOwner") {
            setInitialRoute("VehicleOwnerDrawer");  // ✅ FIXED HERE
          } else {
            setInitialRoute("AfLogin");
          }
        }
      } catch (error) {
        console.error("Error retrieving user role:", error);
        if (isMounted) {
          setInitialRoute("AfLogin");
        }
      }
    };
    checkUser();
    return () => {
      isMounted = false;
    };
  }, []);
  

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AfLogin" component={AfLogin} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
        <Stack.Screen name="VehicleOwnerDrawer" component={VehicleOwnerDrawer} />
        {/* <Stack.Screen name="MechanicHome" component={MechanicHome} /> */}
        {/* <Stack.Screen name="VehicleOwnerHome" component={VehicleOwnerHome} /> */}
        <Stack.Screen name="MechanicOwnerDrawer" component={MechanicOwnerDrawer} />
        <Stack.Screen name="SelectLocationScreen" component={SelectLocationScreen} />
        <Stack.Screen name="VehicleOwnerTabs" component={VehicleOwnerTabs} />
        <Stack.Screen name="MechanicTabs" component={MechanicTabs} />     
        <Stack.Screen name="MessagingScreen" component={MessagingScreen} />
        <Stack.Screen name="chat" component={chatScreen}/> 
        <Stack.Screen name="MechanicMessageScreen" component={MechanicMessageScreen}/> 
        <Stack.Screen name="MessagingScreenVehicleOwner" component={MessagingScreenVehicleOwner}/> 
        <Stack.Screen name="SelectBooking" component={SelectBooking}/>
        <Stack.Screen name="adminpage" component={adminHOmeScreen}/>
        <Stack.Screen name="adminVehicleOwnerScreen" component={adminVehicleOwnerScreen}/>       
        <Stack.Screen name="adminVehicleOwnerProfileScreen" component={VehicleOwnerProfileScreen}/>    
        <Stack.Screen name="adminMechanicScreen" component={MechanicScreen}/>   
        <Stack.Screen name="adminMechanicOwnerProfileScreen" component={adminMechanicProfileScreen}/>   

      </Stack.Navigator>
    </NavigationContainer>
  );
}
