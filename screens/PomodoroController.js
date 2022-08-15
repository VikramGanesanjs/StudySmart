import React, { useState, useEffect, useContext } from "react";
import { CurrentDataContext } from "../components/CurrentDataProvider";
import { CurrentScheduleContext } from "../components/CurrentScheduleProvider";
import { View, Text } from "react-native";
import Pomodoro from "./Pomodoro";
import { Timestamp } from "firebase/firestore";
import { useInterval } from "../components/hooks/useInterval";

const DefaultScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        paddingBottom: 80,
        backgroundColor: "#ffffff",
      }}
    >
      <Text
        style={{
          fontFamily: "SpaceGrotesk_400Regular",
          color: "#000000",
          fontSize: 30,

          textAlign: "center",
        }}
      >
        There are no schedules active now, but when there is, a notification
        will be sent!
      </Text>
    </View>
  );
};

const Test = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Schedule selected</Text>
    </View>
  );
};

const PomodoroController = () => {
  const { data, setData } = useContext(CurrentDataContext);
  const { currentSchedule, setCurrentSchedule } = useContext(
    CurrentScheduleContext
  );
  const [pomodoro, setPomodoro] = useState(false);

  const dayOfWeekAsString = (dayIndex) => {
    return (
      [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ][dayIndex] || ""
    );
  };

  const readSchedules = (dData) => {
    let pom = false;
    const currentTime = new Date();
    for (const key in dData) {
      const clientSeconds =
        currentTime.getHours() * 3600 +
        currentTime.getMinutes() * 60 +
        currentTime.getSeconds();
      const startTimestamp = new Timestamp(dData[key]["start"]["seconds"]);
      const endTimestamp = new Timestamp(dData[key]["end"].seconds);

      const utcStartSeconds = startTimestamp.seconds;
      const utcEndseconds = endTimestamp.seconds;

      const greaterTime = clientSeconds > utcStartSeconds;
      const lessTime = clientSeconds < utcEndseconds;

      const trueDay = dData[key][dayOfWeekAsString(currentTime.getDay())];
      if (trueDay) {
        if (greaterTime && lessTime) {
          pom = true;
          setCurrentSchedule(key.toString());
        }
      }
    }
    setPomodoro(pom);
  };

  useInterval(() => {
    readSchedules(data);
  }, 10000);

  return pomodoro ? <Pomodoro /> : <DefaultScreen />;
};

export default PomodoroController;
