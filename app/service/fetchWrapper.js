import { BASE_URL } from "../configs/url.json";
import Session from "../storage/sessionStorage";

const wrapper = async ({ json, method, endPoint, isToken }) => {
  const methodFormatted = method.toUpperCase();

  const getORdel = {
    method: methodFormatted,
    headers: {
      "Content-Type": "application/json",
      ...(isToken && {
        Authorization: `Bearer ${(await Session.getSession()).data}`,
      }),
    },
  };

  const postORput = {
    method: methodFormatted,
    headers: {
      "Content-Type": "application/json",
      ...(isToken && {
        Authorization: `Bearer ${(await Session.getSession()).data}`,
      }),
    },
    body: JSON.stringify(json),
  };

  const config =
    methodFormatted === "POST" || methodFormatted === "PUT"
      ? postORput
      : getORdel;

  try {
    const response = await fetch(`${BASE_URL}${endPoint}`, config);

    const data = await response.json();
    if (!data) return false;

    return data;
  } catch (error) {
    console.log("Error", error.message);
    return false;
  }
};

export { wrapper };
