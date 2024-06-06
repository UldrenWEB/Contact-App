import { View, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Icon } from "react-native-elements";
import Colors from "../styles/Colors";
import { parseUrl } from "../service/parseUrl";
import {
  ActionSheetProvider,
  connectActionSheet,
} from "@expo/react-native-action-sheet";
import { converterHex } from "../service/converterHex";

const IconApp = ({
  iconType,
  colorName,
  arrayData,
  showActionSheetWithOptions,
}) => {
  const iconTypeFormatted = iconType.toLowerCase();
  const colorFormatted = colorName.toLowerCase();

  const colorToUse =
    colorFormatted === "pink"
      ? {
          bg: Colors.bgSpiralColorIcon,
          tint: Colors.SpiralColor,
          opacity: 0.36,
        }
      : {
          bg: Colors.bgBlueColorIcon,
          tint: Colors.bgBlueColorIcon,
          opacity: 0.2,
        };

  const urlToUse = (data) => {
    const result = parseUrl(iconType);
    if (typeof result !== "object") return null;

    result.data = data;
    const url = Object.values(result).join("");

    return url;
  };

  const handleLinking = async (data) => {
    const url = urlToUse(data);

    try {
      await Linking.openURL(url);
    } catch (error) {
      return null;
    }
  };

  const onPressHandler = async () => {
    if (Array.isArray(arrayData) && arrayData.length > 1) {
      const options = [...arrayData, "Cancel"];
      const cancelButtonIndex = arrayData.length;

      showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
          title: "Select an option",
          message: "Choose your preferred option",
          useModal: true,
          destructiveButtonIndex: undefined,
          textStyle: { color: "white" },
          titleTextStyle: { color: "white" },
          messageTextStyle: { color: "white" },
          containerStyle: { backgroundColor: "black" },
        },
        async (buttonIndex) => {
          if (buttonIndex !== cancelButtonIndex) {
            //!Llamar
            await handleLinking(arrayData[buttonIndex]);
          }
        }
      );
    } else {
      await handleLinking(arrayData[0]);
    }
  };

  return (
    <>
      <View style={style.container}>
        <TouchableOpacity
          style={{
            ...style.containerIcon,
            backgroundColor: converterHex(colorToUse.bg, colorToUse.opacity),
          }}
          activeOpacity={1}
          onPress={onPressHandler}
        >
          <Icon
            size={20}
            type="font-awesome"
            name={iconTypeFormatted}
            color={colorToUse.tint}
            style={{ opacity: 1 }}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const ConnectedIconApp = connectActionSheet(IconApp);

export default (props) => (
  <ActionSheetProvider>
    <ConnectedIconApp {...props} />
  </ActionSheetProvider>
);

const style = StyleSheet.create({
  container: {
    borderRadius: 999,
    borderColor: Colors.SpiralColor,
    margin: 5,
    width: 37,
    height: 34,
    overflow: "hidden",
  },
  containerIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
