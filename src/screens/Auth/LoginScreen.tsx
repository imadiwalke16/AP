import React from "react";
import { View, Text, Button } from "react-native";
import { ScreenProps } from "../../navigation/types";

const LoginScreen = ({ navigation }: ScreenProps<"Login">) => {
  return (
    <View>
      <Text>Login Screen</Text>
      <Button title="Go to OTP" onPress={() => navigation.navigate("OTP")} />
      <Button title="Go to Register" onPress={() => navigation.navigate("Register")} />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

export default LoginScreen;
