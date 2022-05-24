import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Welcome from "../screens/Welcome";
import InitialScreen from "./../screens/InitialScreen";

import SplashScreen from "./../screens/SplashScreen";
import Pomodoro from "./../screens/Pomodoro";
import CreateSchedule from "../screens/CreateSchedule";
import ViewSchedules from "../screens/ViewSchedules";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth } from "../config/firebase";
import { AuthErrorCodes } from "firebase/auth";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { useContext, useState, useEffect } from "react";
import { CurrentDataContext } from "../components/CurrentDataProvider";
import { Timestamp } from "firebase/firestore";
import { CurrentScheduleContext } from "../components/CurrentScheduleProvider";
import { NavigationContainer } from "@react-navigation/native";
import {
  doc,
  getDocs,
  onSnapshot,
  collection,
  query,
} from "firebase/firestore";
import { db } from "../config/firebase";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const PomodoroStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "none",
      }}
    >
      <Stack.Screen component={Pomodoro} name="Pomodoro" />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarShowIcon: true,
        headerShown: "none",
        tabBarIndicatorStyle: {
          backgroundColor: "#000000",
        },
        tabBarItemStyle: {
          paddingTop: 50,
        },
        tabBarStyle: {
          height: 100,
        },
        tabBarContentContainerStyle: {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarInactiveTintColor: "#c4c4c4",
        tabBarActiveTintColor: "#000000",
      }}
    >
      <Tab.Screen
        component={Welcome}
        name="Welcome"
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={CreateSchedule}
        name="CreateSchedule"
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="plus" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={ViewSchedules}
        name="ViewSchedules"
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="calendar" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Button = (props) => {
  return (
    <TouchableOpacity
      {...props}
      style={
        props.accessibilityState.selected
          ? [...props.style, { borderTopColor: "#000000", borderTopWidth: 10 }]
          : props.style
      }
    />
  );
};

const FinalStack = () => {
  const [pomodoro, setPomodoro] = useState(false);
  const { currentSchedule, setCurrentSchedule } = useContext(
    CurrentScheduleContext
  );
  const [data, setData] = useState({});

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
    const currentTime = new Date();
    console.log(data);
    for (const key in dData) {
      console.log("entered");
      const clientSeconds =
        currentTime.getHours() * 3600 + currentTime.getMinutes() * 60;
      const startTimestamp = new Timestamp(dData[key]["start"]["seconds"]);
      const endTimestamp = new Timestamp(dData[key]["end"].seconds);

      const utcStartSeconds = startTimestamp.seconds;
      const utcEndseconds = endTimestamp.seconds;

      const greaterTime = clientSeconds > utcStartSeconds;
      const lessTime = clientSeconds < utcEndseconds;

      console.log(utcStartSeconds, clientSeconds, utcEndseconds);

      const trueDay = dData[key][dayOfWeekAsString(currentTime.getDay())];
      if (trueDay) {
        if (greaterTime && lessTime) {
          setPomodoro(true);
          setCurrentSchedule(key.toString());
          console.log(`Schedule ${currentSchedule} selected!`);

          return;
        }
      }
    }
    setPomodoro(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      readSchedules(data);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(async () => {
    console.log(auth.currentUser.uid);
    const ref = query(
      collection(db, "Users", auth.currentUser.uid, `S-${auth.currentUser.uid}`)
    );
    const unsub = onSnapshot(ref, (querySnap) => {
      let dat = {};
      querySnap.forEach((doc) => {
        dat[doc.id] = doc.data();
      });
      setData(dat);
    });
    return () => unsub;
  }, []);

  return pomodoro ? <PomodoroStack /> : <MainStack />;
};
export default FinalStack;
