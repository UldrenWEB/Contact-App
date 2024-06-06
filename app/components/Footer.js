import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../styles/Colors";
import IconScreen from "./IconScreen";

const Footer = ({}) => {
  const navigation = useNavigation();

  const onPressHandler = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={style.container}>
      {/* <TouchableOpacity onPress={() => onPressHandler("Favorites")}>
        <IconScreen icon={"star"} title={"Favorites"} route={"Favorites"} />
      </TouchableOpacity> */}
      <TouchableOpacity onPress={() => onPressHandler("Prueba")}>
        <IconScreen icon={"contact"} title={"Contacts"} route={"Prueba"} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPressHandler("Groups")}>
        <IconScreen icon={"group"} title={"Groups"} route={"Groups"} />
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: 60,
    width: "100%",
    flexDirection: "row",
    gap: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.grayColor,
  },
});

export default Footer;
