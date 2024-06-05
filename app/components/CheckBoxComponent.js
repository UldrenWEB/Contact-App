import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { CheckBox } from "react-native-elements";
import Colors from "../styles/Colors";
import { wrapper } from "../service/fetchWrapper";
import { contacts as endPoint } from "../configs/endpoints.json";

const CheckBoxComponent = forwardRef(({ text = false }, ref) => {
  const [contacts, setContacts] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filterContact, setFilterContacts] = useState([]);

  useEffect(() => {
    const contact = async () => {
      try {
        const result = await wrapper({
          method: "get",
          endPoint: `${endPoint.list}`,
          isToken: true,
        });

        if (!result || !result?.length)
          Alert.alert(
            "Error",
            "No trajo datos la consulta, por lo que se infiere que es un error"
          );

        setContacts(result);
      } catch (error) {
        return Alert.alert("Error", "Hubo un error al hacer la consulta");
      }
    };
    contact();
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
