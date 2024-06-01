import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import IconApp from "./IconApp";
import { contactStyle } from "../styles/contactStyles";

const unknowImage = require("../resources/unknow.png");

const Contact = ({ contact, onPress }) => {
  return (
    <>
      <TouchableOpacity onPress={onPress} style={contactStyle.container}>
        <Image style={{ height: 40, width: 40 }} source={unknowImage} />
        <Text style={contactStyle.txtContact}>{contact.name}</Text>

        <View style={contactStyle.containerIcons}>
          {contact?.phoneNumbers.length > 0 && (
            <View>
              <IconApp
                iconType={"phone"}
                colorName={"pink"}
                arrayData={contact.phoneNumbers}
              />
            </View>
          )}
          {contact?.email && (
            <View>
              <IconApp
                iconType={"envelope"}
                colorName={"blue"}
                arrayData={[contact.email]}
              />
            </View>
          )}
          {contact?.phoneNumbers.length > 0 && (
            <View>
              <IconApp
                iconType={"comment"}
                colorName={"pink"}
                arrayData={contact.phoneNumbers}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};

<IconApp
  iconType={"envelope"}
  colorName={"blue"}
  arrayData={["uldrenmiguel33@gmail.com"]}
/>;
export default Contact;
