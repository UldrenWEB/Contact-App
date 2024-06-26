import React, { useContext, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { loginStyles } from "../styles/loginStyles";
import { login } from "../configs/endpoints.json";
import MyInput from "../components/MyInput";
import MyButton from "../components/MyButton";
import Session from "../storage/sessionStorage";
import TypingText from "../components/typingText";
import Colors from "../styles/Colors";
import { user as getUser } from "../configs/endpoints.json";

import { wrapper } from "../service/fetchWrapper";
import userContext from "../customs/userContext";

const logo = require("../resources/spiralLogo.png");

const LoginScreen = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [isError, setIsError] = useState({ bool: false, msg: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useContext(userContext);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onPressHandler = async () => {
    const msgs = {
      errorUser: "Usuario o contraseña invalidas",
      errorData: "Introduce caracteres validos para el email",
      errorPassword: "Introduce al menos 8 caracteres",
      foundData: "Los campos son requeridos",
    };

    if (!email || !password)
      return setIsError({ bool: true, msg: msgs.foundData });

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
        endPoint: login,
        method: "post",
        json: { email: email, password: password },
      });

      if (!result || result.error) {
        setIsLoading(false);
        Alert.alert("Error", `${"Error al realizar consulta"}`);
        return;
      }

      if (!result.token) {
        setIsError({ bool: true, msg: msgs.errorUser });
        setIsLoading(false);
        return;
      }
      await Session.saveSession(result.token);

      const idUser = await (await Session.getSession()).id;

      const myUser = await wrapper({
        method: "get",
        endPoint: `${getUser.get}${idUser}`,
        isToken: true,
      });

      if (!myUser || !myUser.username) return setIsLoading(false);

      updateUser(myUser);
      setEmail("");
      setPassword("");
      setIsLoading(false);
      navigation.navigate("Prueba");
    } catch (error) {
      return Alert.alert("Error", `${error.message}`);
    }
  };

  const redirectRegister = () => {
    navigation.navigate("Register");
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
    <View style={loginStyles.container}>
      <View style={loginStyles.containerLogo}>
        <Image source={logo} />
        <Text style={loginStyles.txtLogo}>Spiral</Text>
      </View>
      <View style={{ width: "90%", marginTop: "5%" }}>
        <MyInput
          keyboardType="email-address"
          placeholder={"prueba@prueba.com"}
          image={"user"}
          onChangeText={(text) => setEmail(text)}
        />
        <MyInput
          keyboardType={null}
          placeholder="Min. 8 caracteres"
          image={"lock"}
          bolGone={true}
          secureTextEntry={hidePassword}
          press={() => setHidePassword(!hidePassword)}
          onChangeText={(text) => setPassword(text)}
        />
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
      </View>

      <View style={loginStyles.containerBtn}>
        <MyButton onPress={onPressHandler} bg={"primary"} text={"Login"} />
      </View>
      <TouchableOpacity
        onPress={redirectRegister}
        style={loginStyles.containerByTxt}
      >
        <Text style={loginStyles.txtToRegister}>
          No tienes una cuenta todavia?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|edu|es)$/;
  return regex.test(email);
}

function validateAtLeast8Chars(text) {
  const regex = /^.{8,}$/;
  return regex.test(text);
}

export default LoginScreen;
