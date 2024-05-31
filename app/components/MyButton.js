import { TouchableOpacity, Text, View } from "react-native";
import Colors from "../styles/Colors";
import { btnStyles } from "../styles/btnStyles";

const MyButton = ({ onPress, bg, text }) => {
  const styleFormatted = bg.toLowerCase();

  const primary = {
    bg: Colors.SpiralColor,
    tx: Colors.WHITE,
    border: Colors.SpiralColor,
  };

  const secondary = {
    bg: Colors.BLACK,
    tx: Colors.SpiralColor,
    border: Colors.SpiralColor,
  };

  const theStyle = styleFormatted === "primary" ? primary : secondary;

  return (
    <View style={{ ...btnStyles.btnContainer, backgroundColor: theStyle.bg }}>
      <TouchableOpacity
        style={{
          borderColor: theStyle.border,
        }}
        activeOpacity={0.9}
        onPress={onPress}
      >
        <Text style={{ ...btnStyles.txtBtn, color: theStyle.tx }}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyButton;
