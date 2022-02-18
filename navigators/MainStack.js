import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Welcome";
import InitialScreen from "./../screens/InitialScreen";

import SplashScreen from "./../screens/SplashScreen";
import Pomodoro from "./../screens/Pomodoro";

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "none",
      }}
    >
      <Stack.Screen component={Pomodoro} name="Pomodoro" />
      <Stack.Screen component={SplashScreen} name="Splash Screen" />
    </Stack.Navigator>
  );
};

export default MainStack;
