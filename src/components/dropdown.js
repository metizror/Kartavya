import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import Fonts from './themes/Fonts';
import Icons from './themes/icons';

const DropdownMenu = props => {
  const {
    initialValue = "Select here",
    isDisable = false

  } = props
  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={Styles.text}>{props.title}</Text>
        <Text style={Styles.text1}>{props.star}</Text>
      </View>
      <SelectDropdown
        data={props.data}
        onSelect={props.onSelect}
        buttonTextAfterSelection={props.buttonTextAfterSelection}
        rowTextForSelection={props.rowTextForSelection}
        dropdownIconPosition="right"
        disabled={isDisable}
        renderDropdownIcon={() => <Icons.ArrayDown />}
        defaultButtonText={initialValue}
        buttonStyle={Styles.dropdown}
        buttonTextStyle={Styles.dropdownText}
        rowTextStyle={Styles.rowText}
      />
    </View>
  );
};

export default DropdownMenu;

const Styles = StyleSheet.create({
  dropdown: {
    width: '100%',
    padding: 10,
    backgroundColor: '#F4F8FB',
    borderRadius: 10,
    color: '#F4F8FB',
  },
  text: {
    fontSize: 16,
    color: '#000000',
    fontFamily: Fonts.SF_Pro_Text_Medium,
    marginTop: 15,
    // fontWeight:400
  },
  text1: {
    fontSize: 16,
    color: 'red',
    fontFamily: 'SF-Pro-Text-Medium',
    marginTop: 15,
  },
  dropdownText: {
    fontSize: 14,
    color: '#78789D',
    fontFamily: Fonts.SF_Pro_Text_Regular,
    textAlign: 'left',
  },
  rowText: {
    fontSize: 15,
    color: '#000',
    fontFamily: Fonts.SF_Pro_Text_Medium,
    textAlign: 'left',
  },
});
