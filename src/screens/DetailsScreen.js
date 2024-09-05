import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Headers from '../components/header';
import Fonts from '../components/themes/Fonts';
import Icons from '../components/themes/icons';
import axios from 'axios';

export default function DetailsScreen({ navigation, route }) {
  console.log(route);
  const { item = {} } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  // const [agroNameText, onAgroNameChangeText] = useState(item.agro_name);
  // const [placeText, onPlaceChangeText] = useState(item.agro_place);
  // const [farmerText, onFarmerNameChangeText] = useState(item.farmer_name);
  // const [tagsText, onTagsChangeText] = useState('');
  // const [phoneText, onPhoneChangeText] = useState(item.mobile);
  // const [packetsText, onPacketsChangeText] = useState(
  //   item.no_of_packets_buying,
  // );
  // const [descriptionText, onDescriptionChangeText] = useState(
  //   item.description.replace(/<(?:.|\n)*?>/gm, ''),
  // );
  // var tagArray = [];
  // var farmerCropArray = [];
  // const paramKey = route.params.paramKey;

  // useEffect(() => {

  // }, [])

  const dialCall = () => {
    if (Platform.OS === 'android') {
      phoneNumber = 'tel:$'.concat(item.mobile);
    } else {
      phoneNumber = 'telprompt:$'.concat(item.mobile);
    }
    Linking.openURL(phoneNumber);
  };

  const deleteLeadCall = () => {
    showDeleteConfirmation();
  };

  const showDeleteConfirmation = () => {
    Alert.alert(
      'Are you sure?',
      'Do you want to delete this item?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => handleDeleteConfirmed(),
        },
      ],
      { cancelable: true }
    );
  };

  const handleDeleteConfirmed = () => {
    setIsLoading(true);

    let data = JSON.stringify({
      id: item.id,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://kartavya.metizcrm.com/api/deletelead',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setIsLoading(false);
        console.log(JSON.stringify(response.data));
        navigation.navigate('Home');
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={Styles.container}>
      <Headers navigation={navigation} title="Detail" />
      <View style={Styles.mainView}>
        <Text style={Styles.headerText}>{item.farmer_name}</Text>
        <View style={Styles.flatItemMiddleView}>
          <View style={Styles.subView1}>
            <Text style={[Styles.brownSubText, { color: '#884D2B' }]}>
              Pulse crop
            </Text>
            <Text style={[Styles.brownSubText, { color: '#00AFEF' }]}>
              {item?.crop_sown}
            </Text>
          </View>
          <View
            style={{
              borderLeftWidth: 0.5,
              height: '100%',
              backgroundColor: '#D7D7D7',
            }}></View>

          <View style={Styles.subView2}>
            <Text style={[Styles.brownSubText, { flex: 0, color: '#884D2B' }]}>Packets</Text>
            <Text style={[Styles.brownSubText, { flex: 0, padding: 0, color: '#884D2B' }]}>
              {item.no_of_packets_buying}
            </Text>
          </View>
        </View>
        <View style={Styles.locationView}>
          <Icons.Location />
          <Text style={Styles.locationText}>
            {/* Thaltej gam, Ahmedabad, Ahmedabad */}
            {item.statename?.name + ',  ' + item.districtname?.name + ',  ' + item.talukaname?.name + ', ' +item.villagename?.name}
            {/* {item.state.name + ',  ' + item.district.name + ',  ' + item.taluka.name + ', ' + item.village.name} */}
          </Text>
        </View>

        <View style={Styles.locationView}>
          <Icons.Phone style={{ flex: 1 }} />
          <Text style={[Styles.locationText, { flex: 1, marginRight: 20 }]}>
            {item.mobile}
          </Text>
          <View>
            <TouchableOpacity onPress={dialCall} style={{ flex: 0 }}>
              <View style={Styles.callView}>
                <Text
                  style={[
                    Styles.locationText,
                    { flex: 1, color: '#fff', textAlignVertical: 'center' },
                  ]}>
                  Call
                </Text>
              </View>
              <View style={Styles.circleView}>
                <Icons.PhoneWhite />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: 2,
            marginTop: 15,
            backgroundColor: '#D7D7D7',
          }}></View>
        <View
          onStartShouldSetResponder={() => {
            Alert('view clicked');
          }}
          style={[Styles.flatItemMiddleView, { backgroundColor: 'transparent' }]}>
          <View style={Styles.subView1}>
            <Text style={[Styles.locationText, { marginLeft: 0 }]}>
              Call Purpose
            </Text>
            <Text
              style={[Styles.locationText, { color: '#413E49', marginLeft: 0 }]}>
              {item.call_purpose?.name}
            </Text>
          </View>
          <View style={Styles.subView2}>
            <Text style={[Styles.locationText, { marginLeft: 0 }]}>Packets</Text>
            <Text style={[Styles.locationText, { color: '#413E49', marginLeft: 0 }]}>{item.no_of_packets_buying}</Text>
          </View>
          <View style={Styles.newView}>
            <Text
              style={[
                Styles.locationText,
                { flex: 1, color: '#fff', textAlignVertical: 'center' },
              ]}>
              New
            </Text>
          </View>
        </View>
        <View
          style={{
            height: 2,
            marginTop: 15,
            backgroundColor: '#D7D7D7',
          }}></View>
        <Text style={Styles.agroText}>Agro Details</Text>
        <RowView title="Agro Name" value={item.agro_name} />
        <RowView title="Place" value={item.agro_place} />
        <RowView
          title="Tags"
          value={item.tags.map(item => insert(item.name, '#', 0)).join(', ')}
        />
        <Text
          style={[
            Styles.valueText,
            { marginTop: 10, flex: 0, textAlign: 'left' },
          ]}>
          Description
        </Text>
        <Text style={[Styles.locationText, { marginLeft: 0 }]}>
          {item.description?.replace(/<(?:.|\n)*?>/gm, '')}
        </Text>
        <View style={Styles.btnView}>
          <TouchableOpacity
            style={Styles.button}
            onPress={() => {
              navigation.navigate('Edit', { item: item });
            }}>
            <Text style={Styles.btnText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.deleteBtn} onPress={() => deleteLeadCall()
          }>
            <Text style={[Styles.btnText, { color: '#FFB03A' }]}>Delete</Text>
          </TouchableOpacity>

        </View>
        {isLoading ?
          <View style={Styles.centeredView}>
            <ActivityIndicator size="large" color="#884D2B" animating={true} />
          </View>
          : null}
      </View>
    </SafeAreaView>
  );
}

