import React, { ReactNode, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { runOnJS, useDerivedValue } from "react-native-reanimated";
import { ReText } from "react-native-redash";

import {
  PADDING,
  formatDuration2,
  radToMinutes,
  absoluteDuration,
} from "../Constants";

import Label from "./Label";

interface ContainerProps {
  start: Animated.SharedValue<number>;
  end: Animated.SharedValue<number>;
  children: ReactNode;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: PADDING,
  },
  values: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  duration: {
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 24,
    textAlign: "center",
    marginTop: PADDING,
    color: "#000000",
  },
});

const Container = ({ start, end, children }: ContainerProps) => {


  

  const duration = useDerivedValue(() => {
    const d = absoluteDuration(start.value, end.value);
    const minutes = radToMinutes(d);
    const format = formatDuration2(radToMinutes(d))
    return format;
  });

  return (
    <View style={styles.container}>
      <View style={styles.values}>
        <Label theta={start} label="STUDY" icon="book" />
        <Label theta={end} label="RELAX" icon="stop" />
      </View>
      {children}
      <ReText style={styles.duration} text={duration} />
    </View>
  );
};

export default Container;
