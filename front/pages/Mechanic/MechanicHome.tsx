// import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';
// import { NavigationProps } from '../../src/navigationTypes';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useEffect } from 'react';



// const MechanicHome: React.FC<{ navigation: any }> = ({ navigation }) => {
//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = await AsyncStorage.getItem("authToken");
//       if (!token) {
//         navigation.navigate("AfLogin"); // Redirect if no token
//       }
//     };
//     checkAuth();
//   }, []);
  
//   return (
//     <View>
//     <Text>Welcome to the Mechanic home page !</Text>
//   </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
// });

// export default MechanicHome;


// frontend/screens/MechanicHome.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const MechanicHome: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMechanicInfo = async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        navigation.replace("AfLogin");
        return;
      }

      try {
        const res = await fetch("http://10.0.2.2:5000/api/mechanic/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setName(data.name || "Mechanic");
      } catch (err) {
        console.error("Error fetching mechanic:", err);
        Alert.alert("Error", "Unable to fetch mechanic data");
      } finally {
        setLoading(false);
      }
    };

    fetchMechanicInfo();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4e73df" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome {name} 👨‍🔧</Text>
        <Text style={styles.subText}>Your Mechanic Dashboard</Text>
      </View>

      <View style={styles.quickActions}>
        <ActionCard icon="clipboard-list" label="Service Requests" onPress={() => navigation.navigate("Approve Bookings")} />
        <ActionCard icon="message-text" label="Chats" onPress={() => navigation.navigate("MessagingScreen")} />
        <ActionCard icon="account" label="My Profile" onPress={() => navigation.navigate("Profile")} />
        <ActionCard icon="history" label="Booking History" onPress={() => navigation.navigate("Bookings")} />
        <ActionCard icon="robot" label="AI Gemini" onPress={() => navigation.navigate("Ai Support" )} />
      </View>
    </ScrollView>
  );
};

const ActionCard = ({ icon, label, onPress }: { icon: string; label: string; onPress: () => void }) => (
  <TouchableOpacity style={styles.actionCard} onPress={onPress}>
    <Icon name={icon} size={30} color="#fff" />
    <Text style={styles.cardText}>{label}</Text>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fdf3f3" },
    centered: { flex: 1, justifyContent: "center", alignItems: "center" },
    header: { alignItems: "center", marginTop: 30, marginBottom: 20 },
    welcomeText: { fontSize: 26, fontWeight: "bold", color: "#b71c1c" },
    subText: { fontSize: 16, color: "#7f1d1d" },
    quickActions: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
      paddingHorizontal: 10,
      paddingBottom: 30,
    },
    actionCard: {
      backgroundColor: "#fa1111",
      padding: 20,
      borderRadius: 15,
      alignItems: "center",
      width: "40%",
      marginVertical: 10,
      elevation: 4,
    },
    cardText: {
      color: "#fff",
      marginTop: 8,
      fontWeight: "bold",
      fontSize: 13,
      textAlign: "center",
    },
  });
  
  
export default MechanicHome;
