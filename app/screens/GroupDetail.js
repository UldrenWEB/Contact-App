import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import HeaderContact from "../components/HeaderContact";
import HeaderMinimal from "../components/headerMinimal";
import {
  ActionSheetProvider,
  useActionSheet,
} from "@expo/react-native-action-sheet";
import Contact from "../components/Contact";
import ReactNativeModal from "react-native-modal";
import Colors from "../styles/Colors";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { converterHex } from "../service/converterHex";
import CheckBoxComponent from "../components/CheckBoxComponent";
import { wrapper } from "../service/fetchWrapper";
import {
  groups as endPoint,
  user as endPointUser,
} from "../configs/endpoints.json";
import { useFocusEffect } from "@react-navigation/native";
import Session from "../storage/sessionStorage";
import userContext from "../customs/userContext";

const MyGroupDetail = ({ navigation, route }) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [txtSearcher, setTxtSearcher] = useState("");
  const [textSearcherContact, setTextSearcherContact] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [groupedContacts, setGroupedContacts] = useState([]);
  const { user } = useContext(userContext);

  const { group } = route.params;

  const [arrayContact, setArrayContacts] = useState(group.contacts);
  const contactRef = useRef();

  useEffect(() => {
    if (!arrayContact) return;

    try {
      if (!arrayContact?.length)
        return console.log("No se ejecuto por no tener contactos");

      const sortedContacts = arrayContact
        ?.filter((contact) =>
          contact.name.toLowerCase().startsWith(txtSearcher.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name));

      const groups = sortedContacts.reduce((groups, contact) => {
        const firstLetter = contact.name[0].toUpperCase();
        if (!groups[firstLetter]) {
          groups[firstLetter] = [];
        }
        groups[firstLetter].push(contact);
        return groups;
      }, {});

      setGroupedContacts(groups);
      setIsLoading(false);
    } catch (error) {
      return console.error("Aqui ocurrio un error:", error.message);
    }
  }, [arrayContact, txtSearcher]);

  useFocusEffect(
    useCallback(() => {
      const groups = async () => {
        try {
          const result = await wrapper({
            method: "get",
            endPoint: `${endPoint.get}`,
            isToken: true,
          });

          if (!result || !result.length)
            return Alert.alert("Error", "Hubo un error al buscar tus grupos");

          const theGroup = result.find((myGroup) => myGroup._id === group._id);
          setArrayContacts(theGroup.contacts);
        } catch (error) {
          Alert.alert(
            "Error",
            "Hubo un error al cargar los contactos del grupo"
          );
        }
      };

      groups();
    }, [])
  );

  const addHandler = () => {
    setModalVisible(true);
  };

  const saveHandler = async () => {
    const contacts = contactRef.current;
    if (!contacts) return setModalVisible(false);

    try {
      setIsLoading(true);
      const result = await wrapper({
        method: "post",
        endPoint: `${endPoint.addContact}`,
        isToken: true,
        json: {
          groupId: group._id,
          contactIds: contacts?.map((contact) => contact._id),
        },
      });
      setIsLoading(false);

      if (!result)
        Alert.alert(
          "Error",
          "No se asignaron correctamente los contactos al grupo"
        );

      setArrayContacts((prevContacts) => prevContacts.concat(contacts));
      setModalVisible(false);
    } catch (error) {
      return Alert.alert("Error", "Hubo un error al realizar la consulta");
    }
  };

  const deleteHandler = async () => {
    try {
      setIsLoading(true);
      const result = await wrapper({
        method: "delete",
        endPoint: `${endPoint.delete}${group._id}`,
        isToken: true,
      });
      setIsLoading(false);

      if (!result)
        Alert.alert("Error", "No se pudo borrar correctamente el grupo");

      navigation.navigate("Prueba");
    } catch (error) {
      Alert.alert("Error", "Ocurrio un error al borrar el grupo");
    }
  };

  const deleteAccount = async () => {
    let bool = false;

    Alert.alert("Seguro?", "Deseas eliminar tu cuenta", [
      {
        text: "Ok",
        onPress: () => {
          bool = true;
        },
      },
      {
        text: "Cancelar",
        onPress: () => {
          bool = false;
        },
      },
    ]);

    if (!bool) return;
    try {
      const result = await wrapper({
        method: "delete",
        endPoint: `${endPointUser.delete}`,
        isToken: true,
      });

      if (!result) Alert.alert("Error", "No se puedo borrar la cuenta");

      Alert.alert("Success", "Se ha eliminado correctamente la cuenta");
      navigation.navigate("Register");
    } catch (error) {
      Alert.alert("Error", "Hubo un error a eliminar cuenta");
    }
  };

  const closeSession = async () => {
    try {
      await Session.deleteSession();
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", "Hubo un error al cerrar session");
    }
  };

  const editProfile = () => {
    navigation.navigate("EditProfile", { user });
  };

  const profileHandler = () => {
    const options = [
      "Close session",
      "Edit perfil",
      "Delete account",
      "Cancelar",
    ];
    const destructiveButtonIndex = 3;
    const cancelButtonIndex = 3;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            closeSession();
            break;
          case 1:
            editProfile();
            break;
          case 2:
            deleteAccount();
            break;
          default:
            break;
        }
      }
    );
  };

  const onPressHandler = (contact) => {
    navigation.navigate("DetailContactGroup", {
      id: contact._id,
      groupId: group._id,
    });
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
      <ReactNativeModal
        animationIn="bounceInDown"
        animationOut="bounceOutDown"
        animationInTiming={500}
        animationOutTiming={500}
        transparent={true}
        isVisible={modalVisible}
      >
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <View style={style.inputSearchCont}>
              <TextInput
                style={style.input}
                placeholder="Search"
                placeholderTextColor={converterHex(Colors.WHITE, 0.3)}
                onChangeText={(text) => setTextSearcherContact(text)}
              />
            </View>
            <CheckBoxComponent
              currentContacts={arrayContact}
              text={textSearcherContact}
              ref={contactRef}
            />
            <View style={style.contBtn}>
              <View style={style.btnModal}>
                <Button
                  color={Colors.SpiralColor}
                  title="Guardar"
                  onPress={saveHandler}
                />
              </View>
              <View style={style.btnModal}>
                <Button
                  color={Colors.SpiralColor}
                  title="Cancelar"
                  onPress={() => setModalVisible(false)}
                />
              </View>
            </View>
          </View>
        </View>
      </ReactNativeModal>

      <HeaderMinimal
        btnName={"Eliminar"}
        navigation={navigation}
        onPress={deleteHandler}
        title={group.name}
      />
      <View style={{ marginTop: "-2%" }}>
        <HeaderContact
          text={txtSearcher}
          onChange={(text) => setTxtSearcher(text)}
          onPressToAdd={addHandler}
          onPressToProfile={profileHandler}
        />
      </View>
      <ScrollView
        style={{
          marginTop: 60,
          width: "100%",
        }}
      >
        {!arrayContact?.length ? (
          <View
            style={{
              justifyContent: "center",
              width: "100%",
              marginTop: "40%",
              height: "50%",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: converterHex(Colors.WHITE, 0.7),
                fontFamily: "reBold",
                fontSize: 25,
                marginTop: "30%",
              }}
            >
              No tienes contactos
            </Text>
          </View>
        ) : (
          <>
            {Object.entries(groupedContacts).map(([letter, contacts]) => {
              return (
                <View key={letter}>
                  <Text key={letter} style={style.textABC}>
                    {letter}
                  </Text>
                  {contacts.map((contact, index) => {
                    return (
                      <Contact
                        key={index}
                        onPress={() => onPressHandler(contact)}
                        contact={contact}
                      />
                    );
                  })}
                </View>
              );
            })}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.BLACK,
    height: "100%",
  },
  centeredView: {
    height: "50%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.grayColor,
    borderRadius: 20,
    padding: 35,
    height: "70%",
    flexDirection: "column",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contBtn: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  btnModal: {
    overflow: "hidden",
    borderRadius: 10,
  },
  input: {
    borderColor: Colors.WHITE,
    borderRadius: 10,
    width: 250,
    fontFamily: "poBold",
    fontSize: 15,
    paddingLeft: 15,
    paddingRight: 10,
    color: Colors.SpiralColor,
    borderWidth: 1,
    paddingVertical: 2,
  },
  contContact: {
    width: 230,
    marginTop: 20,
  },
  textABC: {
    color: Colors.WHITE,
    marginTop: 10,
    marginLeft: 10,
    fontFamily: "reRegular",
    fontSize: 15,
  },
});

export default function GroupDetail(props) {
  return (
    <ActionSheetProvider>
      <MyGroupDetail {...props} />
    </ActionSheetProvider>
  );
}
