import React from "react";
import { View } from "react-native";
import TimeInterval from "react-native-clock-interval";

const CreateSchedule = () => {
  return (
    <TimeInterval
      disabled={false}
      allowLineDrag={true}
      componentSize={300}
      indicatorSize={40}
      lineWidth={40}
      step={5 /* minutes */}
      lineColor={"#000000"}
      start={{ hour: 22, minute: 0 }}
      stop={{ hour: 7, minute: 30 }}
      startIndicator={() => <View>{/* custom indicator layout */}</View>}
      stopIndicator={() => <View>{/* custom indicator layout */}</View>}
    />
  );
};

export default CreateSchedule;
