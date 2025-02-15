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
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NavigationProps } from '../src/navigationTypes';

const AfLogin: React.FC<NavigationProps<'AfLogin'>> = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState<'Mechanic' | 'VehicleOwner'>('Mechanic');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (selectedRole === 'Mechanic') {
      navigation.navigate('Login');
    } else {
      navigation.navigate('Home');
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
});

export default AfLogin;
