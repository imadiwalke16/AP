import React from "react";
import { View, Text, Button } from "react-native";
import { ScreenProps } from "../../navigation/types";

const RegisterScreen: React.FC<ScreenProps<"Register">> = ({ navigation }) => {
  return (
    <View>
      <Text>Register Screen</Text>
      <Button title="Go to Login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
};

export default RegisterScreen;
