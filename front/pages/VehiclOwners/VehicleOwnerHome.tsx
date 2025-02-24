import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Alert, PermissionsAndroid, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetLocation from "react-native-get-location";
import { NavigationProps } from "../../src/navigationTypes";

const VehicleOwnerHome: React.FC<NavigationProps<"VehicleOwnerHome">> = ({ navigation }) => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        navigation.replace("AfLogin"); // Redirect if not authenticated
      }
    };
    checkAuth();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "This app needs access to your location.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          Alert.alert("Permission Denied", "Location permission is required to use this feature.");
        }
      } catch (err) {
        console.warn("Permission Error:", err);
      }
    } else {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = async () => {
    try {
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000, // Increased timeout for better accuracy
      });
      console.log(location);
      setLocation({
        latitude: location.latitude,
        longitude: location.longitude,
      });

      // Send location to backend
      await sendLocationToDB(location.latitude, location.longitude);
    } catch (error: any) {
      console.warn("Location Error:", error.code, error.message);
      Alert.alert("Error", "Failed to get location. Please enable GPS and try again.");
    }
  };

  const sendLocationToDB = async (latitude: number, longitude: number) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await fetch("http://10.0.2.2:5000/api/location", {
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
      <Text style={styles.text}>Welcome to the Vehicle Owner Home Page!</Text>
      <Button title="Get Current Location" onPress={requestLocationPermission} />

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location?.latitude || 23.0756831, // Default location
          longitude: location?.longitude || 72.5583827,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {location && <Marker coordinate={location} title="Your Location" />}
      </MapView>
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  map: {
    width: "100%",
    height: "80%",
    marginTop: 10,
  },
});

export default VehicleOwnerHome;



