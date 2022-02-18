import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Welcome from "../screens/Welcome";
import InitialScreen from "./../screens/InitialScreen";

import SplashScreen from "./../screens/SplashScreen";
import Pomodoro from "./../screens/Pomodoro";
import CreateSchedule from "../screens/CreateSchedule";
import ViewSchedules from "../screens/ViewSchedules";
import { Ionicons } from "expo-vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "none",
      }}
    >
      <Stack.Screen component={PomodoroStack} name="Pomodoro" />
      <Stack.Screen component={SplashScreen} name="Splash Screen" />
    </Stack.Navigator>
  );
};

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

const WelcomeStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: "none",
        tabBarInactiveTintColor: "#c4c4c4",
        tabBarActiveTintColor: "#000000",
      }}
    >
      <Tab.Screen
        component={Welcome}
        name="Welcome"
        options={{
          tabBarButton: Button,
          tabBarIcon: ({ color }) => <Ionicons name="home" color={color} />,
        }}
      />
      <Tab.Screen
        component={CreateSchedule}
        name="CreateSchedule"
        options={{
          tabBarButton: Button,
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle" color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={ViewSchedules}
        name="ViewSchedules"
        options={{
          tabBarButton: Button,
          tabBarIcon: ({ color }) => <Ionicons name="calendar" color={color} />,
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
export default MainStack;
