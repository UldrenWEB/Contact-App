import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import { converterHex } from "../service/converterHex";
import Colors from "../styles/Colors";
import IconApp from "../components/IconApp";
import { Icon } from "react-native-elements";
import FieldContact from "../components/fieldContact";

const unknowImage = require("../resources/image.png");

const contact = {
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
};

const DetailContactScreen = ({ route, navigation }) => {
  // const { id } = route.params;
  const [contactData, setContactData] = useState([]);

  /*
    useEffect(() => {
    const chargeContact = async () => {
      //Aqui se hara el fetch cuando cargue el componente o cambie el ID
      const obj = result.data;

      return obj;
    };

    chargeContact();
  }, [id]);
  */

  const editHandlerPress = () => {
    // if (!contact._id) return;
    //?Aqui se pasaran los datos del contact
    navigation.navigate("Edit", {
      contact: {
        _id: "1",
        name: "Marcial",
        lastName: "Hernandez",
        phoneNumber: [
          { home: "0426891239" },
          { work: "04120668975" },
          { personal: "0414789325" },
        ],
        address: "Calle 3",
        email: "marcial@example.com",
        userId: "3",
      },
    });
  };

  useEffect(() => {
    let data = [];
    if (contact.phoneNumber) {
      data.push({
        type: "icon",
        compo: (
          <>
            <View>
              <IconApp
                iconType={"comment"}
                colorName={"blue"}
                arrayData={contact.phoneNumber.map(
                  (num) => Object.values(num)[0]
                )}
              />
            </View>
            <View>
              <IconApp
                iconType={"phone"}
                colorName={"pink"}
                arrayData={contact.phoneNumber.map(
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
          <View>
            <FieldContact label={"PhoneNumber"} value={contact.phoneNumber} />
          </View>
        ),
      });
    }
    if (contact.email) {
      data.push({
        type: "icon",
        compo: (
          <View>
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
          <View>
            <FieldContact label={"Email"} value={contact.email} />
          </View>
        ),
      });
    }
    if (contact.address) {
      data.push({
        type: "field",
        compo: (
          <View>
            <FieldContact label={"Address"} value={contact.address} />
          </View>
        ),
      });
    }
    setContactData(data);
  }, [contact]);

  const backHandlerPress = () => {
    navigation.goBack();
  };

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
            <TouchableOpacity onPress={editHandlerPress} style={style.editBtn}>
              <Text style={style.editTxt}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={style.contDetail}>
            <Image style={style.styleImage} source={unknowImage} />
            <View>
              <Text style={style.txtName}>Vena Celencia</Text>
            </View>
            <View style={style.contIcon}>
              {contactData
                .filter((item) => item.type === "icon")
                .map((item, index) => (
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
    height: "65%",
  },
  contDetail: {
    marginTop: "-10%",
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
  },
  contIcon: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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

export default DetailContactScreen;
