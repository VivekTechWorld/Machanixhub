// import React, { useEffect, useState } from "react";
// import { View, TextInput, Button, Alert } from "react-native";
// import { NavigationProps } from "../src/navigationTypes";
// import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";

// // Define the expected params for this screen
// type ResetPasswordParams = {
//   ResetPasswordScreen: { token: string; userType: string };
// };

// const ResetPasswordScreen: React.FC<NavigationProps<"ResetPasswordScreen">> = ({ navigation }) => {
//   const [newPassword, setNewPassword] = useState("");
//   const [token, setToken] = useState("");
//   const [userType, setUserType] = useState("");

//   const route = useRoute<RouteProp<ResetPasswordParams, "ResetPasswordScreen">>();

//   useEffect(() => {
//     if (route.params?.token && route.params?.userType) {
//       setToken(route.params.token);
//       setUserType(route.params.userType);
//     }
//   }, [route.params]);

//   const handleResetPassword = async () => {
//     if (!newPassword) {
//       Alert.alert("Error", "Please enter a new password.");
//       return;
//     }

//     const endpoint =
//       userType === "mechanic"
//         ? "http://10.0.2.2:5000/api/mechanic/reset-password"
//         : "http://10.0.2.2:5000/api/vehicle-owner/reset-password";

//     try {
//       const response = await fetch(endpoint, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token, newPassword }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         Alert.alert("Success", "Password reset successful!");
//         navigation.navigate("AfLogin"); // Redirect
//       } else {
//         Alert.alert("Error", data.message);
//       }
//     } catch (error) {
//       Alert.alert("Error", "Something went wrong");
//     }
//   };

//   return (
//     <View>
//       <TextInput
//         placeholder="Enter new password"
//         value={newPassword}
//         onChangeText={setNewPassword}
//         secureTextEntry
//       />
//       <Button title="Reset Password" onPress={handleResetPassword} />
//     </View>
//   );
// };

// export default ResetPasswordScreen;



import React, { useEffect, useState } from "react";
import { View, TextInput, Button, Alert, ActivityIndicator, StyleSheet } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NavigationProps } from "../src/navigationTypes";

// Define the expected params for this screen
type ResetPasswordParams = {
  ResetPasswordScreen: { token: string; userType: string };
};

const ResetPasswordScreen: React.FC<NavigationProps<"ResetPasswordScreen">> = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(false);

  const route = useRoute<RouteProp<ResetPasswordParams, "ResetPasswordScreen">>();

  useEffect(() => {
    console.log("Received token:", route.params?.token);
    console.log("Received userType:", route.params?.userType);
    if (route.params?.token && route.params?.userType) {
      setToken(route.params.token);
      setUserType(route.params.userType);
    }
  }, [route.params]);

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    const endpoint =
      userType === "mechanic"
      ? "http://10.0.2.2:5000/api/mechanic/reset-password"
      : "http://10.0.2.2:5000/api/vehicleOwner/reset-password";

    setLoading(true);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Password reset successful!");
        navigation.navigate("AfLogin");
      } else {
        Alert.alert("Error", data.message || "Failed to reset password.");
      }
    } catch (error) {
      console.error("error in reset pass:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter new password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm new password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <Button title="Reset Password" onPress={handleResetPassword} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default ResetPasswordScreen;
