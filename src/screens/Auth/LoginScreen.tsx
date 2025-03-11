import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login, fetchUserDetails } from "../../redux/slices/authSlice";
import { RootState, AppDispatch } from "../../redux/store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/AuthNavigator";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { status, error, token } = useSelector((state: RootState) => state.auth);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required!");
      return;
    }

    try {
      const resultAction = await dispatch(login({ email, password })).unwrap();
      if (resultAction.token) {
        // Fetch user details after successful login
        await dispatch(fetchUserDetails()).unwrap();
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" as never }],
        });
      }
    } catch (err) {
      Alert.alert("Login Failed", err?.toString() || "Something went wrong");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      {status === "loading" ? (
        <ActivityIndicator />
      ) : (
        <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: "blue", padding: 10, borderRadius: 5 }}>
          <Text style={{ color: "white", textAlign: "center" }}>Login</Text>
        </TouchableOpacity>
      )}

      {error && <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>}
    </View>
  );
};

export default LoginScreen;
