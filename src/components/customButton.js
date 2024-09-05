import {TouchableOpacity, Text,StyleSheet} from 'react-native';
import React from 'react';
import Fonts from './themes/Fonts';

const CustomButton = props => {
  return (
    <TouchableOpacity
      style={[Styles.button,props.style]}
      onPress={props.onPress}
    >
    <Text style={Styles.btnText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;


const Styles= StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: '#884D2B',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  btnText: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: Fonts.SF_Pro_Text_Medium,
    // fontWeight:400
  },
})