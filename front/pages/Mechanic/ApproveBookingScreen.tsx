// import React, { useEffect, useState } from "react";
// import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from "react-native";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const API_URL = "http://10.0.2.2:5000/api/bookings";
// const API_URL2 = "http://10.0.2.2:5000";
// interface BookingRequest {
//   _id: string;  
//   vehicleOwnerName: string;
//   serviceType: string;
//   vehicleType: string;
//   serviceMode: string;
//   date: string;
//   time: string;
//   status: string;
// }

// const MechanicBookings: React.FC = () => {
//   const [bookings, setBookings] = useState<BookingRequest[]>([]);
//   const [userId, setUserId] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchUserId();
//   }, []);

//   useEffect(() => {
//     if (userId) {
//       fetchBookings();
//     }
//   }, [userId]);

//   const fetchUserId = async () => {
//     try {
//       const token = await AsyncStorage.getItem("authToken");
//       if (!token) return;

//       const response = await axios.get(`${API_URL2}/api/mechanic/profile`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const fetchedUserId = response.data?.data; // Corrected field
//       console.log("Fetched mechanic ID:", fetchedUserId);
//       setUserId(fetchedUserId?.MechanicOwnerid);
//       console.log("Fetched mechanic ID:",fetchedUserId?.MechanicOwnerid);
//     } catch (error) {
//       console.error("Error fetching mechanic ID:", error);
//     }
//   };

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       const token = await AsyncStorage.getItem("authToken");
      
//       if (!userId || !token) return;

//       const response = await axios.get(`${API_URL}/mechanic-bookings?mechanicId=${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log("API Response:", response.data); // Log full response

//       if (response.data.success) {
//         setBookings(response.data.bookings);
//       } else {
//         Alert.alert("Error", "Failed to load bookings.");
//       }
//     } catch (error) {
//       console.error("Error fetching bookings:", error);
//       Alert.alert("Error", "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAction = async (userId: string, action: "approved" | "rejected") => {
//     try {
//       const token = await AsyncStorage.getItem("authToken");
//       const response = await axios.put(
//         `${API_URL}/update-status`,
//         { status: action,MechanicOwnerid:userId},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         Alert.alert("Success", `Booking ${action}`);
//         fetchBookings(); // Refresh list
//       } else {
//         Alert.alert("Error", "Failed to update booking status.");
//       }
//     } catch (error) {
//       console.error(`Error updating booking status: ${error}`);
//       Alert.alert("Error", "Something went wrong.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Booking Requests</Text>

//       {loading ? (
//         <Text>Loading...</Text>
//       ) : (
//         <FlatList
//           data={bookings}
//           keyExtractor={(item) => item._id}
//           renderItem={({ item }) => {
//             const statusColor =
//               item.status === "approved"
//                 ? "green"
//                 : item.status === "rejected"
//                 ? "red"
//                 : "orange";

//             return (
//               <View style={styles.bookingCard}>
//                 <Text style={styles.bookingText}>Owner: {item.vehicleOwnerName}</Text>
//                 <Text style={styles.bookingText}>Service: {item.serviceType}</Text>
//                 <Text style={styles.bookingText}>Vehicle: {item.vehicleType}</Text>
//                 <Text style={styles.bookingText}>Mode: {item.serviceMode}</Text>
//                 <Text style={styles.bookingText}>Date: {item.date}</Text>
//                 <Text style={styles.bookingText}>Time: {item.time}</Text>
//                 <Text style={[styles.statusText, { color: statusColor }]}>
//                   Status: {item.status}
//                 </Text>

//                 {item.status === "Pending" && (
//                   <View style={styles.buttonRow}>
//                     <TouchableOpacity
//                       style={styles.approveButton}
//                       onPress={() => handleAction(item._id, "approved")}
//                     >
//                       <Text style={styles.buttonText}>Approve</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       style={styles.rejectButton}
//                       onPress={() => handleAction(item._id, "rejected")}
//                     >
//                       <Text style={styles.buttonText}>Reject</Text>
//                     </TouchableOpacity>
//                   </View>
//                 )}
//               </View>
//             );
//           }}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
//   title: { fontSize: 20, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
//   bookingCard: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 10, elevation: 3 },
//   bookingText: { fontSize: 16, marginBottom: 5 },
//   statusText: { fontSize: 16, fontWeight: "bold" },
//   buttonRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
//   approveButton: { backgroundColor: "green", padding: 10, borderRadius: 5, flex: 1, marginRight: 5 },
//   rejectButton: { backgroundColor: "red", padding: 10, borderRadius: 5, flex: 1, marginLeft: 5 },
//   buttonText: { color: "#fff", textAlign: "center", fontSize: 16, fontWeight: "bold" },
// });

