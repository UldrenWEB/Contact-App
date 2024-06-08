import { StyleSheet } from "react-native";
import { converterHex } from "../service/converterHex";
import Colors from "./Colors";

export const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.BLACK,
    flex: 1,
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: "40%",
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
    width: "35%",
    height: "64%",
  },
  contDetail: {
    marginTop: "-8%",
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
  contIcon: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "-3%",
    width: "50%",
    height: "30%",
  },
  containerData: {
    width: "100%",
    height: "58%",
    paddingVertical: "3%",
    gap: 10,
    justifyContent: "space-evenly",
  },
});
