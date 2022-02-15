import { signOut } from "firebase/auth";
import React from "react";
import * as Progress from "react-native-progress";
import { auth } from "../config/firebase";

import {
  Container,
  screenWidth,
  SplashScreenLoadingBar,
  SplashScreenLoadingContainer,
  StudySmartLogoImage,
  StudySmartLogoLine,
  StudySmartLogoText,
  SplashScreenSloganContainer,
  SplashScreenSloganText,
  SplashScreenLoadingText,
} from "../styles/styles";

const SplashScreen = () => {
  return (
    <Container>
      <StudySmartLogoImage source={require("../assets/graduation-cap.png")} />
      <StudySmartLogoLine />
      <StudySmartLogoText>Study Smart</StudySmartLogoText>
      <SplashScreenSloganContainer
        onPress={async () => {
          await signOut(auth);
        }}
      ></SplashScreenSloganContainer>
      <SplashScreenSloganText>
        Studying habits as smart as you are.
      </SplashScreenSloganText>
      <SplashScreenLoadingContainer>
        <Progress.Bar
          indeterminate={true}
          color={"rgba(137, 207, 240, 1)"}
          unfilledColor={"rgba(170, 240, 209, 1)"}
          width={screenWidth}
        />
      </SplashScreenLoadingContainer>
      <SplashScreenLoadingText>loading...</SplashScreenLoadingText>
    </Container>
  );
};

export default SplashScreen;
