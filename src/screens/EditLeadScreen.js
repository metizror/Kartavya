import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Headers from '../components/header';
import * as Progress from 'react-native-progress';
import TextInputComponent from '../components/textInputComponent';
import CustomButton from '../components/customButton';
import DropdownMenu from '../components/dropdown';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MultiSelect } from 'react-native-element-dropdown';
import Icons from '../components/themes/icons';
import Fonts from '../components/themes/Fonts';
import CustomCheckbox from '../components/customCheckbox';

export default function EditLeadScreen({ navigation, route }) {
  const { item = {} } = route.params;
  //  console.log("in edit lead screen" + JSON.stringify(route.params.item));
  var selectedFarmerCropArray = [];
  item.farmers_crop_sown.forEach(product => {
    selectedFarmerCropArray.push(product);
  });
  const [farmerText, onFarmerChangeText] = useState(item.farmer_name);
  const [phoneText, onPhoneChangeText] = useState(item.mobile);
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
  const [packetsText, onPacketsChangeText] = useState(item.no_of_packets_buying);
  const [source, setSourceData] = useState([]);
  const [leadStatus, setLeadStatusData] = useState([]);
  const [productCategory, setProductCategoryData] = useState([]);
  const [cropFarmer, setCropFarmerData] = useState([]);
  const [productName, setProductNameData] = useState([]);
  const [memberData, setMemberData] = useState([]);
  const [sourceValue, setSourceValue] = useState('');
  const [leadStatusValue, setLeadStatusValue] = useState('');
  // const [productCategoryValue, setProductCategoryValue] = useState('');
  // const [productNameValue, setProductNameValue] = useState('');
  const [memberDataValue, setMemberDataValue] = useState('');
  const [selectedCropFarmerValues, setSelectedCropFarmerValues] = useState([]);
  const [agroNameText, onAgroNameChangedText] = useState(item.agro_name);
  const [placeText, onPlaceNameChangedText] = useState(item.agro_place);
  const [descriptionText, onDescriptionChangedText] = useState(item.description);
  const [landText, onLandChangedText] = useState(item.total_land_area.toString());
  const [tags, setTagsData] = useState([]);
  const [tagsValue, setTagsValue] = useState([]);
  const [kharifCheckBox, setKharifCheckBox] = useState(item.crop_sown.includes("kharif") ? true : false);
  const [rabiCheckBox, setRabiCheckBox] = useState(item.crop_sown.includes("rabi") ? true : false);
  const [summerCheckBox, setSummerCheckBox] = useState(item.crop_sown.includes("summer") ? true : false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProductCategoryValues, setSelectedProductCategoryValues] = useState([]);
  const [selectedProductNameValues, setSelectedProducNameValues] = useState([]);
  // console.log('productName edit====>>>', productName);
  // console.log('states==>>', states);
  // console.log('stateValue===>', stateValue);
  // console.log('districts==>>', districts);
  // console.log('districtValue==>>', districtValue);

  const handleRabiChange = () => {
    setRabiCheckBox(!rabiCheckBox);
  };

  const handleKharifChange = () => {
    setKharifCheckBox(!kharifCheckBox);
  };

  const handleSummerChange = () => {
    setSummerCheckBox(!summerCheckBox);
  };

  useEffect(() => {
    getCountries();
    callStateAPI(item.country.id);
    callDistrictAPI(item.state.id);
    callTalukaAPI(item.district.id);
    callVillageAPI(item.taluka.id);
    callPurposeApi();
    callSourceApi();
    callLeadStatusApi();
    callProductCategoryApi();
    callMemberApi();
    callTagsApi();
    callProductNameApi();
  }, []);

  const doneBtnPress = async () => {
    await AsyncStorage.setItem('farmer', farmerText);
    await AsyncStorage.setItem('phone', phoneText);

    // if (isValid()) {
    //   navigation.navigate('AddLead2')

    editApiCall();
    // }
  };

  //   const isValid = () => {
  //     if (!farmerText.trim()) {
  //       Alert.alert('Please enter farmer name.');
  //       return false;
  //     }
  //     if (!phoneText.trim()) {
  //       Alert.alert('Please enter phone number.');
  //       return false;
  //     }
  //     if (!countryValue.trim()) {
  //       Alert.alert('Please select country.');
  //       return false;
  //     }
  //     if (!stateValue.trim()) {
  //       Alert.alert('Please select state.');
  //       return false;
  //     }
  //     if (!districtValue.trim()) {
  //       Alert.alert('Please select district.');
  //       return false;
  //     }
  //     if (!talukaValue.trim()) {
  //       Alert.alert('Please select taluka.');
  //       return false;
  //     }
  //     if (!villageValue.trim()) {
  //       Alert.alert('Please select village.');
  //       return false;
  //     }
  //     if (!callPurposeValue.trim()) {
  //       Alert.alert('Please select call purpose.');
  //       return false;
  //     }
  //     if (!sourceValue.trim()) {
  //       Alert.alert('Please select source.');
  //       return false;
  //     }
  //     if (!leadStatusValue.trim()) {
  //       Alert.alert('Please select lead status.');
  //       return false;
  //     }
  //     if (!productCategoryValue.trim()) {
  //       Alert.alert('Please select product category.');
  //       return false;
  //     }
  //     if (!productNameValue.trim()) {
  //       Alert.alert('Please select product name.');
  //       return false;
  //     }
  //     if (selectedCropFarmerValues?.length == 0) {
  //       Alert.alert('Please select any crop from list.');
  //       return false;
  //     }
  //     if (!packetsText.trim()) {
  //       Alert.alert('Please enter number of packets.');
  //       return false;
  //     }
  //     if (!memberDataValue.trim()) {
  //       Alert.alert('Please select member.');
  //       return false;
  //     }
  //     if (!agroNameText.trim()) {
  //       Alert.alert('Please enter Agro name.');
  //       return false;
  //     }
  //     if (!placeText.trim()) {
  //       Alert.alert('Please enter place.');
  //       return false;
  //     }
  //     if (tagsValue?.length == 0) {
  //       Alert.alert('Please select any one of tag.');
  //       return false;
  //     }
  //     if (!descriptionText.trim()) {
  //       Alert.alert('Please enter discription.');
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   };

  const editApiCall = async () => {
    setIsLoading(true)
    var tagArray = [];
    var farmerCropArray = [];
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

    item.tags.forEach(product => {
      tagArray.push(product.id);
    });
    item.farmers_crop_sown.forEach(product => {
      farmerCropArray.push(product.id);
    });

    // console.log(leadStatusValue?.length);
    // console.log(farmerCropArray);
    const value = await AsyncStorage.getItem('productCategory')
    console.log('productCategoryyy screen Edit===>', JSON.parse(value));
    const Productvalue = await AsyncStorage.getItem('productCategory')
    console.log('product name  screen 3===>', JSON.parse(Productvalue));
    let data = JSON.stringify({
      status_id: leadStatusValue?.length == 0 ? item.lead_status.id : parseInt(leadStatusValue),
      source_id: sourceValue?.length == 0 ? item.lead_source.id : parseInt(sourceValue),
      assign_to: memberDataValue?.length == 0 ? item.assigned_to.id : parseInt(memberDataValue),
      farmer_name: farmerText,
      mobile: phoneText,
      country: countryValue?.length == 0 ? item.country.id : parseInt(countryValue),
      state: stateValue?.length == 0 ? item.state.id : parseInt(stateValue),
      district: districtValue?.length == 0 ? item.district.id : parseInt(districtValue),
      taluka: talukaValue?.length == 0 ? item.taluka.id : parseInt(talukaValue),
      village: villageValue?.length == 0 ? item.village.id : parseInt(villageValue),
      call_purpose: callPurposeValue?.length == 0 ? item.call_purpose.id : parseInt(callPurposeValue),
      product_category: JSON.parse(value),
      // product_category: productCategoryValue?.length == 0 ? item.product_category : value,
      product_name: JSON.parse(Productvalue),
      // product_name: productNameValue?.length == 0 ? item.product_name.id : parseInt(productNameValue),
      no_of_packets_buying: packetsText,
      agro_name: agroNameText,
      agro_place: placeText,
      crop_sown: cropList,
      total_land_area: landText,
      description: descriptionText,
      tags: tagsValue?.length == 0 ? tagArray : tagsValue,
      farmers_crop_sown: selectedCropFarmerValues?.length == 0 ? farmerCropArray : selectedCropFarmerValues,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://kartavya.metizcrm.com/api/updatelead/'.concat(item.id),
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    console.log('UPDATE LEAD DATA IS :' + config.data);
    axios
      .request(config)
      .then(response => {
        setIsLoading(false)
        console.log(JSON.stringify(response.data));
        navigation.navigate('Home');
      })
      .catch(error => {
        setIsLoading(false)
        console.log(error);
      });
  };

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
        console.log(JSON.stringify(response.data));
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
        console.log(JSON.stringify(response.data));
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

  const callProductNameApi = (item) => {
    let data = '';
    console.log('selected prduct category item=====>>>>>>' + item);

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://kartavya.metizcrm.com/api/productnames/' + item,
      headers: {},
      data: data,
    };
    console.log('PRODUCT NAME CONFIG IS  : ' + JSON.stringify(config));
    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        setProductNameData(response.data.name);
      })
      .catch(error => {
        console.log(error);
      });
  };

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

  return (
    <SafeAreaView style={Styles.container}>
      <Headers navigation={navigation} title="Edit Lead" />
      <ScrollView>
        <View style={Styles.mainView}>
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
            onChangeText={onPhoneChangeText}
          />
          <DropdownMenu
            title="Country"
            star="*"
            data={countries}
            initialValue={item.country.name}
            onSelect={async (selectedItem, index) => {
              setCountryValue(selectedItem.id.toString());
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
            data={states}
            onSelect={async (selectedItem, index) => {
              console.log(selectedItem, index);
              callDistrictAPI(selectedItem.id);
              setStateValue(selectedItem.id.toString());
              // await AsyncStorage.setItem('state', selectedItem.id.toString());
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
            star="*"
            data={callPurpose}
            initialValue={item.call_purpose.name}
            onSelect={async (selectedItem, index) => {
              console.log(selectedItem, index);
              setCallPurposeValue(selectedItem.id.toString())
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.name;
            }}
            rowTextForSelection={(item, index) => {
              return item.name;
            }}
          />
          <DropdownMenu
            title="Source"
            star="*"
            data={source}
            initialValue={item.lead_source.name}
            onSelect={async (selectedItem, index) => {
              setSourceValue(selectedItem.id.toString());
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.name;
            }}
            rowTextForSelection={(item, index) => {
              return item.name;
            }}
          />
          <DropdownMenu
            title="Lead Status"
            star="*"
            data={leadStatus}
            initialValue={item.lead_status.name}
            onSelect={async (selectedItem, index) => {
              setLeadStatusValue(selectedItem.id.toString());

            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.name;
            }}
            rowTextForSelection={(item, index) => {
              return item.name;
            }}
          />
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={Styles.text}>Product Category</Text>
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
              value={selectedProductCategoryValues}
              onChange={async (item) => {
                setSelectedProductCategoryValues(item);
                // setProductCategoryValue(item)
                // setProductNameData();
                // console.log('selected product category is===>', item);
                callProductNameApi(item);
                await AsyncStorage.setItem(
                  'productCategory',
                  JSON.stringify(item));
              }}
              renderRightIcon={() => <Icons.ArrayDown />}
              selectedStyle={Styles.selectedStyle}
            />
          </View>

          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={Styles.text}>Product Name</Text>
              <Text style={Styles.text1}>*</Text>
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
              value={selectedProductNameValues}
              onChange={async item => {
                setSelectedProducNameValues(item);
                console.log('selected Product NameValue===>', item);
              }}
              renderRightIcon={() => <Icons.ArrayDown />}
              selectedStyle={Styles.selectedStyle}
            />
          </View>
          <View>
            <View style={{ flexDirection: 'row' }}>
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
            title="No. of packets"
            star="*"
            placeholderText="Enter here"
            text={packetsText}
            onChangeText={onPacketsChangeText}
          />
          <DropdownMenu
            title="Member"
            star="*"
            data={memberData}
            initialValue={item.assigned_to.first_name.concat(" " + item.assigned_to.last_name)}
            onSelect={async (selectedItem, index) => {
              console.log(selectedItem, index);
              setMemberDataValue(selectedItem.id.toString());
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.full_name;
            }}
            rowTextForSelection={(item, index) => {
              return item.full_name;
            }}
          />
          <TextInputComponent
            title="Agro Name"
            star="*"
            placeholderText="Enter here"
            text={agroNameText}
            onChangeText={onAgroNameChangedText}
          />
          <TextInputComponent
            title="Place"
            star="*"
            placeholderText="Enter here"
            text={placeText}
            onChangeText={onPlaceNameChangedText}
          />
          <TextInputComponent
            title="Total land area (Acres)"
            star="*"
            placeholderText="Enter here"
            text={landText}
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
              <Text style={Styles.text1}>*</Text>
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
            star="*"
            placeholderText="Enter here"
            text={descriptionText}
            multiLine={true}
            numberOfLines={4}
            onChangeText={onDescriptionChangedText}
          />
          <CustomButton title="Edit" onPress={doneBtnPress} />

        </View>
      </ScrollView>
      {isLoading ?
        <View style={Styles.centeredView}>
          <ActivityIndicator size="large" color="#884D2B" animating={true} />
        </View>
        : null}
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blur',
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
    color: '#F4F8FB',
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
  text: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'SF-Pro-Text-Medium',
    marginTop: 15,
    // fontWeight:400
  },
  checkboxView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
