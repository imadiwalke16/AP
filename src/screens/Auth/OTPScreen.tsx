import React from "react";
import { View, Text, Button } from "react-native";
import { ScreenProps } from "../../navigation/types";

const OTPScreen: React.FC<ScreenProps<"OTP">> = ({ navigation }) => {
  return (
    <View>
      <Text>OTP Screen</Text>
      <Button title="Go to Login" onPress={() => navigation.navigate("Login")} />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

export default OTPScreen;
