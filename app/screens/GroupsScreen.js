import {
  View,
  TextInput,
  Alert,
  Button,
  Text,
  ActivityIndicator,
} from "react-native";
import Colors from "../styles/Colors";
import Footer from "../components/Footer";
import { useCallback, useState } from "react";
import Group from "../components/Group";
import { ReactNativeModal } from "react-native-modal";
import HeaderMinimal from "../components/headerMinimal";
import { wrapper } from "../service/fetchWrapper";
import { groups as endPoint } from "../configs/endpoints.json";
import { useFocusEffect } from "@react-navigation/native";
import { converterHex } from "../service/converterHex";
import { style } from "../styles/groupScreenStyle";

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

      if (!result || !result.length) return;

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
          isModified={true}
          btnName={"Crear"}
          navigation={navigation}
          onPress={createHandler}
          title={"Grupos"}
        />
        <View style={style.contProp}>
          {(groups ?? []).length <= 0 ? (
            <Text
              style={{
                color: converterHex(Colors.WHITE, 0.7),
                fontFamily: "reBold",
                fontSize: 19,
                textAlign: "center",
                marginTop: "19%",
              }}
            >
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

export default GroupScreen;
