import { TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "react-native";
import { Icon, Input } from "react-native-elements";
import Colors from "../styles/Colors";
import { converterHex } from "../service/converterHex";

const hideIcon = require("../resources/esconder.png");
const showIcon = require("../resources/ojo-abierto.png");
const emailIcon = require("../resources/email.png");

const MyInput = ({
  placeholder,
  press,
  image,
  imageRight,
  secureTextEntry,
  keyboardType,
  onChangeText,
  value,
  bolError,
  strError,
  editable,
  bolGone,
}) => {
  return (
    <Input
      style={{ alignItems: "center" }}
      containerStyle={{
        marginBottom: 20,
        borderBottomColor: Colors.SpiralColor,
        borderBottomWidth: 0,
      }}
      inputStyle={{
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 8,
        marginTop: 5,
        color: Colors.SpiralColor,
        fontFamily: "poBold",
      }}
      placeholderTextColor={converterHex(Colors.WHITE, 0.5)}
      placeholder={placeholder}
      leftIconContainerStyle={{ marginLeft: "5%", marginRight: "4%" }}
      leftIcon={
        image === "email" ? (
          <Image
            style={{
              width: 24,
              height: 24,
              tintColor: Colors.SpiralColor,
            }}
            source={emailIcon}
          />
        ) : (
          <Icon
            size={24}
            color={Colors.SpiralColor}
            type="font-awesome"
            name={image}
          />
        )
      }
      rightIcon={
        bolGone ? (
          <TouchableOpacity activeOpacity={0.8} onPress={press}>
            <Image
              style={{ width: 30, height: 30 }}
              tintColor={Colors.SpiralColor}
              source={secureTextEntry ? hideIcon : showIcon}
            />
          </TouchableOpacity>
        ) : (
          <Icon
            size={24}
            color={Colors.SpiralColor}
            type="font-awesome"
            name={imageRight}
          />
        )
      }
      errorStyle={{ color: Colors.GRAY }}
      errorMessage={bolError ? strError : ""}
      editable={editable}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      value={value}
    />
  );
};

export default MyInput;
