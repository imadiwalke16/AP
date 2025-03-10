import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";

import LoginScreen from "../screens/Auth/LoginScreen";
import OTPScreen from "../screens/Auth/OTPScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import ServiceHistoryScreen from "../screens/Home/ServiceHistoryScreen";
import NotificationsScreen from "../screens/Home/NotificationsScreen";
import ProfileScreen from "../screens/Home/ProfileScreen";
import BookAppointmentScreen from "../screens/Home/BookAppointmentScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ServiceHistory" component={ServiceHistoryScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="BookAppointment" component={BookAppointmentScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
