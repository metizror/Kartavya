import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import Fonts from '../components/themes/Fonts';
import Headers from '../components/header';

export default function AboutScreen({navigation}) {
  return (
    <SafeAreaView style={Styles.container}>
      <Headers navigation={navigation} title="About Us" />
      <View style={Styles.mainView}>
        <Text 
        style={Styles.text16}>
          Kartavya Seeds is committed to supply genetically enhanced high
          quality seeds to farmers. We are an ISO 9001:2015 certified company.
          Our seeds are ingrained with qualities to produce safe, rich,
          flavourful, nutritious crop. While the farmers harvest prosperous
          crops, they are able to achieve it with fewer resources. This protects
          the environment and sets the right foundation to realize sustainable
          growth. We produce, process and supply superior quality seeds for a
          wide range of crops including Cotton, Maize, Bajara, High Nutritive
          Fodder, Cluster Bean, Wheat, Mustard, Okra, Sweet Corn, Cumin, Sesame,
          Moong, Cowpea and several vegetable crops.
        </Text>
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
  },
  text16: {
    fontSize: 16,
    fontFamily: Fonts.SF_Pro_Text_Medium,
    color: '#1D2348',
    alignSelf:'stretch'
    
  },
  text14: {
    fontSize: 14,
    fontFamily: Fonts.SF_Pro_Text_Bold,
    color: '#776C71',
  },
});
