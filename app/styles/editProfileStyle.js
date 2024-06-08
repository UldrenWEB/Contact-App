import { converterHex } from "../service/converterHex";
import Colors from "./Colors";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: Colors.BLACK,
  },
  header: {
    width: "100%",
    height: 250,
    backgroundColor: Colors.grayColor,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  subContainerHeader: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  contButtons: {
    height: "15%",
    display: "flex",
    marginTop: "5%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "5%",
    justifyContent: "space-between",
  },
  contInputs: {
    display: "flex",
    height: "70%",
    marginTop: "7%",
    // justifyContent: "center",
    // alignItems: "center",
  },
  editTxt: {
    color: Colors.SpiralColor,
    fontFamily: "poBold",
    zIndex: 1,
    margin: "auto",
    marginHorizontal: 15,
  },
  editBtn: {
    height: "95%",
    backgroundColor: converterHex(Colors.WHITE, 0.1),
    borderRadius: 15,
  },
  backBtn: {
    height: "60%",
  },
  contDetail: {
    marginTop: "-7%",
    display: "flex",
    gap: 5,
    flexDirection: "column",
    height: "65%",
    alignItems: "center",
  },
  txtName: {
    fontSize: 30,
    color: Colors.WHITE,
    fontFamily: "poBold",
    textTransform: "capitalize",
  },
  fieldContainer: {
    display: "flex",
    marginBottom: 30,
    width: "90%",
    padding: 10,
    backgroundColor: Colors.grayColor,
    borderRadius: 15,
    marginHorizontal: "auto",
  },
  input: {
    borderColor: Colors.SpiralColor,
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 10,
    height: 40,
    color: Colors.WHITE,
    marginVertical: 10,
    padding: 10,
    textDecorationLine: "underline",
    fontSize: 16,
  },
  label: {
    color: Colors.SpiralColor,
    fontFamily: "poBold",
    fontSize: 17,
    textTransform: "capitalize",
  },
});
