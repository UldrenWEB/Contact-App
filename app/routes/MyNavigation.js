import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFontsPersonalized } from "../customs/useFontsPersonalized.js";
import { UserProvider } from "../customs/userContext.js";
import { useState } from "react";

const Stack = createNativeStackNavigator();

const MyNavigation = ({ arrayComponents }) => {
  const [fontsLoaded] = useFontsPersonalized([
    "reBold",
    "poBold",
    "reRegular",
    "poRegular",
  ]);

  const [user, setUser] = useState(null);

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  if (!fontsLoaded) return null;

  return (
    <UserProvider value={{ user, updateUser }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {arrayComponents.map((obj, index) => {
            return (
              <Stack.Screen key={index} name={obj.name} component={obj.compo} />
            );
          })}
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export { MyNavigation };
