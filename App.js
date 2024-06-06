import LoginScreen from "./app/screens/LoginScreen.js";
import SplashScreen from "./app/screens/SplashScreen.js";
import ContactScreen from "./app/screens/ContactScreen.js";
import RegisterScreen from "./app/screens/RegisterScreen.js";
import DetailContactScreen from "./app/screens/DetailContactScreen.js";
import EditScreen from "./app/screens/EditScreen.js";
import EditProfile from "./app/screens/EditProfile.js";
import AddContactScreen from "./app/screens/AddContactScreen.js";
import GroupScreen from "./app/screens/GroupsScreen.js";
import GroupDetail from "./app/screens/GroupDetail.js";

import { MyNavigation } from "./app/routes/MyNavigation.js";
import DetailContactScreenGroup from "./app/screens/DetailContactScreenGroup.js";
import FavoriteScreen from "./app/screens/FavoritesScreen.js";

const App = () => {
  const nivel = [
    { name: "Splash", compo: SplashScreen },
    { name: "Login", compo: LoginScreen },
    { name: "Register", compo: RegisterScreen },
    { name: "DetailContact", compo: DetailContactScreen },
    { name: "Edit", compo: EditScreen },
    { name: "Prueba", compo: ContactScreen },
    { name: "EditProfile", compo: EditProfile },
    { name: "AddContact", compo: AddContactScreen },
    { name: "Groups", compo: GroupScreen },
    { name: "GroupDetail", compo: GroupDetail },
    { name: "DetailContactGroup", compo: DetailContactScreenGroup },
    { name: "Favorites", compo: FavoriteScreen },
  ];

  return <MyNavigation arrayComponents={nivel} />;
};

export default App;
