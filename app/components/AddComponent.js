import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { Icon } from "react-native-elements";
import Colors from "../styles/Colors";
import { converterHex } from "../service/converterHex";

const AddComponent = ({
  children,
  onChange,
  label,
  textInput,
  heigthMin,
  paddingHorizontal,
  animationDuration,
  sizeLabel,
  heightMax,
  isOpen,
  onOpen,
  marginBottom,
}) => {
  const [pressedClose, setPressedClose] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  //*Mostrar
  const handleAddPress = () => {
    onOpen(true);
    animation.resetAnimation();
    Animated.timing(animation, {
      toValue: 1,
      duration: !animationDuration ? 500 : animationDuration,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (!isOpen) {
      setPressedClose(true);
      animation.resetAnimation();
      Animated.timing(animation, {
        toValue: 1,
        duration: !animationDuration ? 500 : animationDuration,
        useNativeDriver: false,
      }).start();
    }
  }, [isOpen]);

  //*Ocultar
  const handleClosed = () => {
    onOpen(false);
    setPressedClose(true);
    animation.resetAnimation();
    Animated.timing(animation, {
      toValue: 1,
      duration: !animationDuration ? 500 : animationDuration,
      useNativeDriver: false,
    }).start();
  };

  const styleOpen = {
    height: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [
        !heigthMin ? "15%" : heigthMin,
        !heightMax ? "22%" : heightMax,
      ],
    }),
  };

  const styleClosed = {
    height: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [
        !heightMax ? "22%" : heightMax,
        !heigthMin ? "15%" : heigthMin,
      ],
    }),
  };

  const styleHeaderOpen = {
    marginTop: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["5%", "3%"],
    }),
  };

  const styleHeaderClosed = {
    marginTop: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["3%", "5%"],
    }),
  };

  return (
    <Animated.View
      style={[
        style.contEmail,
        { marginBottom: marginBottom },
        { paddingHorizontal: paddingHorizontal },
        { height: heigthMin },
        isOpen ? styleOpen : pressedClose ? styleClosed : {},
      ]}
    >
      <Animated.View
        style={[
          style.header,
          isOpen ? styleHeaderOpen : pressedClose ? styleHeaderClosed : {},
        ]}
      >
        <View style={style.label}>
          <TouchableOpacity onPress={isOpen ? handleClosed : handleAddPress}>
            <Text style={[style.txtLabel, { fontSize: sizeLabel }]}>
              {label}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={style.add}>
          <TouchableOpacity onPress={isOpen ? handleClosed : handleAddPress}>
            <Icon
              color={Colors.SpiralColor}
              name={isOpen ? "minus" : "plus"}
              size={20}
              type="font-awesome"
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
      {isOpen && (
        <Animated.View style={{ opacity: animation }}>
          {children ? (
            children
          ) : (
            <TextInput
              value={textInput}
              style={style.input}
              onChangeText={onChange}
            />
          )}
        </Animated.View>
      )}
    </Animated.View>
  );
};

const style = StyleSheet.create({
  header: {
    marginHorizontal: "5%",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: "5%",
  },
  txtLabel: {
    color: Colors.SpiralColor,
    fontFamily: "poBold",
    fontSize: 18,
    textDecorationLine: "underline",
  },
  label: {
    width: "50%",
  },
  add: {
    alignItems: "center",
    justifyContent: "center",
    width: "10%",
    backgroundColor: converterHex(Colors.GRAY, 0.1),
    borderRadius: 10,
  },
  input: {
    borderColor: "white",
    borderWidth: 1,
    marginHorizontal: "4%",
    marginVertical: "3%",
    borderRadius: 10,
    borderColor: Colors.WHITE,
    color: Colors.SpiralColor,
    fontFamily: "poBold",
    height: 32,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  contEmail: {
    backgroundColor: Colors.grayColor,
    width: "100%",
    borderRadius: 20,
  },
});

export default AddComponent;
