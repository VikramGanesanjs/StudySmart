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
import { sendPasswordResetEmail } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
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

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateFields = () => {
    if (email === "" || password === "") {
      setErrorMessage("Some fields are not filled out");
      return false;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setErrorMessage("Email address invalid.");
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
          <RegisterScreenHeading>Login</RegisterScreenHeading>
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
              alignItems: "center",
              paddingTop: 35,
            }}
          >
            <RegisterScreenFullNameInputText>
              Email
            </RegisterScreenFullNameInputText>
            <RegisterScreenFullNameTextInput
              value={email}
              onChangeText={setEmail}
              placeholder="johndoe@ex.com"
              style={{
                marginBottom: 40,
              }}
            />
            <RegisterScreenPasswordInputText>
              Password
            </RegisterScreenPasswordInputText>
            <RegisterScreenEmailTextInput
              value={password}
              onChangeText={setPassword}
              placeholder="*********"
              style={{
                marginBottom: 40,
              }}
            />
            <RegisterScreenSubmitButton
              style={{
                marginBottom: 40,
              }}
              onPress={async () => {
                if (validateFields()) {
                  await signInWithEmailAndPassword(auth, email, password).catch(
                    () => {
                      setErrorMessage("Username and password do not match");
                    }
                  );
                }
              }}
            >
              <RegisterScreenSubmitButtonText>
                Login
              </RegisterScreenSubmitButtonText>
            </RegisterScreenSubmitButton>
            <RegisterScreenSubmitButton
              style={{
                backgroundColor: "#ffffff",
                borderColor: "#000000",
                borderWidth: 5,
              }}
              onPress={() => {
                if (
                  !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                ) {
                  setErrorMessage("Email address invalid.");
                  return;
                }
                sendPasswordResetEmail(auth, email)
                  .then(() => {
                    setErrorMessage(
                      "Password Reset Email has been sent to your email address"
                    );
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorMessage);
                  });
              }}
            >
              <RegisterScreenSubmitButtonText
                style={{
                  color: "#000000",
                  fontSize: 35,
                  width: 500,
                }}
              >
                Forgot Password?
              </RegisterScreenSubmitButtonText>
            </RegisterScreenSubmitButton>
            <RegisterScreenErrorLabel>{errorMessage}</RegisterScreenErrorLabel>
          </View>
        </SafeAreaView>
      </Container>
    </KeyboardAvoider>
  );
};

export default Login;
