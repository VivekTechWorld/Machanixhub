import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Alert, StyleSheet, TouchableOpacity, TextInput, Modal } from "react-native";

// Define the TypeScript type for Vehicle Owner
interface VehicleOwner {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

const VehicleOwnerScreen: React.FC = () => {
  const [owners, setOwners] = useState<VehicleOwner[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingOwner, setEditingOwner] = useState<VehicleOwner | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    try {
      const response = await fetch("http://10.0.2.2:5000/api/admin/vehicle-owner");
      const data: VehicleOwner[] = await response.json();
      setOwners(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch owners");
    }
  };

  const handleEdit = (owner: VehicleOwner) => {
    setEditingOwner(owner);
    setEditedName(owner.name);
    setEditedEmail(owner.email);
    setUpdatedAt(new Date().toISOString()); // Update the updatedAt field with the current time
    setModalVisible(true);
  };

  const handleSaveEdit = async () => {
    if (!editingOwner) return;
    try {
      const response = await fetch(`http://10.0.2.2:5000/api/admin/vehicle-owner/${editingOwner.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editedName, email: editedEmail, updatedAt }),
      });

      if (!response.ok) throw new Error("Failed to update owner");

      setOwners((prevOwners) =>
        prevOwners.map((owner) =>
          owner.id === editingOwner.id ? { ...owner, name: editedName, email: editedEmail, updatedAt } : owner
        )
      );

      setModalVisible(false);
      setEditingOwner(null);
    } catch (error) {
      Alert.alert("Error", "Failed to update owner");
    }
  };

  const handleDelete = async (id: string) => {
    Alert.alert("Confirm", "Are you sure you want to delete this owner?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await fetch(`http://10.0.2.2:5000/api/admin/vehicle-owner/${id}`, { method: "DELETE" });
            setOwners((prevOwners) => prevOwners.filter((owner) => owner.id !== id));
          } catch (error) {
            Alert.alert("Error", "Failed to delete owner");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehicle Owners</Text>
      <FlatList
        data={owners}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
            <Text style={styles.date}>Created: {new Date(item.createdAt).toLocaleString()}</Text>
            <Text style={styles.date}>Updated: {new Date(item.updatedAt).toLocaleString()}</Text>

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
            <Text style={styles.modalTitle}>Edit Vehicle Owner</Text>

            <TextInput style={styles.input} value={editedName} onChangeText={setEditedName} placeholder="Name" />
            <TextInput style={styles.input} value={editedEmail} onChangeText={setEditedEmail} placeholder="Email" keyboardType="email-address" />

            <Text style={styles.label}>Updated At</Text>
            <TextInput style={styles.input} value={updatedAt} editable={false} />

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
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#f8f9fa",
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
    },
    card: {
      backgroundColor: "#fff",
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
      elevation: 2,
    },
    name: {
      fontSize: 18,
      fontWeight: "bold",
    },
    email: {
      fontSize: 16,
      color: "#555",
    },
    date: {
      fontSize: 14,
      color: "#777",
      marginTop: 5,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    editButton: {
      backgroundColor: "#007bff",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    deleteButton: {
      backgroundColor: "#dc3545",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: "80%",
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 10,
      elevation: 5,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 15,
      textAlign: "center",
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      padding: 10,
      marginBottom: 10,
      fontSize: 16,
    },
    label: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 5,
    },
    modalButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 15,
    },
    saveButton: {
      backgroundColor: "#28a745",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    cancelButton: {
      backgroundColor: "#6c757d",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
  });
  

export default VehicleOwnerScreen;