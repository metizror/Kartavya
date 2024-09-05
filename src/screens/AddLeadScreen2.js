import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Headers from '../components/header';
import * as Progress from 'react-native-progress';
import DropdownMenu from '../components/dropdown';
import TextInputComponent from '../components/textInputComponent';
import Fonts from '../components/themes/Fonts';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MultiSelect} from 'react-native-element-dropdown';
import Icons from '../components/themes/icons';

export default function AddLeadScreen2({navigation}) {
  const [packetsText, onPacketsChangeText] = useState('');
  const [source, setSourceData] = useState([]);
  const [leadStatus, setLeadStatusData] = useState([]);
  const [productCategory, setProductCategoryData] = useState([]);
  const [cropFarmer, setCropFarmerData] = useState([]);
  const [productName, setProductNameData] = useState([]);
  const [memberData, setMemberData] = useState([]);
  const [sourceValue, setSourceValue] = useState('');
  const [leadStatusValue, setLeadStatusValue] = useState('');
  const [productCategoryValue, setProductCategoryValue] = useState('');
  const [productNameValue, setProductNameValue] = useState('');
  const [memberDataValue, setMemberDataValue] = useState('');
  const [selectedCropFarmerValues, setSelectedCropFarmerValues] = useState([]);

  // const [selectedProductCategoryValues, setSelectedProductCategoryValues] = useState([]);
  // const [selectedProductNameValues, setSelectedProducNameValues] = useState([]);
  // console.log('productName====>>>>', productName);
  // console.log('productNameValueeeee=======>', productNameValue);
  // console.log('productCategoryValue====>>>>', productCategoryValue);
  // console.log('selectedProductNameValues===>>>>', selectedProductNameValues);

  useEffect(() => {
    callSourceApi();
    callLeadStatusApi();
    callProductCategoryApi();
    callMemberApi();
    callProductNameApi();
  }, []);

  const doneBtnPress = async () => {
    await AsyncStorage.setItem('packets', packetsText);
    await AsyncStorage.setItem(
      'cropFarmer',
      JSON.stringify(selectedCropFarmerValues),
    );
    await AsyncStorage.setItem(
      'productCategory',
      JSON.stringify(productCategoryValue),
    );

    await AsyncStorage.setItem('productName', JSON.stringify(productNameValue));


    if (isValid()) {
      navigation.navigate('AddLead3');
    }
  };

  const isValid = () => {
    if (!sourceValue.trim()) {
      Alert.alert('Please select source.');
      return false;
    }
    if (!leadStatusValue.trim()) {
      Alert.alert('Please select lead status.');
      return false;
    }
    if (productCategoryValue.length == 0) {
      Alert.alert('Please select Crop category.');
      return false;
    }
    // if (productNameValue.length == 0) {
    //   Alert.alert('Please select product name.');
    //   return false;
    // }
    if (selectedCropFarmerValues.length == 0) {
      Alert.alert('Please select any Crop Sown by Farmers');
      return false;
    }
    // if (!packetsText.trim()) {
    //   Alert.alert('Please enter number of packets.');
    //   return false;
    // }
    if (!memberDataValue.trim()) {
      Alert.alert('Please select member.');
      return false;
    }
    else {
      return true;
    }
  };

  const callSourceApi = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://kartavya.metizcrm.com/api/leadsources',
      headers: {},
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        setSourceData(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const callLeadStatusApi = () => {
    let data = '';

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://kartavya.metizcrm.com/api/leadstatuses',
      headers: {},
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        // console.log('callLeadStatusApi====>>>>', JSON.stringify(response.data));
        setLeadStatusData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const callProductCategoryApi = () => {
    let data = '';

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://kartavya.metizcrm.com/api/productcategories',
      headers: {},
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        // console.log(JSON.stringify(response.data));
        setProductCategoryData(response.data.data);
        setCropFarmerData(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const callMemberApi = () => {
    let data = '';

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://kartavya.metizcrm.com/api/members',
      headers: {},
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        setMemberData(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const callProductNameApi = item => {
    let data = '';
    // console.log('selected prduct category is' + item);
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://kartavya.metizcrm.com/api/productnames/' + item,
      headers: {},
      data: data,
    };
    // console.log('url', url);
    // console.log('PRODUCT NAME CONFIG IS  : ' + JSON.stringify(config));
    axios
      .request(config)
      .then(response => {
        // console.log('productNameValue=======>', JSON.stringify(response.data));
        setProductNameData(response.data.name);
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
            progress={0.6}
            width={Dimensions.get('window').width - 55}
            color="#FFB03A"
            unfilledColor="#FBF8F7"
            height={10}
            borderRadius={50}
            borderColor="#FBF8F7"
            borderWidth={1}
          />
          <DropdownMenu
            title="Source"
            star="*"
            data={source}
            onSelect={async (selectedItem, index) => {
              console.log(selectedItem, index);
              setSourceValue(selectedItem.id.toString());
              await AsyncStorage.setItem('source', selectedItem.id.toString());
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.name;
            }}
            rowTextForSelection={(item, index) => {
              return item.name;
            }}
          />
          <DropdownMenu
            title="Status"
            star="*"
            data={leadStatus}
            onSelect={async (selectedItem, index) => {
              console.log(selectedItem, index);
              setLeadStatusValue(selectedItem.id.toString());
              await AsyncStorage.setItem(
                'leadStatus',
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
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text style={Styles.text}>Crop Category</Text>
              <Text style={Styles.text1}>*</Text>
            </View>
            <MultiSelect
              style={Styles.dropdown}
              placeholderStyle={Styles.placeholderStyle}
              selectedTextStyle={Styles.selectedTextStyle}
              inputSearchStyle={Styles.inputSearchStyle}
              itemTextStyle={Styles.selectedTextStyle}
              search
              data={productCategory}
              labelField="name"
              valueField="id"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={productCategoryValue}
              onChange={async item => {
                setProductCategoryValue(item);
                callProductNameApi(item);
                // await AsyncStorage.setItem(
                //   'productCategory',
                //   JSON.stringify(item));
              }}
              renderRightIcon={() => <Icons.ArrayDown />}
              selectedStyle={Styles.selectedStyle}
            />
          </View>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text style={Styles.text}>Product Name</Text>
              {/* <Text style={Styles.text1}>*</Text> */}
            </View>
            <MultiSelect
              style={Styles.dropdown}
              placeholderStyle={Styles.placeholderStyle}
              selectedTextStyle={Styles.selectedTextStyle}
              inputSearchStyle={Styles.inputSearchStyle}
              itemTextStyle={Styles.selectedTextStyle}
              search
              data={productName}
              labelField="title"
              valueField="id"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={productNameValue}
              onChange={async item => {
                setProductNameValue(item);

                //  console.log('selected Product NameValue===>', item);
              }}
              renderRightIcon={() => <Icons.ArrayDown />}
              selectedStyle={Styles.selectedStyle}
            />
          </View>

          <View>
            <View style={{flexDirection: 'row'}}>
              <Text style={Styles.text}>Crop Sown by Farmers</Text>
              <Text style={Styles.text1}>*</Text>
            </View>
            <MultiSelect
              style={Styles.dropdown}
              placeholderStyle={Styles.placeholderStyle}
              selectedTextStyle={Styles.selectedTextStyle}
              inputSearchStyle={Styles.inputSearchStyle}
              itemTextStyle={Styles.selectedTextStyle}
              search
              data={cropFarmer}
              labelField="name"
              valueField="id"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={selectedCropFarmerValues}
              onChange={item => {
                setSelectedCropFarmerValues(item);
              }}
              renderRightIcon={() => <Icons.ArrayDown />}
              selectedStyle={Styles.selectedStyle}
            />
          </View>

          <TextInputComponent
            title="No. of packets buying"
            // star="*"
            placeholderText="Enter here"
            text={packetsText}
            inputMode={'numeric'}
            onChangeText={onPacketsChangeText}
          />
          <DropdownMenu
            title="Member"
            star="*"
            data={memberData}
            onSelect={async (selectedItem, index) => {
              console.log(selectedItem, index);
              setMemberDataValue(selectedItem.id.toString());
              await AsyncStorage.setItem('member', selectedItem.id.toString());
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.full_name;
            }}
            rowTextForSelection={(item, index) => {
              return item.full_name;
            }}
          />
          <View style={Styles.btnView}>
            <TouchableOpacity
              style={Styles.backBtn}
              onPress={() => {
                navigation.navigate('Add');
              }}>
              <Text style={[Styles.btnText, {color: '#7B797E'}]}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.nextBtn} onPress={doneBtnPress}>
              <Text style={[Styles.btnText, {color: '#ffffff'}]}>Next</Text>
            </TouchableOpacity>
          </View>
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
    color: '#78789D',
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: Fonts.SF_Pro_Text_Medium,
    color: '#000',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#78789D',
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
  selectedStyle: {
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 1,
    padding: 3,
    backgroundColor: '#F4F8FB',
  },
});
