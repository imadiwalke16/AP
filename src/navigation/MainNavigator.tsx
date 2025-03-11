import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/HomeScreen";
import ProfileScreen from "../screens/Home/ProfileScreen";
import NotificationsScreen from "../screens/Home/NotificationsScreen";
import ServiceHistoryScreen from "../screens/Home/ServiceHistoryScreen";
import BookAppointmentScreen from "../screens/Home/BookAppointmentScreen";

export type MainStackParamList = {
  Home: undefined;
  Profile: undefined;
  Notifications: undefined;
  ServiceHistory: undefined;
  BookAppointment: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="ServiceHistory" component={ServiceHistoryScreen} />
      <Stack.Screen name="BookAppointment" component={BookAppointmentScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
