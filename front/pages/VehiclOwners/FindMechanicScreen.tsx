// // import React, { useEffect, useState } from "react";
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   PermissionsAndroid,
// //   Alert,
// //   ActivityIndicator,
// // } from "react-native";
// // import MapView, { Marker } from "react-native-maps";
// // import Geolocation from "react-native-geolocation-service";
// // import axios from "axios";

// // // Define types
// // type Location = {
// //   latitude: number;
// //   longitude: number;
// // };

// // type Mechanic = {
// //   name: string;
// //   phone: string;
// //   services: string[];
// //   location: {
// //     coordinates: [number, number]; // [longitude, latitude]
// //   };
// // };

// // const FindMechanicScreen = () => {
// //   const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
// //   const [nearestMechanic, setNearestMechanic] = useState<Mechanic | null>(null);
// //   const [loading, setLoading] = useState(true);

// //   // 📌 Request Location Permission
// //   const requestLocationPermission = async () => {
// //     try {
// //       const granted = await PermissionsAndroid.request(
// //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
// //         {
// //           title: "Location Permission",
// //           message: "MechanixHub needs access to your location to find the nearest mechanic.",
// //           buttonPositive: "OK",
// //         }
// //       );

// //       if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
// //         Alert.alert("Permission Denied", "Enable location permissions in settings.");
// //         return false;
// //       }

// //       return true;
// //     } catch (err) {
// //       console.warn("Permission error:", err);
// //       return false;
// //     }
// //   };

// //   // 📌 Get User's Current Location
// //   const getCurrentLocation = async () => {
// //     const hasPermission = await requestLocationPermission();
// //     if (!hasPermission) return;

// //     Geolocation.getCurrentPosition(
// //       (position) => {
// //         const { latitude, longitude } = position.coords;
// //         setCurrentLocation({ latitude, longitude });
// //         fetchNearestMechanic(latitude, longitude);
// //       },
// //       (error) => {
// //         Alert.alert("Error", "Failed to get location");
// //         console.warn(error);
// //       },
// //       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
// //     );
// //   };

// //   // 📌 Fetch Nearest Mechanic from Backend
// //   const fetchNearestMechanic = async (latitude: number, longitude: number) => {
// //     try {
// //       const response = await axios.get<{ mechanic: Mechanic }>(
// //         `http://10.0.2.2:5000/api/vehicleOwner/nearest?latitude=${latitude}&longitude=${longitude}`
// //       );
// //       setNearestMechanic(response.data.mechanic);
// //     } catch (error) {
// //       Alert.alert("Error", "No nearby mechanic found");
// //       console.warn("Fetch Mechanic Error:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     getCurrentLocation();
// //   }, []);

// //   return (
// //     <View style={styles.container}>
// //       {loading || !currentLocation ? (
// //         <ActivityIndicator size="large" color="#007bff" />
// //       ) : (
// //         <MapView
// //           style={styles.map}
// //           initialRegion={{
// //             latitude: currentLocation.latitude,
// //             longitude: currentLocation.longitude,
// //             latitudeDelta: 0.05,
// //             longitudeDelta: 0.05,
// //           }}
// //         >
// //           {/* 📍 Vehicle Owner's Location */}
// //           <Marker coordinate={currentLocation} title="Your Location" pinColor="blue" />

// //           {/* 📌 Nearest Mechanic */}
// //           {nearestMechanic && (
// //             <Marker
// //               coordinate={{
// //                 latitude: nearestMechanic.location.coordinates[1],
// //                 longitude: nearestMechanic.location.coordinates[0],
// //               }}
// //               title={nearestMechanic.name}
// //               description={nearestMechanic.services?.join(", ")}
// //               pinColor="red"
// //             />
// //           )}
// //         </MapView>
// //       )}

