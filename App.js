import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './components/CustomDrawerContent';
import HomeScreen from './screens/HomeScreen';
import { EventRegister } from "react-native-event-listeners";
import LoginScreen from './screens/LoginScreen';
import themeContext from './config/themeContext';
import theme from "./config/theme";
import BottomNav from "./components/BottomNav";

const Drawer = createDrawerNavigator();

export default function App() {
  const [mode, setMode] = useState(false);

  useEffect(() => {
    let eventListener = EventRegister.addEventListener(
      "changeTheme",
      (data) => {
        setMode(data);
      }
    );
    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  });

  return (
    <themeContext.Provider value={mode === true ? theme.dark : theme.light}>
      <NavigationContainer>
        <Drawer.Navigator
          useLegacyImplementation
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="BottomNav" component={BottomNav} />
          <Drawer.Screen name="Home" component={HomeScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </themeContext.Provider>
  );
}
