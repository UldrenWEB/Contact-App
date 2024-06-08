import Colors from "./Colors";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    height: "92.8%",
    backgroundColor: Colors.BLACK,
    alignItems: "center",
  },
  contProp: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 22,
    width: "100%",
    height: "89.7%",
    borderColor: "green",
    justifyContent: "center",
    paddingHorizontal: "4%",
    paddingTop: "10%",
  },
  overlay: {
    position: "absolute",
    zIndex: 999,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    borderColor: Colors.SpiralColor,
    borderWidth: 1,
    borderRadius: 10,
    color: Colors.WHITE,
    width: "80%",
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
});
