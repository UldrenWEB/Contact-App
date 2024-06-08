import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.BLACK,
    height: "100%",
  },
  centeredView: {
    height: "50%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.grayColor,
    borderRadius: 20,
    padding: 35,
    height: "70%",
    flexDirection: "column",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contBtn: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  btnModal: {
    overflow: "hidden",
    borderRadius: 10,
  },
  input: {
    borderColor: Colors.WHITE,
    borderRadius: 10,
    width: 250,
    fontFamily: "poBold",
    fontSize: 15,
    paddingLeft: 15,
    paddingRight: 10,
    color: Colors.SpiralColor,
    borderWidth: 1,
    paddingVertical: 2,
  },
  contContact: {
    width: 230,
    marginTop: 20,
  },
  textABC: {
    color: Colors.WHITE,
    marginTop: 10,
    marginLeft: 10,
    fontFamily: "reRegular",
    fontSize: 15,
  },
});
