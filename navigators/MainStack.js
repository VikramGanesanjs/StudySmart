import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Welcome from "../screens/Welcome";
import InitialScreen from "./../screens/InitialScreen";

import SplashScreen from "./../screens/SplashScreen";
import Pomodoro from "./../screens/Pomodoro";
import CreateSchedule from "../screens/CreateSchedule";
import ViewSchedules from "../screens/ViewSchedules";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth, db } from "../config/firebase";
import { AuthErrorCodes } from "firebase/auth";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { useContext, useState, useEffect } from "react";
import { CurrentDataContext } from "../components/CurrentDataProvider";
import { doc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { Timestamp, onSnapshot } from "firebase/firestore";
import { CurrentScheduleContext } from "../components/CurrentScheduleProvider";
import { NavigationContainer } from "@react-navigation/native";

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
  const [time, setTime] = useState(new Date());
  const [pomodoro, setPomodoro] = useState(false);
  const { currentSchedule, setCurrentSchedule } = useContext(
    CurrentScheduleContext
  );
  const { data, setData } = useContext(CurrentDataContext);

  const readSchedules = (dData) => {
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

    Object.keys(dData).forEach((key) => {
      const clientSeconds = time.getHours() * 3600 + time.getMinutes() * 60;
      const startTimestamp = new Timestamp(dData[key]["start"]["seconds"]);
      const endTimestamp = new Timestamp(dData[key]["end"].seconds);

      const utcStartSeconds =
        startTimestamp.seconds - startTimestamp.toDate().getTimezoneOffset();
      const utcEndseconds =
        endTimestamp.seconds - startTimestamp.toDate().getTimezoneOffset();
      if (dData[key][dayOfWeekAsString(time.getDay())] == true) {
        if (clientSeconds > utcStartSeconds && clientSeconds < utcEndseconds) {
          setPomodoro(true);
          setCurrentSchedule(key.toString());

          return;
        }
      }
      setPomodoro(false);
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      readSchedules(data);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return pomodoro ? <PomodoroStack /> : <MainStack />;
};
export default FinalStack;
