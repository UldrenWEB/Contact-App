import React, { useEffect } from "react";
import Session from "../storage/sessionStorage";
import { Alert } from "react-native";
import { jwtDecode } from "jwt-decode";

const useValidateSession = (navigation) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", async (e) => {
      try {
        const result = await Session.getSession();

        const token = result.data;
        const decodedToken = jwtDecode(token);

        const currentDate = new Date();

        if (decodedToken.exp < currentDate.getTime() / 1000) {
          e.preventDefault();

          Alert.alert("System Information", "Your session is expired", [
            {
              text: "OK",
              onPress: async () => {
                const result = await Session.deleteSession();
                if (result.code == 1) return;

                navigation.navigate("Login");
              },
            },
          ]);
        }
      } catch (error) {
        return false;
      }
    });

    return unsubscribe;
  }, [navigation]);
};

export default useValidateSession;
