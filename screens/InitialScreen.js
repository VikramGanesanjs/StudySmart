import React from "react";
import {
  Container,
  InitialScreenLogoLine,
  InitialScreenLogoText,
  InitialScreenLogoImage,
  InitialScreenDividerLine,
  InitialScreenLoginButton,
  InitialScreenLoginButtonText,
  InitialScreenMainText,
  InitialScreenRegisterButton,
  InitialScreenRegisterButtonText,
  InitialScreenSloganText,
} from "./../styles/styles";

const InitialScreen = ({ navigation }) => {
  return (
    <Container>
      <InitialScreenLogoText>Study Smart</InitialScreenLogoText>
      <InitialScreenLogoLine />
      <InitialScreenLogoImage
        source={require("../assets/graduation-cap.png")}
      />
      <InitialScreenDividerLine />
      <InitialScreenMainText>Get Started</InitialScreenMainText>
      <InitialScreenLoginButton
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <InitialScreenLoginButtonText>Login</InitialScreenLoginButtonText>
      </InitialScreenLoginButton>

      <InitialScreenRegisterButton
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      >
        <InitialScreenRegisterButtonText>
          Register
        </InitialScreenRegisterButtonText>
      </InitialScreenRegisterButton>

      <InitialScreenSloganText>
        Study smarter, not harder.
      </InitialScreenSloganText>
    </Container>
  );
};

export default InitialScreen;
