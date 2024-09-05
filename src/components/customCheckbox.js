import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Fonts from './themes/Fonts';

const CustomCheckbox = ({ checked, onChange, title }) => {
  return (
    <TouchableOpacity style={Styles.checkboxView} onPress={onChange}>
      {/* <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 5,
          borderWidth: 2,
          borderColor: checked ? 'blue' : 'gray',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {checked && (
          <View
            style={{
              width: 14,
              height: 14,
              borderRadius: 3,
              backgroundColor: 'blue',
            }}
          />
        )}
      </View> */}
      <CheckBox
        style={Styles.checkbox}
        disabled={false}
        value={checked}
        onValueChange={onChange}
        tintColor='#78789D'
        tintColors='#78789D'
      />
      <Text style={Styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomCheckbox;


const Styles = StyleSheet.create({
  checkboxView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    color: '#78789D'
  },

  text: {
    fontSize: 16,
    fontFamily: Fonts.SF_Pro_Text_Medium,
    color: '#78789D'
    // fontWeight:400
  },
});
