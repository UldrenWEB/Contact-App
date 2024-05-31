import { View, Text, StyleSheet } from "react-native";
import Colors from "../styles/Colors";

const FieldContact = ({ label, value }) => {
  return (
    <View style={style.container}>
      <Text style={style.label}>{label}:</Text>
      {Array.isArray(value) ? (
        value.map((item, index) => (
          <View key={index} style={style.arrayItemContainer}>
            {Object.keys(item).map((key, i) => (
              <View key={i} style={style.arrayItemContainer}>
                <Text style={style.arrayItemLabel}>{key}:</Text>
                <Text style={style.arrayItemValue}>{item[key]}</Text>
              </View>
            ))}
          </View>
        ))
      ) : (
        <Text style={style.value}>{value}</Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: "90%",
    display: "flex",
    gap: 0,
    flexDirection: "column",
    padding: "4%",
    marginHorizontal: "auto",
    backgroundColor: Colors.grayColor,
    borderRadius: 20,
  },
  label: {
    color: Colors.SpiralColor,
    fontFamily: "poBold",
    fontSize: 17,
  },
  value: {
    color: Colors.WHITE,
    fontFamily: "poBold",
    fontSize: 18,
  },
  arrayItemContainer: {
    marginLeft: 10,
  },
  arrayItemLabel: {
    color: Colors.SpiralColor,
    fontFamily: "poBold",
    fontSize: 15,
  },
  arrayItemValue: {
    color: Colors.WHITE,
    fontFamily: "poBold",
    fontSize: 16,
  },
});

export default FieldContact;
