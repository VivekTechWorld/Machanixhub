import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Alert, StyleSheet, TouchableOpacity, TextInput, Modal } from "react-native";

// Define the TypeScript type for Mechanic
interface Mechanic {
  id: string;
  name: string;
  bussinessName: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

const MechanicScreen: React.FC = () => {
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingMechanic, setEditingMechanic] = useState<Mechanic | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedBusinessName, setEditedBusinessName] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [editedEmail, setEditedEmail] = useState("");

  useEffect(() => {
    fetchMechanics();
  }, []);

  const fetchMechanics = async () => {
    try {
      const response = await fetch("http://10.0.2.2:5000/api/admin/mechanic");
      const data: Mechanic[] = await response.json();
      setMechanics(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch mechanics");
    }
  };

  const handleEdit = (mechanic: Mechanic) => {
    setEditingMechanic(mechanic);
    setEditedName(mechanic.name);
    setEditedBusinessName(mechanic.bussinessName);
    setEditedPhone(mechanic.phone);
    setEditedEmail(mechanic.email);
    setModalVisible(true);
  };

  const handleSaveEdit = async () => {
    if (!editingMechanic) return;
    try {
      await fetch(`http://10.0.2.2:5000/api/admin/mechanic/${editingMechanic.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editedName,
          bussinessName: editedBusinessName,
          phone: editedPhone,
          email: editedEmail,
        }),
      });
      fetchMechanics();
      setModalVisible(false);
    } catch (error) {
      Alert.alert("Error", "Failed to update mechanic");
    }
  };

  const handleDelete = async (id: string) => {
    Alert.alert("Confirm", "Are you sure you want to delete this mechanic?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await fetch(`http://10.0.2.2:5000/api/admin/mechanic/${id}`, { method: "DELETE" });
            fetchMechanics();
          } catch (error) {
            Alert.alert("Error", "Failed to delete mechanic");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mechanics</Text>
      <FlatList
        data={mechanics}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
            <Text style={styles.phone}>Phone: {item.phone}</Text>
            <Text style={styles.business}>Business: {item.bussinessName}</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
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
            <Text style={styles.modalTitle}>Edit Mechanic</Text>
            <TextInput style={styles.input} value={editedName} onChangeText={setEditedName} placeholder="Name" />
            <TextInput style={styles.input} value={editedBusinessName} onChangeText={setEditedBusinessName} placeholder="Business Name" />
            <TextInput style={styles.input} value={editedPhone} onChangeText={setEditedPhone} placeholder="Phone" keyboardType="phone-pad" />
            <TextInput style={styles.input} value={editedEmail} onChangeText={setEditedEmail} placeholder="Email" keyboardType="email-address" />
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
  email: { fontSize: 16, color: "#555" },
  phone: { fontSize: 16, color: "#555" },
  business: { fontSize: 16, color: "#777" },
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

export default MechanicScreen;
