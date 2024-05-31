import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { registerStyle } from "../styles/registerStyles";
import MyInput from "../components/MyInput";
import MyButton from "../components/MyButton";

const logo = require("../resources/spiralLogo.png");

const RegisterScreen = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);

  const onPressHandler = () => {
    //Logica de registro con el fetch
  };

  const redirectLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <>
      <View style={registerStyle.container}>
        <View style={registerStyle.containerLogo}>
          <Image source={logo} />
          <Text style={registerStyle.txtLogo}>Spiral</Text>
        </View>

        <View style={registerStyle.containerInputs}>
          <MyInput
            keyboardType="text"
            placeholder={"Uldren-Personal"}
            image={"user"}
          />
          <MyInput
            keyboardType="text"
            placeholder={"example@example.com"}
            image={"envelope"}
          />
          <MyInput
            keyboardType={null}
            placeholder="Min. 8 characters"
            image={"lock"}
            bolGone={true}
            secureTextEntry={hidePassword}
            press={() => setHidePassword(!hidePassword)}
          />
        </View>

        <View>
          <MyButton onPress={onPressHandler} bg={"primary"} text={"Register"} />
        </View>
        <TouchableOpacity
          style={registerStyle.containerText}
          onPress={redirectLogin}
          activeOpacity={0.6}
        >
          <Text style={registerStyle.textToLogin}>
            Already have an account?
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default RegisterScreen;
