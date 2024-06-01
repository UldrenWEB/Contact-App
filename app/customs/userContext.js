import { createContext } from "react";

const userContext = createContext();

export const UserProvider = userContext.Provider;
export const UserConsumer = userContext.Consumer;

export default userContext;
