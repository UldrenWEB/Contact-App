import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../styles/Colors";
import { converterHex } from "../service/converterHex";
import { useEffect, useState } from "react";

const Group = ({ group, onPress }) => {
  const [thegroup, setTheGroup] = useState({});

  useEffect(() => {
    if (!group) return null;

    setTheGroup(group);
  }, [group]);

  return (
    <TouchableOpacity onPress={() => onPress(thegroup)} style={style.container}>
      <View style={style.contName}>
        <Text style={style.name}>{thegroup?.name}</Text>
      </View>
      <View style={style.totalContacts}>
        <Text style={style.number}>{thegroup?.contacts?.length}</Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "46%",
    backgroundColor: Colors.grayColor,
    height: "10%",
    alignItems: "center",
    borderRadius: 15,
    padding: 10,
    gap: 4,
  },
  contName: {
    height: "100%",
    width: "75%",
    justifyContent: "center",
    alignItems: "center",
  },
  totalContacts: {
    justifyContent: "center",
    alignItems: "center",
    width: "25%",
    backgroundColor: converterHex(Colors.GRAY, 0.5),
    padding: 10,
    borderRadius: 50,
    marginRight: 5,
  },
  name: {
    color: Colors.SpiralColor,
    fontFamily: "poBold",
    fontSize: 14,
  },
  number: {
    color: Colors.WHITE,
    fontFamily: "reRegular",
  },
});

export default Group;
