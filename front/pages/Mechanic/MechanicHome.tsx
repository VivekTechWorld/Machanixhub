// import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';
// import { NavigationProps } from '../../src/navigationTypes';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useEffect } from 'react';



// const MechanicHome: React.FC<{ navigation: any }> = ({ navigation }) => {
//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = await AsyncStorage.getItem("authToken");
//       if (!token) {
//         navigation.navigate("AfLogin"); // Redirect if no token
//       }
//     };
//     checkAuth();
//   }, []);
  
//   return (
//     <View>
//     <Text>Welcome to the Mechanic home page !</Text>
//   </View>
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

// export default MechanicHome;


// frontend/screens/MechanicHome.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the types for navigation and data structure
type MechanicHomeProps = {
    navigation: StackNavigationProp<any>;
};

type Booking = {
    _id: string;
    serviceType: string;
    date: string;
};

type MechanicDashboardData = {
    mechanic: {
        name: string;
    };
    pendingBookings: Booking[];
    upcomingBookings: Booking[];
    completedBookings: Booking[];
};

const MechanicHome: React.FC<MechanicHomeProps> = ({ navigation }) => {
    const [dashboardData, setDashboardData] = useState<MechanicDashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const mechanicId = '123456'; // Replace with dynamic mechanic ID

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const response = await axios.get<MechanicDashboardData>(`http://localhost:5000/api/mechanics/dashboard/${mechanicId}`);
            setDashboardData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View>
            {dashboardData ? (
                <>
                    <Text>Welcome, {dashboardData.mechanic.name}</Text>
                    <Text>Pending Requests: {dashboardData.pendingBookings.length}</Text>
                    <FlatList
                        data={dashboardData.pendingBookings}
                        renderItem={({ item }) => (
                            <TouchableOpacity>
                                <Text>{item.serviceType} - {item.date}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item._id}
                    />
                </>
            ) : (
                <Text>No Data Available</Text>
            )}
        </View>
    );
};

export default MechanicHome;
