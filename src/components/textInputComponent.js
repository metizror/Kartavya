import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'

const TextInputComponent = (props) => {
  const { multiLine = false, numberOfLines = 1, inputMode = 'text' } = props
  console.log(props)
  // textAlignVertical={multiLine} ? 'top' : 'center'
  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={Styles.text}>{props.title}</Text>
        <Text style={Styles.text1}>{props.star}</Text>
      </View>
      <TextInput
        style={[Styles.emailInput, { textAlignVertical: multiLine ? 'top' : 'center' }]}
        value={props.text}
        onChangeText={props.onChangeText}
        placeholderTextColor="#78789D"
        multiline={multiLine}
        inputMode={inputMode}
        numberOfLines={numberOfLines}
        placeholder={props.placeholderText} />
    </View>
  )
}

export default TextInputComponent;

const Styles = StyleSheet.create({
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
  text1: {
    fontSize: 16,
    color: 'red',
    fontFamily: 'SF-Pro-Text-Medium',
    marginTop: 15,
  },
  emailInput: {
    // height: 50,
    // margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#F4F8FB',
    borderRadius: 10,
    borderColor: '#F4F8FB',
    color: '#78789D'

    // textAlignVertical:'top'
  },
})