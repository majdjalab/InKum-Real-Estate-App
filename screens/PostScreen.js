import React, {useLayoutEffect, useContext} from 'react';
import { View, Text, Pressable, Image, TextInput, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import themeContext from '../config/themeContext';
import TopNav from '../components/TopNav';


const ApiUrl = 'YOUR_ENDPOINT';


const uploadImage = async (formData) => {
  try {
    const response = await fetch(`${ApiUrl}/newPost`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.ok) {
      throw new Error('Error uploading image');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export default function PostScreen() {

  const [image, setImage] = React.useState(null);
  const [title, setTitle] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [city, setCity] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [phone, setPhone] = React.useState('');

    // Delete the title on the top of the screen
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
const theme = useContext(themeContext);

  const handleChooseImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission denied');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleUploadImage = async () => {
    if (!image) {
      console.log('No image selected');
      return;
    }

    const formData = new FormData();
    formData.append('image', {
      uri: image,
      name: 'image.jpg',
      type: 'image/jpg',
    });
    formData.append('title', title);
    formData.append('address', address);
    formData.append('city', city);
    formData.append('price', price);
    formData.append('phone', phone);

    try {
      const response = await uploadImage(formData);
      console.log(response.data);
    } catch (error) {
      console.log('Error uploading image:', error);
    }
  };

return (
  <SafeAreaView style={{ backgroundColor: theme.background, height: '100%' }}>
    <StatusBar style={{ backgroundColor: theme.background }} />
    <TopNav />
    <View style={styles.centeredView}>
      <View style={[styles.modalView, { backgroundColor: theme.background }]}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          placeholderTextColor="#B2BABB"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor="#B2BABB"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          placeholderTextColor="#B2BABB"
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          placeholderTextColor="#B2BABB"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#B2BABB"
          keyboardType="numeric"
          value={phone}
          onChangeText={setPhone}
        />
        <View style={styles.buttons}>
          <Pressable style={styles.buttonImages} onPress={handleChooseImage}>
            <Text style={styles.textStyle}>Upload Image</Text>
          </Pressable>

          <Pressable style={styles.buttonSubmit} onPress={() => {
            handleUploadImage();
            alert('Done');
          }}>
            <Text style={styles.textStyle}>Submit</Text>
          </Pressable>
        </View>
      </View>
    </View>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  modalView: {
    height: '80%',
    marginBottom: 20,
    backgroundColor: '#141d26',
    borderRadius: 20,
    padding: 35,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    marginBottom: 15,
    marginTop: 3,
    padding: 10,
    borderWidth: 1,
    borderColor: '#1DA1F2',
    borderRadius: 20,
    color: '#1DA1F2'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '15%',
  },
  buttonSubmit: {
    backgroundColor: '#1DA1F2',
    width: '40%',
    height: 50,
    borderRadius: 25,
    marginBottom: '2%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImages: {
    backgroundColor: '#1DA1F2',
    width: '70%',
    height: 50,
    marginBottom: '10%',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
