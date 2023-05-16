import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ApiUrl = 'YOUR_ENDPOINT';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const onChangeHandler = () => {
    setIsLogin(!isLogin);
    setMessage('');
  };

  const onLoggedIn = (token) => {
    fetch(`${ApiUrl}/private`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        try {
          const jsonRes = await res.json();
          if (res.status === 200) {
            setMessage(jsonRes.message);
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onSubmitHandler = () => {
    const payload = {
      username,
      password,
      name,
      email,
    };
    fetch(`${ApiUrl}/${isLogin ? 'login' : 'register'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        try {
          const jsonRes = await res.json();
          if (res.status !== 200) {
            setIsError(true);
            setMessage(jsonRes.message);
          } else {
            onLoggedIn(jsonRes.token);
            setIsError(false);
            setMessage(jsonRes.message);
            navigation.navigate('BottomNav');
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getMessage = () => {
    const status = isError ? `Error: ` : `Success: `;
    return status + message;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ backgroundColor: '#141d26' }}>
      <View style={styles.mainLayout}>

        <Image style={styles.logo} source={require('../assets/favicon.png')}/>
        <Text style={styles.heading}>{isLogin ? 'Login' : 'Register'}</Text>
        <View style={styles.form}>
          <View style={styles.inputs}>
            <TextInput 
              style={styles.input} 
              placeholder="Email" 
              placeholderTextColor="#fff" 
              autoCapitalize="none"
              defaultValue={setEmail} 
              onChangeText={(val) => setEmail(val)}
            />
            {!isLogin && 
              <TextInput 
                style={styles.input} 
                placeholder="Name" 
                placeholderTextColor="#fff" 
                defaultValue={setName} 
                onChangeText={(val) => setName(val)}
              />
            }
            {!isLogin && 
              <TextInput 
                style={styles.input} 
                secureTextEntry={false}
                placeholder="Username" 
                placeholderTextColor="#fff"
                defaultValue={setUsername} 
                onChangeText={(val) => setUsername(val)}
              />
            }
                   <TextInput
              secureTextEntry={true}
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#fff"
              value={password}
              onChangeText={(val) => setPassword(val)}
            />
            <Text
              style={[
                styles.message,
                { color: isError ? 'red' : 'green' },
              ]}
            >
              {message ? getMessage() : null}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={onSubmitHandler}
            >
              <Text style={styles.buttonText}>
                {isLogin ? 'Log In' : 'Sign Up'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonAlt}
              onPress={onChangeHandler}
            >
              <Text style={styles.buttonAltText}>
                {isLogin ? 'Sign Up' : 'Log In'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    mainLayout: {
        height: '100%',
        backgroundColor: '#141d26',
      },
    backButton: {
      position: 'absolute',
      top: 0,
      left: 0,
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    backButtonText: {
      color: '#1DA1F2',
      fontWeight: 'bold',
      fontSize: 16,
    },
    logo: {
        marginBottom: '4%',
        height: 140,
        width: 140,
        marginLeft: '35%',
        marginTop: '20%',
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '10%',
        marginTop: '5%',
        color: '#1DA1F2',
    },
    form: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: '5%',
    },
    inputs: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        paddingTop: '15%',
    },
    input: {
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: '#1DA1F2',
        paddingTop: 5,
        fontSize: 16,
        minHeight: 60,
        textAlign: 'left',
        color: '#1DA1F2',
    },
    button: {
        width: '80%',
        backgroundColor: '#1DA1F2',
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400'
    },
    buttonAlt: {
        width: '80%',
        borderWidth: 1,
        height: 40,
        borderRadius: 50,
        borderColor: '#1DA1F2',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonAltText: {
        color: '#1DA1F2',
        fontSize: 16,
        fontWeight: '400',
    },
    message: {
        fontSize: 16,
        marginVertical: '5%',
    },
    });


export default LoginScreen