// //       {/* 📌 Show Mechanic Details */}
// //       {nearestMechanic && (
// //         <View style={styles.details}>
// //           <Text style={styles.title}>Nearest Mechanic</Text>
// //           <Text style={styles.mechanicName}>{nearestMechanic.name}</Text>
// //           <Text>{nearestMechanic.services?.join(", ")}</Text>
// //           <Text>📍 {nearestMechanic.phone}</Text>
// //         </View>
// //       )}
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: { flex: 1 },
// //   map: { ...StyleSheet.absoluteFillObject },
// //   details: {
// //     position: "absolute",
// //     bottom: 20,
// //     left: 20,
// //     right: 20,
// //     backgroundColor: "white",
// //     padding: 15,
// //     borderRadius: 10,
// //     elevation: 5,
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 4 },
// //     shadowOpacity: 0.3,
// //     shadowRadius: 6,
// //   },
// //   title: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
// //   mechanicName: { fontSize: 16, fontWeight: "600" },
// // });

// // export default FindMechanicScreen;




// // import React, { useEffect, useState, useRef } from "react";
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   Button,
// //   Alert,
// //   ActivityIndicator,
// //   PermissionsAndroid,
// //   Platform,
// // } from "react-native";
// // import MapView, { Marker,Region  } from "react-native-maps";
// // import AsyncStorage from "@react-native-async-storage/async-storage";
// // import GetLocation from "react-native-get-location";
// // import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
// // import axios from "axios";

// // const API_URL = "http://10.0.2.2:5000/api/vehicleOwner/nearest";

// // // ✅ Define the Location type
// // type Location = {
// //   latitude: number;
// //   longitude: number;
// // };


// // // ✅ Define a Mechanic type
// // type Mechanic = {
// //   name: string;
// //   location: {
// //     coordinates: [number, number]; // GeoJSON format
// //   };
// //   services: string[];
// // }

// // const FindMechanicScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [isRequesting, setIsRequesting] = useState(false);
// //   const [location, setLocation] = useState<Location | null>(null); // ✅ Corrected
// //   const mapRef = useRef<MapView | null>(null); // ✅ Fix for 'animateToRegion' error
// //   const [mechanics, setMechanics] = useState<Mechanic[]>([]); // ✅ Fix for 'never' type errors

// //   useEffect(() => {
// //     const checkAuth = async () => {
// //       const token = await AsyncStorage.getItem("authToken");
// //       if (!token) {
// //         navigation.replace("AfLogin");
// //       }
// //     };
// //     checkAuth();
// //   }, []);

// //   const requestLocationPermission = async () => {
// //     setIsLoading(true);
// //     let permission;

// //     if (Platform.OS === "android") {
// //       permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
// //       const granted = await PermissionsAndroid.request(
// //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
// //       );
// //       if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
// //         Alert.alert("Permission Denied", "Location permission is required.");
// //         setIsLoading(false);
// //         return;
// //       }
// //     } else {
// //       permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
// //       const result = await check(permission);
// //       if (result === RESULTS.DENIED) {
// //         const granted = await request(permission);
// //         if (granted !== RESULTS.GRANTED) {
// //           Alert.alert("Permission Denied", "Location permission is required.");
// //           setIsLoading(false);
// //           return;
// //         }
// //       }
// //     }
// //     getCurrentLocation();
// //   };

// //   const getCurrentLocation = async () => {
// //     if (isRequesting) return;
// //     setIsRequesting(true);

// //     try {
// //       const location = await GetLocation.getCurrentPosition({
// //         enableHighAccuracy: true,
// //         timeout: 30000,
// //       });
// //       console.log("Location",location);
// //       setLocation({ latitude: location.latitude, longitude: location.longitude });

// //       mapRef.current?.animateToRegion({
// //         latitude: location.latitude,
// //         longitude: location.longitude,
// //         latitudeDelta: 0.01,
// //         longitudeDelta: 0.01,
// //       });
      
// //       fetchNearestMechanics(location.latitude, location.longitude);
// //     } catch (error) {
// //       Alert.alert("Error", "Failed to get location. Please check GPS settings.");
// //     } finally {
// //       setIsRequesting(false);
// //       setIsLoading(false);
// //     }
// //   };

