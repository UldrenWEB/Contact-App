import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFontsPersonalized } from "../customs/useFontsPersonalized.js";

const Stack = createNativeStackNavigator();

const MyNavigation = ({ arrayComponents }) => {
  const [fontsLoaded] = useFontsPersonalized([
    "reBold",
    "poBold",
    "reRegular",
    "poRegular",
  ]);

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {arrayComponents.map((obj, index) => {
          return (
            <Stack.Screen key={index} name={obj.name} component={obj.compo} />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { MyNavigation };
