import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Header } from 'react-native/Libraries/NewAppScreen';

const Headers = (props) => {
  const { navigation, title = "kartavya" } = props
  // console.log(props);
  return (
    <View style={Styles.container}>
      <Text style={Styles.headerTextStyle}>{title}</Text>
    </View>

  )
}

export default Headers;


const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#884D2B',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    height: 80

  },
  headerTextStyle: {
    color: 'white',
    fontFamily: 'SF-Pro-Text-Medium',
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 5
  }
});