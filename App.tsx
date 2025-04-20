import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "./src/redux/store";
import AuthNavigator from "./src/navigation/AuthNavigator";
import MainNavigator from "./src/navigation/MainNavigator";
import OTPScreen from "./src/screens/Auth/OTPScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogLevel, OneSignal } from 'react-native-onesignal';

const Stack = createNativeStackNavigator();

const AppContent = () => {
  const { token, otpVerified } = useSelector((state: RootState) => state.auth);

  if (!token) return <AuthNavigator />; // If not logged in, show login screens
  if (!otpVerified) return <OTPScreen />; // If OTP not verified, go to OTP screen
  return <MainNavigator />; // If everything is done, go to the main app
};

const App = () => {
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  OneSignal.initialize("f8ae4e66-67ea-4b24-ae52-5eaff18fabce");

  OneSignal.Notifications.requestPermission(true);

   // Method for listening for notification clicks
   OneSignal.Notifications.addEventListener('click', (event) => {
    console.log('OneSignal: notification clicked:', event);
  });


  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppContent />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
