import { StyleSheet } from "react-native";
import Colors from "./Colors.js";

const splashStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
    },
    letterStyle: {
        color: Colors.GRAY,
        fontFamily: 'reBold',
        fontSize: 40,
        marginTop: 40
    }
})

export { splashStyles };