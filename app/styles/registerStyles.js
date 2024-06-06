import { StyleSheet } from "react-native";
import Colors from "./Colors";

const registerStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
  containerInputs: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
    marginHorizontal: "3.5%",
  },
  containerLogo: {
    padding: "4%",
    marginTop: "3%",
    marginBottom: "4%",
    margin: "auto",
  },
  txtLogo: {
    color: Colors.GRAY,
    fontFamily: "reBold",
    fontSize: 16,
    margin: "auto",
    marginTop: "1%",
  },
  containerText: {
    marginHorizontal: "auto",
    borderBottomWidth: 1,
    borderColor: Colors.SpiralColor,
  },
  textToLogin: {
    color: Colors.SpiralColor,
    fontSize: 12,
    margin: "auto",
    fontFamily: "poBold",
  },
});

export { registerStyle };
