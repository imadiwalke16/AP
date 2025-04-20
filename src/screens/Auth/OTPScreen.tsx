import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { verifyOTP } from "../../redux/slices/authSlice";
import { AppDispatch } from "../../redux/store";

const OTPScreen = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      Alert.alert("Error", "OTP must be 6 digits");
      return;
    }

    dispatch(verifyOTP({ otp }))
      .unwrap()
      .then(() => {
        Alert.alert("Success", "OTP Verified Successfully!");
      })
      .catch((err) => {
        Alert.alert("Error", err);
      });
  };


  return (
    <View style={styles.container}>
      <Image source={require("/Users/aditya/AP/asset/image.png")} style={styles.logo} />
      <Text style={styles.title}>Service Book</Text>
      <Text style={styles.instruction}>Your OTP has been sent to your registered mobile number</Text>
      <Text style={styles.mobileNumber}>+91 9623338960</Text>
      <View style={styles.otpContainer}>
        {[...Array(6)].map((_, index) => (
          <TextInput
            key={index}
            value={otp[index] || ""}
            onChangeText={(text) => {
              let newOtp = otp.split("");
              newOtp[index] = text;
              setOtp(newOtp.join(""));
            }}
            keyboardType="numeric"
            maxLength={1}
            style={styles.otpInput}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <Text style={styles.resendOtp}>Resend OTP?</Text>
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
  instruction: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginBottom: 5,
  },
  mobileNumber: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  otpInput: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 18,
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    width: "80%",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  resendOtp: {
    fontSize: 14,
    color: "blue",
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

export default OTPScreen;