// //     // ✅ Fix for 'latitude' and 'longitude' type errors
// //   const fetchNearestMechanics = async (latitude: number, longitude: number) => {
// //     try {
// //       const response = await axios.get(`${API_URL}?latitude=${latitude}&longitude=${longitude}`);
// //       console.log(response.data);
// //       setMechanics(response.data || []);
// //     } catch (error) {
// //       Alert.alert("Error", "No nearby mechanics found");
// //     }


// //     useEffect(() => {
// //       fetch(`${API_URL}?latitude=${latitude}&longitude=${longitude}`)
// //         .then((res) => res.json())
// //         .then((data) => {
// //           if (Array.isArray(data)) {
// //             setMechanics(data); // ✅ Ensure it's an array
// //           } else {
// //             console.error("Expected an array but got:", data);
// //           }
// //         })
// //         .catch((error) => console.error("Error fetching mechanics:", error));
// //     }, []);
// //   };


// //   return (
// //     <View style={styles.container}>
// //       <Button title="Find Nearest Mechanic" onPress={requestLocationPermission} disabled={isLoading} />
// //       {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
// //       <MapView
// //         ref={mapRef}
// //         style={styles.map}
// //         showsUserLocation={true}
// //         showsMyLocationButton={true}
// //         zoomEnabled={true}
// //         initialRegion={{
// //           latitude: 26.9124,
// //           longitude: 75.7873,
// //           latitudeDelta: 0.05,
// //           longitudeDelta: 0.05,
// //         }}
// //       >
// //         {location && <Marker coordinate={location} title="Your Location" pinColor="blue" />}
// //         {mechanics.map((mechanic, index) => (
// //           <Marker
// //             key={index}
// //             coordinate={{
// //               latitude: mechanic.location.coordinates[1],
// //               longitude: mechanic.location.coordinates[0],
// //             }}
// //             title={mechanic.name}
// //             description={mechanic.services.join(", ")}
// //             pinColor="red"
// //           />
// //         ))}
// //       </MapView>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: { flex: 1, justifyContent: "center", alignItems: "center" },
// //   map: { width: "100%", height: "80%", marginTop: 10 },
// // });

// // export default FindMechanicScreen;



// import React, { useEffect, useState, useRef } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Button,
//   Alert,
//   ActivityIndicator,
//   PermissionsAndroid,
//   Platform,
// } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import GetLocation from "react-native-get-location";
// import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
// import axios from "axios";

// const API_URL = "http://10.0.2.2:5000/api/vehicleOwner/nearest";

// type Location = {
//   latitude: number;
//   longitude: number;
// };

// type Mechanic = {
//   name: string;
//   specialization: string;
//   location: {
//     coordinates: [number, number]; // GeoJSON format [longitude, latitude]
//   };
// };

// const FindMechanicScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [isRequesting, setIsRequesting] = useState(false);
//   const [location, setLocation] = useState<Location | null>(null);
//   const mapRef = useRef<MapView | null>(null);
//   const [mechanics, setMechanics] = useState<Mechanic[]>([]);

//   // Check authentication on component mount
//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = await AsyncStorage.getItem("authToken");
//       if (!token) {
//         navigation.replace("AfLogin");
//       }
//     };
//     checkAuth();
//   }, [navigation]);

//   // Request location permission
//   const requestLocationPermission = async () => {
//     setIsLoading(true);

//     try {
//       if (Platform.OS === "android") {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//         );
//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           Alert.alert("Permission Denied", "Location permission is required.");
//           setIsLoading(false);
//           return;
//         }
//       } else {
//         const permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
//         const result = await check(permission);
//         if (result === RESULTS.DENIED) {
//           const granted = await request(permission);
//           if (granted !== RESULTS.GRANTED) {
//             Alert.alert("Permission Denied", "Location permission is required.");
//             setIsLoading(false);
//             return;
//           }
//         }
//       }

//       // If permission is granted, get the current location
//       await getCurrentLocation();
//     } catch (error) {
//       console.error("❌ Error requesting location permission:", error);
//       Alert.alert("Error", "Failed to request location permission.");
//       setIsLoading(false);
//     }
//   };

//   // Get the current location
//   const getCurrentLocation = async () => {
//     if (isRequesting) return;
//     setIsRequesting(true);

