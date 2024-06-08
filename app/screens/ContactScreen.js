import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  StatusBar,
  Animated,
  Alert,
} from "react-native";
import useValidateSession from "../customs/useValidateSession";
import {
  ActionSheetProvider,
  useActionSheet,
} from "@expo/react-native-action-sheet";
import Contact from "../components/Contact";
import HeaderContact from "../components/HeaderContact";
import Colors from "../styles/Colors";
import { Icon } from "react-native-elements";
import Footer from "../components/Footer";
import {
  contacts as endPoint,
  user as endPointUser,
} from "../configs/endpoints.json";
import { wrapper } from "../service/fetchWrapper";
import { converterHex } from "../service/converterHex";
import userContext from "../customs/userContext.js";
import { useFocusEffect } from "@react-navigation/native";
import Session from "../storage/sessionStorage.js";
import { style } from "../styles/contactStyle.js";

const unknow = require("../resources/FotoPerfil.png");

const MyContactScreen = ({ navigation }) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [isLoading, setIsLoading] = useState(true);
  const [txtSearcher, setTxtSearcher] = useState("");
  const [groupedContacts, setGroupedContacts] = useState({});
  const scrollY = new Animated.Value(0);
  const [arrayContact, setArrayContacts] = useState("");
  const { user } = useContext(userContext);

  useValidateSession(navigation);

  const onChangeHandler = (text) => {
    setTxtSearcher(text);
  };

  const onPressToAddHandler = () => {
    navigation.navigate("AddContact", { currentContacts: arrayContact });
  };

  const deleteAccount = async () => {
    let bool = false;

    Alert.alert("Seguro?", "Deseas eliminar tu cuenta", [
      {
        text: "Ok",
        onPress: async () => {
          try {
            setIsLoading(true);
            const result = await wrapper({
              method: "delete",
              endPoint: `${endPointUser.delete}`,
              isToken: true,
            });
            setIsLoading(false);

            if (!result) Alert.alert("Error", "No se puedo borrar la cuenta");

            Alert.alert("Success", "Se ha eliminado correctamente la cuenta");
            navigation.navigate("Register");
          } catch (error) {
            Alert.alert("Error", "Hubo un error a eliminar cuenta");
          }
        },
      },
      {
        text: "Cancelar",
        onPress: () => {
          bool = false;
        },
      },
    ]);
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

  const onPressToProfileHandler = () => {
    const options = [
      "Cerrar sesion",
      "Editar perfil",
      "Eliminar cuenta",
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

  const onPressRedirectProfileHandler = () => {
    navigation.navigate("EditProfile", { user });
  };

  const onPressHandler = (contact) => {
    navigation.navigate("DetailContact", { id: contact._id });
  };

  useFocusEffect(
    useCallback(() => {
      const contacts = async () => {
        setIsLoading(true);
        const result = await wrapper({
          method: "get",
          endPoint: endPoint.list,
          isToken: true,
        });

        if (!result) return setIsLoading(false);

        setIsLoading(false);
        setArrayContacts(result);
      };
      contacts();
    }, [])
  );

  useEffect(() => {
    if (!arrayContact.length)
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
  }, [arrayContact, txtSearcher]);

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
      <StatusBar barStyle={"light-content"} />
      <HeaderContact
        onPressToAdd={onPressToAddHandler}
        onPressToProfile={onPressToProfileHandler}
        onChange={onChangeHandler}
        text={txtSearcher}
      />
      <Animated.ScrollView
        style={{
          backgroundColor: Colors.BLACK,
          flex: 1,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <Animated.View
          style={[
            style.headerDinamic,
            {
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [0, 250],
                    outputRange: [0, -120],
                    extrapolate: "clamp",
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity
            onPress={onPressRedirectProfileHandler}
            style={[style.headerDinamic]}
          >
            <View>
              <Image style={style.contImg} source={unknow} />
            </View>
            <View style={style.contName}>
              <View style={style.contInfUser}>
                <Text style={style.txtName}>{user?.username}</Text>
                <Text style={style.txtInfo}>
                  {arrayContact.length === undefined
                    ? "0"
                    : arrayContact.length}
                  {"  "}
                  Contacts
                </Text>
              </View>
            </View>
            <View style={style.contIcon}>
              <Icon size={50} name="arrow-right" />
            </View>
          </TouchableOpacity>
        </Animated.View>
        <View
          style={{
            marginTop: 0,
            width: "100%",
            height: "30%",
          }}
        >
          {!arrayContact.length ? (
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
        </View>
      </Animated.ScrollView>
      <Footer />
    </>
  );
};

export default function ContactScreen(props) {
  return (
    <ActionSheetProvider>
      <MyContactScreen {...props} />
    </ActionSheetProvider>
  );
}
