// import React from "react";
// import { View, Text, Button, StyleSheet } from "react-native";

// const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to MechanixHub</Text>
//       <Button title="Vehicle Owner" onPress={() => navigation.navigate("VehicleOwnerScreen")} />
//       <Button title="Vehicle Owner Profile" onPress={() => navigation.navigate("VehicleOwnerProfileScreen")} />
//       <Button title="Mechanic" onPress={() => navigation.navigate("MechanicScreen")} />
//       <Button title="Mechanic Owner Profile" onPress={() => navigation.navigate("MechanicOwnerProfileScreen")} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f8f9fa",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
// });

// export default HomeScreen;

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const menuItems = [
    { title: "Vehicle Owner", screen: "adminVehicleOwnerScreen", icon: "directions-car", color: "#3498db" },
    { title: "Vehicle Owner Profile", screen: "adminVehicleOwnerProfileScreen", icon: "person", color: "#2ecc71" },
    { title: "Mechanic", screen: "adminMechanicScreen", icon: "build", color: "#f39c12" },
    { title: "Mechanic Owner Profile", screen: "adminMechanicOwnerProfileScreen", icon: "engineering", color: "#e74c3c" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <View style={styles.grid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.card, { backgroundColor: item.color }]} 
            onPress={() => navigation.navigate(item.screen)}
          >
            <MaterialIcons name={item.icon} size={30} color="#fff" />
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  grid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "45%",
    height: 120,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  cardText: {
    marginTop: 10,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeScreen;
