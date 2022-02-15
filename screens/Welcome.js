import { setStatusBarBackgroundColor } from "expo-status-bar";
import { doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { ScrollView, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth, db } from "../config/firebase";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

const Welcome = () => {
  const [name, setName] = useState("");
  const [start, setStart] = useState(true);

  const retrieveUserName = async () => {
    const docRef = doc(db, "Users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (typeof docSnap !== undefined) {
      const fullName = docSnap.data().fullName;
      setName(fullName.split(" ")[0]);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(async () => {
    await retrieveUserName();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 1400,
      }}
    >
      <CountdownCircleTimer
        isPlaying={start}
        duration={300}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[250, 200, 150, 0]}
        onComplete={() => console.log("complete")}
      >
        {({ remainingTime }) => <Text>{remainingTime}</Text>}
      </CountdownCircleTimer>
    </ScrollView>
  );
};

export default Welcome;
