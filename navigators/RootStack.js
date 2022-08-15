import SplashScreen from "../screens/SplashScreen";
import AuthStack from "./AuthStack";
import React, { useState, useContext, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { UserContext } from "./../components/UserProvider";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./MainStack";
import { CurrentDataProvider } from "../components/CurrentDataProvider";

const RootStack = () => {
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (user) => {
      try {
        await (user ? setUser(user) : setUser(null));
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    });

    return authListener;
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {user ? (
        <CurrentDataProvider>
          <MainStack />
        </CurrentDataProvider>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default RootStack;
