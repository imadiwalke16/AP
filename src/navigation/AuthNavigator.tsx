import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Auth/LoginScreen";
import CodeEntryScreen from "../screens/Auth/CodeEntryScreen";

export type AuthStackParamList = {
  CodeEntry: undefined;
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="CodeEntry">
      <Stack.Screen name="CodeEntry" component={CodeEntryScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;