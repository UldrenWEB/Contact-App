import { StyleSheet } from "react-native";
import Colors from "./Colors";

const contactStyle = StyleSheet.create({
  container: {
    display: "flex",
    width: "95%",
    height: 60,
    marginHorizontal: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    alignItems: "center",
    borderBottomWidth: 1,
    marginBottom: 10,
    gap: 10,
    borderColor: Colors.GRAY,
    marginTop: 10,
  },
  containerIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "50%",
    alignItems: "center",
  },
  txtContact: {
    fontSize: 18,
    fontFamily: "poBold",
    color: Colors.WHITE,
  },
});

export { contactStyle };
