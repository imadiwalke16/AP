import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  Login: undefined;
  OTP: undefined;
  Register: undefined;
  Home: undefined;
  ServiceHistory: undefined;
  Notifications: undefined;
  Profile: undefined;
  BookAppointment: undefined;
};

// Define reusable props for screens
export type ScreenProps<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};
