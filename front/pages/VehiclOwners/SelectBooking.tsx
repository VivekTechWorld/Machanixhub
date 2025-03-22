import React, { useState } from "react";
import { View, Text, Button, Alert, StyleSheet, TouchableOpacity,TextInput  } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RootStackParamList = {
  SelectBooking: { mechanicId: string; mechanicName: string };
};

type Props = NativeStackScreenProps<RootStackParamList, "SelectBooking">;

const API_URL = "http://10.0.2.2:5000/api/bookings/create";
const API_URL2 = "http://10.0.2.2:5000"; // Backend API
const SelectBooking: React.FC<Props> = ({ route, navigation }) => {
  const { mechanicId, mechanicName } = route.params;

  const [serviceType, setServiceType] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [serviceMode, setServiceMode] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const fetchUserId = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) return;

      const response = await axios.get(`${API_URL2}/api/vehicleOwner/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const fetchedUserId = response.data.vehicleOwnerId;
      setUserId(fetchedUserId);

    } catch (error) {
      console.error("Error fetching vehicle owner ID:", error);
    }
  };

  fetchUserId();

  const handleBooking = async () => {
    if (!serviceType || !vehicleType || !serviceMode || !date || !time) {
      Alert.alert("Error", "Please fill in all details.");
      return;
    }

    try {
      const response = await axios.post(
        API_URL,
        {
            vehicleOwnerId: userId,
            mechanicId,
            serviceType,
            vehicleType,
            serviceMode,
            date: date.toISOString().split("T")[0], // Format: YYYY-MM-DD
            time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), // Format: HH:MM AM/PM
        },
        {
          headers: { Authorization: `Bearer YOUR_TOKEN` },
        }
      );

      if (response.data.success) {
        Alert.alert("Success", "Your booking request has been sent.");
        navigation.goBack();
      } else {
        Alert.alert("Error", "Failed to send booking request.");
      }
    } catch (error) {
      console.error("❌ Booking Error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Service with {mechanicName}</Text>

       {/* Service Type Input */}
       <Text style={styles.label}>Service Type</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Service Type (e.g., Oil Change)"
        value={serviceType}
        onChangeText={setServiceType}
      />

      {/* Vehicle Type Selection */}
      <Text style={styles.label}>Vehicle Type</Text>
      <View style={styles.buttonRow}>
        {["Car", "Bike", "Truck"].map((type) => (
          <TouchableOpacity
            key={type}
            style={[styles.selectionButton, vehicleType === type && styles.selectedButton]}
            onPress={() => setVehicleType(type)}
          >
            <Text style={[styles.buttonText, vehicleType === type && styles.selectedButtonText]}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Service Mode Selection */}
      <Text style={styles.label}>Service Mode</Text>
      <View style={styles.buttonRow}>
        {["Home Service", "Garage Service"].map((mode) => (
          <TouchableOpacity
            key={mode}
            style={[styles.selectionButton, serviceMode === mode && styles.selectedButton]}
            onPress={() => setServiceMode(mode)}
          >
            <Text style={[styles.buttonText, serviceMode === mode && styles.selectedButtonText]}>{mode}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Preferred Date Picker */}
      <Text style={styles.label}>Preferred Date</Text>
      <TouchableOpacity style={styles.inputButton} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.buttonText}>{date ? date.toDateString() : "Select Date"}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      {/* Preferred Time Picker */}
      <Text style={styles.label}>Preferred Time</Text>
      <TouchableOpacity style={styles.inputButton} onPress={() => setShowTimePicker(true)}>
        <Text style={styles.buttonText}>{time ? time.toLocaleTimeString() : "Select Time"}</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={time || new Date()}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) setTime(selectedTime);
          }}
        />
      )}

      {/* Confirm Booking Button */}
      <Button title="Send Booking Request" onPress={handleBooking} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  label: { fontSize: 16, marginTop: 10, marginBottom: 5 },
  buttonRow: { flexDirection: "row", justifyContent: "space-around", marginBottom: 10 },
  selectionButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#007BFF",
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
    backgroundColor: "#f0f0f0", // Light background for unselected buttons
  },
  selectedButton: {
    backgroundColor: "#007BFF",
    borderColor: "#0056b3",
  },
  buttonText: {
    fontSize: 16,
    color: "#000", // Default black text for unselected buttons
  },
  selectedButtonText: {
    color: "#fff", // White text for selected buttons
  },
  inputButton: {
    borderWidth: 1,
    borderColor: "#007BFF",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#f0f0f0", // Light background to indicate selection
  },
  input: {
    borderWidth: 1,
    borderColor: "#007BFF",
    padding: 12,
    borderRadius: 5,
    backgroundColor: "#fff",
    fontSize: 16,
  },
});

export default SelectBooking;
