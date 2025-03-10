import React from "react";
import { View, Text, Button } from "react-native";
import { ScreenProps } from "../../navigation/types";

const BookAppointmentScreen: React.FC<ScreenProps<"BookAppointment">> = ({ navigation }) => {
  return (
    <View>
      <Text>Book Appointment Screen</Text>
      <Button title="Back to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

export default BookAppointmentScreen;
