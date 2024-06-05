import {
  View,
  StyleSheet,
  TextInput,
  Alert,
  Button,
  Text,
  ActivityIndicator,
} from "react-native";
import Colors from "../styles/Colors";
import Footer from "../components/Footer";
import { useCallback, useEffect, useState } from "react";
import Group from "../components/Group";
import { ReactNativeModal } from "react-native-modal";
import HeaderMinimal from "../components/headerMinimal";
import { wrapper } from "../service/fetchWrapper";
import { groups as endPoint } from "../configs/endpoints.json";
import { useFocusEffect } from "@react-navigation/native";

const GroupScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [groups, setGroups] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getGroups = async () => {
    try {
      setIsLoading(true);
      const result = await wrapper({
        method: "get",
        endPoint: `${endPoint.get}`,
        isToken: true,
      });
      setIsLoading(false);

      if (!result || !result.length)
        return Alert.alert("Error", "Hubo un error al buscar tus grupos");

      setGroups(result);
    } catch (error) {
      return Alert.alert("Error", "Hubo un error al hacer la consulta");
    }
  };

  useFocusEffect(
    useCallback(() => {
      getGroups();
    }, [trigger])
  );

  const saveHandler = async () => {
    const myRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (myRegex.test(inputValue)) {
      return Alert.alert("Error", "No se permiten caracteres especiales.");
    }

    try {
      setIsLoading(true);
      const result = await wrapper({
        method: "post",
        endPoint: `${endPoint.create}`,
        isToken: true,
        json: { name: inputValue },
      });
      setIsLoading(false);

      if (!result || !result.group)
        return Alert.alert("Error", "Hubo un error al hacer la consulta");

      setTrigger(!trigger);
    } catch (error) {
      Alert.alert("Error", "Hubo un error al hacer la consulta");
    }

    setModalVisible(false);
  };

  const createHandler = () => {
    setModalVisible(true);
  };

  const handlerNavigation = (group) => {
    console.log("Info del grupo a detail", group);
    navigation.navigate("GroupDetail", { group });
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
          {(groups ?? []).length <= 0 ? (
            <Text style={{ color: "white" }}>
              Crea un nuevo grupo para una mejor organizacion
            </Text>
          ) : (
            (groups ?? []).map((group) => {
              return (
                <Group
                  key={group._id}
                  group={group}
                  onPress={handlerNavigation}
                />
              );
            })
          )}
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
