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
          <View>
            <IconApp
              iconType={"comment"}
              colorName={"blue"}
              arrayData={["+584121528916", "+57413678909"]}
            />
          </View>
          <View>
            <IconApp
              iconType={"phone"}
              colorName={"pink"}
              arrayData={["+584121528916"]}
            />
          </View>
          <View>
            <IconApp
              iconType={"envelope"}
              colorName={"blue"}
              arrayData={["uldrenmiguel33@gmail.com"]}
            />
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default Contact;
