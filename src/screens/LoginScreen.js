import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from '../components/themes/icons';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [emailText, onEmailChangeText] = useState('');
  const [pswText, onPswChangeText] = useState('');
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  console.log(emailText);

  const logInBtnPress = () => {
    if (isValid()) {
      LogIn();
    }
  };

  const isValid = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (!emailText.trim()) {
      Alert.alert('Please enter email id.');
      return false;
    }
    if (reg.test(emailText) === false) {
      Alert.alert('Please enter valid email id.');
      return false;
    }
    if (!pswText.trim()) {
      Alert.alert('Please enter password.');
      return false;
    } else {
      return true;
    }
  };

  const LogIn = () => {
    var data = JSON.stringify({
      email: emailText,
      password: pswText,
    });

    var config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://kartavya.metizcrm.com/api/logincheck',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    console.log('login config is  :' + config.data);
    axios(config)
      .then(async function (response) {
        console.log(JSON.stringify(response.data));
        console.log(response.data.status);
        if (response.data.status) {
          await AsyncStorage.setItem(
            'userData',
            JSON.stringify(response.data.data),
          );
          await AsyncStorage.setItem('isLoggedIn', 'true');
          navigation.navigate('BottomTabBar');
        } else {
          Alert.alert(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={Styles.container}>
      <KeyboardAwareScrollView
        innerRef={ref => {
          this.scroll = ref;
        }}>
        <Header navigation={navigation} title="Login" />
        <ImageBackground
          style={{ flex: 1 }}
          source={require('../../assets/images/splash_bg.png')}>
          <Icons.Logo style={Styles.image}></Icons.Logo>
          {/* <Image
          style={Styles.image}
          source={require('../../assets/images/logo.png')}></Image> */}
          <View style={Styles.view}>
            <Text style={Styles.text}>Email</Text>
            <TextInput
              style={Styles.emailInput}
              value={emailText}
              onChangeText={onEmailChangeText}
              placeholder="Enter Here"
              placeholderTextColor="#78789D"
            />
            <Text style={Styles.text}>Password</Text>
            <View style={Styles.pswView}>
              <TextInput
                style={{ color: '#78789D' }}
                secureTextEntry={isPasswordSecure}
                value={pswText}
                onChangeText={onPswChangeText}
                placeholder="Enter Here"
                placeholderTextColor="#78789D"
              />
              <Icon
                name={isPasswordSecure ? 'eye-slash' : 'eye'}
                size={20}
                color="#78789D"
                onPress={() => {
                  isPasswordSecure
                    ? setIsPasswordSecure(false)
                    : setIsPasswordSecure(true);
                }}
              />
            </View>
            <Text style={Styles.forgotPsw}
              onPress={() => navigation.navigate('ForgotPsw')}>Forgot Password ?</Text>
            <TouchableOpacity
              style={Styles.button}
              onPress={() => logInBtnPress()}>
              <Text style={Styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    alignSelf: 'center',
    marginTop: 60,
  },
  view: {
    paddingHorizontal: 30,
    marginTop: 30,
  },
  text: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'SF-Pro-Text-Medium',
    marginTop: 15,
    // fontWeight:400
  },
  forgotPsw: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'SF-Pro-Text-Medium',
    marginTop: 5,
    alignSelf: 'flex-end',
    // fontWeight:400
  },
  emailInput: {
    height: 50,
    // margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#F4F8FB',
    borderRadius: 10,
    borderColor: '#F4F8FB',
    color: '#78789D'
  },
  pswView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 5,
    backgroundColor: '#F4F8FB',
    borderRadius: 10,
    borderColor: '#F4F8FB',
    height: 50,
  },
  button: {
    height: 50,
    backgroundColor: '#884D2B',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  loginText: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'SF-Pro-Text-Medium',
    // fontWeight:400
  },
});
