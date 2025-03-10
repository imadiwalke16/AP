import React from "react";
import { View, Text, Button } from "react-native";
import { ScreenProps } from "../../navigation/types";

const NotificationsScreen: React.FC<ScreenProps<"Notifications">> = ({ navigation }) => {
  return (
    <View>
      <Text>Notifications Screen</Text>
      <Button title="Back to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

export default NotificationsScreen;
