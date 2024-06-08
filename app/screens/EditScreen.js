import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import Colors from "../styles/Colors";
import { Icon } from "react-native-elements";
import { style } from "../styles/editScreenStyle";
import { wrapper } from "../service/fetchWrapper";
import { contacts as endPoint } from "../configs/endpoints.json";

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

  const saveHandlerPress = async () => {
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
      try {
        // const result = await wrapper({
        //   method: "put",
        //   endPoint: `${endPoint}${editedContact._id}`,
        //   json: editedContact,
        //   isToken: true,
        // });
        Alert.alert("Success", "Se ha editado exitosamente");
        navigation.navigate("Prueba");

        // console.log("Esta es la info del contacto a editar", editedContact._id);
      } catch (error) {
        Alert.alert("Error", "No se pudo editar el contacto");
      }
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
            <TouchableOpacity onPress={saveHandlerPress} style={style.editBtn}>
              <Text style={style.editTxt}>Guardar</Text>
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
    </View>
  );
};

export default EditScreen;