function insert(str, value, index) {
  return str.substr(0, index) + value + str.substr(index);
}

const RowView = props => {
  return (
    <View style={Styles.locationView}>
      <Text style={[Styles.locationText, { flex: 2, marginLeft: 0 }]}>
        {props.title}
      </Text>
      <Text style={Styles.valueText}>{props.value}</Text>
    </View>
  );
};

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
    padding: 30,
  },
  headerText: {
    fontSize: 24,
    fontFamily: Fonts.SF_Pro_Text_Bold,
    color: '#000000',
  },
  flatItemMiddleView: {
    height: 55,
    flexDirection: 'row',
    padding: 10,
    marginTop: 10,
    // borderRadius:22,
    // marginLeft:8,
    backgroundColor: '#FFF6EF',
    // padding:15
  },
  brownSubText: {
    fontSize: 14,
    fontFamily: Fonts.SF_Pro_Text_Bol
  },
  subView1: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  subView2: {
    paddingLeft: 10,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  locationView: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    fontFamily: Fonts.SF_Pro_Text_Medium,
    color: '#7B797E',
    marginLeft: 5,
  },
  phoneCallView: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  circleView: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: '#884D2B',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -20,
    marginTop: -6,
    ...StyleSheet.absoluteFillObject,
  },
  callView: {
    width: 70,
    height: 30,
    backgroundColor: '#FFB03A',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
  },
  newView: {
    // flex:1,
    width: 75,
    height: 30,
    backgroundColor: '#B4D342',
    borderRadius: 50,
    alignItems: 'center',
    alignSelf: 'center',
  },
  callPurposeView: {
    marginTop: 10,
  },
  agroText: {
    fontSize: 16,
    fontFamily: Fonts.SF_Pro_Text_Bold,
    marginTop: 15,
    color: '#413E49',
  },
  valueText: {
    fontSize: 12,
    fontFamily: Fonts.SF_Pro_Text_Bold,
    color: '#413E49',
    flex: 2,
    textAlign: 'right',
    padding: 0,
  },
  btnView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  button: {
    height: 50,
    backgroundColor: '#884D2B',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 8,
  },
  deleteBtn: {
    height: 50,
    backgroundColor: 'transparent',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#FFB03A',
  },
  btnText: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: Fonts.SF_Pro_Text_Medium,

    // fontWeight:400
  },
});
