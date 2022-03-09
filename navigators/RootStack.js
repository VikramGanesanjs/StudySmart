import SplashScreen from "../screens/SplashScreen";
import AuthStack from "./AuthStack";
import React, { useState, useContext, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { UserContext } from "./../components/UserProvider";
import { NavigationContainer } from "@react-navigation/native";
import FinalStack from "./MainStack";

const RootStack = () => {
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (user) => {
      try {
        await (user ? setUser(user) : setUser(null));
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    });

    return authListener;
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <FinalStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootStack;
