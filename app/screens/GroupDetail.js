import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TextInput,
} from "react-native";
import HeaderContact from "../components/HeaderContact";
import HeaderMinimal from "../components/headerMinimal";

import ReactNativeModal from "react-native-modal";
import Colors from "../styles/Colors";
import { useEffect, useRef, useState } from "react";
import { converterHex } from "../service/converterHex";
import CheckBoxComponent from "../components/CheckBoxComponent";

const GroupDetail = ({ navigation, route }) => {
  const [textSearcher, setTextSearcher] = useState("");
  const [textSearcherContact, setTextSearcherContact] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const contactRef = useRef();

  const { group } = route.params;

  useEffect(() => {
    console.log(group);
  }, []);

  const addHandler = () => {
    console.log("Se le dio a add");
    setModalVisible(true);
  };

  const saveHandler = () => {
    //Aqui se haria la consulta para guardar todo lo seleccionado
    const contacts = contactRef.current;
    console.log("Aqui seleccion", contacts);

    setModalVisible(false);
  };

  const deleteHandler = () => {
    console.log("Se quiere borrar el grupo");
  };

  const profileHandler = () => {
    console.log("Se le dio a los tres puntos");
  };

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
              currentContacts={group?.contacts}
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
          text={textSearcher}
          onChange={(text) => setTextSearcher(text)}
          onPressToAdd={addHandler}
          onPressToProfile={profileHandler}
        />
      </View>
      <Text>Probando vista</Text>
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
    borderColor: "green",
    borderWidth: 1,
    width: 230,
    marginTop: 20,
  },
});

export default GroupDetail;
