import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { verifyOTP } from "../../redux/slices/authSlice";
import { AppDispatch } from "../../redux/store";

const OTPScreen = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleVerifyOTP = async () => {
    if (otp === "1234") { // Simulating a static OTP for now
      await dispatch(verifyOTP());
    } else {
      Alert.alert("Invalid OTP", "Please enter the correct OTP.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Enter OTP</Text>
      <TextInput
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        maxLength={4}
        style={{
          borderBottomWidth: 1,
          width: "80%",
          textAlign: "center",
          fontSize: 18,
          marginBottom: 20,
        }}
      />
      <Button title="Verify OTP" onPress={handleVerifyOTP} />
    </View>
  );
};

export default OTPScreen;
