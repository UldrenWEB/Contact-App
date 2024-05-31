import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import Colors from "../styles/Colors";
import { converterHex } from "../service/converterHex";

const HeaderMinimal = ({ navigation, title, btnName, onPress }) => {
  const goBackHandler = () => {
    navigation.goBack();
  };

  return (
    <View style={style.header}>
      <View style={style.contHeader}>
        <TouchableOpacity onPress={goBackHandler} style={style.btnBack}>
          <Icon
            color={Colors.SpiralColor}
            name="arrow-left"
            type="font-awesome"
            size={24}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress} style={style.btnSave}>
          <Text style={style.txtSave}>{btnName}</Text>
        </TouchableOpacity>
      </View>
      <Text style={style.title}>{title}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    width: "100%",
    height: 80,
    alignItems: "center",
    flexDirection: "column",
    paddingHorizontal: "5%",
    backgroundColor: Colors.grayColor,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  contHeader: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "4%",
    flexDirection: "row",
  },
  btnSave: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: converterHex(Colors.WHITE, 0.1),
    borderRadius: 10,
  },
  txtSave: {
    color: Colors.SpiralColor,
    fontFamily: "poBold",
    fontSize: 14,
    shadowColor: Colors.WHITE,
  },
  title: {
    color: Colors.WHITE,
    fontFamily: "poBold",
    fontSize: 25,
    marginTop: "-5%",
  },
});

export default HeaderMinimal;