//     try {
//       const location = await GetLocation.getCurrentPosition({
//         enableHighAccuracy: true,
//         timeout: 30000,
//       });
//       console.log("✅ Location:", location);

//       // Update the location state
//       setLocation({ latitude: location.latitude, longitude: location.longitude });

//       // Animate the map to the current location
//       mapRef.current?.animateToRegion({
//         latitude: location.latitude,
//         longitude: location.longitude,
//         latitudeDelta: 0.01,
//         longitudeDelta: 0.01,
//       });

//       // Fetch nearest mechanics based on the current location
//       await fetchNearestMechanics(location.latitude, location.longitude);
//     } catch (error) {
//       console.error("❌ Error getting location:", error);
//       Alert.alert("Error", "Failed to get location. Please check GPS settings.");
//     } finally {
//       setIsRequesting(false);
//       setIsLoading(false);
//     }
//   };

//   // Fetch nearest mechanics from the API
//   const fetchNearestMechanics = async (latitude: number, longitude: number) => {
//     try {
//       const response = await axios.get(`${API_URL}?latitude=${latitude}&longitude=${longitude}`);
//       console.log("🛠️ API Response:", response.data);

//       if (response.data.mechanics && Array.isArray(response.data.mechanics)) {
//         setMechanics(response.data.mechanics);
//       } else {
//         console.error("❌ Unexpected API response format:", response.data);
//         setMechanics([]);
//       }
//     } catch (error) {
//       console.error("❌ Error fetching mechanics:", error);
//       Alert.alert("Error", "No nearby mechanics found");
//       setMechanics([]);
//     }
//   };

//   // Update the map region when mechanics are updated
//   useEffect(() => {
//     if (mechanics.length > 0 && mechanics[0].location?.coordinates?.length === 2) {
//       const [longitude, latitude] = mechanics[0].location.coordinates;

//       mapRef.current?.animateToRegion({
//         latitude,
//         longitude,
//         latitudeDelta: 0.05,
//         longitudeDelta: 0.05,
//       });
//     }
//   }, [mechanics]);

//   return (
//     <View style={styles.container}>
//       <Button
//         title="Find Nearest Mechanic"
//         onPress={requestLocationPermission}
//         disabled={isLoading || isRequesting}
//       />
//       {isLoading && <ActivityIndicator size="large" color="#0000ff" />}

//       <MapView
//         ref={mapRef}
//         style={styles.map}
//         showsUserLocation={true}
//         showsMyLocationButton={true}
//         zoomEnabled={true}
//         initialRegion={{
//           latitude: 26.9124, // Default location (Jaipur, India)
//           longitude: 75.7873,
//           latitudeDelta: 0.05,
//           longitudeDelta: 0.05,
//         }}
//         onMapReady={() => {
//           if (location) {
//             mapRef.current?.animateToRegion({
//               latitude: location.latitude,
//               longitude: location.longitude,
//               latitudeDelta: 0.01,
//               longitudeDelta: 0.01,
//             });
//           }
//         }}
//       >
//         {/* Render user location marker */}
//         {location && (
//           <Marker
//             coordinate={location}
//             title="Your Location"
//             pinColor="blue"
//           />
//         )}

//         {/* Render mechanic markers */}
//         {mechanics.map((mechanic, index) => {
//           const { coordinates } = mechanic.location;
//           if (!coordinates || coordinates.length !== 2) {
//             console.error(`❌ Invalid coordinates for mechanic: ${mechanic.name}`, coordinates);
//             return null;
//           }

//           return (
//             <Marker
//               key={index}
//               coordinate={{
//                 latitude: coordinates[1], // GeoJSON format: [longitude, latitude]
//                 longitude: coordinates[0],
//               }}
//               title={mechanic.name}
//               description={mechanic.specialization}
//               pinColor="red"
//             />
//           );
//         })}
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
//   map: {
//     width: "100%",
//     height: "80%",
//     marginTop: 10,
//   },
// });

// export default FindMechanicScreen;



// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Button,
//   Alert,
//   ActivityIndicator,
//   FlatList,
//   Image,
//   TouchableOpacity,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import GetLocation from "react-native-get-location";
// import axios from "axios";
// import { StackNavigationProp } from "@react-navigation/stack";
// import { RouteProp } from "@react-navigation/native";

// const API_URL = "http://10.0.2.2:5000/api/vehicleOwner/nearest";

// type RootStackParamList = {
//   Home: undefined;
//   FindMechanic: undefined;
//   Chat: { mechanicId: string };
//   Booking: { mechanicId: string };
//   AfLogin: undefined;
// };

// type FindMechanicScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FindMechanic'>;
// type FindMechanicScreenRouteProp = RouteProp<RootStackParamList, 'FindMechanic'>;

// type Props = {
//   navigation: FindMechanicScreenNavigationProp;
//   route: FindMechanicScreenRouteProp;
// };

// type Location = {
//   latitude: number;
//   longitude: number;
// };

// type Mechanic = {
//   id: string;
//   name: string;
//   specialization: string;
//   rating: number;
//   distance: number;
//   image: string;
// };

// const FindMechanicScreen: React.FC<Props> = ({ navigation }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [location, setLocation] = useState<Location | null>(null);
//   const [mechanics, setMechanics] = useState<Mechanic[]>([]);

//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = await AsyncStorage.getItem("authToken");
//       if (!token) {
//         navigation.replace("AfLogin");
//       }
//     };
//     checkAuth();
//   }, [navigation]);

//   const getCurrentLocation = async () => {
//     setIsLoading(true);
//     try {
//       const location = await GetLocation.getCurrentPosition({
//         enableHighAccuracy: true,
//         timeout: 30000,
//       });
//       setLocation({ latitude: location.latitude, longitude: location.longitude });
//       await fetchNearestMechanics(location.latitude, location.longitude);
//     } catch (error) {
//       Alert.alert("Error", "Failed to get location. Please check GPS settings.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchNearestMechanics = async (latitude: number, longitude: number) => {
//     try {
//       const response = await axios.get(`${API_URL}?latitude=${latitude}&longitude=${longitude}`);
//       setMechanics(response.data.mechanics || []);
//     } catch (error) {
//       Alert.alert("Error", "No nearby mechanics found");
//       setMechanics([]);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Find Nearby Mechanics" onPress={getCurrentLocation} disabled={isLoading} />
//       {isLoading && <ActivityIndicator size="large" color="#0000ff" />}

