import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Button, Card } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import LinearGradient from "react-native-linear-gradient";

const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          Alert.alert("Error", "No authentication token found");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://10.0.2.2:5000/api/vehicleOwner/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        Alert.alert("Error", "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>Profile not found</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={["#007BFF", "#0056b3"]} style={styles.gradientBackground}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: profile.profileImage || "https://via.placeholder.com/150" }}
              style={styles.profileImage}
              resizeMode="cover" // Ensures full coverage
            />
          </View>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.detailText}>📞 {profile.phone}</Text>
          <Text style={styles.detailText}>🚗 {profile.vehicleModel}</Text>
          <Text style={styles.detailText}>🔢 {profile.vehicleNumber}</Text>

          <TouchableOpacity onPress={() => navigation.navigate("VehicleOwnerDrawer", { screen: "EditProfile" })} style={styles.editButton}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </Card>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "90%",
    padding: 25,
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Glass effect
    elevation: 6, // Android shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  imageContainer: {
    width: 130,
    height: 130,
    borderWidth: 3,
    borderColor: "#fff",
    borderRadius: 70,
    overflow: "hidden", // Ensures image stays inside the container
    marginBottom: 15,
    alignItems: "center", // ✅ Centers horizontally
    justifyContent: "center", // ✅ Centers vertically
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 65,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  detailText: {
    fontSize: 18,
    color: "#e0e0e0",
    marginBottom: 6,
    fontWeight: "500",
  },
  editButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 30,
    backgroundColor: "#FFD700", // Gold button
    elevation: 4,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textTransform: "uppercase",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
});

export default ProfileScreen;
