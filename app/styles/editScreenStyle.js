import { converterHex } from "../service/converterHex";
import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.BLACK,
    flex: 1,
  },
  error: {
    color: "red",
    fontSize: 16,
    margin: 10,
  },
  header: {
    width: "100%",
    height: 250,
    backgroundColor: Colors.grayColor,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  subContainerHeader: {
    marginTop: "4%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  contButtons: {
    height: "15%",
    display: "flex",
    marginTop: "10%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "5%",
    justifyContent: "space-between",
  },
  editTxt: {
    color: Colors.SpiralColor,
    fontFamily: "poBold",
    zIndex: 1,
    margin: "auto",
    marginHorizontal: 15,
  },
  editBtn: {
    height: "70%",
    backgroundColor: converterHex(Colors.WHITE, 0.1),
    borderRadius: 15,
  },
  backBtn: {
    height: "60%",
  },
  styleImage: {
    width: "28%",
    height: "70%",
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
  },
  containerData: {
    width: "100%",
    paddingVertical: "7%",
    gap: 10,
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
  subLabel: {
    color: Colors.SpiralColor,
    fontFamily: "reBold",
    marginLeft: 10,
    fontSize: 15,
    textTransform: "capitalize",
  },
});
