import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  RegisterScreenHeading,
  RegisterScreenDividerLine1,
  RegisterScreenDividerLine2,
  screenWidth,
  screenHeight,
} from "../styles/styles";

const ViewSchedules = () => {
  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        display: "flex",
        height: screenHeight,
        width: screenWidth,
        flexDirection: "column",
      }}
    >
      <RegisterScreenHeading
        style={{
          width: screenWidth,
          fontSize: 40,
        }}
      >
        Schedules
      </RegisterScreenHeading>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <RegisterScreenDividerLine1 />
        <RegisterScreenDividerLine2 />
      </View>
      <FlatList />
    </View>
  );
};

export default ViewSchedules;
