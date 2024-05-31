import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../styles/Colors";

import StarSvg from "./StarSvg";
import ContactSvg from "./ContactSvg";
import GroupSvg from "./GroupSvg";
import { useRoute } from "@react-navigation/native";

const IconScreen = ({ title, icon, route }) => {
  const routeAc = useRoute();
  const color = routeAc.name === route ? Colors.SpiralColor : Colors.GRAY;

  const icons = {
    contact: <ContactSvg color={color} size={26} />,
    star: <StarSvg color={color} size={26} />,
    group: <GroupSvg color={color} size={26} />,
  };

  return (
    <View style={style.container}>
      <View>{icons[icon]}</View>
      <View>
        <Text style={[style.title, { color }]}>{title}</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: "80%",
    width: "auto",
    gap: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "poRegular",
    fontSize: 12,
  },
});

export default IconScreen;
