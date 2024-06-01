import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { CheckBox } from "react-native-elements";
import Colors from "../styles/Colors";

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
    _id: "19",
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

const CheckBoxComponent = forwardRef(({ text = false }, ref) => {
  const [contacts, setContacts] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterContact, setFilterContacts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      console.log("Se cargaron los contactos");
    }, 10000);
    setIsLoading(false);

    setContacts(array);
  }, []);

  useEffect(() => {
    if (text) {
      const lowerCaseText = text.toLowerCase();
      const filtered = contacts.filter((contact) =>
        contact.name.toLowerCase().startsWith(lowerCaseText)
      );
      setFilterContacts(filtered);
    } else {
      setFilterContacts(contacts);
    }
  }, [text, contacts]);

  const handleSelect = (contact) => {
    setSelectedOptions((prevOptions) => [...prevOptions, contact]);
  };

  const handleDeselect = (contactId) => {
    setSelectedOptions((prevOptions) =>
      prevOptions.filter((option) => option._id !== contactId)
    );
  };

  useImperativeHandle(ref, () => selectedOptions);

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
    <ScrollView style={style.container}>
      {filterContact.map((contact) => {
        return (
          <View style={style.contact} key={contact?._id}>
            <CheckBox
              containerStyle={{
                backgroundColor: Colors.BLACK,
                width: "90%",
                justifyContent: "center",
                height: 50,
                marginBottom: 10,
              }}
              textStyle={{
                fontFamily: "poBold",
                fontSize: 15,
                color: Colors.WHITE,
                textAlignVertical: "center",
              }}
              checkedColor={Colors.SpiralColor}
              title={contact.name}
              checked={selectedOptions.some(
                (option) => option._id === contact._id
              )}
              onPress={() =>
                selectedOptions.some((option) => option._id === contact._id)
                  ? handleDeselect(contact._id)
                  : handleSelect(contact)
              }
            />
          </View>
        );
      })}
    </ScrollView>
  );
});

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.grayColor,
    marginTop: 20,
    marginBottom: 20,
    width: 250,
    height: 390,
  },
  txtName: {
    fontSize: 17,
    fontFamily: "poBold",
  },
});

export default CheckBoxComponent;
