import React, { useContext, useState } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Image,
} from "react-native";
import { DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import { EventRegister } from "react-native-event-listeners";
import { useNavigation } from "@react-navigation/native";
import themeContext from '../config/themeContext';
import Icon from "react-native-vector-icons/Ionicons";
import SwitchWithIcons from "react-native-switch-with-icons";

function CustomDrawerContent(props) {
    const theme = useContext(themeContext);
    const [mode, setMode] = useState(false);
    const navigation = useNavigation(); 
    const Drawer = createDrawerNavigator();

    return (
        <DrawerContentScrollView {...props} style={{ backgroundColor: theme.background }}>
            <View style={[styles.firstSection, { backgroundColor: theme.background }]}>
                <View style={styles.secondSection}>
                    <Image 
                        style={styles.avatarImage} 
                        source={require('../assets/avatar.png')}
                    />
                    <Text 
                        style={styles.userName}
                        onPress={() => navigation.navigate("Login")}
                    >
                        Majd Jalab
                    </Text>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <View style={styles.thirdSection}>
                        <Icon name="ios-home-outline" size={28} color="#1DA1F2"/>
                        <Text style={styles.screenName}>Home</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.thirdSection}>
                        <Icon name="heart-outline" size={28} color="#1DA1F2"/>
                        <Text style={styles.screenName}>Favorite</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.thirdSection}>
                        <Icon name="person-add-outline" size={28} color="#1DA1F2"/>
                        <Text style={styles.screenName}>Support</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.switchMode}>
                    <SwitchWithIcons 
                        value={mode}
                        onValueChange={(value) => {
                            setMode(value)
                            EventRegister.emit("changeTheme", value);
                        }}
                    />
                    <Text style={styles.screenName}>Mode</Text>
                </View>
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    firstSection: {
        marginTop: '8%',
        height: '100%',
    },
    secondSection: {
        height: '20%',
        marginBottom: '4%',
        paddingBottom: '6%',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#1DA1F2',
    },
    avatarImage: {
        marginLeft: '8%',
        marginRight: '8%',
        height: '80%',
        width: '15%',
        borderRadius: 50,
    },
    userName: {
        fontSize: 17,
        lineHeight: 35,
        marginTop: '5%',
        marginLeft: '2%',
        color: '#1DA1F2',
        fontWeight: 'bold',
    },
    thirdSection: {
        marginTop: '2%',
        marginBottom: '2%',
        marginLeft: '10%',
        flexDirection: 'row',
    },
    screenName: {
        fontSize: 14,
        lineHeight: 20,
        marginLeft: '28%',
        marginTop: '2%',
        color: '#1DA1F2',
    },
      switchMode:{
            marginTop:'7%',
            marginBottom:'25%',
            marginLeft:'10%',
            flexDirection:'row'
      }
    }
  );


export default CustomDrawerContent