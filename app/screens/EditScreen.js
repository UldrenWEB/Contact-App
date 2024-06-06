import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { converterHex } from "../service/converterHex";
import Colors from "../styles/Colors";
import { Icon } from "react-native-elements";

const unknowImage = require("../resources/image.png");

const EditScreen = ({ route, navigation }) => {
  const { contact } = route.params;
  const { updatedAt, createdAt, __v, ...filteredContact } = contact;
  const [editedContact, setEditedContact] = useState(filteredContact);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    setIsModified(JSON.stringify(contact) !== JSON.stringify(editedContact));
  }, [editedContact]);

  const validateName = (name) => {
    const regex = /^[a-zA-Z\s]{3,}$/;
    return regex.test(name);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^\+?[0-9]*$/;
    return regex.test(phoneNumber);
  };

  const saveHandlerPress = () => {
    if (!isModified) return;

    let error;
    if (!validateName(editedContact.name)) {
      error = {
        message:
          "Debe introducir solo nombres validos, no caracteres especiales",
        bool: true,
      };
    }
    if (Array.isArray(editedContact.phoneNumbers)) {
      editedContact.phoneNumbers.forEach((element) => {
        console.log(element.number);
        if (!validatePhoneNumber(element.number)) {
          error = {
            message: "El número de teléfono solo debe contener '+' y números.",
            bool: true,
          };
        }
      });
    }

    if (!error?.bool) {
      //Aqui entraria para editar el contacto
      console.log("Esta es la info del contacto a editar", editedContact);
    } else {
      Alert.alert("Error!", error.message, [
        {
          text: "OK",
          onPress: () => () => {
            console.log("Se devolvio el cambio");
          },
        },
      ]);
    }
  };

  const backHandlerPress = () => {
    navigation.goBack();
  };

  const renderField = (key, value, index) => {
    if (key === "phoneNumbers") {
      if (value.length <= 0) return;

      return (
        <View style={style.fieldContainer} key={index}>
          <Text style={style.label}>{key}:</Text>
          {value.map((item, i) => (
            <View key={i}>
              <Text style={style.subLabel}>{item.type}:</Text>
              <TextInput
                style={style.input}
                value={item.number}
                onChangeText={(text) => {
                  let newContact = { ...editedContact };
                  newContact[key][i].number = text;
                  setEditedContact(newContact);
                }}
              />
            </View>
          ))}
        </View>
      );
    } else {
      return (
        <View style={style.fieldContainer} key={index}>
          <Text style={style.label}>{key}:</Text>
          <TextInput
            style={style.input}
            value={value}
            onChangeText={(text) => {
              let newContact = { ...editedContact };
              if (Array.isArray(newContact[key])) {
                newContact[key][index] = { [key]: text };
              } else {
                newContact[key] = text;
              }
              setEditedContact(newContact);
            }}
          />
        </View>
      );
    }
  };

  return (
    <View style={style.container}>
      {/* <View style={style.container}> */}
      <StatusBar backgroundColor={Colors.BLACK} translucent={true} />
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
            <TouchableOpacity
              onPress={saveHandlerPress}
              style={style.editBtn}
              disabled={!isModified}
            >
              <Text style={style.editTxt}>Save</Text>
            </TouchableOpacity>
          </View>
          <View style={style.contDetail}>
            <Image style={style.styleImage} source={unknowImage} />
            <View>
              <Text style={style.txtName}>{editedContact.name}</Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView keyboardDismissMode="on-drag" style={style.containerData}>
        {Object.entries(editedContact).map(([key, value], index) => {
          if (key !== "_id" && key !== "userId") {
            return renderField(key, value, index);
          }
        })}
      </ScrollView>
      {/* </View> */}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.BLACK,
    flex: 1,
  },
  error: {
    color: "red",
    fontSize: 16,
    margin: 10,
  },
  header: {
    width: "100%",
    height: 250,
    backgroundColor: Colors.grayColor,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  subContainerHeader: {
    marginTop: "4%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  contButtons: {
    height: "15%",
    display: "flex",
    marginTop: "10%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "5%",
    justifyContent: "space-between",
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
  styleImage: {
    width: "30%",
    height: "70%",
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
  },
  containerData: {
    width: "100%",
    paddingVertical: "7%",
    gap: 10,
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
  subLabel: {
    color: Colors.SpiralColor,
    fontFamily: "reBold",
    marginLeft: 10,
    fontSize: 15,
    textTransform: "capitalize",
  },
});

export default EditScreen;
