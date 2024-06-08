import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { registerStyle } from "../styles/registerStyles";
import MyInput from "../components/MyInput";
import MyButton from "../components/MyButton";
import { wrapper } from "../service/fetchWrapper";
import { register as endPoint } from "../configs/endpoints.json";
import TypingText from "../components/typingText";
import Colors from "../styles/Colors";

const logo = require("../resources/spiralLogo.png");

const RegisterScreen = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState({ bool: false, msg: "" });
  const [isLoading, setIsLoading] = useState(false);

  const onPressHandler = async () => {
    const msgs = {
      errorUser: "El usuario no puede contener caracteres especiales",
      errorData: "Introduce caracteres validos para el email",
      errorPassword: "Introduce al menos 8 caracteres",
      foundData: "Los campos son requeridos",
    };

    if (!email || !password || !username)
      return setIsError({ bool: true, msg: msgs.foundData });

    if (!validateUsername(username)) {
      setIsError({ bool: true, msg: msgs.errorUser });
      return;
    }

    if (!validateEmail(email)) {
      setIsError({ bool: true, msg: msgs.errorData });
      return;
    }

    if (!validateAtLeast8Chars(password)) {
      setIsError({ bool: true, msg: msgs.errorPassword });
      return;
    }

    setIsError({ bool: false, msg: "" });

    try {
      setIsLoading(true);
      const result = await wrapper({
        endPoint: endPoint,
        method: "post",
        json: { username: username, email: email, password: password },
      });

      console.log("Registro", result);

      if (!result || result.error) {
        setIsLoading(false);
        Alert.alert("Error", `${"Error al realizar consulta"}`);
        return;
      }

      setEmail("");
      setPassword("");
      setUsername("");
      Alert.alert("Success", "Usuario creado exitosamente");
      navigation.navigate("Login");
    } catch (error) {
      console.log(error.message);
      Alert.alert("Error", "Hubo un error al realizar la consulta");
    }
  };

  const redirectLogin = () => {
    navigation.navigate("Login");
  };

  if (isLoading) {
    return (
      <>
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: Colors.BLACK,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </>
    );
  }

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
            placeholder={"usuario trabajo"}
            image={"user"}
            onChangeText={(text) => setUsername(text)}
          />
          <MyInput
            keyboardType="text"
            placeholder={"prueba@prueba.com"}
            image={"envelope"}
            onChangeText={(text) => setEmail(text)}
          />
          <MyInput
            keyboardType={null}
            placeholder="Min. 8 caracteres"
            image={"lock"}
            onChangeText={(text) => setPassword(text)}
            bolGone={true}
            secureTextEntry={hidePassword}
            press={() => setHidePassword(!hidePassword)}
          />
        </View>
        {isError.bool && (
          <TypingText
            text={isError.msg}
            typingDelay={50}
            style={{
              marginLeft: 15,
              marginTop: "-10%",
              marginBottom: "10%",
              color: "red",
              fontFamily: "reRegular",
            }}
          />
        )}
        {!isError.bool && (
          <Text
            style={{
              marginLeft: 15,
              marginTop: "-10%",
              marginBottom: "10%",
            }}
          ></Text>
        )}

        <View>
          <MyButton
            onPress={onPressHandler}
            bg={"primary"}
            text={"Registrar"}
          />
        </View>
        <TouchableOpacity
          style={registerStyle.containerText}
          onPress={redirectLogin}
          activeOpacity={0.6}
        >
          <Text style={registerStyle.textToLogin}>Ya tienes una cuenta?</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

function validateUsername(username) {
  const regex = /^[a-zA-Z0-9_ ]*$/;
  return regex.test(username);
}

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|edu|es)$/;
  return regex.test(email);
}

function validateAtLeast8Chars(text) {
  const regex = /^.{8,}$/;
  return regex.test(text);
}

export default RegisterScreen;
