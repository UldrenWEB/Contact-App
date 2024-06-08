import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import Colors from "../styles/Colors";
import { converterHex } from "../service/converterHex";
import { Icon } from "react-native-elements";

const HeaderContact = ({ onChange, text, onPressToAdd, onPressToProfile }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <Icon
          name="search"
          color={converterHex(Colors.WHITE, 0.3)}
          size={25}
          style={styles.lupIcon}
        />
        <TextInput
          placeholder="Buscar"
          placeholderTextColor={converterHex(Colors.WHITE, 0.3)}
          value={text}
          style={styles.input}
          onChangeText={onChange}
        />
      </View>
      <TouchableOpacity style={styles.btnAdd}>
        <Icon
          type="font-awesome"
          name="plus"
          size={24}
          color={Colors.SpiralColor}
          onPress={onPressToAdd}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnAdd} onPress={onPressToProfile}>
        <Icon
          type="font-awesome"
          name="ellipsis-h"
          size={24}
          color={Colors.SpiralColor}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
    position: "absolute",
    paddingTop: Platform.OS === "ios" ? "10%" : "",
    zIndex: 999,
    display: "flex",
    alignItems: "center",
    gap: 15,
    flexDirection: "row",
    paddingHorizontal: 20,
    backgroundColor: Colors.grayColor,
  },
  containerInput: {
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: converterHex(Colors.WHITE, 0.1),
    width: "70%",
    padding: 8,
    borderRadius: 20,
    fontFamily: "poRegular",
    color: Colors.WHITE,
    backgroundColor: Colors.grayBg,
  },
  lupIcon: {
    marginTop: "2%",
  },
  input: {
    paddingLeft: 5,
    width: "100%",
    fontSize: 16,
    fontFamily: "poBold",
    color: Colors.WHITE,
  },
  btnAdd: {
    backgroundColor: Colors.grayBg,
    padding: 8,
    borderRadius: 8,
    paddingHorizontal: 13,
  },
});

export default HeaderContact;
