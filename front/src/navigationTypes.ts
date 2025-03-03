// src/navigationTypes.ts
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DrawerScreenProps } from '@react-navigation/drawer';

// ✅ Define a central type for all navigation screens
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  AfLogin: undefined;
  Register: undefined;
  ForgetPassword: undefined;
  ResetPasswordScreen : undefined;
  VehicleOwnerHome : undefined;
  MechanicHome : undefined; 
  VehicleOwnerDrawer : undefined;
  MechanicDrawer: undefined; // Add this line
  DrawerNavigator: undefined; // ✅ Add this line
  MechanicOwnerDrawer :undefined;
};

// ✅ Create a reusable type for navigation props
export type NavigationProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

export type DrawerNavigationProps<T extends keyof RootStackParamList> = DrawerScreenProps<RootStackParamList, T>;

// import { DrawerScreenProps } from '@react-navigation/drawer';

// export type RootStackParamList = {
//   Login: undefined;
//   Home: undefined;
//   AfLogin: undefined;
//   Register: undefined;
//   ForgetPassword: undefined;
//   ResetPasswordScreen: undefined;
//   VehicleOwnerHome: undefined;
//   MechanicHome: undefined;
//   VehicleOwnerDrawer: undefined;
//   MechanicDrawer: undefined;
//   DrawerNavigator : undefined;
// };

// // 🔥 Use `DrawerScreenProps` instead of `NativeStackScreenProps`
// export type NavigationProps<T extends keyof RootStackParamList> = DrawerScreenProps<RootStackParamList, T>;
