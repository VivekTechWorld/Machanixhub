// src/navigationTypes.ts
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// ✅ Define a central type for all navigation screens
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

// ✅ Create a reusable type for navigation props
export type NavigationProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;
