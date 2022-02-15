import { Dimensions, View, Text } from "react-native";
import styled from "styled-components/native";

export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;

export const Container = styled.View`
  height: 100%;
  width: 100%;
  position: relative;
  background-color: #ffffff;
`;

export const StudySmartLogoText = styled.Text`
  position: absolute;
  width: 347px;
  height: 154px;
  left: 31px;
  top: 187px;
  font-family: SpaceGrotesk_400Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 60px;
  line-height: 77px;
  color: #000000;
`;

export const StudySmartLogoLine = styled.View`
  position: absolute;
  width: 0px;
  height: 140px;
  left: 225px;
  top: 211px;
  border: 5px solid #000000;
`;

export const StudySmartLogoImage = styled.Image`
  position: absolute;
  width: 141px;
  height: 112px;
  left: 262px;
  top: 211px;
`;

export const SplashScreenSloganContainer = styled.TouchableOpacity`
  position: absolute;
  width: 355px;
  height: 123px;
  left: 37px;
  top: 463px;
  background: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SplashScreenSloganText = styled.Text`
  position: absolute;
  width: 329px;
  height: 98px;
  left: 77px;
  top: 476px;
  font-family: BarlowSemiCondensed_400Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 35px;
  line-height: 42px;
  color: #ffffff;
`;

export const SplashScreenLoadingContainer = styled.View`
  position: absolute;
  width: 428px;
  height: 158px;
  left: 0px;
  top: 764px;
  background: #000000;
`;

export const SplashScreenLoadingText = styled.Text`
  position: absolute;
  width: 217px;
  height: 64px;
  left: 34px;
  top: 779px;
  font-family: SpaceGrotesk_400Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 50px;
  line-height: 64px;
  color: #ffffff;
`;

export const SplashScreenLoadingBar = styled.View`
  position: absolute;
  width: 335px;
  height: 18px;
  left: 37px;
  top: 873px;
`;

export const InitialScreenLogoText = styled.Text`
  position: absolute;
  width: 347px;
  height: 154px;
  left: 20px;
  top: 27px;

  font-family: SpaceGrotesk_400Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 60px;
  line-height: 77px;

  color: #000000;
`;

export const InitialScreenLogoImage = styled.Image`
  position: absolute;
  width: 141px;
  height: 112px;
  left: 251px;
  top: 48px;
`;

export const InitialScreenLogoLine = styled.View`
  position: absolute;
  width: 0px;
  height: 140px;
  left: 214px;
  top: 48px;

  border: 5px solid #000000;
`;

export const InitialScreenDividerLine = styled.View`
  position: absolute;
  width: 428px;
  height: 0px;
  left: 3px;
  top: 215px;

  border: 5px solid #89cff0;
`;

export const InitialScreenMainText = styled.Text`
  position: absolute;
  width: 339px;
  height: 77px;
  left: 38px;
  top: 249px;
  font-family: SpaceGrotesk_400Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 60px;
  line-height: 77px;
  color: #000000;
`;

export const InitialScreenLoginButton = styled.TouchableOpacity`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 289px;
  height: 87px;
  left: 69px;
  top: 406px;
  z-index: 10;
  background: #000000;
`;

export const InitialScreenRegisterButton = styled.TouchableOpacity`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 289px;
  height: 87px;
  left: 69px;
  top: 573px;

  border: 5px solid #000000;
`;

export const InitialScreenLoginButtonText = styled.Text`
  width: 87px;
  height: 48px;

  font-family: BarlowSemiCondensed_400Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 40px;
  line-height: 48px;
  color: #ffffff;
  z-index: 20;
`;

export const InitialScreenRegisterButtonText = styled.Text`
  width: 114px;
  height: 42px;
  font-family: BarlowSemiCondensed_400Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 35px;
  line-height: 42px;
  text-align: center;
  color: #000000;
`;

export const InitialScreenSloganText = styled.Text`
  position: absolute;
  width: 354px;
  height: 42px;
  left: 29px;
  top: 826px;

  font-family: BarlowSemiCondensed_400Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 35px;
  line-height: 42px;

  text-align: center;

  color: #000000;
`;

export const RegisterScreenHeading = styled.Text`
  width: 243px;
  height: 77px;

  font-family: SpaceGrotesk_400Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 60px;
  line-height: 77px;

  color: #000000;
`;

export const RegisterScreenDividerLine1 = styled.View`
  width: 278px;
  height: 0px;

  border: 5px solid #89cff0;
`;

export const RegisterScreenDividerLine2 = styled.View`
  width: 155px;
  height: 0px;

  border: 5px dashed #aaf0d1;
`;

export const RegisterScreenFullNameInputText = styled.Text`
  width: 153px;
  height: 48px;
  margin-bottom: 10px;
  font-family: BarlowSemiCondensed_400Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 40px;
  line-height: 48px;
  text-align: center;
  color: #000000;
`;

export const RegisterScreenFullNameTextInput = styled.TextInput`
  width: 315px;
  height: 61px;
  padding: 5px;
  margin-bottom: 10px;
  background: #ffffff;
  border: 5px solid #000000;
`;

export const RegisterScreenEmailInputText = styled.Text`
  width: 87px;
  height: 48px;
  margin-bottom: 10px;
  font-family: BarlowSemiCondensed_400Regular;
  font-style: normal;
  text-align: center;
  font-weight: normal;
  font-size: 40px;
  line-height: 48px;
  color: #000000;
`;

export const RegisterScreenEmailTextInput = styled.TextInput`
  width: 315px;
  height: 61px;
  padding: 5px;
  margin-bottom: 10px;
  background: #ffffff;
  border: 5px solid #000000;
`;

export const RegisterScreenPasswordInputText = styled.Text`
  width: 149px;
  height: 48px;
  text-align: center;
  margin-bottom: 10px;
  font-family: BarlowSemiCondensed_400Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 40px;
  line-height: 48px;

  color: #000000;
`;

export const RegisterScreenPasswordTextInput = styled.TextInput`
  width: 315px;
  height: 61px;
  padding: 5px;

  margin-bottom: 10px;
  background: #ffffff;
  border: 5px solid #000000;
`;

export const RegisterScreenConfirmPasswordInputText = styled.Text`
  width: 281px;
  height: 48px;
  margin-bottom: 10px;
  text-align: center;
  font-family: BarlowSemiCondensed_400Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 40px;
  line-height: 48px;
  color: #000000;
`;

export const RegisterScreenConfirmPasswordTextInput = styled.TextInput`
  width: 315px;
  height: 61px;
  padding: 5px;
  margin-bottom: 10px;
  background: #ffffff;
  border: 5px solid #000000;
`;

export const RegisterScreenSubmitButton = styled.TouchableOpacity`
  width: 289px;
  height: 87px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  background: #000000;
`;

export const RegisterScreenSubmitButtonText = styled.Text`
  width: 130px;
  height: 48px;
  font-family: BarlowSemiCondensed_400Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 40px;
  text-align: center;
  line-height: 48px;
  color: #ffffff;
`;

export const RegisterScreenErrorLabel = styled.Text`
  margin-bottom: 10px;
  font-family: BarlowSemiCondensed_400Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  text-align: center;
  line-height: 48px;
  color: #ff0000;
`;
