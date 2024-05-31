import { Platform } from "react-native";

const types = {
  phone: { base: "tel:" },
  envelope: {
    base: "mailto:",
    param: "body=",
    message: "Hola te envio correo desde Spiral!!",
  },
  comment: {
    base: "sms:",
    param: "body=",
    message: "Hola desde Spiral!!",
  },
};

const parseUrl = (iconType) => {
  if (!types[iconType]) return null;

  const symbolParam =
    Platform.OS === "ios" ? "?" : Platform.OS === "android" ? "?" : false;

  if (!symbolParam) return null;

  const urlToUse = {
    baseUrl: types[iconType].base,
    data: "",
    param: `${
      types[iconType].param ? symbolParam + types[iconType].param : ""
    }`,
    message: `${types[iconType].message ? types[iconType].message : ""}`,
  };

  return urlToUse;
};

export { parseUrl };
