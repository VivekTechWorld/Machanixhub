// DrawerNavigator.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import VehicleOwnerHome from './VehicleOwnerDrawer';
import MechanicHome from './MechanicHome';
import ProfileScreen from './vehicleOwnersProfile';
import { NavigationProps } from '../../src/navigationTypes';

const Drawer = createDrawerNavigator();

interface DrawerNavigatorProps {
  initialRoute: string;
}

const DrawerNavigator: React.FC<NavigationProps<'DrawerNavigator'>> = ({ navigation }) => {
  return (
    <Drawer.Navigator initialRouteName="VehicleOwnerHome">
      <Drawer.Screen name="VehicleOwnerHome" component={VehicleOwnerHome} />
      <Drawer.Screen name="MechanicHome" component={MechanicHome} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;