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
      initialRouteName="CreateSchedule"
      screenOptions={{
        tabBarShowLabel: false,
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
          tabBarIcon: ({ color }) => {
            <Entypo name="calendar" size={24} color={color} />;
          },
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

const FinalStack = () => {};
export default MainStack;
