import {
  Text,
  StyleSheet,
  Button,
  ImageBackground,
  Image,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from '../components/themes/icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SplashScreen({navigation}) {
  

 
  useEffect(() => {
   setTimeout(() => {
     AsyncStorage.getItem('isLoggedIn').then((value) =>
      navigation.replace(
        value === "true" ? 'BottomTabBar' : 'Login'
        // value === "true" ? 'Login' : 'Login'
      ),
     );
     }, 3000);
  }, [])

  return (
    <SafeAreaView style={Styles.container}>
<ImageBackground
        style={{flex: 1}}
        source={require('../../assets/images/splash_bg.png')}>
        <Icons.Logo style={Styles.image}></Icons.Logo>
        {/* <Image
          style={Styles.image}
          source={require('../../assets/images/logo.png')}></Image> */}
      </ImageBackground>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    alignSelf: 'center',
    marginTop:200
  },
});
