// import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';
// import { NavigationProps } from '../src/navigationTypes';

// const AfLogin: React.FC<NavigationProps<'AfLogin'>> = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Welcome to MechanixHub!</Text>
//       <Button title="Go Back" onPress={() => navigation.goBack()} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
// });

// export default AfLogin;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NavigationProps } from '../src/navigationTypes';
import AsyncStorage from "@react-native-async-storage/async-storage";


const AfLogin: React.FC<NavigationProps<'AfLogin'>> = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState<'Mechanic' | 'VehicleOwner'>('Mechanic');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    
    try
    {
      console.log("📨 Sending Login Request:", { email, password }); // Debugging line
      const apiUrl=
      selectedRole === "Mechanic"
          ? "http://10.0.2.2:5000/api/mechanic/login"
          : "http://10.0.2.2:5000/api/vehicleOwner/login";

          const response=await fetch(apiUrl,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email,password})
          });

          const data= await response.json();
          if(response.ok)
          {
            await AsyncStorage.setItem("authToken",data.token);

            Alert.alert("Login Successful","",[
              {text:"OK",onPress:()=>navigation.navigate("Home")}
            ]);
          }
          else
          {
            Alert.alert("Error",data.message || "Invalid login credentials");
          }        
    }
    catch(error)
    {
      console.error(error);
      Alert.alert("Error","Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

     

      {/* Email Input */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Role Selection */}
     <Text style={styles.label}>Select Your Role</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedRole}
          onValueChange={(itemValue) => setSelectedRole(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Mechanic" value="Mechanic" />
          <Picker.Item label="Vehicle Owner" value="VehicleOwner" />
        </Picker>
      </View>



      {/* Login Button (Color Changes Based on Role) */}
      <TouchableOpacity
        style={[styles.loginButton, { backgroundColor: selectedRole === 'Mechanic' ? '#FF5C5C' : '#007BFF' }]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Continue as {selectedRole}</Text>
      </TouchableOpacity>

      {/* Navigation to Login */}
      <Text style={styles.ForgetPasswordText}>
        <Text style={styles.ForgetPasswordButton} onPress={() => navigation.navigate("ForgetPassword")}>Forget Password?</Text>
      </Text>



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  pickerContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    // marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  loginButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  ForgetPasswordContainer:{
    marginTop: 20, // increased margin for better spacing
    alignItems: 'flex-end', //Align to the right.
    paddingRight: 10, // add some padding to the right for better spacing.
},
ForgetPasswordText: {
    fontSize: 16, // Increased font size
    fontWeight: '600', // Slightly bolder
    color: '##0f0c04', // A vibrant blue (you can customize this)
    textDecorationLine: 'underline', // Underline to indicate a link
    cursor: 'pointer', // Indicates it's clickable (for web)
    paddingVertical: 5, // add some padding to the top and bottom.
},
ForgetPasswordButton:{
    color: '##0f0c04', // a darker blue for hover effect.
}

});

export default AfLogin;
