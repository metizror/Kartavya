import {View, Text, SafeAreaView, StyleSheet,Alert} from 'react-native';
import React, {useState} from 'react';
import Headers from '../components/header';
import TextInputComponent from '../components/textInputComponent';
import CustomButton from '../components/customButton';
import Fonts from '../components/themes/Fonts';
import axios from 'axios';


export default function ForgotPasswordScreen({navigation}) {
  const [emailText, onEmailChangeText] = useState('');

  const onBtnPress = () => {
    if (isValid()) {
      forgotPswCall();
    }
  };

  const isValid = () => {
    if (!emailText.trim()) {
      Alert.alert('Please enter email.');
      return false;
    } else {
      return true;
    }
  };

  const forgotPswCall = () => {
    let data = JSON.stringify({
      email: emailText,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://kartavya.metizcrm.com/api/forgot-password',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
            if (response.status == 200) {
          Alert.alert('Password reset link have been send to your mail.');
          navigation.navigate('Login')
        } else {
          Alert.alert('please enter valid email.');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={Styles.container}>
      <Headers navigation={navigation} title="Forgot Password" />
      <View style={Styles.mainView}>
        <Text style={Styles.topText}>Reset Password</Text>
        <View style={{marginTop:10}}></View>
        <TextInputComponent
          title="Send Reset Link"
          placeholderText="Enter Email"
          text={emailText}
          onChangeText={onEmailChangeText}
        />
        <View style={{marginTop:30}}></View>
        <CustomButton title="Send Reset link" onPress={onBtnPress} />
      </View>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
  },
  topText: {
    marginTop: 25,
    fontSize: 18,
    color: '#1D2348',
    fontFamily: Fonts.SF_Pro_Text_Bold,
  },
  text16: {
    fontSize: 16,
    fontFamily: Fonts.SF_Pro_Text_Medium,
    color: '#1D2348',
    alignSelf: 'stretch',
  },
  text14: {
    fontSize: 14,
    fontFamily: Fonts.SF_Pro_Text_Bold,
    color: '#776C71',
  },
});
