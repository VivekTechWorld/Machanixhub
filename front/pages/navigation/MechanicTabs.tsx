// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   GestureResponderEvent,
// } from "react-native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import LinearGradient from "react-native-linear-gradient";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useNavigation } from "@react-navigation/native";
// import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

// // Import Screens
// import VehicleOwnerHome from "../VehiclOwners/VehicleOwnerHome";
// // import ProfileScreen from "../../screens/ProfileScreen";
// import ProfileScreen from "../VehiclOwners/vehicleOwnersProfile";
// import FindMechanicScreen from "../VehiclOwners/FindMechanicScreen";
// import BookingScreen from "../VehiclOwners/BookingScreen";
// import MessagingScreen from "../../pages/MessagingScreen";

// // Create Bottom Tab Navigator
// const Tab = createBottomTabNavigator();

// // ✅ Define the Type for Tab Screens
// type RootTabParamList = {
//   Home: undefined;
//   "Find Mechanic": undefined;
//   MessagingScreen: { senderId: string; receiverId: string };
//   Bookings: undefined;
//   Profile: undefined;
// };

// type NavigationProps = BottomTabNavigationProp<RootTabParamList>;

// interface FloatingTabButtonProps {
//     onPress: (event: GestureResponderEvent) => void;
//   }

// // ✅ Define `FloatingTabButton` Before `VehicleOwnerTabs`
// const FloatingTabButton: React.FC<FloatingTabButtonProps> = ({ onPress }) => {
//     return (
//       <TouchableOpacity
//         style={styles.fabContainer}
//         onPress={onPress} // ✅ Use the onPress prop
//         activeOpacity={0.7}
//       >
//         <LinearGradient colors={["#007bff", "#0056b3"]} style={styles.fab}>
//           <MaterialCommunityIcons name="message-text" color="white" size={32} />
//         </LinearGradient>
//       </TouchableOpacity>
//     );
//   };
  


// // ✅ Now define `VehicleOwnerTabs`
// const MechanicTabs = () => {

//     const navigation = useNavigation<NavigationProps>();

//   // ✅ Define handlePress in the correct scope
//   const handlePress = (event: GestureResponderEvent) => {
//     navigation.navigate("MessagingScreen", {
//       senderId: "65f0b2e5a1f8a1c2d3e4f5g6",
//       receiverId: "65f0b3e6b2f9b2d4e5f6g7h8",
//     });
//   };

  
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
//       <Tab.Navigator
//         initialRouteName="Home"
//         screenOptions={{
//           headerShown: false,
//           tabBarStyle: styles.tabBar,
//           tabBarLabelStyle: styles.tabLabel,
//           tabBarActiveTintColor: "#007bff",
//           tabBarInactiveTintColor: "Black",
//         }}
//       >
//         <Tab.Screen
//           name="Home"
//           component={VehicleOwnerHome}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <MaterialCommunityIcons name="home" color={color} size={size} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="Find Mechanic"
//           component={FindMechanicScreen}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <MaterialCommunityIcons name="wrench" color={color} size={size} />
//             ),
//           }}
//         />

//  {/* ✅ Pass handlePress as a prop */}
//         <Tab.Screen
//           name="MessagingScreen"
//           component={MessagingScreen}
//           options={{
//             tabBarButton: (props) => (
//               <FloatingTabButton {...props} onPress={handlePress} />
//             ),
//           }}
//         />

