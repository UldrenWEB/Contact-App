import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { converterHex } from "../service/converterHex";
import Colors from "../styles/Colors";
import IconApp from "../components/IconApp";
import { Icon } from "react-native-elements";
import FieldContact from "../components/fieldContact";
import { wrapper } from "../service/fetchWrapper";
import {
  contacts as endPoint,
  groups as endPointGroup,
} from "../configs/endpoints.json";

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
                <Text style={style.editTxt}>Unassign</Text>
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

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.BLACK,
    flex: 1,
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: "40%",
    backgroundColor: Colors.grayColor,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  subContainerHeader: {
    marginTop: "4%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  contButtons: {
    height: "15%",
    display: "flex",
    marginTop: "10%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "5%",
    justifyContent: "space-between",
  },
  editTxt: {
    color: Colors.SpiralColor,
    fontFamily: "poBold",
    zIndex: 1,
    margin: "auto",
    marginHorizontal: 15,
  },
  editBtn: {
    height: "70%",
    backgroundColor: converterHex(Colors.WHITE, 0.1),
    borderRadius: 15,
  },
  backBtn: {
    height: "60%",
  },
  styleImage: {
    width: "36.5%",
    height: "69%",
  },
  contDetail: {
    marginTop: "-14%",
    display: "flex",
    gap: 5,
    flexDirection: "column",
    height: "65%",
    alignItems: "center",
  },
  txtName: {
    fontSize: 30,
    color: Colors.WHITE,
    fontFamily: "poBold",
    textTransform: "capitalize",
  },
  contIcon: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "-3%",
    width: "50%",
    height: "30%",
  },
  containerData: {
    width: "100%",
    height: "58%",
    paddingVertical: "3%",
    gap: 10,
    justifyContent: "space-evenly",
  },
});

export default DetailContactScreenGroup;