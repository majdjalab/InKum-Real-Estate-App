import React, { useContext, useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import PostScreen from '../screens/PostScreen';
import themeContext from '../config/themeContext';

const Tab = createBottomTabNavigator();

function Tabs() {
  const navigation = useNavigation();
  const theme = useContext(themeContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);


  const handlePostPress = () => {
    navigation.navigate('Modal'); // Navigate to the modal screen
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.background,
          position: 'absolute',
          left: '10%',
          right: '10%',
          bottom: '5%',
          height: '8%',
          elevation: 3,
          borderRadius: 50,
          borderWidth: 0.5,
          borderTopWidth: 0.5,
          borderTopColor: "#1DA1F2",
          borderColor: '#1DA1F2',
        },
      }}>
      {/* Home Screen */}
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.firstSection}>
              <Icon name={focused ? 'home' : 'home-outline'} size={30} style={[styles.container, { color: focused ? '#1DA1F2' : theme.card }]} />
              <Text style={[styles.screenName, { color: focused ? '#1DA1F2' : theme.card }]}>Home</Text>
            </View>
          ),
        }}
      />

      {/* Post Screen */}
      <Tab.Screen
        name='Post'
        component={PostScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.firstSection}>
              <Icon name={'add'} size={35} style={[styles.container, { color: focused ? '#1DA1F2' : theme.card }]} />
              <Text style={[styles.screenName, { color: focused ? '#1DA1F2' : theme.card }]}>Post</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  firstSection: {
    alignItems: 'center',
    marginTop: '13%',
    marginBottom: '2%',
    marginLeft: '5%',
    marginRight: '5%',
  },
  screenName: {
    textAlign: 'center',
    marginBottom: '5%',
    marginTop: '2%',
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default function BottomNav() {
  return <Tabs />;
}
