import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
    alignItems: "center",
  },
  contProp: {
    flex: 1,
    width: "100%",
    marginTop: "12%",
    paddingHorizontal: 10,
  },
});
