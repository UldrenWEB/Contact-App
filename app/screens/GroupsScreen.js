import { View, StyleSheet, TextInput, Alert, Button } from "react-native";
import Colors from "../styles/Colors";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import Group from "../components/Group";
import { ReactNativeModal } from "react-native-modal";
import HeaderMinimal from "../components/headerMinimal";

const groups = [
  {
    _id: "66441877d6c250525e4b919d",
    name: "Grupo",
    contacts: [
      {
        _id: "66440c159713baa9c0e1ee7c",
        name: "Roberto",
        lastName: "Arevalo",
      },
    ],
    userId: {
      username: "Marcialito",
      email: "Marci@example.com",
      id: "66440b1d456bb8344624b18c",
    },
    __v: 3,
  },
  {
    _id: "66441a464abfe9e9c2427308",
    name: "Grupo",
    contacts: [
      {
        _id: "66440c159713baa9c0e1ee7c",
        name: "Roberto",
        lastName: "Arevalo",
      },
    ],
    userId: {
      username: "Marcialito",
      email: "Marci@example.com",
      id: "66440b1d456bb8344624b18c",
    },
    __v: 0,
  },
  {
    _id: "66441b487a99410204dd60dc",
    name: "Grupo",
    contacts: [
      {
        _id: "66440c159713baa9c0e1ee7c",
        name: "Roberto",
        lastName: "Arevalo",
      },
    ],
    userId: {
      username: "Marcialito",
      email: "Marci@example.com",
      id: "66440b1d456bb8344624b18c",
    },
    __v: 0,
  },
  {
    _id: "66441ba67a99410204dd60e7",
    name: "Estudio",
    contacts: [
      {
        _id: "66441b8b7a99410204dd60e4",
        name: "Epale",
        lastName: "No se",
      },
    ],
    userId: {
      username: "Marcialito",
      email: "Marci@example.com",
      id: "66440b1d456bb8344624b18c",
    },
    __v: 0,
  },
  {
    _id: "66441bbc7a99410204dd60ef",
    name: "Estudi1o",
    contacts: [
      {
        _id: "66440c159713baa9c0e1ee7c",
        name: "Roberto",
        lastName: "Arevalo",
      },
    ],
    userId: {
      username: "Marcialito",
      email: "Marci@example.com",
      id: "66440b1d456bb8344624b18c",
    },
    __v: 1,
  },
];

const GroupScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  // const [groups, setGroups] = useState(null);

  useEffect(() => {
    //Aqui se hara el fetch para cargar los grupos
    console.log("Grupos");
  }, []);

  const saveHandler = () => {
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (specialCharRegex.test(inputValue)) {
      return Alert.alert("Error", "No se permiten caracteres especiales.");
    }

    //Aqui iria para crear un grupo haciendo Fetch
    setModalVisible(false);
  };

  const createHandler = () => {
    setModalVisible(true);
  };

  const handlerNavigation = (group) => {
    console.log(group);
    navigation.navigate("GroupDetail", { group });
  };

  return (
    <>
      {modalVisible && <View style={style.overlay} />}
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
              <TextInput
                style={style.modalText}
                onChangeText={setInputValue}
                value={inputValue}
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
          btnName={"Create"}
          navigation={navigation}
          onPress={createHandler}
          title={"Groups"}
        />
        <View style={style.contProp}>
          {(groups ?? []).map((group) => {
            return (
              <Group
                key={group._id}
                group={group}
                onPress={handlerNavigation}
              />
            );
          })}
        </View>
      </View>
      <Footer />
    </>
  );
};

const style = StyleSheet.create({
  container: {
    height: "92.8%",
    backgroundColor: Colors.BLACK,
    alignItems: "center",
  },
  contProp: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 22,
    width: "100%",
    height: "89.7%",
    borderColor: "green",
    justifyContent: "center",
    paddingHorizontal: "4%",
    paddingTop: "10%",
  },
  overlay: {
    position: "absolute",
    zIndex: 999,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    borderColor: Colors.SpiralColor,
    borderWidth: 1,
    borderRadius: 10,
    color: Colors.WHITE,
    width: "80%",
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
});

export default GroupScreen;
