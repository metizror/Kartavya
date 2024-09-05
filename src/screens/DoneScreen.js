import {View, Text, SafeAreaView, StyleSheet, BackHandler} from 'react-native';
import React, {useEffect} from 'react';
import Headers from '../components/header';
import Icons from '../components/themes/icons';
import Fonts from '../components/themes/Fonts';
import {StackActions} from '@react-navigation/native';

export default function DoneScreen({navigation}) {
  // useEffect(() => {
  //     const backAction = () => {
  //         navigation.navigate('Home')
  //       // Your custom back action logic goes here
  //       // For example, you can navigate to a previous screen or show a confirmation dialog
  //       return true; // Return true to prevent default back behavior (i.e. exit the app)
  //     };

  //     const backHandler = BackHandler.addEventListener(
  //       'hardwareBackPress',
  //       backAction,
  //     );

  //     return () => backHandler.remove(); // Cleanup function to remove event listener when unmounting

  //   }, []);

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);
  }, []);

  return (
    <SafeAreaView style={Styles.container}>
      <Headers navigation={navigation} title="Done" />
      <View style={Styles.view}>
        <Icons.Done />
        <Text style={Styles.text24}>Successful!!</Text>
        <Text style={Styles.text16}>Your lead is added</Text>
      </View>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text24: {
    fontSize: 24,
    fontFamily: Fonts.SF_Pro_Text_Bold,
    color: '#000000',
  },
  text16: {
    fontSize: 16,
    fontFamily: Fonts.SF_Pro_Text_Medium,
    color: '#7B797E',
  },
});
