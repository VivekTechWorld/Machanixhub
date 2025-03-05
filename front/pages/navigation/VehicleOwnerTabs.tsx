// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet, Platform, GestureResponderEvent } from "react-native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { SafeAreaView } from "react-native-safe-area-context";

// // Import Screens
// import VehicleOwnerHome from "../VehiclOwners/VehicleOwnerHome";
// import ProfileScreen from "../../screens/ProfileScreen";
// import FindMechanicScreen from "../VehiclOwners/FindMechanicScreen";
// import BookingScreen from "../VehiclOwners/BookingScreen";

// // Create Bottom Tab Navigator
// const Tab = createBottomTabNavigator();

// interface FloatingTabButtonProps {
//   onPress: (event: GestureResponderEvent) => void;  // Ensure `onPress` is required
// }

// // Custom Floating Button
// const FloatingTabButton: React.FC<FloatingTabButtonProps> = ({ onPress }) => (
//   <TouchableOpacity style={styles.fab} onPress={onPress}>
//     <MaterialCommunityIcons name="plus" color="white" size={28} />
//   </TouchableOpacity>
// );

// // Custom Tab Label
// const CustomTabLabel: React.FC<{ label: string; color: string }> = ({ label, color }) => (
//   <Text style={{ fontSize: 12, fontWeight: "bold", color }}>{label}</Text>
// );

// const VehicleOwnerTabs = () => {
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
//       <Tab.Navigator
//         initialRouteName="Home"
//         screenOptions={{
//           headerShown: false,
//           tabBarStyle: styles.tabBar,
//           tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
//           tabBarActiveTintColor: "#007bff",
//           tabBarInactiveTintColor: "gray",
//         }}
//       >
//         <Tab.Screen
//           name="Home"
//           component={VehicleOwnerHome}
//           options={{
//             tabBarLabel: ({ color }) => <CustomTabLabel label="Home" color={color} />,
//             tabBarIcon: ({ color, size }) => (
//               <MaterialCommunityIcons name="home" color={color} size={size} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="Find Mechanic"
//           component={FindMechanicScreen}
//           options={{
//             tabBarLabel: ({ color }) => <CustomTabLabel label="Find Mechanic" color={color} />,
//             tabBarIcon: ({ color, size }) => (
//               <MaterialCommunityIcons name="wrench" color={color} size={size} />
//             ),
//           }}
//         />

//         {/* Center Floating Button */}
//         <Tab.Screen
//           name="FloatingButton"
//           component={VehicleOwnerHome}  // Placeholder, can be any screen
//           options={{
//             tabBarButton: (props) => (
//               <FloatingTabButton {...props} onPress={() => console.log("Floating Button Pressed")} />
//             ),
//           }}
//         />

//         <Tab.Screen
//           name="Bookings"
//           component={BookingScreen}
//           options={{
//             tabBarLabel: ({ color }) => <CustomTabLabel label="Bookings" color={color} />,
//             tabBarIcon: ({ color, size }) => (
//               <MaterialCommunityIcons name="calendar-check" color={color} size={size} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="Profile"
//           component={ProfileScreen}
//           options={{
//             tabBarLabel: ({ color }) => <CustomTabLabel label="Profile" color={color} />,
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
//     backgroundColor: "#fff",
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
//   fab: {
//     backgroundColor: "#007bff",
//     width: 65,
//     height: 65,
//     borderRadius: 35,
//     justifyContent: "center",
//     alignItems: "center",
//     position: "absolute",
//     bottom: Platform.OS === "android" ? 30 : 20,
//     alignSelf: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 5,
//   },
// });

// export default VehicleOwnerTabs;



// import React from "react";
// import { View } from "react-native";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// const TestIcon = () => {
//   return (
//     <View>
//       <MaterialCommunityIcons name="home" size={50} color="blue" />
//     </View>
//   );
// };

// export default TestIcon;

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

// Import Screens
import VehicleOwnerHome from "../VehiclOwners/VehicleOwnerHome";
import ProfileScreen from "../../screens/ProfileScreen";
import FindMechanicScreen from "../VehiclOwners/FindMechanicScreen";
import BookingScreen from "../VehiclOwners/BookingScreen";
import MessagingScreen from "../../pages/MessagingScreen";

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// ✅ Define the Type for Tab Screens
type RootTabParamList = {
  Home: undefined;
  "Find Mechanic": undefined;
  MessagingScreen: undefined;
  Bookings: undefined;
  Profile: undefined;
};

type NavigationProps = BottomTabNavigationProp<RootTabParamList>;

interface FloatingTabButtonProps {
    onPress: (event: GestureResponderEvent) => void;
  }

// ✅ Define `FloatingTabButton` Before `VehicleOwnerTabs`
const FloatingTabButton: React.FC<FloatingTabButtonProps> = ({ onPress }) => {
    return (
      <TouchableOpacity
        style={styles.fabContainer}
        onPress={onPress} // ✅ Use the onPress prop
        activeOpacity={0.7}
      >
        <LinearGradient colors={["#007bff", "#0056b3"]} style={styles.fab}>
          <MaterialCommunityIcons name="message-text" color="white" size={32} />
        </LinearGradient>
      </TouchableOpacity>
    );
  };
  


// ✅ Now define `VehicleOwnerTabs`
const VehicleOwnerTabs = () => {

    const navigation = useNavigation<NavigationProps>();

  // ✅ Define handlePress in the correct scope
  const handlePress = () => {
    navigation.navigate("MessagingScreen");
  };

  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabLabel,
          tabBarActiveTintColor: "#007bff",
          tabBarInactiveTintColor: "Black",
        }}
      >
        <Tab.Screen
          name="Home"
          component={VehicleOwnerHome}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Find Mechanic"
          component={FindMechanicScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="wrench" color={color} size={size} />
            ),
          }}
        />

 {/* ✅ Pass handlePress as a prop */}
        <Tab.Screen
          name="MessagingScreen"
          component={MessagingScreen}
          options={{
            tabBarButton: (props) => (
              <FloatingTabButton {...props} onPress={handlePress} />
            ),
          }}
        />

        <Tab.Screen
          name="Bookings"
          component={BookingScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="calendar-check" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-circle" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    height: 75,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    paddingBottom: 10,
    paddingTop: 10,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  fabContainer: {
    top: -30,
  },
  fab: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default VehicleOwnerTabs;
