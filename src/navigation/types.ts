import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Auth Screens (before login)
export type AuthStackParamList = {
  Login: undefined;
  OTPScreen: undefined;
  RegisterScreen: undefined;
};

// Main Screens (after login)
export type MainStackParamList = {
  Home: undefined;
  Profile: undefined;
  Notifications: undefined;
  ServiceHistory: undefined;
  BookAppointment: undefined;
};

// Generic type for screen props
export type ScreenProps<T extends keyof AuthStackParamList | keyof MainStackParamList> = {
  navigation: NativeStackNavigationProp<AuthStackParamList & MainStackParamList, T>;
};
export type RootStackParamList = AuthStackParamList & MainStackParamList;
