import React from "react";
import { useState, useContext, useEffect } from "react";
import {
  Text,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Vibration,
} from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native-gesture-handler";
import { signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { CurrentScheduleContext } from "./../components/CurrentScheduleProvider";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { CurrentDataContext } from "./../components/CurrentDataProvider";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import { set } from "react-native-reanimated";
import PomodoroTimer from "../components/PomodoroTimer";

const Pomodoro = () => {
  const [studyTime, setStudyTime] = useState(true);
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [subject, setSubject] = useState("");
  const { currentSchedule, setCurrentSchedule } = useContext(
    CurrentScheduleContext
  );

  const [initialLoad, setInitialLoad] = useState(true);

  const { data, setData } = useContext(CurrentDataContext);

  const [scheduleFormat, setScheduleFormat] = useState([]);
  const [focusOne, setFocusOne] = useState("");
  const [focusTwo, setFocusTwo] = useState("");
  const [index, setIndex] = useState(0);
  const [initialTime, setInitialTime] = useState(null);
  const [scheduleInfo, setScheduleInfo] = useState({
    minutesCompleted: "",
    minutesLeft: "",
  });

  let inBounds = index == scheduleFormat.length - 1;

  const animateBgColor = () => {
    if (studyTime) {
      Animated.timing(animation, {
        toValue: 1,
        useNativeDriver: false,
        duration: 1000,
      }).start(() => {});
    } else {
      Animated.timing(animation, {
        toValue: 0,
        useNativeDriver: false,
        duration: 1000,
      }).start(() => {});
    }
  };

  const bgColorInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgb(137, 207, 240)", "rgb(170, 240, 209)"],
  });

  const formatSchedule = () => {
    let s = [];
    const cycles = Math.floor(data[currentSchedule]["durationInMinutes"] / 30);
    const leftoverLastCycle = data[currentSchedule]["durationInMinutes"] % 30;
    for (let i = 0; i < cycles; i++) {
      s.push(1500);
      s.push(300);
    }
    s.push(leftoverLastCycle * 60);
    setScheduleFormat(s);

    const currentSeconds =
      new Date().getHours() * 3600 +
      new Date().getMinutes() * 60 +
      new Date().getSeconds();
    const startSeconds = new Timestamp(data[currentSchedule]["start"]).seconds
      .seconds;

    const secondsAlreadyCompleted = currentSeconds - startSeconds;

    let sum = 0;
    for (let i = 0; i < scheduleFormat.length; i++) {
      sum += scheduleFormat[i];
      if (sum >= secondsAlreadyCompleted) {
        setInitialTime(sum - secondsAlreadyCompleted);
        console.log(sum - secondsAlreadyCompleted);
        setIndex(i);
        if (i % 2 === 1) {
          animateBgColor();
          setStudyTime(false);
        }
        setInitialLoad(false);
        break;
      }
    }
  };

  const handleTimerComplete = () => {
    console.log(`Timer completed ${index + 1} times`);
    animateBgColor();
    setStudyTime(!studyTime);
    setIndex(index + 1);
    Vibration.vibrate();
  };

  const handleTimerUpdate = () => {
    let s = {};
    let difference1 =
      new Date().getHours() * 3600 +
      new Date().getMinutes() * 60 +
      new Date().getSeconds() -
      new Timestamp(data[currentSchedule]["start"]).seconds.seconds;

    s["minutesCompleted"] = `${Math.floor(difference1 / 60)} minutes completed`;
    s["minutesLeft"] = `${
      data[currentSchedule]["durationInMinutes"] - Math.floor(difference1 / 60)
    } minutes left`;
    setScheduleInfo(s);
  };

  useEffect(async () => {
    if (currentSchedule == "") {
    } else {
      setSubject(` ${data[currentSchedule]["subject"]}`);
      formatSchedule();
    }
  }, [currentSchedule]);

  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: bgColorInterpolation,
      }}
    >
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <ScrollView
          contentContainerStyle={{
            paddingTop: 70,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Text
            style={{
              fontFamily: "SpaceGrotesk_400Regular",
              color: "#ffffff",
              margin: 10,
              textAlign: "center",
              fontSize: 20,
            }}
          >
            {`${scheduleInfo["minutesCompleted"]}, ${scheduleInfo["minutesLeft"]}`}
          </Text>

          {initialTime && (
            <PomodoroTimer
              initialTime={initialTime}
              handleTimerComplete={handleTimerComplete}
              handleTimerUpdate={handleTimerUpdate}
            />
          )}

          <Text
            style={{
              fontFamily: "SpaceGrotesk_400Regular",
              color: "#ffffff",
              margin: 60,
              textAlign: "center",
              fontSize: 27,
            }}
          >
            {studyTime
              ? `It's time to study${subject}!`
              : "It's time to take a break!"}
          </Text>
          <Text
            style={{
              fontFamily: "SpaceGrotesk_400Regular",
              fontSize: 20,
              marginBottom: 30,
              color: "#ffffff",
            }}
          >
            {studyTime
              ? "Focuses for Today's Study Session:"
              : "What makes you feel relaxed?"}
          </Text>

          <TextInput
            onChangeText={setFocusOne}
            value={focusOne}
            placeholder="First Goal"
            style={{
              height: 60,
              width: 350,
              borderBottomColor: "#ffffff",
              borderColor: "#89CFF0",
              borderBottomWidth: 5,
              color: "#ffffff",
              textAlign: "center",
              fontFamily: "BarlowSemiCondensed_400Regular",
              fontSize: 25,
            }}
          />
          <TextInput
            onChangeText={setFocusTwo}
            value={focusTwo}
            placeholder="Second Goal"
            style={{
              height: 80,
              width: 350,
              borderBottomColor: "#ffffff",
              borderColor: "#ffffff",
              borderBottomWidth: 5,
              color: "#ffffff",
              textAlign: "center",
              fontFamily: "BarlowSemiCondensed_400Regular",
              fontSize: 25,
            }}
          />
          <Text
            style={{
              fontFamily: "SpaceGrotesk_400Regular",
              fontSize: 20,
              marginBottom: 30,
              paddingTop: 30,
              color: "#ffffff",
            }}
          >
            {inBounds
              ? `Next: ${scheduleFormat[index + 1] / 60} minutes ${
                  !studyTime ? "of studying" : "of relaxation"
                }`
              : ""}
          </Text>
          <Text
            style={{
              fontFamily: "SpaceGrotesk_400Regular",
              fontSize: 20,
              marginBottom: 30,
              paddingTop: 30,
              color: "#ffffff",
            }}
          >
            {}
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

export default Pomodoro;
