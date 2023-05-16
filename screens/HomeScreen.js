import React, { useContext, useLayoutEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import themeContext from '../config/themeContext';
import TopNav from '../components/TopNav';
import { useNavigation } from '@react-navigation/native';
import ProductsCard from '../components/ProductsCard';
import { styles } from './Style';

const HomeScreen = () => {
  // Delete the title on the top of the screen
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const theme = useContext(themeContext);

  return (
    <SafeAreaView style={{ backgroundColor: theme.background }}>
      <StatusBar style={{ backgroundColor: theme.background }} />
      <TopNav />
      <ScrollView style={[styles.scrollContainer, { backgroundColor: theme.background }]}>
        <View style={styles.firstSection}>
          <Text style={styles.title}>Featured Flats</Text>
          <View style={styles.secondSection}>
            <View>
              <ProductsCard/>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