//         <Tab.Screen
//           name="Bookings"
//           component={BookingScreen}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <MaterialCommunityIcons name="calendar-check" color={color} size={size} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="Profile"
//           component={ProfileScreen}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <MaterialCommunityIcons name="account-circle" color={color} size={size} />
//             ),
//           }}
//         />
//       </Tab.Navigator>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   tabBar: {
//     backgroundColor: "rgba(255, 255, 255, 0.95)",
//     height: 75,
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//     elevation: 10,
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 6,
//     paddingBottom: 10,
//     paddingTop: 10,
//     position: "absolute",
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   fabContainer: {
//     top: -30,
//   },
//   fab: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.4,
//     shadowRadius: 6,
//   },
//   tabLabel: {
//     fontSize: 12,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
// });

// export default MechanicTabs;


// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   GestureResponderEvent,
// } from "react-native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import LinearGradient from "react-native-linear-gradient";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useNavigation } from "@react-navigation/native";
// import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

// // Import Screens
// import VehicleOwnerHome from "../VehiclOwners/VehicleOwnerHome";
// import ProfileScreen from "../VehiclOwners/vehicleOwnersProfile";
// import ApproveBookingScreen from "../Mechanic/ApproveBookingScreen"; // ✅ New screen
// import BookingScreen from "../VehiclOwners/BookingScreen";
// import MessagingScreen from "../../pages/MessagingScreen";

// // Create Bottom Tab Navigator
// const Tab = createBottomTabNavigator();

// // ✅ Define the Type for Tab Screens
// type RootTabParamList = {
//   Home: undefined;
//   "Approve Bookings": undefined;
//   MessagingScreen: { senderId: string; receiverId: string };
//   Bookings: undefined;
//   Profile: undefined;
// };

// type NavigationProps = BottomTabNavigationProp<RootTabParamList>;

// interface FloatingTabButtonProps {
//   onPress: (event: GestureResponderEvent) => void;
// }

// // ✅ Define `FloatingTabButton` Before `MechanicTabs`
// const FloatingTabButton: React.FC<FloatingTabButtonProps> = ({ onPress }) => {
//   return (
//     <TouchableOpacity
//       style={styles.fabContainer}
//       onPress={onPress} // ✅ Use the onPress prop
//       activeOpacity={0.7}
//     >
//       <LinearGradient colors={["#007bff", "#0056b3"]} style={styles.fab}>
//         <MaterialCommunityIcons name="message-text" color="white" size={32} />
//       </LinearGradient>
//     </TouchableOpacity>
//   );
// };

// // ✅ Now define `MechanicTabs`
// const MechanicTabs = () => {
//   const navigation = useNavigation<NavigationProps>();

//   // ✅ Define handlePress in the correct scope
//   const handlePress = (event: GestureResponderEvent) => {
//     navigation.navigate("MessagingScreen", {
//       senderId: "65f0b2e5a1f8a1c2d3e4f5g6",
//       receiverId: "65f0b3e6b2f9b2d4e5f6g7h8",
//     });
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
//       <Tab.Navigator
//         initialRouteName="Home"
//         screenOptions={{
//           headerShown: false,
//           tabBarStyle: styles.tabBar,
//           tabBarLabelStyle: styles.tabLabel,
//           tabBarActiveTintColor: "#007bff",
//           tabBarInactiveTintColor: "red",
//         }}
//       >
//         <Tab.Screen
//           name="Home"
//           component={VehicleOwnerHome}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <MaterialCommunityIcons name="home" color={color} size={size} />
//             ),
//           }}
//         />

//         {/* ✅ Replaced Find Mechanic with Approve Booking */}
//         <Tab.Screen
//           name="Approve Bookings"
//           component={ApproveBookingScreen}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <MaterialCommunityIcons name="check-circle" color={color} size={size} />
//             ),
//           }}
//         />

//         {/* ✅ Pass handlePress as a prop */}
//         <Tab.Screen
//           name="MessagingScreen"
//           component={MessagingScreen}
//           options={{
//             tabBarButton: (props) => (
//               <FloatingTabButton {...props} onPress={handlePress} />
//             ),
//           }}
//         />

//         <Tab.Screen
//           name="Bookings"
//           component={BookingScreen}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <MaterialCommunityIcons name="calendar-check" color={color} size={size} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="Profile"
//           component={ProfileScreen}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <MaterialCommunityIcons name="account-circle" color={color} size={size} />
//             ),
//           }}
//         />
//       </Tab.Navigator>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   tabBar: {
//     backgroundColor: "rgba(255, 255, 255, 0.95)",
//     height: 75,
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//     elevation: 10,
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 6,
//     paddingBottom: 10,
//     paddingTop: 10,
//     position: "absolute",
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   fabContainer: {
//     top: -30,
//   },
//   fab: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.4,
//     shadowRadius: 6,
//   },
//   tabLabel: {
//     fontSize: 12,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
// });

// export default MechanicTabs;

import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

// Import Screens
import MechanicHOme from "../Mechanic/MechanicHome";
import ProfileScreen from "../Mechanic/showProfile";
import ApproveBookingScreen from "../Mechanic/ApproveBookingScreen"; 
import BookingScreen from "../VehiclOwners/BookingScreen";
import MessagingScreen from "../../pages/MessagingScreen";

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// Define Tab Types
type RootTabParamList = {
  Home: undefined;
  "Approve Bookings": undefined;
  MessagingScreen: { senderId: string; receiverId: string };
  Bookings: undefined;
  Profile: undefined;
};

type NavigationProps = BottomTabNavigationProp<RootTabParamList>;

// Floating Message Button
const FloatingTabButton: React.FC<{ onPress: (event: GestureResponderEvent) => void }> = ({ onPress }) => (
  <TouchableOpacity style={styles.fab} onPress={onPress} activeOpacity={0.8}>
    <MaterialCommunityIcons name="message-text" color="white" size={32} />
  </TouchableOpacity>
);

// Mechanic Tabs
const MechanicTabs = () => {
  const navigation = useNavigation<NavigationProps>();

  // Handle Messaging Button Press
  const handlePress = () => {
    navigation.navigate("MessagingScreen", {
      senderId: "65f0b2e5a1f8a1c2d3e4f5g6",
      receiverId: "65f0b3e6b2f9b2d4e5f6g7h8",
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF3E0" }}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabLabel,
          tabBarActiveTintColor: "black", // Active Tab: Deep Red-Orange
          tabBarInactiveTintColor: "black", // Inactive Tab: Warm Orange
        }}
      >
        <Tab.Screen
          name="Home"
          component={MechanicHOme}
          options={{
            tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={size} />,
          }}
        />

        <Tab.Screen
          name="Approve Bookings"
          component={ApproveBookingScreen}
          options={{
            tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="check-circle" color={color} size={size} />,
          }}
        />

        <Tab.Screen
          name="MessagingScreen"
          component={MessagingScreen}
          options={{
            tabBarButton: (props) => <FloatingTabButton {...props} onPress={handlePress} />,
          }}
        />

        <Tab.Screen
          name="Bookings"
          component={BookingScreen}
          options={{
            tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="calendar-check" color={color} size={size} />,
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account-circle" color={color} size={size} />,
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#fa1111", // Warm Orange-Red Tab Background
    height: 65,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    shadowColor: "#D84315",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    paddingBottom: 10,
  },
  fab: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: "red", // Strong Red-Orange Floating Button
    justifyContent: "center",
    alignItems: "center",   
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    top: -30,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default MechanicTabs;