// export default MechanicBookings;


import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, Modal, TextInput } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://10.0.2.2:5000/api/bookings";
const API_URL2 = "http://10.0.2.2:5000";

interface BookingRequest {
  _id: string;  
  vehicleOwnerName: string;
  serviceType: string;
  vehicleType: string;
  serviceMode: string;
  date: string;
  time: string;
  status: string;
}

const MechanicBookings: React.FC = () => {
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [estimatedCost, setEstimatedCost] = useState("");

  useEffect(() => {
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchBookings();
    }
  }, [userId]);

  const fetchUserId = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) return;

      const response = await axios.get(`${API_URL2}/api/mechanic/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const fetchedUserId = response.data?.data?.MechanicOwnerid;
      setUserId(fetchedUserId);
    } catch (error) {
      console.error("Error fetching mechanic ID:", error);
    }
  };

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("authToken");
      if (!userId || !token) return;

      const response = await axios.get(`${API_URL}/mechanic-bookings?mechanicId=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setBookings(response.data.bookings);
      } else {
        Alert.alert("Error", "Failed to load bookings.");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      Alert.alert("Error", "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (bookingId: string, action: "approved" | "rejected", description?: string, estimatedCost?: number) => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      // If approving, ensure mechanic enters description & estimated cost
      if (action === "approved" && (!description || !estimatedCost)) {
        Alert.alert("Error", "Please provide a description and estimated cost.");
        return;
      }

      const response = await axios.put(
        `${API_URL}/update-status`,
        { status: action, MechanicOwnerid: userId, description, estimatedCost },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        Alert.alert("Success", `Booking ${action}`);
        fetchBookings(); // Refresh list
      } else {
        Alert.alert("Error", "Failed to update booking status.");
      }
    } catch (error) {
      console.error(`Error updating booking status: ${error}`);
      Alert.alert("Error", "Something went wrong.");
    }
  };

  const openApprovalModal = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setDescription("");
    setEstimatedCost("");
    setModalVisible(true);
  };

  const submitApproval = () => {
    if (!selectedBookingId) return;
    handleAction(selectedBookingId, "approved", description, Number(estimatedCost));
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Requests</Text>

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            const statusColor =
              item.status === "approved" ? "green" :
              item.status === "rejected" ? "red" : "orange";

            return (
              <View style={styles.bookingCard}>
                <Text style={styles.bookingText}>Owner: {item.vehicleOwnerName}</Text>
                <Text style={styles.bookingText}>Service: {item.serviceType}</Text>
                <Text style={styles.bookingText}>Vehicle: {item.vehicleType}</Text>
                <Text style={styles.bookingText}>Mode: {item.serviceMode}</Text>
                <Text style={styles.bookingText}>Date: {item.date}</Text>
                <Text style={styles.bookingText}>Time: {item.time}</Text>
                <Text style={[styles.statusText, { color: statusColor }]}>
                  Status: {item.status}
                </Text>

                {item.status === "pending" && (
                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={styles.approveButton}
                      onPress={() => openApprovalModal(item._id)}
                    >
                      <Text style={styles.buttonText}>Approve</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.rejectButton}
                      onPress={() => handleAction(item._id, "rejected")}
                    >
                      <Text style={styles.buttonText}>Reject</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          }}
        />
      )}

      {/* Approval Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Service Details</Text>
            <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
            <TextInput style={styles.input} placeholder="Estimated Cost" value={estimatedCost} onChangeText={setEstimatedCost} keyboardType="numeric" />
            <TouchableOpacity style={styles.submitButton} onPress={submitApproval}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  bookingCard: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 10, elevation: 3 },
  bookingText: { fontSize: 16, marginBottom: 5 },
  statusText: { fontSize: 16, fontWeight: "bold" },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  approveButton: { backgroundColor: "green", padding: 10, borderRadius: 5, flex: 1, marginRight: 5 },
  rejectButton: { backgroundColor: "red", padding: 10, borderRadius: 5, flex: 1, marginLeft: 5 },
  buttonText: { color: "#fff", textAlign: "center", fontSize: 16, fontWeight: "bold" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "white", padding: 20, borderRadius: 10, width: "80%" },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 },
  submitButton: { backgroundColor: "green", padding: 10, borderRadius: 5, marginBottom: 5 },
  cancelButton: { backgroundColor: "gray", padding: 10, borderRadius: 5 },
});

export default MechanicBookings;
