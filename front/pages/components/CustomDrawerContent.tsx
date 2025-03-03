import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList } from '../../src/navigationTypes'; // Ensure you have defined RootStackParamList

const CustomDrawerContent = (props: any) => {
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userRole');
    navigation.reset({
      index: 0,
      routes: [{ name: 'AfLogin' as keyof RootStackParamList }], // Explicitly cast to valid route name
    });
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Text style={styles.username}>MechanixHub</Text>
      </View>
      <DrawerItemList {...props} />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#009688',
    alignItems: 'center',
  },
  username: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#d9534f',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CustomDrawerContent;
