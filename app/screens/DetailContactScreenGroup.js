import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import Colors from "../styles/Colors";
import IconApp from "../components/IconApp";
import { Icon } from "react-native-elements";
import FieldContact from "../components/fieldContact";
import { wrapper } from "../service/fetchWrapper";
import {
  contacts as endPoint,
  groups as endPointGroup,
} from "../configs/endpoints.json";
import { style } from "../styles/detailContactGroup";

const unknowImage = require("../resources/image.png");

const DetailContactScreenGroup = ({ route, navigation }) => {
  const { id, groupId } = route.params;
  const [contactData, setContactData] = useState([]);
  const [contact, setContact] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const chargeContact = async () => {
      setIsLoading(true);
      const contact = await wrapper({
        method: "get",
        endPoint: `${endPoint.get}/${id}`,
        isToken: true,
      });
      setIsLoading(false);

      if (!contact || !contact.name)
        return Alert.alert("Error", "Hubo un error al hacer la consulta");

      setContact(contact);
    };

    chargeContact();
  }, [id]);

  useEffect(() => {
    let data = [];
    if (contact.phoneNumbers) {
      data.push({
        type: "icon",
        compo: (
          <>
            <View key={`${contact.phoneNumbers} + 2`}>
              <IconApp
                iconType={"comment"}
                colorName={"blue"}
                arrayData={contact.phoneNumbers.map(
                  (num) => Object.values(num)[0]
                )}
              />
            </View>
            <View key={`${contact.phoneNumbers} + 1`}>
              <IconApp
                iconType={"phone"}
                colorName={"pink"}
                arrayData={contact.phoneNumbers.map(
                  (num) => Object.values(num)[0]
                )}
              />
            </View>
          </>
        ),
      });
      data.push({
        type: "field",
        compo: (
          <View key={contact.phoneNumbers}>
            <FieldContact label={"PhoneNumber"} value={contact.phoneNumbers} />
          </View>
        ),
      });
    }
    if (contact.email) {
      data.push({
        type: "icon",
        compo: (
          <View key={contact.email}>
            <IconApp
              iconType={"envelope"}
              colorName={"blue"}
              arrayData={[contact.email]}
            />
          </View>
        ),
      });
      data.push({
        type: "field",
        compo: (
          <View key={contact.email}>
            <FieldContact label={"Email"} value={contact.email} />
          </View>
        ),
      });
    }
    if (contact.address) {
      data.push({
        type: "field",
        compo: (
          <View key={contact.address}>
            <FieldContact label={"Address"} value={contact.address} />
          </View>
        ),
      });
    }
    setContactData(data);
  }, [contact]);

  const deleteHandlerPress = async () => {
    try {
      setIsLoading(true);
      const result = await wrapper({
        method: "delete",
        endPoint: `${endPointGroup.deleteContact}${groupId}/contacts/${contact._id}`,
        isToken: true,
      });
      setIsLoading(false);

      if (!result) Alert.alert("Error", "No se pudo eliminar el contacto");

      Alert.alert("Success", "Eliminado con exito");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Hubo un error al ejecutar la consulta");
    }
  };

  const backHandlerPress = () => {
    navigation.goBack();
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
            <View style={{ gap: 10 }}>
              <TouchableOpacity
                onPress={deleteHandlerPress}
                style={style.editBtn}
              >
                <Text style={style.editTxt}>Desvincular</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={style.contDetail}>
            <Image style={style.styleImage} source={unknowImage} />
            <View>
              <Text style={style.txtName}>{contact.name}</Text>
            </View>
            <View style={style.contIcon}>
              {contactData
                .filter((item) => item.type === "icon")
                .map((item) => (
                  <>{item.compo}</>
                ))}
            </View>
          </View>
        </View>
      </View>
      <View style={style.containerData}>
        {contactData
          .filter((item) => item.type === "field")
          .map((item, _) => (
            <>{item.compo}</>
          ))}
      </View>
    </View>
  );
};

export default DetailContactScreenGroup;