//       <FlatList
//         data={mechanics}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }: { item: Mechanic }) => (
//           <View style={styles.card}>
//             <Image source={{ uri: item.image }} style={styles.image} />
//             <View style={styles.infoContainer}>
//               <Text style={styles.name}>{item.name}</Text>
//               <Text style={styles.specialization}>{item.specialization}</Text>
//               <Text style={styles.rating}>⭐ {item.rating} | {item.distance} km away</Text>
//               <View style={styles.buttonContainer}>
//                 <TouchableOpacity
//                   style={styles.button}
//                   onPress={() => navigation.navigate("Chat", { mechanicId: item.id })}
//                 >
//                   <Text style={styles.buttonText}>Message</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[styles.button, styles.bookButton]}
//                   onPress={() => navigation.navigate("Booking", { mechanicId: item.id })}
//                 >
//                   <Text style={styles.buttonText}>Book Now</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   card: {
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     padding: 10,
//     marginVertical: 5,
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   image: {
//     width: 80,
//     height: 80,
//     borderRadius: 10,
//   },
//   infoContainer: {
//     flex: 1,
//     marginLeft: 10,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   specialization: {
//     fontSize: 14,
//     color: "gray",
//   },
//   rating: {
//     fontSize: 14,
//     color: "#444",
//     marginVertical: 5,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     marginTop: 5,
//   },
//   button: {
//     flex: 1,
//     backgroundColor: "#007bff",
//     padding: 8,
//     borderRadius: 5,
//     alignItems: "center",
//     marginHorizontal: 2,
//   },
//   bookButton: {
//     backgroundColor: "#28a745",
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
// });

// export default FindMechanicScreen;



import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetLocation from "react-native-get-location";
import axios from "axios";
import { NavigationProp } from "@react-navigation/native";

const API_URL = "http://10.0.2.2:5000/api/vehicleOwner/nearest";
const PLACEHOLDER_IMAGE = "https://via.placeholder.com/80"; // Fallback Image

type Location = {
  latitude: number;
  longitude: number;
};

type Mechanic = {
  MechanicOwnerid: string;
  id: string;
  name: string;
  specialization: string;
  rating: number;
  distance: number;
  image?: string | null;
};

type Props = {
  navigation: NavigationProp<any>;
};

const FindMechanicScreen: React.FC<Props> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<Location | null>(null);
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        navigation.navigate("AfLogin");
      }
    };
    checkAuth();
  }, [navigation]);

  const getCurrentLocation = async () => {
    setIsLoading(true);
    try {
      const loc = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 30000,
      });
      setLocation({ latitude: loc.latitude, longitude: loc.longitude });
      await fetchNearestMechanics(loc.latitude, loc.longitude);
    } catch (error) {
      Alert.alert("Error", "Failed to get location. Please check GPS settings.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNearestMechanics = async (latitude: number, longitude: number) => {
    try {
      const response = await axios.get(`${API_URL}?latitude=${latitude}&longitude=${longitude}`);
      
      console.log("🚀 API Response:", response.data); // Debug API response

      if (response.data.success && response.data.mechanics) {
        const formattedMechanics = response.data.mechanics.map((mechanic: any) => {
          console.log("🔍 Mechanic Data:", mechanic); // Check if `profileImage` exists

          return {
            mechanicId: mechanic.mechanicId, // ✅ Use mechanicId instead of id
            ...mechanic,
            image: mechanic.profileImage
              ? mechanic.profileImage.startsWith("http") 
                ? mechanic.profileImage 
                : `https://res.cloudinary.com/dndtvek2i/image/upload/${mechanic.profileImage}` // Ensure correct Cloudinary URL
              : PLACEHOLDER_IMAGE, // Use placeholder if no image
          };
        });

        setTimeout(() => {
          setMechanics(formattedMechanics);
        }, 500); // Small delay for better rendering
      } else {
        setMechanics([]);
        Alert.alert("Error", "No nearby mechanics found.");
      }
    } catch (error) {
      console.error("❌ Fetch Error:", error);
      Alert.alert("Error", "Failed to fetch mechanics.");
      setMechanics([]);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Find Nearby Mechanics" onPress={getCurrentLocation} disabled={isLoading} />
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}

      <FlatList
  data={mechanics}
  keyExtractor={(item, index) => item.id?.toString() || index.toString()}
  renderItem={({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.image ?? PLACEHOLDER_IMAGE }} // Fix: Ensures valid URI
        style={styles.image}
        onError={(e) => console.log("❌ Image Load Error:", item.image, e.nativeEvent.error)}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.specialization}>{item.specialization}</Text>
        <Text style={styles.rating}>⭐ {item.rating} | {item.distance} km away</Text>
        <View style={styles.buttonContainer}>
          {/* <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("chat", { mechanicId: item.mechanicid, mechanicName: item.name })}
          > */}

              <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    console.log("Mechanic ID:", item.MechanicOwnerid); // Print mechanic ID
                    navigation.navigate("chat", { mechanicId: item.MechanicOwnerid, mechanicName: item.name });
                  }}
                >
            
            <Text style={styles.buttonText}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.bookButton]}
            onPress={() => navigation.navigate("SelectBooking", { mechanicId: item.MechanicOwnerid,mechanicName: item.name })}
          >
            <Text style={styles.buttonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )}
/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: "#f0f0f0", // Prevents white flickering
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  specialization: {
    fontSize: 14,
    color: "gray",
  },
  rating: {
    fontSize: 14,
    color: "#444",
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  button: {
    flex: 1,
    backgroundColor: "#007bff",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 2,
  },
  bookButton: {
    backgroundColor: "#28a745",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
}); 

export default FindMechanicScreen;
