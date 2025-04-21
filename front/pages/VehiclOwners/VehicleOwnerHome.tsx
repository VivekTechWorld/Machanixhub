// import React, { useEffect, useState, useRef } from "react";
// import { View, Text, StyleSheet, Button, Alert, PermissionsAndroid, Platform, ActivityIndicator } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import GetLocation from "react-native-get-location";
// import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";

// const API_URL = "http://10.0.2.2:5000/api/vehicleOwner/location"; 

// const VehicleOwnerHome: React.FC<{ navigation: any }> = ({ navigation }) => {
//   const mapRef = useRef<MapView | null>(null);
//   const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isRequesting, setIsRequesting] = useState(false);

//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = await AsyncStorage.getItem("authToken");
//       if (!token) {
//         navigation.replace("AfLogin");
//       }
//     };
//     checkAuth();
//   }, []);

//   const requestLocationPermission = async () => {
//     setIsLoading(true);
//     let permission;

//     if (Platform.OS === "android") {
//       permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
//       const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
//       if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//         Alert.alert("Permission Denied", "Location permission is required.");
//         setIsLoading(false);
//         return;
//       }
//     } else {
//       permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
//       const result = await check(permission);
//       if (result === RESULTS.DENIED) {
//         const granted = await request(permission);
//         if (granted !== RESULTS.GRANTED) {
//           Alert.alert("Permission Denied", "Location permission is required.");
//           setIsLoading(false);
//           return;
//         }
//       }
//     }

//     getCurrentLocation();
//   };

//   const getCurrentLocation = async () => {
//     if (isRequesting) return;
//     setIsRequesting(true);

//     try {
//       const location = await GetLocation.getCurrentPosition({
//         enableHighAccuracy: true,
//         timeout: 30000,
//       });

//       console.log("Current Location:", location);
//       setLocation({ latitude: location.latitude, longitude: location.longitude });

//       mapRef.current?.animateToRegion({
//         latitude: location.latitude,
//         longitude: location.longitude,
//         latitudeDelta: 0.01,
//         longitudeDelta: 0.01,
//       });

//       await sendLocationToDB(location.latitude, location.longitude);

//     } catch (error: any) {
//       console.log("Error getting location:", error);
//       Alert.alert("Error", "Failed to get location. Please check GPS settings.");
//     } finally {
//       setIsRequesting(false);
//       setIsLoading(false);
//     }
//   };

//   const sendLocationToDB = async (latitude: number, longitude: number) => {
//     try {
//       const token = await AsyncStorage.getItem("authToken");
//       const response = await fetch("http://10.0.2.2:5000/api/location", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ latitude, longitude }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         Alert.alert("Success", "Location saved successfully!");
//       } else {
//         Alert.alert("Error", data.message || "Failed to save location.");
//       }
//     } catch (error) {
//       console.error("Location upload error:", error);
//       Alert.alert("Error", "Failed to send location to server.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Welcome to the Vehicle Owner Home Page!</Text>

//       <Button title="Get Current Location" onPress={requestLocationPermission} disabled={isLoading} />
//       {isLoading && <ActivityIndicator size="large" color="#0000ff" />}

//       <MapView
//         ref={mapRef}
//         style={styles.map}
//         showsUserLocation={true}
//         showsMyLocationButton={true}
//         zoomEnabled={true}
//         zoomControlEnabled={true}
//         initialRegion={{
//           latitude: 26.9124,
//           longitude: 75.7873,
//           latitudeDelta: 0.05,
//           longitudeDelta: 0.05,
//         }}
//       >
//         {location && (
//           <Marker
//             coordinate={location}
//             title="Your Location"
//             description="Tap to center on your location"
//             onPress={() =>
//               mapRef.current?.animateToRegion({
//                 latitude: location.latitude,
//                 longitude: location.longitude,
//                 latitudeDelta: 0.01,
//                 longitudeDelta: 0.01,
//               })
//             }
//           />
//         )}
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   text: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   map: {
//     width: "100%",
//     height: "80%",
//     marginTop: 10,
//   },
// });

// export default VehicleOwnerHome;
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const { width } = Dimensions.get("window");

const VehicleOwnerHome: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        navigation.replace("AfLogin");
        return;
      }

      try {
        const res = await fetch("http://10.0.2.2:5000/api/vehicleOwner/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUsername(data.name || "Vehicle Owner");
      } catch (err) {
        console.error("Error:", err);
        Alert.alert("Error", "Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetch();
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
        <Text style={styles.welcomeText}>Hi {username} 👋</Text>
        <Text style={styles.subText}>Welcome to MechanixHub</Text>
      </View>

      {/* Offers Section */}
      <View style={styles.offersSection}>
        <Text style={styles.sectionTitle}>Today's Offers</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Image source={require("../../assets/images1.png")} style={styles.offerCard} />
          <Image source={require("../../assets/images2.png")} style={styles.offerCard} />
          <Image source={require("../../assets/images3.jpg")} style={styles.offerCard} />
        </ScrollView>
      </View>

      <View style={styles.quickActions}>
        <ActionCard icon="wrench" label="Find Mechanic" onPress={() => navigation.navigate("Find Mechanic")} />
        <ActionCard icon="message-text" label="Chat" onPress={() => navigation.navigate("MessagingScreenVehicleOwner")} />
        <ActionCard icon="history" label="Booking History" onPress={() => navigation.navigate("Bookings")} />
        <ActionCard icon="account" label="My Profile" onPress={() => navigation.navigate("Profile")} />
        <ActionCard icon="robot" label="AI Gemini" onPress={() => navigation.navigate("Ai Support")} />
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
  container: { flex: 1, backgroundColor: "#f2f4f7" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { alignItems: "center", marginTop: 30, marginBottom: 20 },
  welcomeText: { fontSize: 26, fontWeight: "bold", color: "#333" },
  subText: { fontSize: 16, color: "#666" },

  offersSection: {
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  offerCard: {
    width: width * 0.8,
    height: 200,
    borderRadius: 12,
    marginRight: 15,
    resizeMode: "cover",
  },

  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  actionCard: {
    backgroundColor: "#4e73df",
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

export default VehicleOwnerHome;
