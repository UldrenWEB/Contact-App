import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Colors from "../styles/Colors";

import AddComponent from "../components/AddComponent";
import HeaderMinimal from "../components/headerMinimal";
import Session from "../storage/sessionStorage";
import { wrapper } from "../service/fetchWrapper";

import { contacts } from "../configs/endpoints.json";

const AddContactScreen = ({ navigation }) => {
  const [editedEmail, setEditedEmail] = useState("");
  const [editedAddress, setEditedAddress] = useState("");
  const [editedName, setEditedName] = useState("");
  const [isModified, setIsModified] = useState(false);
  const [editedPhones, setEditedPhones] = useState({
    personal: "",
    work: "",
    home: "",
  });

  const [openComponent, setOpenComponent] = useState(null);
  const [openSubComponent, setOpenSubComponent] = useState(null);

  const handleOpen = (componentName) => {
    setOpenComponent((prevComponent) =>
      prevComponent === componentName ? null : componentName
    );
  };

  const handleOpen2 = (componentName) => {
    setOpenSubComponent((prevComponent) =>
      prevComponent === componentName ? null : componentName
    );
  };

  const validateEmail = (email) => {
    if (!email) return true;

    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|edu|es)$/;
    return re.test(email);
  };

  const validateName = (name) => {
    const re = /^[a-zA-Z\s]*$/;
    return re.test(name);
  };

  const validateAddress = (address) => {
    if (!address) return true;

    return address.length > 0;
  };

  const validatePhoneNumber = (number) => {
    if (!number) return true;

    const re = /^\+\d{6,}$/;
    return re.test(number);
  };

  const saveHandler = async () => {
    if (!isModified) return;

    if (!validateName(editedName)) {
      Alert.alert(
        "Error",
        "Debe introducir un nombre valido sin caracteres especiales"
      );
    }

    if (!validateEmail(editedEmail)) {
      Alert.alert("Error", "Debe introducir un correo valido");
      return;
    }
    if (!validateAddress(editedAddress)) {
      Alert.alert("Error", "Introduzca una direccion valida");
      return;
    }
    if (
      !validatePhoneNumber(editedPhones.home) ||
      !validatePhoneNumber(editedPhones.home) ||
      !validatePhoneNumber(editedPhones.home)
    ) {
      Alert.alert("Error", "Debe introducir un numero telefonico valido");
      return;
    }

    const obj = {
      userId: (await Session.getSession())?.id,
      name: editedName,
      lastName: "Prueba",
      email: editedEmail,
      address: editedAddress,
      phoneNumbers: [
        { type: "personal", number: editedPhones.personal },
        { type: "work", number: editedPhones.work },
        { type: "home", number: editedPhones.home },
      ],
    };

    try {
      const result = await wrapper({
        endPoint: contacts.create,
        isToken: true,
        method: "post",
        json: obj,
      });

      if (!result)
        return Alert.alert("Error", "Hubo un error al hacer la consulta");

      Alert.alert("Created", "Se ha creado exitosamente el contacto", [
        { text: "OK" },
      ]);

      console.log(result);
      return true;
    } catch (error) {
      Alert.alert("Error", "Hubo un error al hacer la consulta");
      return false;
    }

    // const
    //Aqui se debe agregar
    console.log(obj);
  };

  const onChangeHandler = (setter) => (text) => {
    setter(text);
    setIsModified(true);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "position" : "height"}
      style={style.container}
    >
      <HeaderMinimal
        btnName={"Save"}
        navigation={navigation}
        onPress={saveHandler}
        title={"Add Contact"}
      />
      <KeyboardAwareScrollView
        style={style.contProp}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 500,
        }}
        enableAutomaticScroll={true}
        keyboardShouldPersistTaps={"handled"}
        extraScrollHeight={300}
        extraHeight={20}
      >
        <AddComponent
          label={"Name"}
          heigthMin={70}
          heightMax={98}
          marginBottom={"8%"}
          sizeLabel={18}
          textInput={editedName}
          onChange={onChangeHandler(setEditedName)}
          isOpen={openComponent === "Name"}
          onOpen={() => handleOpen("Name")}
        />
        <AddComponent
          label={"Email"}
          heigthMin={70}
          heightMax={98}
          marginBottom={"8%"}
          sizeLabel={18}
          textInput={editedEmail}
          onChange={onChangeHandler(setEditedEmail)}
          isOpen={openComponent === "Email"}
          onOpen={() => handleOpen("Email")}
        />
        <AddComponent
          heigthMin={70}
          heightMax={98}
          label={"Address"}
          marginBottom={"8%"}
          sizeLabel={18}
          textInput={editedAddress}
          onChange={onChangeHandler(setEditedAddress)}
          isOpen={openComponent === "Address"}
          onOpen={() => handleOpen("Address")}
        />
        <AddComponent
          label={"Phone Number"}
          animationDuration={100}
          sizeLabel={18}
          heigthMin={74}
          marginBottom={"10%"}
          heightMax={255}
          isOpen={openComponent === "Phone Number"}
          onOpen={() => {
            handleOpen("Phone Number");
            handleOpen2("Phone Number");
          }}
        >
          <AddComponent
            label={"Personal"}
            sizeLabel={15}
            paddingHorizontal={10}
            heigthMin={70}
            heightMax={110}
            onChange={(text) => {
              setIsModified(true);
              setEditedPhones({ ...editedPhones, personal: text });
            }}
            isOpen={openSubComponent === "Personal"}
            onOpen={() => handleOpen2("Personal")}
          />
          <AddComponent
            label={"Home"}
            sizeLabel={15}
            paddingHorizontal={10}
            heigthMin={70}
            heightMax={110}
            onChange={(text) => {
              setIsModified(true);
              setEditedPhones({ ...editedPhones, home: text });
            }}
            isOpen={openSubComponent === "Home"}
            onOpen={() => handleOpen2("Home")}
          />
          <AddComponent
            label={"Work"}
            sizeLabel={15}
            paddingHorizontal={10}
            heigthMin={70}
            heightMax={110}
            onChange={(text) => {
              setIsModified(true);
              setEditedPhones({ ...editedPhones, work: text });
            }}
            isOpen={openSubComponent === "Work"}
            onOpen={() => handleOpen2("Work")}
          />
        </AddComponent>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
    alignItems: "center",
  },
  contProp: {
    flex: 1,
    width: "100%",
    marginTop: "12%",
    paddingHorizontal: 10,
  },
});

export default AddContactScreen;
