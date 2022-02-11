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

const InitialScreen = () => {
  return (
    <Container>
      <InitialScreenLogoText>Study Smart</InitialScreenLogoText>
      <InitialScreenLogoLine />
      <InitialScreenLogoImage
        source={require("../assets/graduation-cap.png")}
      />
      <InitialScreenDividerLine />
      <InitialScreenMainText>Get Started</InitialScreenMainText>
      <InitialScreenLoginButton>
        <InitialScreenLoginButtonText>Login</InitialScreenLoginButtonText>
      </InitialScreenLoginButton>

      <InitialScreenRegisterButton>
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
