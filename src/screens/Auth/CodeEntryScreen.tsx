import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import { validateCode } from "../../utils/api";
import { setSessionToken, setThemeConfig, setLogoUrl, setBackgroundImageUrl } from "../../redux/slices/authSlice";

const CodeEntryScreen = ({ navigation }: any) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Mock logo mapping with index signature
  const logoMap: { [key: string]: string } = {
    "ABC123": "https://imgs.search.brave.com/e1SZ_aBcprRKSj5q0ohqEY0TgPAXFpZ82Ok164FSIzc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi8zLzNlL0Zv/cmRfbG9nb19mbGF0/LnN2Zy8yNTBweC1G/b3JkX2xvZ29fZmxh/dC5zdmcucG5n", // Example Ford logo
    "XYZ789": "https://imgs.search.brave.com/v_jWB1cljB_stl6gJy-5e5fLXC3uWWhdNBmW5Jz0e5o/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9lL2U3L1Rv/eW90YS5zdmcvMjUw/cHgtVG95b3RhLnN2/Zy5wbmc"
  };

  const backgroundImageMap: { [key: string]: string } = {
    "ABC123": "/Users/aditya/AP/asset/cropped image.png", // Ford Mustang
    "XYZ789": "/Users/aditya/AP/asset/cropped image.png", // Toyota Corolla
  };

   const handleValidate = async () => {
    if (!code) {
      Alert.alert("Error", "Please enter a dealer code");
      return;
    }
    try {
      setLoading(true);
      const data = await validateCode(code); // Current backend response
      dispatch(setSessionToken(data.sessionToken));
      dispatch(setThemeConfig(JSON.parse(data.themeConfig)));
      // Set mock logoUrl based on code
      const logoUrl = logoMap[code] || null; // Fallback to null if code not in map
      dispatch(setLogoUrl(logoUrl));
      // Set background image URL based on code
      const backgroundImageUrl = backgroundImageMap[code] || null; // Fallback to null if code not in map
      dispatch(setBackgroundImageUrl(backgroundImageUrl));
      navigation.navigate("Login");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Dealer Code</Text>
      <TextInput
        style={styles.input}
        value={code}
        onChangeText={setCode}
        placeholder="e.g., ABC123"
        autoCapitalize="characters"
      />
      {loading && <ActivityIndicator size="large" color="blue" />}
      <TouchableOpacity style={styles.button} onPress={handleValidate}>
        <Text style={styles.buttonText}>Validate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: "90%",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    width: "90%",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CodeEntryScreen;