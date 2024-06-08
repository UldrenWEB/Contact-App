import React, { useEffect, useRef } from "react";
import { Animated, Easing, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

import { splashStyles } from "../styles/splashStyles.js";

const splashImage = require("../resources/spiralLogo.png");
const SplashScreenComponent = () => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    const spinAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    );

    spinAnimation.start();

    const timer = setTimeout(() => {
      SplashScreen.hideAsync();
      navigation.navigate("Login");
    }, 4000);

    return () => {
      clearTimeout(timer);
      spinAnimation.stop();
    };
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "1000deg"],
  });

  return (
    <View style={splashStyles.container}>
      <Animated.Image
        style={{
          width: 200,
          height: 200,
          transform: [{ rotate: spin }],
        }}
        source={splashImage}
      />
      <Text style={splashStyles.letterStyle}>Spiral</Text>
    </View>
  );
};

export default SplashScreenComponent;
