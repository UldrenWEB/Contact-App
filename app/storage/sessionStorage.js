import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

class Session {
  constructor() {}

  static saveSession = async (token) => {
    try {
      await AsyncStorage.setItem("session", token);

      return {
        message: "Sesion guardada",
        code: 0,
      };
    } catch (error) {
      return { message: error.message, code: 1 };
    }
  };

  static getSession = async () => {
    try {
      const session = await AsyncStorage.getItem("session");
      if (!session)
        return { message: "No se encontro la informacion", code: 1 };

      return {
        message: "Se ha obtenido la sesion correctamente",
        code: 0,
        data: session,
        id: jwtDecode(session).id,
      };
    } catch (error) {
      return { message: error.message, code: 1 };
    }
  };

  static deleteSession = async () => {
    try {
      await AsyncStorage.removeItem("session");
      return {
        message: "Sesion borrada exitosamente",
        code: 0,
      };
    } catch (error) {
      return { message: error.message, code: 1 };
    }
  };
}

export default Session;
