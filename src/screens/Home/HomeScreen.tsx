import React from "react";
import { View, Text, Button } from "react-native";
import { ScreenProps } from "../../navigation/types";

const HomeScreen: React.FC<ScreenProps<"Home">> = ({ navigation }) => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Go to Profile" onPress={() => navigation.navigate("Profile")} />
      <Button title="Go to Notifications" onPress={() => navigation.navigate("Notifications")} />
      <Button title="Go to Service History" onPress={() => navigation.navigate("ServiceHistory")} />
      <Button title="Book Appointment" onPress={() => navigation.navigate("BookAppointment")} />
    </View>
  );
};

export default HomeScreen;
