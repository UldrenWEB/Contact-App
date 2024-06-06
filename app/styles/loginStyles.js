import { StyleSheet } from "react-native";
import Colors from "./Colors";

const loginStyles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: Colors.BLACK,
  },
  containerLogo: {
    padding: "4%",
    marginTop: "5%",
    marginBottom: "9%",
  },
  descriptionContainer: {
    marginTop: "2%",
    marginBottom: "5%",
  },
  title: {
    color: Colors.WHITE,
    fontFamily: "poBold",
    fontSize: 40,
    margin: "auto",
    marginBottom: "0%",
  },
  descriptionSpecified: {
    color: Colors.WHITE,
    fontFamily: "poBold",
    fontSize: 13,
  },
  containerBtn: {
    marginTop: "8%",
  },
  containerDescriptionTxt: {
    padding: 0.5,
  },
  txtLogo: {
    color: Colors.GRAY,
    fontFamily: "reBold",
    fontSize: 15,
    margin: "auto",
    marginTop: "4%",
  },
  txtNormal: {
    color: Colors.WHITE,
    fontFamily: "poBold",
    fontSize: 20,
  },
  txtToRegister: {
    color: Colors.SpiralColor,
    fontFamily: "poBold",
    fontSize: 12,
  },
  containerByTxt: {
    borderBottomWidth: 1,
    borderColor: Colors.SpiralColor,
    marginTop: "0%",
  },
});

export { loginStyles };
