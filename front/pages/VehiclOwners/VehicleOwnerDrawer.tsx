import React from "react";
import { View, Text, StyleSheet } from "react-native";

const VehicleOwnerDrawer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Sc</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default VehicleOwnerDrawer;

