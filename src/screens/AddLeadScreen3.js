import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Fonts from '../components/themes/Fonts';
import Headers from '../components/header';
import * as Progress from 'react-native-progress';
import TextInputComponent from '../components/textInputComponent';
import DropdownMenu from '../components/dropdown';
import CustomButton from '../components/customButton';
import axios from 'axios';
import CustomCheckbox from '../components/customCheckbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MultiSelect } from 'react-native-element-dropdown';
import Icons from '../components/themes/icons';

export default function AddLeadScreen3({ navigation }) {
  const [agroNameText, onAgroNameChangedText] = useState('');
  const [placeText, onPlaceNameChangedText] = useState('');
  const [descriptionText, onDescriptionChangedText] = useState('');
  const [landText, onLandChangedText] = useState('');
  const [tags, setTagsData] = useState([]);
  const [tagsValue, setTagsValue] = useState([]);
  const [kharifCheckBox, setKharifCheckBox] = useState(false);
  const [rabiCheckBox, setRabiCheckBox] = useState(false);
  const [summerCheckBox, setSummerCheckBox] = useState(false);

  useEffect(() => {
    callTagsApi();
  }, []);

  const callTagsApi = () => {
    let data = '';

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://kartavya.metizcrm.com/api/tags',
      headers: {},
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        setTagsData(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const doneBtnPress = async () => {
    const cropList = [];
    if (kharifCheckBox) {
      cropList.push('kharif');
    }
    if (rabiCheckBox) {
      cropList.push('rabi');
    }
    if (summerCheckBox) {
      cropList.push('summer');
    }

    await AsyncStorage.setItem('agroName', agroNameText);
    await AsyncStorage.setItem('place', placeText);
    await AsyncStorage.setItem('description', descriptionText);
    await AsyncStorage.setItem('land', landText);
    await AsyncStorage.setItem('cropSown', JSON.stringify(cropList));
    await AsyncStorage.setItem('tags', JSON.stringify(tagsValue));
    // const value = await AsyncStorage.getItem('productCategory')
    // console.log('productCategoryyy screen 3===>', JSON.parse(value));


    if (isValid()) {
      addToLeadApiCall();
    }
  };

  const isValid = () => {
    // if (!agroNameText.trim()) {
    //   Alert.alert('Please enter Agro name.');
    //   return false;
    // }
    // if (!placeText.trim()) {
    //   Alert.alert('Please enter place.');
    //   return false;
    // }
    // if (tagsValue.length == 0) {
    //   Alert.alert('Please select any one of tag.');
    //   return false;
    // }
    // if (!descriptionText.trim()) {
    //   Alert.alert('Please enter discription.');
    //   return false;
    // } 
    if (!landText.trim()) {
      Alert.alert('Please enter land area.');
      return false;
    } 
    
    else {
      return true;
    }
  };

  const addToLeadApiCall = async () => {
    const value = await AsyncStorage.getItem('productCategory')
    console.log('productCategoryyy screen 3===>', JSON.parse(value));
    const Productvalue = await AsyncStorage.getItem('productName')
    const callPurpose  = await AsyncStorage.getItem('callPurpose')
    console.log('product name  screen 3===>', JSON.parse(Productvalue)); 
    console.log('callPurpose===>', callPurpose);

    let data = JSON.stringify({
      status_id: parseInt(await AsyncStorage.getItem('leadStatus')),
      source_id: parseInt(await AsyncStorage.getItem('source')),
      assign_to: parseInt(await AsyncStorage.getItem('member')),
      farmer_name: await AsyncStorage.getItem('farmer'),
      mobile: await AsyncStorage.getItem('phone'),
      country: parseInt(await AsyncStorage.getItem('country')),
      state: parseInt(await AsyncStorage.getItem('state')),
      district: parseInt(await AsyncStorage.getItem('district')),
      taluka: parseInt(await AsyncStorage.getItem('taluka')),
      village: parseInt(await AsyncStorage.getItem('village')),
      call_purpose: parseInt(await AsyncStorage.getItem('callPurpose')),
      product_category: JSON.parse(value),
      product_name: JSON.parse(Productvalue),
      // product_name: parseInt(await AsyncStorage.getItem('productName')),
      no_of_packets_buying: await AsyncStorage.getItem('packets'),
      agro_name: await AsyncStorage.getItem('agroName'),
      agro_place: await AsyncStorage.getItem('place'),
      crop_sown: JSON.parse(await AsyncStorage.getItem('cropSown')),
      total_land_area: parseInt(await AsyncStorage.getItem('land')),
      description: await AsyncStorage.getItem('description'),
      tags: JSON.parse(await AsyncStorage.getItem('tags')),
      farmers_crop_sown: JSON.parse(await AsyncStorage.getItem('cropFarmer')),

    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://kartavya.metizcrm.com/api/insertleads',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    console.log('add lead api config is : ' + config.data);
    axios  .request(config)
      .then(response => {
        console.log('response=====>', JSON.stringify(response.data));

          AsyncStorage.setItem('farmer', "");
         AsyncStorage.setItem('phone', "");
       AsyncStorage.setItem('country', "");
       AsyncStorage.setItem('state', "");
       AsyncStorage.setItem(
        'district',
        ""
      );
       AsyncStorage.setItem('taluka', "");
       AsyncStorage.setItem('village', "");
       AsyncStorage.setItem(
        'callPurpose',
        "",
      );
       AsyncStorage.setItem('packets', "");
     AsyncStorage.setItem('cropFarmer', "");
     AsyncStorage.setItem('source', "");
     AsyncStorage.setItem(
      'leadStatus',
      "",
    );
     AsyncStorage.setItem(
      'productCategory',
      "");
       AsyncStorage.setItem('member', "");
       AsyncStorage.setItem('agroName', "");
       AsyncStorage.setItem('place', "");
       AsyncStorage.setItem('description', "");
       AsyncStorage.setItem('land', "");
       AsyncStorage.setItem('cropSown', "");
       AsyncStorage.setItem('tags', "");














      
        if(response.data.status == 200)
        {
          navigation.replace('Done');

        }
        else
        {
          Alert.alert('Something went wrong please try again later.');
        }
        // AsyncStorage.setItem('productcategory', value);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const handleRabiChange = () => {
    setRabiCheckBox(!rabiCheckBox);
  };

  const handleKharifChange = () => {
    setKharifCheckBox(!kharifCheckBox);
  };

  const handleSummerChange = () => {
    setSummerCheckBox(!summerCheckBox);
  };

  return (
    <SafeAreaView style={Styles.container}>
      <Headers navigation={navigation} title="Add Lead" />
      <ScrollView>
        <View style={Styles.mainView}>
          <Progress.Bar
            progress={0.9}
            width={Dimensions.get('window').width - 55}
            color="#FFB03A"
            unfilledColor="#FBF8F7"
            height={10}
            borderRadius={50}
            borderColor="#FBF8F7"
            borderWidth={1}
          />
          <TextInputComponent
            title="Agro Name"
            // star="*"
            placeholderText="Enter here"
            text={agroNameText}
            onChangeText={onAgroNameChangedText}
          />
          <TextInputComponent
            title="Place"
            // star="*"
            placeholderText="Enter here"
            text={placeText}
            onChangeText={onPlaceNameChangedText}
          />
          <TextInputComponent
            title="Total land area (Acres)"
            star="*"
            placeholderText="Enter here"
            text={landText}
            inputMode={'numeric'}
            onChangeText={onLandChangedText}
          />
          <Text style={Styles.text}>Crop Sown Season</Text>
          <View style={{ flexDirection: 'row' }}>
            <CustomCheckbox
              title="Kharif"
              checked={kharifCheckBox}
              onChange={handleKharifChange}
            />
            <CustomCheckbox
              title="Rabi"
              checked={rabiCheckBox}
              onChange={handleRabiChange}
            />
            <CustomCheckbox
              title="Summer"
              checked={summerCheckBox}
              onChange={handleSummerChange}
            />
          </View>
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={Styles.text}>Tags</Text>
              {/* <Text style={Styles.text1}>*</Text> */}
            </View>
            <MultiSelect
              style={Styles.dropdown}
              placeholderStyle={Styles.placeholderStyle}
              selectedTextStyle={Styles.selectedTextStyle}
              inputSearchStyle={Styles.inputSearchStyle}
              itemTextStyle={Styles.selectedTextStyle}
              search
              data={tags}
              labelField="name"
              valueField="id"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={tagsValue}
              onChange={item => {
                setTagsValue(item);
              }}
              renderRightIcon={() => <Icons.ArrayDown />}
              selectedStyle={Styles.selectedStyle}
            />
          </View>
          <TextInputComponent
            title="Description"
            // star="*"
            placeholderText="Enter here"
            text={descriptionText}
            multiLine={true}
            numberOfLines={4}
            onChangeText={onDescriptionChangedText}
          />
          <CustomButton title="Done" onPress={doneBtnPress} />
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
    padding: 30,
  },
  button: {
    height: 50,
    backgroundColor: '#884D2B',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  btnView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  btnText: {
    fontSize: 16,
    fontFamily: Fonts.SF_Pro_Text_Medium,
    // fontWeight:400
  },
  nextBtn: {
    // flex:0.6,
    width: '70%',
    height: 50,
    backgroundColor: '#884D2B',
    marginLeft: 5,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtn: {
    // flex:0.4,
    height: 50,
    width: '30%',
    backgroundColor: 'transparent',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    marginRight: 5,
    justifyContent: 'center',
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
    fontFamily: Fonts.SF_Pro_Text_Medium,
    marginTop: 15,
    // fontWeight:400
  },
  checkboxView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdown: {
    width: '100%',
    padding: 10,
    backgroundColor: '#F4F8FB',
    borderRadius: 10,
    color: '#F4F8FB',
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
});
