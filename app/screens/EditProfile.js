import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useContext, useState } from "react";
import { Icon } from "react-native-elements";
import { converterHex } from "../service/converterHex";
import Colors from "../styles/Colors";
import { useEffect } from "react";
import { wrapper } from "../service/fetchWrapper";
import { user as endPoint } from "../configs/endpoints.json";
import userContext from "../customs/userContext";
import Session from "../storage/sessionStorage";

const unknow = require("../resources/image.png");

const EditProfile = ({ route, navigation }) => {
  const { user } = route.params;
  const [editUser, setEditUser] = useState({ ...user, password: "" });
  const [isModified, setIsModified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useContext(userContext);

  useEffect(() => {
    setIsModified(
      JSON.stringify({ ...user, password: "" }) !== JSON.stringify(editUser)
    );
  }, [editUser]);

  const validateName = (name) => {
    if (!name) return true;

    const regex = /^[a-zA-Z\s]{3,}$/;
    return regex.test(name);
  };

  const validatePassword = (password) => {
    if (!password) return true;

    const regex = /^.{8,}$/;
    return regex.test(password);
  };

  const validateEmail = (email) => {
    if (!email) return true;

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|edu|es)$/;
    return regex.test(email);
  };

  const saveHandlerPress = async () => {
    if (!isModified) return;

    let error;
    if (!validateName(editUser.username)) {
      error = {
        message:
          "Debe introducir solo nombres validos, no caracteres especiales",
        bool: true,
      };
    }

    if (!validateEmail(editUser.email)) {
      error = {
        message: "Debe introducir un formato de email valido",
        bool: true,
      };
    }

    if (!validatePassword(editUser.password)) {
      error = {
        message: "La contraseña debe contener un minimo de 8 caracteres",
        bool: true,
      };
    }

    if (!error?.bool) {
      try {
        setIsLoading(true);

        let obj = {
          username: editUser.username,
          email: editUser.email,
          newPassword: editUser.password,
        };

        if (!editUser.password) {
          obj = {
            username: editUser.username,
            email: editUser.email,
          };
        }
        const result = await wrapper({
          method: "put",
          endPoint: `${endPoint.edit}`,
          isToken: true,
          json: obj,
        });
        setIsLoading(false);

        if (!result || !result.username)
          return Alert.alert("Error", "No se edito correctamente el usuario");

        updateUser(result);
        Alert.alert("Success", "Se edito correctamente el usuario");
      } catch (error) {
        return Alert.alert("Error hubo un error en la consulta");
      }
    } else {
      Alert.alert("Error!", error.message, [
        {
          text: "OK",
          onPress: () => {
            console.log("Se devolvio el cambio");
            setEditUser(user);
          },
        },
      ]);
    }
  };

  const backHandlerPress = () => {
    navigation.goBack();
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
    <View style={style.container}>
      <View style={style.header}>
        <View style={style.subContainerHeader}>
          <View style={style.contButtons}>
            <TouchableOpacity onPress={backHandlerPress} style={style.backBtn}>
              <Icon
                color={Colors.SpiralColor}
                activeOpacity={1}
                size={24}
                type="font-awesome"
                name="arrow-left"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={saveHandlerPress} style={style.editBtn}>
              <Text style={style.editTxt}>Save</Text>
            </TouchableOpacity>
          </View>
          <View style={style.contDetail}>
            <Image style={style.styleImage} source={unknow} />
            <View>
              <Text style={style.txtName}>{editUser.username}</Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView style={style.contInputs}>
        <View style={style.fieldContainer}>
          <Text style={style.label}>{"Username"}:</Text>
          <TextInput
            style={style.input}
            value={editUser.username}
            onChangeText={(text) => {
              setEditUser({ ...editUser, username: text });
            }}
          />
        </View>
        <View style={style.fieldContainer}>
          <Text style={style.label}>{"Email"}:</Text>
          <TextInput
            style={style.input}
            value={editUser.email}
            onChangeText={(text) => {
              setEditUser({ ...editUser, email: text });
            }}
          />
        </View>
        <View style={style.fieldContainer}>
          <Text style={style.label}>{"Password"}:</Text>
          <TextInput
            style={style.input}
            value={editUser.password}
            onChangeText={(text) => {
              setEditUser({ ...editUser, password: text });
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: Colors.BLACK,
  },
  header: {
    width: "100%",
    height: 250,
    backgroundColor: Colors.grayColor,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  subContainerHeader: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  contButtons: {
    height: "15%",
    display: "flex",
    marginTop: "5%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "5%",
    justifyContent: "space-between",
  },
  contInputs: {
    display: "flex",
    height: "70%",
    marginTop: "7%",
    // justifyContent: "center",
    // alignItems: "center",
  },
  editTxt: {
    color: Colors.SpiralColor,
    fontFamily: "poBold",
    zIndex: 1,
    margin: "auto",
    marginHorizontal: 15,
  },
  editBtn: {
    height: "70%",
    backgroundColor: converterHex(Colors.WHITE, 0.1),
    borderRadius: 15,
  },
  backBtn: {
    height: "60%",
  },
  contDetail: {
    marginTop: "-7%",
    display: "flex",
    gap: 5,
    flexDirection: "column",
    height: "65%",
    alignItems: "center",
  },
  txtName: {
    fontSize: 30,
    color: Colors.WHITE,
    fontFamily: "poBold",
    textTransform: "capitalize",
  },
  fieldContainer: {
    display: "flex",
    marginBottom: 30,
    width: "90%",
    padding: 10,
    backgroundColor: Colors.grayColor,
    borderRadius: 15,
    marginHorizontal: "auto",
  },
  input: {
    borderColor: Colors.SpiralColor,
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 10,
    height: 40,
    color: Colors.WHITE,
    marginVertical: 10,
    padding: 10,
    textDecorationLine: "underline",
    fontSize: 16,
  },
  label: {
    color: Colors.SpiralColor,
    fontFamily: "poBold",
    fontSize: 17,
    textTransform: "capitalize",
  },
});

export default EditProfile;
