import React, { useEffect, useState } from "react";
import Session from "../storage/sessionStorage";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
  Platform,
} from "react-native";
import useValidateSession from "../customs/useValidateSession";
import Contact from "../components/Contact";
import HeaderContact from "../components/HeaderContact";
import Colors from "../styles/Colors";
import { Icon } from "react-native-elements";
import Footer from "../components/Footer";
import { contacts as endPoint } from "../configs/endpoints.json";
import { wrapper } from "../service/fetchWrapper";

const array = [
  {
    _id: "1",
    name: "Marcial",
    lastName: "Hernandez",
    phoneNumber: [
      { home: "0426891239" },
      { work: "04120668975" },
      { personal: "0414789325" },
    ],
    email: "marcial@example.com",
    userId: "3",
  },
  {
    _id: "2",
    name: "Roberto",
    lastName: "Pedrerol",
    phones: [
      { home: "0426891239" },
      { job: "04120668975" },
      { personal: "0414789325" },
    ],
    email: "roberto.arevalo@example.com",
    userId: "2",
  },
  {
    _id: "3",
    name: "Roberto",
    lastName: "Pedrerol",
    phones: [
      { home: "0426891239" },
      { job: "04120668975" },
      { personal: "0414789325" },
    ],
    email: "roberto.arevalo@example.com",
    userId: "2",
  },
  {
    _id: "4",
    name: "Roberto",
    lastName: "Pedrerol",
    phones: [
      { home: "0426891239" },
      { job: "04120668975" },
      { personal: "0414789325" },
    ],
    email: "roberto.arevalo@example.com",
    userId: "2",
  },
  {
    _id: "5",
    name: "Roberto",
    lastName: "Pedrerol",
    phones: [
      { home: "0426891239" },
      { job: "04120668975" },
      { personal: "0414789325" },
    ],
    email: "roberto.arevalo@example.com",
    userId: "2",
  },
  {
    _id: "6",
    name: "Roberto",
    lastName: "Pedrerol",
    phones: [
      { home: "0426891239" },
      { job: "04120668975" },
      { personal: "0414789325" },
    ],
    email: "roberto.arevalo@example.com",
    userId: "2",
  },
  {
    _id: "7",
    name: "Roberto",
    lastName: "Pedrerol",
    phones: [
      { home: "0426891239" },
      { job: "04120668975" },
      { personal: "0414789325" },
    ],
    email: "roberto.arevalo@example.com",
    userId: "2",
  },
  {
    _id: "8",
    name: "Roberto",
    lastName: "Pedrerol",
    phones: [
      { home: "0426891239" },
      { job: "04120668975" },
      { personal: "0414789325" },
    ],
    email: "roberto.arevalo@example.com",
    userId: "2",
  },
  {
    _id: "9",
    name: "Roberto",
    lastName: "Pedrerol",
    phones: [
      { home: "0426891239" },
      { job: "04120668975" },
      { personal: "0414789325" },
    ],
    email: "roberto.arevalo@example.com",
    userId: "2",
  },
  {
    _id: "10",
    name: "Roberto",
    lastName: "Pedrerol",
    phones: [
      { home: "0426891239" },
      { job: "04120668975" },
      { personal: "0414789325" },
    ],
    email: "roberto.arevalo@example.com",
    userId: "2",
  },
  {
    _id: "11",
    name: "Roberto",
    lastName: "Pedrerol",
    phones: [
      { home: "0426891239" },
      { job: "04120668975" },
      { personal: "0414789325" },
    ],
    email: "roberto.arevalo@example.com",
    userId: "2",
  },
  {
    _id: "12",
    name: "Roberto",
    lastName: "Pedrerol",
    phones: [
      { home: "0426891239" },
      { job: "04120668975" },
      { personal: "0414789325" },
    ],
    email: "roberto.arevalo@example.com",
    userId: "2",
  },
  {
    _id: "13",
    name: "Roberto",
    lastName: "Pedrerol",
    phones: [
      { home: "0426891239" },
      { job: "04120668975" },
      { personal: "0414789325" },
    ],
    email: "roberto.arevalo@example.com",
    userId: "2",
  },
  {
    _id: "14",
    name: "Roberto",
    lastName: "Pedrerol",
    phones: [
      { home: "0426891239" },
      { job: "04120668975" },
      { personal: "0414789325" },
    ],
    email: "roberto.arevalo@example.com",
    userId: "2",
  },
  {
    _id: "15",
    name: "Roberto",
    lastName: "Pedrerol",
    phones: [
      { home: "0426891239" },
      { job: "04120668975" },
      { personal: "0414789325" },
    ],
    email: "roberto.arevalo@example.com",
    userId: "2",
  },
  {
    _id: "16",
    name: "Roberto",
    lastName: "Pedrerol",
    phones: [
      { home: "0426891239" },
      { job: "04120668975" },
      { personal: "0414789325" },
    ],
    email: "roberto.arevalo@example.com",
    userId: "2",
  },
  {
    _id: "17",
    name: "Roberto",
    lastName: "Pedrerol",
    phones: [
      { home: "0426891239" },
      { job: "04120668975" },
      { personal: "0414789325" },
    ],
    email: "roberto.arevalo@example.com",
    userId: "2",
  },
  {
    _id: "18",
    name: "Roberto",
    lastName: "Pedrerol",
    phones: [
      { home: "0426891239" },
      { job: "04120668975" },
      { personal: "0414789325" },
    ],
    email: "roberto.arevalo@example.com",
    userId: "2",
  },
  {
    _id: "18",
    name: "Roberto",
    lastName: "Pedrerol",
    phones: [
      { home: "0426891239" },
      { job: "04120668975" },
      { personal: "0414789325" },
    ],
    email: "roberto.arevalo@example.com",
    userId: "2",
  },
  {
    _id: "20",
    name: "Roberto",
    lastName: "Pedrerol",
    phones: [
      { home: "0426891239" },
      { job: "04120668975" },
      { personal: "0414789325" },
    ],
    email: "roberto.arevalo@example.com",
    userId: "2",
  },
  {
    _id: "21",
    name: "Roberto",
    lastName: "Pedrerol",
    phones: [
      { home: "0426891239" },
      { job: "04120668975" },
      { personal: "0414789325" },
    ],
    email: "roberto.arevalo@example.com",
    userId: "2",
  },
  {
    _id: "22",
    name: "Roberto",
    lastName: "Pedrerol",
    phones: [
      { home: "0426891239" },
      { job: "04120668975" },
      { personal: "0414789325" },
    ],
    email: "roberto.arevalo@example.com",
    userId: "2",
  },
  {
    _id: "23",
    name: "Roberto",
    lastName: "Pedrerol",
    phones: [
      { home: "0426891239" },
      { job: "04120668975" },
      { personal: "0414789325" },
    ],
    email: "roberto.arevalo@example.com",
    userId: "2",
  },
  {
    _id: "24",
    name: "Roberto",
    lastName: "Pedrerol",
    phones: [
      { home: "0426891239" },
      { job: "04120668975" },
      { personal: "0414789325" },
    ],
    email: "roberto.arevalo@example.com",
    userId: "2",
  },
  {
    _id: "25",
    name: "Roberto",
    lastName: "Pedrerol",
    phones: [
      { home: "0426891239" },
      { job: "04120668975" },
      { personal: "0414789325" },
    ],
    email: "roberto.arevalo@example.com",
    userId: "2",
  },
  {
    _id: "26",
    name: "Roberto",
    lastName: "Pedrerol",
    phones: [
      { home: "0426891239" },
      { job: "04120668975" },
      { personal: "0414789325" },
    ],
    email: "roberto.arevalo@example.com",
    userId: "2",
  },
  {
    _id: "27",
    name: "Roberto",
    lastName: "Pedrerol",
    phones: [
      { home: "0426891239" },
      { job: "04120668975" },
      { personal: "0414789325" },
    ],
    email: "roberto.arevalo@example.com",
    userId: "2",
  },
  {
    _id: "28",
    name: "Roberto",
    lastName: "Pedrerol",
    phones: [
      { home: "0426891239" },
      { job: "04120668975" },
      { personal: "0414789325" },
    ],
    email: "roberto.arevalo@example.com",
    userId: "2",
  },
  {
    _id: "29",
    name: "Roberto",
    lastName: "Pedrerol",
    phones: [
      { home: "0426891239" },
      { job: "04120668975" },
      { personal: "0414789325" },
    ],
    email: "roberto.arevalo@example.com",
    userId: "2",
  },
  {
    _id: "30",
    name: "Roberto",
    lastName: "Pedrerol",
    phones: [
      { home: "0426891239" },
      { job: "04120668975" },
      { personal: "0414789325" },
    ],
    email: "roberto.arevalo@example.com",
    userId: "2",
  },
  {
    _id: "31",
    name: "Uldren",
    lastName: "Gedde",
    phones: [
      { home: "0426891239" },
      { job: "04120668975" },
      { personal: "0414789325" },
    ],
    email: "uldren@uldren.com",
    userId: "1",
  },
];

