import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import Headers from '../components/header';
import * as Progress from 'react-native-progress';
import TextInputComponent from '../components/textInputComponent';
import CustomButton from '../components/customButton';
import DropdownMenu from '../components/dropdown';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PhoneInput from 'react-native-phone-number-input';
import Fonts from '../components/themes/Fonts';
import { MultiSelect } from 'react-native-element-dropdown';

export default function AddLeadScreen({ navigation }) {
  const [farmerText, onFarmerChangeText] = useState('');
  const [phoneText, onPhoneChangeText] = useState('');
  const [countries, setCountriesData] = useState([]);
  const [states, setStatesData] = useState([]);
  const [districts, setDistrictData] = useState([]);
  const [taluka, setTalukaData] = useState([]);
  const [village, setVillageData] = useState([]);
  const [callPurpose, setCallPurposeData] = useState([]);
  const [countryValue, setCountryValue] = useState('');
  const [stateValue, setStateValue] = useState('');
  const [districtValue, setDistrictValue] = useState('');
  const [talukaValue, setTalukaValue] = useState('');
  const [villageValue, setVillageValue] = useState('');
  const [callPurposeValue, setCallPurposeValue] = useState('');
  const phoneInput = useRef();
  // const [PhoneText, setPhoneText] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  // const [NumberText, setNumberText] = useState('');
  const number = /^[6-9]\d{9}$/;
  // const regexNo = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
  // const doneBtnPress = async () => {
  //   await AsyncStorage.setItem('farmer', farmerText);
  //   await AsyncStorage.setItem('phone', phoneText);
  //   if (isValid()) {
  //     navigation.navigate('AddLead2');
  //   }
  // };

  const isValid = () => {
    if (!farmerText.trim()) {
      Alert.alert('Please enter farmer name.');
      return false;
    }
    else if (!phoneText.trim()) {
      Alert.alert('Please enter phone number.');
      return false;
    }
    else if (phoneText.length < 10) {
      Alert.alert("Phone number must be at least 10 numbers..!!");
    }
    else if (!number.test(phoneText)) {
      Alert.alert("Please Enter Valid Phone Number..!!");
    }
    else if (!countryValue.trim()) {
      Alert.alert('Please select country.');
      return false;
    }
    else if (!stateValue.trim()) {
      Alert.alert('Please select state.');
      return false;
    }
    else if (!districtValue.trim()) {
      Alert.alert('Please select district.');
      return false;
    }
    else if (!talukaValue.trim()) {
      Alert.alert('Please select taluka.');
      return false;
    }
    else if (!villageValue.trim()) {
      Alert.alert('Please select village.');
      return false;
    }
    // else if (!callPurposeValue.trim()) {
    //   Alert.alert('Please select call purpose.');
    //   return false;
    // } 
    else {
      AsyncStorage.setItem('farmer', farmerText);
      AsyncStorage.setItem('phone', phoneText);
      AsyncStorage.setItem(
        'callPurpose',
        callPurposeValue,
      );
      setTimeout(() => {
        navigation.navigate('AddLead2');
      }, 1500);
    }
  };

  useEffect(() => {
    getCountries();
    callPurposeApi();
  }, []);

  const getCountries = () => {
    let data = '';

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://kartavya.metizcrm.com/api/countries',
      headers: {},
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        if (response.data.status == 200) {
          setCountriesData(response.data.data);

          // console.log("Countries data is " +countries);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const callStateAPI = countryId => {
    axios
      .get('https://kartavya.metizcrm.com/api/states', {
        params: {
          country_id: countryId,
        },
      })
      .then(function (response) {
        // console.log(response);
        console.log(JSON.stringify(response.data));
        setStatesData(response.data.data);
        // setDistrictData();
        // setTalukaData();
        // setVillageData();
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  const callDistrictAPI = stateId => {
    axios
      .get('https://kartavya.metizcrm.com/api/district', {
        params: {
          state_id: stateId,
        },
      })
      .then(function (response) {
        setDistrictData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  const callTalukaAPI = districtId => {
    axios
      .get('https://kartavya.metizcrm.com/api/taluka', {
        params: {
          district_id: districtId,
        },
      })
      .then(function (response) {
        setTalukaData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  const callVillageAPI = talukaId => {
    axios
      .get('https://kartavya.metizcrm.com/api/village', {
        params: {
          taluka_id: talukaId,
        },
      })
      .then(function (response) {
        setVillageData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  const callPurposeApi = () => {
    let data = '';

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://kartavya.metizcrm.com/api/callpurposes',
      headers: {},
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        setCallPurposeData(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={Styles.container}>
      <Headers navigation={navigation} title="Add Lead" />
      <ScrollView>
        <View style={Styles.mainView}>
          <Progress.Bar
            progress={0.3}
            width={Dimensions.get('window').width - 55}
            color="#FFB03A"
            unfilledColor="#FBF8F7"
            height={10}
            borderRadius={50}
            borderColor="#FBF8F7"
            borderWidth={1}
          />
          <TextInputComponent
            title="Farmer Name"
            star="*"
            placeholderText="Enter here"
            text={farmerText}
            onChangeText={onFarmerChangeText}
          />
          <TextInputComponent
            title="Phone"
            star="*"
            placeholderText="Enter here"
            text={phoneText}
            inputMode={'numeric'}
            maxLength={10}
            onChangeText={onPhoneChangeText}
          />

          <DropdownMenu
            title="Country"
            star="*"
            data={countries}
            onSelect={async (selectedItem, index) => {
              callStateAPI(selectedItem.id);
              setCountryValue(selectedItem.id.toString());
              await AsyncStorage.setItem('country', selectedItem.id.toString());
              console.log('in on select value : ' + selectedItem.id, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              console.log('buttonTextAfterSelection is : ' + selectedItem.name);
              return selectedItem.name;
            }}
            rowTextForSelection={(item, index) => {
              console.log('rowTextForSelection is : ' + item.name);
              return item.name;
            }}
          />

          <DropdownMenu
            title="State"
            star="*"
            isDisable={states?.length == 0 ? true : false}
            data={states}
            onSelect={async (selectedItem, index) => {
              console.log(selectedItem, index);
              callDistrictAPI(selectedItem.id);
              setStateValue(selectedItem.id.toString());
              await AsyncStorage.setItem('state', selectedItem.id.toString());
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.name;
            }}
            rowTextForSelection={(item, index) => {
              return item.name;
            }}
          />

          <DropdownMenu
            title="District"
            star="*"
            isDisable={districts?.length == 0 ? true : false}

            data={districts}
            onSelect={async (selectedItem, index) => {
              callTalukaAPI(selectedItem.id);
              console.log(selectedItem, index);
              setDistrictValue(selectedItem.id.toString());
              await AsyncStorage.setItem(
                'district',
                selectedItem.id.toString(),
              );
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.name;
            }}
            rowTextForSelection={(item, index) => {
              return item.name;
            }}
          />
          <DropdownMenu
            title="Taluka"
            star="*"
            isDisable={taluka?.length == 0 ? true : false}
            data={taluka}
            onSelect={async (selectedItem, index) => {
              callVillageAPI(selectedItem.id);
              setTalukaValue(selectedItem.id.toString());
              console.log(selectedItem, index);
              await AsyncStorage.setItem('taluka', selectedItem.id.toString());
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.name;
            }}
            rowTextForSelection={(item, index) => {
              return item.name;
            }}
          />
          <DropdownMenu
            title="Village"
            star="*"
            isDisable={village?.length == 0 ? true : false}

            data={village}
            onSelect={async (selectedItem, index) => {
              console.log(selectedItem, index);
              setVillageValue(selectedItem.id.toString());
              await AsyncStorage.setItem('village', selectedItem.id.toString());
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.name;
            }}
            rowTextForSelection={(item, index) => {
              return item.name;
            }}
          />
          <DropdownMenu
            title="Call Purpose"
            // star="*"
            data={callPurpose}
            onSelect={async (selectedItem, index) => {
              console.log(selectedItem, index);
              setCallPurposeValue(selectedItem.id.toString());
              
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.name;
            }}
            rowTextForSelection={(item, index) => {
              return item.name;
            }}
          />
          <CustomButton title="Next"
            onPress={isValid}

          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    // paddingStart:30,
    // paddingEnd:30,
    // paddingTop:30,
    // paddingBottom:30
    padding: 30,
    // backgroundColor:"#000"
  },
  button: {
    height: 50,
    backgroundColor: '#884D2B',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  view: {
    flexDirection: 'row'
  },
  dropdown: {
    width: '100%',
    padding: 10,
    backgroundColor: '#F4F8FB',
    borderRadius: 10,
    // color: '#F4F8FB',
    color: '#78789D',

    // textDecorationColor:'#78789D'
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#78789D'
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: Fonts.SF_Pro_Text_Medium,
    color: '#000',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#78789D'
  },
  selectedStyle: {
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 1,
    padding: 3,
    backgroundColor: '#F4F8FB',
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
    fontFamily: Fonts.SF_Pro_Text_Medium,
    marginTop: 15,
    // fontWeight:400
  },
});
