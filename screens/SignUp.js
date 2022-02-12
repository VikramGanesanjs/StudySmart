import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  SafeAreaView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import KeyboardAvoider from "../components/KeyboardAvoider";
import {
  screenHeight,
  screenWidth,
  Container,
  RegisterScreenConfirmPasswordInputText,
  RegisterScreenConfirmPasswordTextInput,
  RegisterScreenDividerLine1,
  RegisterScreenDividerLine2,
  RegisterScreenEmailInputText,
  RegisterScreenEmailTextInput,
  RegisterScreenErrorLabel,
  RegisterScreenFullNameInputText,
  RegisterScreenFullNameTextInput,
  RegisterScreenHeading,
  RegisterScreenPasswordInputText,
  RegisterScreenPasswordTextInput,
  RegisterScreenSubmitButton,
  RegisterScreenSubmitButtonText,
} from "../styles/styles";

const SignUp = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateFields = () => {
    if (
      fullName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setErrorMessage("Some fields are not filled out");
      return false;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setErrorMessage("Email address invalid.");
      return false;
    } else if (confirmPassword !== password) {
      setErrorMessage("Passwords do not match");
      return false;
    }
    return true;
  };

  return (
    <KeyboardAvoider behavior={Platform.OS === "ios" ? "padding" : null}>
      <Container>
        <SafeAreaView
          style={{
            flexDirection: "column",
            flex: 1,
            display: "flex",
            height: screenHeight,
          }}
        >
          <RegisterScreenHeading>Register</RegisterScreenHeading>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <RegisterScreenDividerLine1 />
            <RegisterScreenDividerLine2 />
          </View>
          <View
            style={{
              height: screenHeight - 114,
              width: screenWidth,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 75,
            }}
          >
            <RegisterScreenFullNameInputText>
              Full Name
            </RegisterScreenFullNameInputText>
            <RegisterScreenFullNameTextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="John Doe"
            />
            <RegisterScreenEmailInputText>Email</RegisterScreenEmailInputText>
            <RegisterScreenEmailTextInput
              value={email}
              onChangeText={setEmail}
              placeholder="johndoe@ex.com"
            />
            <RegisterScreenPasswordInputText>
              Password
            </RegisterScreenPasswordInputText>
            <RegisterScreenPasswordTextInput
              value={password}
              onChangeText={setPassword}
              placeholder="*********"
            />
            <RegisterScreenConfirmPasswordInputText>
              Confirm Password
            </RegisterScreenConfirmPasswordInputText>
            <RegisterScreenConfirmPasswordTextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="********"
            />
            <RegisterScreenSubmitButton
              onPress={() => {
                if (validateFields()) {
                  createUserWithEmailAndPassword(auth, email, password);
                  setTimeout(() => {
                    setDoc(doc(db, "Users", auth.currentUser.uid), {
                      fullName: fullName,
                      emailAddress: email,
                      userIdentificationNumber: auth.currentUser.uid,
                    });
                  }, 1000);
                }
              }}
            >
              <RegisterScreenSubmitButtonText>
                Register
              </RegisterScreenSubmitButtonText>
            </RegisterScreenSubmitButton>
            <RegisterScreenErrorLabel>{errorMessage}</RegisterScreenErrorLabel>
          </View>
        </SafeAreaView>
      </Container>
    </KeyboardAvoider>
  );
};

export default SignUp;
