import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Alert, StyleSheet, TouchableOpacity, TextInput, Modal, Image } from "react-native";

interface VehicleOwnerProfile {
  id: string;
  vehicleOwnerId: string;
  name?: string;
  email: string;
  phone: string;
  vehicleModel?: string;
  vehicleNumber?: string;
  location?: {
    type: string;
    coordinates: [number, number];
  };
  profileImage?: string;
}

const VehicleOwnerProfileScreen: React.FC = () => {
  const [profiles, setProfiles] = useState<VehicleOwnerProfile[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProfile, setEditingProfile] = useState<VehicleOwnerProfile | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [editedVehicleModel, setEditedVehicleModel] = useState("");
  const [editedVehicleNumber, setEditedVehicleNumber] = useState("");

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await fetch("http://10.0.2.2:5000/api/admin/vehicle-owner-profile");
      const data: VehicleOwnerProfile[] = await response.json();
      setProfiles(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch profiles");
    }
  };

  const handleEdit = (profile: VehicleOwnerProfile) => {
    setEditingProfile(profile);
    setEditedName(profile.name || "");
    setEditedPhone(profile.phone);
    setEditedVehicleModel(profile.vehicleModel || "");
    setEditedVehicleNumber(profile.vehicleNumber || "");
    setModalVisible(true);
  };

  const handleSaveEdit = async () => {
    if (!editingProfile) return;
    try {
      const response = await fetch(`http://10.0.2.2:5000/api/admin/vehicle-owner-profile/${editingProfile.vehicleOwnerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editedName,
          phone: editedPhone,
          vehicleModel: editedVehicleModel,
          vehicleNumber: editedVehicleNumber,
        }),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      setProfiles((prevProfiles) =>
        prevProfiles.map((profile) =>
          profile.id === editingProfile.id
            ? { ...profile, name: editedName, phone: editedPhone, vehicleModel: editedVehicleModel, vehicleNumber: editedVehicleNumber }
            : profile
        )
      );

      setModalVisible(false);
      setEditingProfile(null);
    } catch (error) {
      Alert.alert("Error", "Failed to update profile");
    }
  };

  const handleDelete = async (vehicleOwnerId: string) => {
    Alert.alert("Confirm", "Are you sure you want to delete this profile?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await fetch(`http://10.0.2.2:5000/api/admin/vehicle-owner-profile/${vehicleOwnerId}`, { method: "DELETE" });
            setProfiles((prevProfiles) => prevProfiles.filter((profile) => profile.id !== vehicleOwnerId));
          } catch (error) {
            Alert.alert("Error", "Failed to delete profile");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehicle Owner Profiles</Text>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.profileImage && <Image source={{ uri: item.profileImage }} style={styles.profileImage} />}
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
            <Text style={styles.phone}>Phone: {item.phone}</Text>
            <Text style={styles.vehicleInfo}>Vehicle Model: {item.vehicleModel || "N/A"}</Text>
            <Text style={styles.vehicleInfo}>Vehicle Number: {item.vehicleNumber || "N/A"}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.vehicleOwnerId)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Vehicle Owner Profile</Text>
            <TextInput style={styles.input} value={editedName} onChangeText={setEditedName} placeholder="Name" />
            <TextInput style={styles.input} value={editedPhone} onChangeText={setEditedPhone} placeholder="Phone" keyboardType="phone-pad" />
            <TextInput style={styles.input} value={editedVehicleModel} onChangeText={setEditedVehicleModel} placeholder="Vehicle Model" />
            <TextInput style={styles.input} value={editedVehicleNumber} onChangeText={setEditedVehicleNumber} placeholder="Vehicle Number" />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdit}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
    card: { padding: 15, marginVertical: 10, backgroundColor: "#f9f9f9", borderRadius: 8 },
    profileImage: { width: 60, height: 60, borderRadius: 30 },
    name: { fontSize: 18, fontWeight: "bold" },
    email: { color: "gray" },
    phone: {},
    vehicleInfo: {},
    buttonContainer: { flexDirection: "row", justifyContent: "space-between" },
    editButton: { backgroundColor: "blue", padding: 10, borderRadius: 5 },
    deleteButton: { backgroundColor: "red", padding: 10, borderRadius: 5 },
    buttonText: { color: "white" },
  
    // Missing styles for modal
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: "80%",
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      elevation: 5,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      textAlign: "center",
    },
    input: {
      width: "100%",
      padding: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      marginBottom: 10,
    },
    modalButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    saveButton: {
      backgroundColor: "green",
      padding: 10,
      borderRadius: 5,
      flex: 1,
      alignItems: "center",
      marginRight: 5,
    },
    cancelButton: {
      backgroundColor: "gray",
      padding: 10,
      borderRadius: 5,
      flex: 1,
      alignItems: "center",
      marginLeft: 5,
    },
  });
export default VehicleOwnerProfileScreen;