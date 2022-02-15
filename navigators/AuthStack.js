import { createStackNavigator } from "@react-navigation/stack";
import InitialScreen from "./../screens/InitialScreen";
import Login from "./../screens/Login";
import SignUp from "./../screens/SignUp";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={InitialScreen}
        name="Initial Screen"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={Login}
        name="Login"
        options={{
          headerTitleStyle: {
            fontFamily: "BarlowSemiCondensed_400Regular",
          },
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        component={SignUp}
        name="SignUp"
        options={{
          headerTitleStyle: {
            fontFamily: "BarlowSemiCondensed_400Regular",
          },
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
