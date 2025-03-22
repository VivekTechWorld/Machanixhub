import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Alert, StyleSheet, TouchableOpacity, TextInput, Modal } from "react-native";

// Define the TypeScript type for MechanicProfile
interface MechanicProfile {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  rating: string;
  reviews: string;
  phone: string;
  location: { type: string; coordinates: number[] };
  profileImage: string;
  MechanicOwnerid : string;
}

const MechanicProfileScreen: React.FC = () => {
  const [profiles, setProfiles] = useState<MechanicProfile[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProfile, setEditingProfile] = useState<MechanicProfile | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedSpecialization, setEditedSpecialization] = useState("");
  const [editedPhone, setEditedPhone] = useState("");

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await fetch("http://10.0.2.2:5000/api/admin/mechanic-owner-profile");
      const data: MechanicProfile[] = await response.json();
      setProfiles(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch mechanic profiles");
    }
  };

  const handleEdit = (profile: MechanicProfile) => {
    setEditingProfile(profile);
    setEditedName(profile.name);
    setEditedSpecialization(profile.specialization);
    setEditedPhone(profile.phone);
    setModalVisible(true);
  };

  const handleSaveEdit = async () => {
    if (!editingProfile) return;
    try {
      await fetch(`http://10.0.2.2:5000/api/admin/mechanic-owner-profile/${editingProfile.MechanicOwnerid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editedName, specialization: editedSpecialization, phone: editedPhone }),
      });
      fetchProfiles();
      setModalVisible(false);
    } catch (error) {
      Alert.alert("Error", "Failed to update profile");
    }
  };

  const handleDelete = async (MechanicOwnerid: string) => {
    Alert.alert("Confirm", "Are you sure you want to delete this profile?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await fetch(`http://10.0.2.2:5000/api/admin/mechanic-owner-profile/${MechanicOwnerid}`, { method: "DELETE" });
            fetchProfiles();
          } catch (error) {
            Alert.alert("Error", "Failed to delete profile");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mechanic Profiles</Text>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.detail}>Specialization: {item.specialization}</Text>
            <Text style={styles.detail}>Experience: {item.experience} years</Text>
            <Text style={styles.detail}>Phone: {item.phone}</Text>
            <Text style={styles.detail}>Rating: {item.rating} ⭐</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.MechanicOwnerid)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Edit Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TextInput style={styles.input} value={editedName} onChangeText={setEditedName} placeholder="Name" />
            <TextInput style={styles.input} value={editedSpecialization} onChangeText={setEditedSpecialization} placeholder="Specialization" />
            <TextInput style={styles.input} value={editedPhone} onChangeText={setEditedPhone} placeholder="Phone" keyboardType="phone-pad" />
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
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  card: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 10, elevation: 2 },
  name: { fontSize: 18, fontWeight: "bold" },
  detail: { fontSize: 16, color: "#555" },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  editButton: { backgroundColor: "#007bff", padding: 10, borderRadius: 8 },
  deleteButton: { backgroundColor: "#dc3545", padding: 10, borderRadius: 8 },
  buttonText: { color: "#fff", fontWeight: "bold" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "#fff", padding: 20, borderRadius: 10, width: "80%" },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 8 },
  modalButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  saveButton: { backgroundColor: "#28a745", padding: 10, borderRadius: 8, flex: 1, marginRight: 5 },
  cancelButton: { backgroundColor: "#dc3545", padding: 10, borderRadius: 8, flex: 1, marginLeft: 5 },
});

export default MechanicProfileScreen;