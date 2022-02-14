import { createStackNavigator } from "@react-navigation/stack";
import InitialScreen from "./../screens/InitialScreen";

const Stack = createStackNavigator();

const MainStack = () => {
  <Stack.Navigator>
    <Stack.Screen component={InitialScreen} name="Initial Screen" />
  </Stack.Navigator>;
};

export default MainStack;
