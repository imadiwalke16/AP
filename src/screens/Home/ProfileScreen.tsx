import React from "react";
import { View, Text, Button } from "react-native";
import { ScreenProps } from "../../navigation/types";

const ProfileScreen: React.FC<ScreenProps<"Profile">> = ({ navigation }) => {
  return (
    <View>
      <Text>Profile Screen</Text>
      <Button title="Back to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

export default ProfileScreen;
