import React, { useEffect, useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { NavigationProps } from "../src/navigationTypes";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";

// Define the expected params for this screen
type ResetPasswordParams = {
  ResetPasswordScreen: { token: string; userType: string };
};

const ResetPasswordScreen: React.FC<NavigationProps<"ResetPasswordScreen">> = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState("");
  const [userType, setUserType] = useState("");

  const route = useRoute<RouteProp<ResetPasswordParams, "ResetPasswordScreen">>();

  useEffect(() => {
    if (route.params?.token && route.params?.userType) {
      setToken(route.params.token);
      setUserType(route.params.userType);
    }
  }, [route.params]);

  const handleResetPassword = async () => {
    if (!newPassword) {
      Alert.alert("Error", "Please enter a new password.");
      return;
    }

    const endpoint =
      userType === "mechanic"
        ? "http://10.0.2.2:5000/api/mechanic/reset-password"
        : "http://10.0.2.2:5000/api/vehicle-owner/reset-password";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Password reset successful!");
        navigation.navigate("AfLogin"); // Redirect
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter new password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <Button title="Reset Password" onPress={handleResetPassword} />
    </View>
  );
};

export default ResetPasswordScreen;