const unknow = require("../resources/FotoPerfil.png");

const ContactScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [txtSearcher, setTxtSearcher] = useState("");
  const [groupedContacts, setGroupedContacts] = useState({});
  const scrollY = new Animated.Value(0);
  const [arrayContact, setArrayContacts] = useState("");
  // const [user, setUser] = useState("");

  useValidateSession(navigation);

  const onChangeHandler = (text) => {
    setTxtSearcher(text);
  };

  const onPressToAddHandler = () => {
    navigation.navigate("AddContact");
  };

  const onPressToProfileHandler = () => {
    console.log("Mostrar modal");
  };

  const onPressRedirectProfileHandler = () => {
    navigation.navigate("EditProfile", { user: {} });
  };

  const onPressHandler = (contact) => {
    navigation.navigate("DetailContact", { id: contact._id });
  };

  useEffect(() => {
    const contacts = async () => {
      const result = await wrapper({
        method: "get",
        endPoint: endPoint.list,
        isToken: true,
      });

      console.log("Result antes", result);
      if (!result) return null;

      console.log(result);
      setArrayContacts(result);
    };

    contacts();
  }, []);

  // useEffect(() => {
  //   //Aqui se hara la solicitud de la sesion del usuario para tener sus datos
  // }, [])

  useEffect(() => {
    // Ordena los contactos alfabéticamente
    const sortedContacts = array
      .filter((contact) =>
        contact.name.toLowerCase().startsWith(txtSearcher.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name));

    // Agrupa los contactos por la primera letra de su nombre
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
  }, [array, txtSearcher]);

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
                <Text style={style.txtName}>{"Uldren Gedde"}</Text>
                <Text style={style.txtInfo}>386 Contacs</Text>
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
          {Object.entries(groupedContacts).map(([letter, contacts]) => {
            return (
              <View>
                <Text style={{ color: "white" }}>{letter}</Text>
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
        </View>
      </Animated.ScrollView>
      <Footer />
    </>
  );
};

const style = StyleSheet.create({
  headerDinamic: {
    backgroundColor: Colors.grayColor,
    marginTop: Platform.OS === "ios" ? "11%" : "6%",
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "row",
    gap: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  contImg: {
    width: 90,
    height: 90,
  },
  contName: {
    justifyContent: "center",
    alignItems: "center",
  },
  txtName: {
    fontFamily: "poBold",
    fontSize: 20,
    color: Colors.WHITE,
  },
  txtInfo: {
    color: Colors.GRAY,
    fontFamily: "poRegular",
  },
  contInfUser: {
    display: "flex",
    flexDirection: "column",
  },
  contIcon: {
    marginVertical: "auto",
    marginLeft: "10%",
  },
});

export default ContactScreen;
