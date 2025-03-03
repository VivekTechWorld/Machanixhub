// import React from "react";
// import { View, Text, Button } from "react-native";

// const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Home Screen</Text>
//       <Button title="Open Drawer" onPress={() => navigation.openDrawer()} />
//     </View>
//   );
// };

// export default HomeScreen;


// import React, { useEffect, useState, useRef } from "react";
// import { View, Text, StyleSheet, Button, Alert, PermissionsAndroid, Platform, ActivityIndicator } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import GetLocation from "react-native-get-location";
// import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
// // import HomeScreen from "../pages/HomeScreen";

// const API_URL = "http://10.0.2.2:5000/api/vehicleOwner/location"; 

// const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
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

// export default HomeScreen;
import React, { useEffect, useState, useRef } from "react";
import { 
  View, Text, StyleSheet, Button, Alert, ActivityIndicator, Platform 
} from "react-native";
import MapView, { Region } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetLocation from "react-native-get-location";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";

const API_URL = "http://10.0.2.2:5000/api/location"; 

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const mapRef = useRef<MapView | null>(null);
  
  const [region, setRegion] = useState<Region>({
    latitude: 26.9124, 
    longitude: 75.7873,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(region);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        navigation.replace("AfLogin");
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    setIsLoading(true);
    let permission;

    if (Platform.OS === "android") {
      permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    } else {
      permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
    }

    const result = await check(permission);
    if (result === RESULTS.DENIED) {
      const granted = await request(permission);
      if (granted !== RESULTS.GRANTED) {
        Alert.alert("Permission Denied", "Location permission is required.");
        setIsLoading(false);
        return;
      }
    }

    getCurrentLocation();
  };

  const getCurrentLocation = async () => {
    if (isRequesting) return;
    setIsRequesting(true);

    try {
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 30000,
      });

      console.log("Current Location:", location);
      const newRegion = {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setRegion(newRegion);
      setSelectedLocation(newRegion);

      if (mapRef.current) {
        mapRef.current.animateToRegion(newRegion);
      }

    } catch (error: any) {
      console.log("Error getting location:", error);
      Alert.alert("Error", "Failed to get location. Please check GPS settings.");
    } finally {
      setIsRequesting(false);
      setIsLoading(false);
    }
  };

  const onRegionChangeComplete = (newRegion: Region) => {
    setSelectedLocation(newRegion);
  };

  const sendLocationToDB = async (latitude: number, longitude: number) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ latitude, longitude }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Location saved successfully!");
      } else {
        Alert.alert("Error", data.message || "Failed to save location.");
      }
    } catch (error) {
      console.error("Location upload error:", error);
      Alert.alert("Error", "Failed to send location to server.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Move the Map to Select Location</Text>

      <Button title="Get Current Location" onPress={requestLocationPermission} disabled={isLoading} />
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}

      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton={true}
          zoomEnabled={true}
          zoomControlEnabled={true}
          initialRegion={region}
          onRegionChangeComplete={onRegionChangeComplete}
        />
        <View style={styles.markerFixed}>
          <Text style={styles.marker}>📍</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text>Selected Location:</Text>
        <Text>Lat: {selectedLocation.latitude.toFixed(6)}</Text>
        <Text>Lng: {selectedLocation.longitude.toFixed(6)}</Text>
        <Button
          title="Confirm Location"
          onPress={() => {
            Alert.alert(
              "Location Selected",
              `Lat: ${selectedLocation.latitude}, Lng: ${selectedLocation.longitude}`
            );
            sendLocationToDB(selectedLocation.latitude, selectedLocation.longitude);
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  mapContainer: {
    width: "100%",
    height: "70%",
    position: "relative",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  markerFixed: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: [{ translateX: -15 }, { translateY: -30 }],
  },
  marker: {
    fontSize: 30,
  },
  infoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
});

export default HomeScreen;

