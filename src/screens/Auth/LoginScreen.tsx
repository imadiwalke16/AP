import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login, fetchUserDetails } from "../../redux/slices/authSlice";
import { AppDispatch, RootState } from "../../redux/store";
import Icon from "react-native-vector-icons/FontAwesome";

const LoginScreen = ({ navigation }: any) => {
  const [phone, setPhone] = useState(""); // Dummy phone field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    const result = await dispatch(login({ email, password }));

    if (result.meta.requestStatus === "fulfilled") {
      dispatch(fetchUserDetails());
    } else {
      Alert.alert("Login Failed", error || "Invalid credentials");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("/Users/aditya/AP/asset/image.png")} style={styles.logo} />
      <Text style={styles.title}>Service Book</Text>
      <Text style={styles.subtitle}>Dealership</Text>
      <Text style={styles.dealership}>Autonation Inc.</Text>

      {/* Dummy Phone Number Field */}
      <View style={styles.inputContainer}>
        <Icon name="phone" size={20} color="gray" style={styles.icon} />
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Phone No</Text>
          <TextInput
            placeholder="+91 9623338960"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={styles.input}
          />
        </View>
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="gray" style={styles.icon} />
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="abc@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="gray" style={styles.icon} />
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
        </View>
      </View>

      {status === "loading" ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Powered by CDK GLOBAL</Text>
      </View>
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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
  },
  dealership: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  inputWrapper: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: "gray",
  },
  input: {
    fontSize: 16,
    height: 40,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    width: "90%",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  footer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
  },
  footerText: {
    marginTop: 50,
    fontSize: 15,
    color: "Black",
    fontWeight: "semibold",
  },
});

export default LoginScreen;
