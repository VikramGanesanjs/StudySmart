import { setStatusBarBackgroundColor } from "expo-status-bar";
import { doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { ScrollView, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth, db } from "../config/firebase";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { signOut } from "firebase/auth";
import { screenHeight, screenWidth } from "../styles/styles";

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
    let isMounted = true;
    if (isMounted) {
      await retrieveUserName();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        padding: 10,
        paddingTop: 20,
        height: screenHeight,
        width: screenWidth,
        backgroundColor: "#ffffff",
      }}
    >
      <Text
        style={{
          fontFamily: "SpaceGrotesk_400Regular",
          fontSize: 30,
          textAlign: "center",
        }}
      >{`Welcome ${name}!`}</Text>
      <TouchableOpacity
        onPress={() => {
          signOut(auth);
        }}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;
