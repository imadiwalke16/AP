import React from "react";
import { View, Text, Button } from "react-native";
import { ScreenProps } from "../../navigation/types";

const ServiceHistoryScreen: React.FC<ScreenProps<"ServiceHistory">> = ({ navigation }) => {
  return (
    <View>
      <Text>Service History Screen</Text>
      <Button title="Back to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

export default ServiceHistoryScreen;
