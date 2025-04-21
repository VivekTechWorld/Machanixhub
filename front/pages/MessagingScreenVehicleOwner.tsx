
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://10.0.2.2:5000/messages"; // ✅ Correct API Endpoint

interface ChatUser {
  id: string;
  name: string;
  type: "vehicleOwner" | "mechanic";
}

const MessagingScreenVehicleOwner: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchChatUsers();
    }
  }, [userId]); // ✅ Runs fetchChatUsers only when userId is set

  const fetchUserId = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        console.error("❌ No token found");
        setError("Authentication error");
        return;
      }

      const response = await axios.get("http://10.0.2.2:5000/api/vehicleOwner/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ VehicleOwner response:",response.data.vehicleOwnerId );

      if (!response.data || !response.data.vehicleOwnerId) {
        console.error("❌ MechanicOwnerid not found in response");
        setError("User ID not found");
        return;
      }

      const mechanicId = response.data.vehicleOwnerId; // ✅ Correctly accessing user ID
      console.log("✅ Mechanic ID fetched:", mechanicId);
      setUserId(mechanicId);
    } catch (error) {
      console.error("❌ Error fetching user ID:", error);
      setError("Failed to fetch user ID");
    }
  };

  const fetchChatUsers = async () => {
    if (!userId) return;

    try {
      console.log("📩 Fetching chat users for ID:", userId);
      const response = await axios.get<ChatUser[]>(`${API_URL}/${userId}`);
      console.log("💬 Chat Users Fetched:", response.data);

      setChatUsers(response.data);
    } catch (err) {
      console.error("❌ Error fetching chat users:", err);
      setError("Failed to load chats");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>VehicleOwner Chats</Text>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : chatUsers.length === 0 ? (
        <Text style={styles.noData}>No chats found</Text>
      ) : (
        <FlatList
          data={chatUsers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}

              onPress={() =>
                // navigation.navigate("MechanicMessageScreen", {
                //   senderId: userId,
                //   receiverId: item.id,
                // })
                navigation.navigate("chat", { mechanicId: item.id, mechanicName: item.name })
              }
            >
              <Text style={styles.name}>{item.id}</Text>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.userType}>{item.type === "vehicleOwner" ? "🚗 Vehicle Owner" : "🔧 Mechanic"}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

// ✅ Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userType: {
    fontSize: 16,
    color: "#555",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  noData: {
    color: "#555",
    textAlign: "center",
    marginTop: 20,
  },
});

export default MessagingScreenVehicleOwner;
