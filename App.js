import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SplashScreen from "./screens/SplashScreen";
import SignUp from "./screens/SignUp";

import {
  useFonts,
  SpaceGrotesk_400Regular,
} from "@expo-google-fonts/space-grotesk";
import { BarlowSemiCondensed_400Regular } from "@expo-google-fonts/barlow-semi-condensed";
import InitialScreen from "./screens/InitialScreen";
import Login from "./screens/Login";
import RootStack from "./navigators/RootStack";
import { UserProvider } from "./components/UserProvider";
import { CurrentTimeProvider } from "./components/CurrentTimeProvider";

export default function App() {
  let [fontsLoaded] = useFonts({
    BarlowSemiCondensed_400Regular,
    SpaceGrotesk_400Regular,
  });

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <UserProvider>
      <CurrentTimeProvider>
        <RootStack />
      </CurrentTimeProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

registerRootComponent(App);
