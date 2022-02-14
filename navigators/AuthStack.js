import { createStackNavigator } from "@react-navigation/stack";
import InitialScreen from "./../screens/InitialScreen";
import Login from "./../screens/Login";
import SignUp from "./../screens/SignUp";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={InitialScreen} name="Initial Screen" />
      <Stack.Screen component={Login} name="Login" />
      <Stack.Screen component={SignUp} name="SignUp" />
    </Stack.Navigator>
  );
};

export default AuthStack;
