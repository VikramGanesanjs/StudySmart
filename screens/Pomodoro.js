import React from "react";
import { useState } from "react";
import { Text, KeyboardAvoidingView, Platform, Animated } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native-gesture-handler";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const Pomodoro = () => {
  const [studyTime, setStudyTime] = useState(true);
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const [focusOne, setFocusOne] = useState("");
  const [focusTwo, setFocusTwo] = useState("");

  const animateBgColor = () => {
    if (studyTime) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
      }).start(() => {});
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 1000,
      }).start(() => {});
    }
  };

  const bgColorInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgb(137, 207, 240)", "rgb(170, 240, 209)"],
  });

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    function str_pad_left(string, pad, length) {
      return (new Array(length + 1).join(pad) + string).slice(-length);
    }

    var finalTime =
      str_pad_left(minutes, "0", 2) + ":" + str_pad_left(seconds, "0", 2);
    return finalTime;
  };

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
          <CountdownCircleTimer
            isPlaying={true}
            duration={studyTime ? 1500 : 300}
            strokeWidth={50}
            key={studyTime}
            colors="#ffffff"
            size={300}
            colorsTime={[250, 200, 150, 0]}
            onComplete={() => {
              animateBgColor();
              setStudyTime(!studyTime);
            }}
          >
            {({ remainingTime }) => (
              <Text
                style={{
                  color: "#ffffff",
                  fontFamily: "SpaceGrotesk_400Regular",
                  fontSize: 50,
                }}
              >
                {formatTime(remainingTime)}
              </Text>
            )}
          </CountdownCircleTimer>
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
              ? "It's time to study AP History!"
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
        </ScrollView>
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

export default Pomodoro;
