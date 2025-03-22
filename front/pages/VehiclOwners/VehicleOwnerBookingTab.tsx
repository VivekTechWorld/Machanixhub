// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const API_URL = "http://10.0.2.2:5000/api/bookings/approved";
// const API_URL2 = "http://10.0.2.2:5000";

// // ✅ Define Types
// interface Booking {
//   _id: string;
//   description: string;
//   date: string;
//   estimatedCost: number;
//   vehicleOwnerId: string;
// }

// interface VehicleOwner {
//   vehicleOwnerId: string;
//   name: string;
//   phone: string;
//   vehicleModel : string;
//   vehicleNumber : string;
// }

// const BookingScreen = () => {
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [vehicleOwners, setVehicleOwners] = useState<VehicleOwner[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");
//   const [userId, setUserId] = useState<string | null>(null);

//   useEffect(() => {
//     fetchUserId();
//   }, []);

//   const fetchUserId = async () => {
//     try {
//       const token = await AsyncStorage.getItem("authToken");
//       if (!token) return;

//       const response = await axios.get(`${API_URL2}/api/mechanic/profile`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const fetchedUserId = response.data?.data?.MechanicOwnerid;
//       setUserId(fetchedUserId);
//       console.log("Fetched User ID:", fetchedUserId);
//     } catch (error) {
//       console.error("Error fetching mechanic ID:", error);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       fetchApprovedBookings();
//     }
//   }, [userId]); // ✅ Fetch bookings only when userId is set

//   const fetchApprovedBookings = async () => {
//     try {
//       const response = await axios.get<{ bookings: Booking[]; vehicleOwners: VehicleOwner[] }>(
//         `${API_URL}/${userId}`
//       );

//       setBookings(response.data.bookings);
//       setVehicleOwners(response.data.vehicleOwners);
//       console.log("Approved Bookings:", response.data.bookings);
//       console.log("Vehicle Owners:", response.data.vehicleOwners);
//     } catch (err) {
//       setError("Failed to load bookings");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Approved Bookings for the vehicleOwner</Text>

//       {loading ? (
//         <ActivityIndicator size="large" color="blue" />
//       ) : error ? (
//         <Text style={styles.error}>{error}</Text>
//       ) : bookings.length === 0 ? (
//         <Text style={styles.noData}>No approved bookings found</Text>
//       ) : (
//         <FlatList
//           data={bookings}
//           keyExtractor={(item) => item._id}
//           renderItem={({ item }) => {
//             const owner = vehicleOwners.find((owner) => owner.vehicleOwnerId === item.vehicleOwnerId);

//             return (
//               <View style={styles.card}>
//                 <Text style={styles.title}>{item.description}</Text>
//                 <Text style={styles.text}>📅 Date: {item.date}</Text>
//                 <Text style={styles.text}>💰 Estimated Cost: ${item.estimatedCost}</Text>
//                 {owner ? (
//                   <>
//                     <Text style={styles.text}>👤 Owner: {owner.name}</Text>
//                     <Text style={styles.text}>📞 Phone: {owner.phone}</Text>
//                     <Text style={styles.text}>VehicleModel: {owner.vehicleModel}</Text>
//                     <Text style={styles.text}>VehicleNumber: {owner.vehicleNumber}</Text>
//                   </>
//                 ) : (
//                   <Text style={styles.text}>⚠️ Owner details not found</Text>
//                 )}
//               </View>
//             );
//           }}
//         />
//       )}
//     </View>
//   );
// };

// // ✅ Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8f9fa",
//     padding: 15,
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 15,
//   },
//   card: {
//     backgroundColor: "#fff",
//     padding: 15,
//     marginVertical: 8,
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   text: {
//     fontSize: 16,
//     color: "#555",
//   },
//   error: {
//     color: "red",
//     textAlign: "center",
//     marginTop: 20,
//   },
//   noData: {
//     color: "#555",
//     textAlign: "center",
//     marginTop: 20,
//   },
// });

// export default BookingScreen;


import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://10.0.2.2:5000/api/bookings/approved/vehicle";
const API_URL2 = "http://10.0.2.2:5000";

// ✅ Define Types
interface Booking {
  _id: string;
  description: string;
  date: string;
  estimatedCost: number;
  mechanicId: string;
}

interface Mechanic {
  MechanicOwnerid: string;
  name: string;
  phone: string;
  specialization: string;
}

interface VehicleOwner {
  vehicleOwnerId: string;
  name: string;
  phone: string;
  vehicleModel: string;
  vehicleNumber: string;
}

const BookingScreen = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [vehicleOwner, setVehicleOwner] = useState<VehicleOwner | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [vehicleOwnerId, setVehicleOwnerId] = useState<string | null>(null);

  useEffect(() => {
    fetchVehicleOwnerId();
  }, []);

  const fetchVehicleOwnerId = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) return;

      const response = await axios.get(`${API_URL2}/api/vehicleOwner/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Response:", response.data);
      const fetchedVehicleOwnerId = response.data.vehicleOwnerId;
      setVehicleOwnerId(fetchedVehicleOwnerId);
      console.log("Fetched Vehicle Owner ID:", fetchedVehicleOwnerId);
    } catch (error) {
      console.error("Error fetching vehicle owner ID:", error);
    }
  };

  useEffect(() => {
    if (vehicleOwnerId) {
      fetchApprovedBookings();
    }
  }, [vehicleOwnerId]);

  const fetchApprovedBookings = async () => {
    try {
      const response = await axios.get<{ bookings: Booking[]; mechanics: Mechanic[]; vehicleOwner: VehicleOwner }>(
        `${API_URL}/${vehicleOwnerId}`,
      );
      
      console.log("Approved Bookings:", response.data.bookings);
      console.log("Mechanics:", response.data.mechanics);
      console.log("Vehicle Owner:", response.data.vehicleOwner);
      setBookings(response.data.bookings);
      setMechanics(response.data.mechanics);
      setVehicleOwner(response.data.vehicleOwner);
    } catch (err) {
      setError("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Approved Bookings</Text>

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : bookings.length === 0 ? (
        <Text style={styles.noData}>No approved bookings found</Text>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            const mechanic = mechanics.find((mech) => mech.MechanicOwnerid === item.mechanicId);

            return (
              <View style={styles.card}>
                <Text style={styles.title}>{item.description}</Text>
                <Text style={styles.text}>📅 Date: {item.date}</Text>
                <Text style={styles.text}>💰 Estimated Cost: ${item.estimatedCost}</Text>
                
                {mechanic ? (
                  <>
                    <Text style={styles.text}>🛠️ Mechanic: {mechanic.name}</Text>
                    <Text style={styles.text}>📞 Phone: {mechanic.phone}</Text>
                    <Text style={styles.text}>🔧 Specialization: {mechanic.specialization}</Text>
                  </>
                ) : (
                  <Text style={styles.text}>⚠️ Mechanic details not found</Text>
                )}
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

// ✅ Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", padding: 15 },
  header: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 15 },
  card: { backgroundColor: "#fff", padding: 15, marginVertical: 8, borderRadius: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4, elevation: 3 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  text: { fontSize: 16, color: "#555" },
  error: { color: "red", textAlign: "center", marginTop: 20 },
  noData: { color: "#555", textAlign: "center", marginTop: 20 },
});

export default BookingScreen;
