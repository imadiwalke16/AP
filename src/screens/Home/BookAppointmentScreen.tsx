import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from "react-native";
import { ScreenProps } from "../../navigation/types";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceCenters } from "../../redux/slices/serviceCenterSlice";
import { RootState } from "../../redux/store";

const BookAppointmentScreen: React.FC<ScreenProps<"BookAppointment">> = ({ navigation }) => {
  const [pinCode, setPinCode] = useState("");
  const dispatch = useDispatch();
  const { centers, status, error } = useSelector((state: RootState) => state.serviceCenters);

  const handleSearch = () => {
    if (pinCode.length !== 6) {
      Alert.alert("Invalid Pin Code", "Please enter a valid 6-digit pin code.");
      return;
    }
    dispatch(fetchServiceCenters(pinCode) as any);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Appointment</Text>

      <Text style={styles.label}>Enter Pin Code:</Text>
      <TextInput
        style={styles.input}
        value={pinCode}
        onChangeText={setPinCode}
        keyboardType="numeric"
        maxLength={6}
        placeholder="560001"
      />
      <Button title="Find Service Centers" onPress={handleSearch} />

      {status === "loading" && <Text>Loading...</Text>}
      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={centers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.address}</Text>
            <Text>{item.phoneNumber}</Text>
            <Text>Brands: {item.brandsSupported.join(", ")}</Text>
            <Button title="Select" onPress={() => Alert.alert("Selected", item.name)} />
          </View>
        )}
      />

      <Button title="Back to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  card: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});

export default BookAppointmentScreen;


// Property 'serviceCenters' does not exist on type '{ auth: AuthState; }'.ts(2339)
// any
// No quick fixes available