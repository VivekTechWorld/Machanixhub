import React from 'react';
import { View, Text, Button, StyleSheet,TouchableOpacity,TextInput,Alert} from 'react-native';
import { NavigationProps } from '../src/navigationTypes';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from 'react';


const ForgetPasswordScreen: React.FC<NavigationProps<'ForgetPassword'>> = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState("mechanic"); // Default to Mechanic

    const handleForgotPassword = async () => {
        const endpoint =
          userType === "mechanic"
            ? "http://10.0.2.2:5000/api/mechanic/forgot-password"
            : "http://10.0.2.2:5000/api/vehicleOwner/forgot-password";
    
        try {
          const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },  
            body: JSON.stringify({ email }),
          });
          console.log(response);
          const data = await response.json();   
          if (response.ok) {
            Alert.alert("Check your email", "We've sent a reset link to your email.");
            navigation.goBack();
          } else {
            Alert.alert("Error", data.message);
          }
        } 
        catch (error) 
        {
            console.error("Registration error:", error);
            Alert.alert("Error", "Something went wrong");
        }
      };
  
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Forgot Password</Text>
    
          <Text style={styles.label}>Select User Type</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.userTypeButton, userType === "mechanic" && styles.selected]}
              onPress={() => setUserType("mechanic")}
            >
              <Text style={styles.userTypeText}>Mechanic</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.userTypeButton, userType === "vehicleOwner" && styles.selected]}
              onPress={() => setUserType("vehicleOwner")}
            >
              <Text style={styles.userTypeText}>Vehicle Owner</Text>
            </TouchableOpacity>
          </View>
    
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
    
          <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
    label: { fontSize: 16, marginBottom: 10 },
    buttonContainer: { flexDirection: "row", marginBottom: 20 },
    userTypeButton: {
      padding: 10,
      marginHorizontal: 5,
      borderWidth: 1,
      borderRadius: 8,
    },
    selected: { backgroundColor: "#007BFF", borderColor: "#007BFF" },
    userTypeText: { fontSize: 16 },
    input: { width: "100%", padding: 10, borderWidth: 1, borderRadius: 8, marginBottom: 10 },
    button: { backgroundColor: "#007BFF", padding: 15, borderRadius: 8 },
    buttonText: { color: "#fff", fontWeight: "bold" },
  });

export default ForgetPasswordScreen;
