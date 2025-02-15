import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  Alert
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { NavigationProps } from "../src/navigationTypes";

const RegisterScreen: React.FC<NavigationProps<'Register'>> = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState<"Mechanic" | "Vehicle Owner">("Mechanic");
  const [name, setName] = useState("");
  const [bussinessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const apiUrl =
        selectedRole === "Mechanic"
          ? "http://10.0.2.2:5000/api/mechanic/register"
          : "http://10.0.2.2:5000/api/vehicleOwner/register";
  
      const requestBody =
        selectedRole === "Mechanic"
          ? {
              name,
              phone,
              email,
              password,
              bussinessName, // <-- Include bussinessName
            }
          : {
              name,
              phone,
              email,
              password,
            };
  
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      console.log('all are clear');
      const text = await response.text(); // Get the raw response text
      let data;
      try {
        data = JSON.parse(text); // Try to parse it as JSON
      } catch (e) {
        console.error("Failed to parse JSON:", text);
        throw new Error("Invalid JSON response");
      }
  
      if (response.ok) {
        Alert.alert("Registration Successful!");
      } else {
        Alert.alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Registration error:", error);
      Alert.alert("Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's Register Account</Text>
      <Text style={styles.subtitle}>Hello user, you have a great journey ahead</Text>

      {/* Name */}
      <TextInput 
        style={styles.input} 
        placeholder="Name" 
        value={name} 
        onChangeText={setName} 
      />

      {/* Business Name (Only for Mechanics) */}
      {selectedRole === "Mechanic" && (
        <TextInput 
          style={styles.input} 
          placeholder="Business Name" 
          value={bussinessName} 
          onChangeText={setBusinessName} 
        />
      )}

      {/* Phone */}
      <TextInput 
        style={styles.input} 
        placeholder="Phone" 
        keyboardType="phone-pad" 
        value={phone} 
        onChangeText={setPhone} 
      />

      {/* Email */}
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        keyboardType="email-address" 
        value={email} 
        onChangeText={setEmail} 
      />

      {/* Password */}
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
      />

      {/* Role Selection */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedRole}
          onValueChange={(itemValue) => setSelectedRole(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Mechanic" value="Mechanic" />
          <Picker.Item label="Vehicle Owner" value="Vehicle Owner" />
        </Picker>
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signupButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Navigation to Login */}
      <Text style={styles.loginText}>
        Already have an account?  
        <Text style={styles.loginLink} onPress={() => navigation.navigate("Login")}> Login</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
    alignSelf: "flex-start",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  pickerContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  signupButton: {
    backgroundColor: "#5a67f2",
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    fontSize: 14,
    color: "#555",
    marginTop: 10,
  },
  loginLink: {
    color: "#5a67f2",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
