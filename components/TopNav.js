import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Menu from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import themeContext from "../config/themeContext";

function TopNav() {
  const theme = useContext(themeContext);
  const navigation = useNavigation();

  return (
    <View style={[styles.firstSection, { backgroundColor: theme.background }]}>
      <View style={styles.secondSection}>
        <View style={styles.navMenu}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Menu name="menu" size={37} color="#1DA1F2" />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>InKum</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  firstSection: {
    flexDirection: "row",
  },
  secondSection: {
    flexDirection: "row",
    marginTop: "5%",
    borderBottomWidth: 1,
    borderBottomColor: "#1DA1F2",
    width: "100%",
  },
  navMenu: {
    marginLeft: "5%",
  },
  title: {
    textAlign: "center",
    fontSize: 25,
    marginBottom: "3%",
    marginLeft: "25%",
    color: "#1DA1F2",
    fontWeight: "bold",
  },
});

export default TopNav;
