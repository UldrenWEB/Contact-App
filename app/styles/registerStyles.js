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
    gap: 1,
    marginHorizontal: "3.5%",
  },
  containerLogo: {
    padding: "4%",
    marginTop: "15%",
    marginBottom: "9%",
    margin: "auto",
  },
  txtLogo: {
    color: Colors.GRAY,
    fontFamily: "reBold",
    fontSize: 30,
    margin: "auto",
    marginTop: "4%",
  },
  containerText: {
    marginHorizontal: "auto",
    borderBottomWidth: 1,
    borderColor: Colors.SpiralColor,
  },
  textToLogin: {
    color: Colors.SpiralColor,
    fontSize: 15,
    margin: "auto",
    fontFamily: "poBold",
  },
});

export { registerStyle };
