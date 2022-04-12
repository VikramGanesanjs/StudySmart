import { setStatusBarBackgroundColor } from "expo-status-bar";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { ScrollView, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth, db } from "../config/firebase";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { signOut } from "firebase/auth";
import { screenHeight, screenWidth } from "../styles/styles";
import * as Notifications from "expo-notifications";
import { Entypo } from "@expo/vector-icons";
import Constants from "expo-constants";

const Welcome = () => {
  const [name, setName] = useState("");

  const registerForPushNotificationsAsync = async () => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      const docRef = doc(db, "Users", auth.currentUser.uid);
      setDoc(docRef, { expoPushToken: token }, { merge: true });
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });

      return token;
    }
  };

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
      await registerForPushNotificationsAsync();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ScrollView
      snapToInterval={screenHeight - 100}
      decelerationRate={"fast"}
      contentContainerStyle={{
        flex: 1,
        minHeight: (screenHeight - 100) * 4,
        maxHeight: 3000,
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: screenHeight,
        width: screenWidth,
        backgroundColor: "#ffffff",
      }}
    >
      <View
        style={{
          width: screenWidth,
          height: screenHeight - 100,
          backgroundColor: "#ffffff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "SpaceGrotesk_400Regular",
            fontSize: 30,
            textAlign: "center",
          }}
        >{`Welcome ${name}!`}</Text>
        <Text
          style={{
            fontFamily: "SpaceGrotesk_400Regular",
            marginTop: 40,
            fontSize: 20,
            textAlign: "center",
          }}
        >
          About the App:
        </Text>
        <View
          style={{
            width: screenWidth - 70,
            height: 200,
            marginTop: 30,
            padding: 10,
            backgroundColor: "#000000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "BarlowSemiCondensed_400Regular",
              fontSize: 25,
              textAlign: "center",
              color: "#ffffff",
            }}
          >
            Our app is designed to maximize the productivity of students, to
            minimize procrastination and to optimize how much information you
            retain.
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "SpaceGrotesk_400Regular",
            marginTop: 40,
            fontSize: 20,
            textAlign: "center",
          }}
        >
          Get Started:
        </Text>
        <View
          style={{
            width: screenWidth - 100,
            height: 200,
            marginTop: 30,
            padding: 10,
            backgroundColor: "#ffffff",
            borderColor: "#000000",
            borderWidth: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "BarlowSemiCondensed_400Regular",
              fontSize: 20,
              textAlign: "center",
              color: "#000000",
            }}
          >
            Swipe right to start to create a study schedule. Once you create a
            schedule, it will notify you when it is time to study, and will
            display a timer telling you when to study and when to take a break.
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
          }}
        >
          <Entypo name="arrow-with-circle-down" size={40} color="black" />
        </View>
      </View>
      <View
        style={{
          height: screenHeight - 100,
          width: screenWidth,
          display: "flex",
          alignItems: "center",
          backgroundColor: "#89cff0",
        }}
      >
        <Text
          style={{
            marginTop: 20,
            fontFamily: "SpaceGrotesk_400Regular",
            fontSize: 100,
            color: "#ffffff",
          }}
        >
          25:00
        </Text>
        <View
          style={{
            borderColor: "#ffffff",
            borderWidth: 5,
            width: screenWidth - 70,
            height: 0,
          }}
        />

        <Text
          style={{
            marginTop: 20,
            fontFamily: "SpaceGrotesk_400Regular",
            fontSize: 50,
            color: "#ffffff",
          }}
        >
          Study Time!
        </Text>
        <View
          style={{
            display: "flex",
            height: 200,
            padding: 10,
            marginTop: 40,
            backgroundColor: "#ffffff",
            width: screenWidth - 70,
            borderColor: "#000000",
            borderWidth: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "BarlowSemiCondensed_400Regular",
              textAlign: "center",
              color: "#000000",
              fontSize: 20,
            }}
          >
            Your schedules will be automatically formatted so that you study in
            25 minute intervals. This ensures that you get the best retention of
            information.
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            height: 200,
            padding: 10,
            marginTop: 40,
            width: screenWidth - 70,
            backgroundColor: "#000000",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "BarlowSemiCondensed_400Regular",
              textAlign: "center",
              color: "#ffffff",
              fontSize: 18,
            }}
          >
            This comes from the Pomodoro technique of working. Essentially, it
            preaches that you should work in 25 minute intervals followed by 5
            minute breaks. This will help you stay focused and on task and will
            help you be more productive.
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
          }}
        >
          <Entypo name="arrow-with-circle-down" size={40} color="white" />
        </View>
      </View>
      <View
        style={{
          height: screenHeight - 100,
          width: screenWidth,
          display: "flex",
          alignItems: "center",
          backgroundColor: "#aaf0d1",
        }}
      >
        <Text
          style={{
            marginTop: 40,
            fontFamily: "SpaceGrotesk_400Regular",
            fontSize: 100,
            color: "#ffffff",
          }}
        >
          5:00
        </Text>
        <View
          style={{
            borderColor: "#ffffff",
            borderWidth: 5,
            width: screenWidth - 70,
            height: 0,
          }}
        />

        <Text
          style={{
            marginTop: 20,
            fontFamily: "SpaceGrotesk_400Regular",
            fontSize: 50,
            color: "#ffffff",
          }}
        >
          Break Time!
        </Text>
        <View
          style={{
            display: "flex",
            height: 200,
            padding: 10,
            marginTop: 40,
            backgroundColor: "#ffffff",
            width: screenWidth - 70,
            borderColor: "#000000",
            borderWidth: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "BarlowSemiCondensed_400Regular",
              textAlign: "center",
              color: "#000000",
              fontSize: 20,
            }}
          >
            After each 25 minute study interval, there will be a 5 minute break.
            This prevents you from burnout or boredom, and allows you to digest
            the information that you have just learned.
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            height: 200,
            padding: 10,
            marginTop: 40,
            width: screenWidth - 70,
            backgroundColor: "#000000",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "BarlowSemiCondensed_400Regular",
              textAlign: "center",
              color: "#ffffff",
              fontSize: 18,
            }}
          >
            Make sure to use this break time to relax, and take care of your
            mental health. Studying for a major test is always stressful, so the
            breaks allow for relaxation to relieve stress and to improve your
            retention of information.
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
          }}
        >
          <Entypo name="arrow-with-circle-down" size={40} color="white" />
        </View>
      </View>
      <View
        style={{
          height: screenHeight - 100,
          width: screenWidth,
          display: "flex",
          alignItems: "center",
          backgroundColor: "#000000",
        }}
      >
        <Text
          style={{
            marginTop: 40,
            fontFamily: "SpaceGrotesk_400Regular",
            fontSize: 50,
            color: "#ffffff",
          }}
        >
          Swipe Left!
        </Text>
        <View
          style={{
            borderColor: "#ffffff",
            borderWidth: 5,
            marginTop: 20,
            width: screenWidth - 70,
            height: 0,
          }}
        />

        <Text
          style={{
            marginTop: 20,
            fontFamily: "SpaceGrotesk_400Regular",
            fontSize: 50,
            color: "#ffffff",
          }}
        >
          Get Started
        </Text>
        <View
          style={{
            display: "flex",
            height: 200,
            padding: 10,
            marginTop: 40,
            backgroundColor: "#000000",
            width: screenWidth - 70,
            borderColor: "#000000",
            borderWidth: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "BarlowSemiCondensed_400Regular",
              textAlign: "center",
              color: "#ffffff",
              fontSize: 20,
            }}
          >
            Swipe Left to create a study schedule, and swipe left again to view
            all of the schedules that you have created. If you would like to end
            a schedule, swipe to the left on that schedule and press the delete
            icon.
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            height: 200,
            padding: 10,
            marginTop: 40,
            width: screenWidth - 70,
            backgroundColor: "#000000",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "BarlowSemiCondensed_400Regular",
              textAlign: "center",
              color: "#ffffff",
              fontSize: 18,
            }}
          >
            If you would like to logout, press the logout button below.
          </Text>
          <TouchableOpacity
            onPress={(e) => {
              console.log(e);
              signOut(auth);
            }}
          >
            <Text
              style={{
                marginTop: 20,
                fontFamily: "SpaceGrotesk_400Regular",
                color: "#ffffff",
                fontSize: 60,
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Welcome;
