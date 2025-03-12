import React, { useState } from "react";
import { View, Text, TextInput, Button, ActivityIndicator, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login, fetchUserDetails } from "../../redux/slices/authSlice";
import { AppDispatch, RootState } from "../../redux/store";

const LoginScreen = ({ navigation }: any) => {
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
      dispatch(fetchUserDetails()); // Fetch user details after login
    } else {
      Alert.alert("Login Failed", error || "Invalid credentials");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{
          width: "80%",
          borderBottomWidth: 1,
          fontSize: 18,
          marginBottom: 10,
          textAlign: "center",
        }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          width: "80%",
          borderBottomWidth: 1,
          fontSize: 18,
          marginBottom: 20,
          textAlign: "center",
        }}
      />
      {status === "loading" ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
      {error && <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>}
    </View>
  );
};

export default LoginScreen;
