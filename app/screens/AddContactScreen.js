import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import AddComponent from "../components/AddComponent";
import HeaderMinimal from "../components/headerMinimal";
import { style } from "../styles/addContactStyle";
import { wrapper } from "../service/fetchWrapper";

import { contacts } from "../configs/endpoints.json";

const AddContactScreen = ({ navigation, route }) => {
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

  const { currentContacts } = route.params;

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

  const validateUniqueName = (name) => {
    for (let contact of currentContacts) {
      if (contact.name.toLowerCase() === name.toLowerCase()) {
        return false;
      }
    }
    return true;
  };

  const validateEmail = (email) => {
    if (!email) return true;

    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|edu|es)$/;
    return re.test(email);
  };

  const validateName = (name) => {
    const re = /^[a-zA-Z\s]{1,13}$/;
    return re.test(name);
  };

  const validateAddress = (address) => {
    if (!address) return true;

    return address.length > 0;
  };

  const validatePhoneNumber = (number) => {
    if (!number) return true;

    const re = /^\+?\d{8,11}$/;
    return re.test(number);
  };

  const saveHandler = async () => {
    if (!isModified) return;

    if (!validateName(editedName)) {
      Alert.alert(
        "Error",
        "Debe introducir un nombre valido sin caracteres especiales y con un maximo de 13 caracteres"
      );
      return;
    }

    if (!validateUniqueName(editedName)) {
      Alert.alert("Error", "El nombre ingresado ya existe en tus contactos");
      return;
    }

    if (
      !editedEmail &&
      !editedPhones.personal &&
      !editedPhones.work &&
      !editedPhones.home
    ) {
      Alert.alert(
        "Error",
        "Debe llenar al menos un campo de correo electrónico o número de teléfono"
      );
      return;
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
      !validatePhoneNumber(editedPhones.work) ||
      !validatePhoneNumber(editedPhones.personal)
    ) {
      Alert.alert("Error", "Debe introducir un numero telefonico valido");
      return;
    }

    const obj = {
      name: editedName,
      ...(editedEmail === "" ? {} : { email: editedEmail }),
      address: editedAddress,
      phoneNumbers:
        editedPhones.work && editedPhones.home && editedPhones.personal
          ? []
          : [
              { type: "personal", number: `${editedPhones.personal}` },
              { type: "work", number: `${editedPhones.work}` },
              { type: "home", number: `${editedPhones.home}` },
            ].filter(
              (phone) => phone.number !== "undefined" && phone.number !== ""
            ),
    };

    try {
      const result = await wrapper({
        endPoint: contacts.create,
        isToken: true,
        method: "post",
        json: obj,
      });

      if (!result || !result.contact)
        return Alert.alert("Error", "No se pudo crear el nuevo usuario");

      Alert.alert("Created", "Se ha creado exitosamente el contacto", [
        { text: "OK" },
      ]);
      navigation.navigate("Prueba");

      console.log(result);
      return true;
    } catch (error) {
      Alert.alert("Error", "Hubo un error al hacer la consulta");
      return false;
    }
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
        btnName={"Guardar"}
        isModified={isModified}
        navigation={navigation}
        onPress={saveHandler}
        title={"Añadir"}
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
          label={"Nombre"}
          heigthMin={70}
          heightMax={105}
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
          heightMax={105}
          marginBottom={"8%"}
          sizeLabel={18}
          textInput={editedEmail}
          onChange={onChangeHandler(setEditedEmail)}
          isOpen={openComponent === "Email"}
          onOpen={() => handleOpen("Email")}
        />
        <AddComponent
          heigthMin={70}
          heightMax={105}
          label={"Direccion"}
          marginBottom={"8%"}
          sizeLabel={18}
          textInput={editedAddress}
          onChange={onChangeHandler(setEditedAddress)}
          isOpen={openComponent === "Address"}
          onOpen={() => handleOpen("Address")}
        />
        <AddComponent
          label={"Numeros"}
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
            label={"Hogar"}
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
            label={"Trabajo"}
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

export default AddContactScreen;
