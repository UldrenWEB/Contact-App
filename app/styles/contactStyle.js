import { StyleSheet, Platform } from "react-native";
import Colors from "./Colors";

export const style = StyleSheet.create({
  headerDinamic: {
    backgroundColor: Colors.grayColor,
    marginTop: Platform.OS === "ios" ? "12%" : "7%",
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "row",
    gap: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  contImg: {
    width: 90,
    height: 90,
  },
  contName: {
    justifyContent: "center",
    alignItems: "center",
  },
  txtName: {
    fontFamily: "poBold",
    fontSize: 20,
    color: Colors.WHITE,
    textTransform: "capitalize",
  },
  txtInfo: {
    color: Colors.GRAY,
    fontFamily: "poRegular",
  },
  contInfUser: {
    display: "flex",
    flexDirection: "column",
  },
  contIcon: {
    marginVertical: "auto",
    marginLeft: "10%",
  },
  textABC: {
    color: Colors.WHITE,
    marginTop: 10,
    marginLeft: 10,
    fontFamily: "reRegular",
    fontSize: 15,
  },
});
