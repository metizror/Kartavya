import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  BackHandler,
  Alert
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Headers from '../components/header';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";



export default function HomeScreen({ navigation }) {
  const [isDataPresent, setDataStatus] = useState(false);
  const [isLoading, setLoadingStatus] = useState(true);
  const [leadListData, setLeadListData] = useState([]);
  const isFocused = useIsFocused();
  // console.log('leadListData====>>>>', leadListData);

  useEffect(() => {
    if (isFocused) {
      console.log("isFocused")
      callHomeApi();
    }
    // Subscribe

  }, [isFocused]);

  const focused = useIsFocused();
  console.log(focused);
  useEffect(() => {
    if (focused) {
      const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to exit app?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }
  }, [focused]);

  const callHomeApi = async () => {
    // leadListData=[];
    var userData = JSON.parse(await AsyncStorage.getItem('userData'))
    console.log('home id is :' + userData.id)


    let data = '';

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://kartavya.metizcrm.com/api/leadsdata/' + userData.id,
      // url: 'https://kartavya.metizcrm.com/api/leads',
      headers: {},
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        setLeadListData(response.data.data);
        console.log("home data length is : " + response.data.data.length)
        if (response.data.data.length != 0) {
          setDataStatus(true)
        }
        setLoadingStatus(false)
      })
      .catch(error => {
        console.log(error);
        setDataStatus(false)
        setLoadingStatus(false)
      });
  };

  return (
    <SafeAreaView style={Styles.container}>
      <Headers navigation={navigation} title="Home" />
      {/* {isLoading ? <ActivityIndicator style={{flex:1}}/> : <Text></Text>} */}
      {isLoading ?
        (<DataListView navigation={navigation} data={leadListData} isLoading={isLoading} onRefresh={callHomeApi} />)
        : (isDataPresent ? (
          <DataListView navigation={navigation} data={leadListData} isLoading={isLoading} onRefresh={callHomeApi} />
        ) : (
          <AddLeadView navigation={navigation} />
        ))}

    </SafeAreaView>
  );
}

const AddLeadView = props => {
  return (
    <View style={Styles.view}>
      <Image source={require('../../assets/images/no_data_found.png')}></Image>
      <Text style={Styles.text}>No Data Found !!</Text>
      <TouchableOpacity
        style={Styles.button}
        onPress={() => props.navigation.navigate('Add')}>
        <Text style={Styles.btnText}>Add Lead</Text>
      </TouchableOpacity>
    </View>
  );
};

const DataListView = props => {
  console.log(props.isLoading)
  return (
    <View style={{ flex: 1 }}>
      <Text style={Styles.topText}>Upcoming leads</Text>
      <FlatList
        data={props.data}
        refreshControl={
          <RefreshControl refreshing={props.isLoading} onRefresh={props.onRefresh} />
        }
        renderItem={({ item, index }) => (
          <FlatListItem
            item={item}
            index={index}
            navigation={props.navigation}
          />
        )}
      />
    </View>
  );
};


const FlatListItem = props => {
  return (
    <TouchableWithoutFeedback
      onPress={() => props.navigation.navigate('Detail', { item: props.item })}>
      <View style={Styles.flatItemView}>
        <View style={Styles.flatItemView1}>
          <Text style={Styles.nameText}>{props.item.farmer_name}</Text>
          <View style={Styles.flatItemMiddleView}>
            <View style={Styles.subView1}>
              <Text style={[Styles.brownSubText, { color: '#884D2B' }]}>
                Pulse crop
              </Text>
              <Text style={[Styles.brownSubText, { color: '#00AFEF' }]}>
                {props.item.crop_sown}
              </Text>
            </View>
            <View
              style={{
                // flex: 0.01,
                borderLeftWidth: 0.5,
                // width: 1,
                height: '100%',
                backgroundColor: '#D7D7D7',
              }}></View>

            <View style={Styles.subView2}>
              <Text style={Styles.brownSubText}>Packets</Text>
              <Text style={Styles.brownSubText}>{props.item.no_of_packets_buying}</Text>
            </View>
          </View>
          <View style={Styles.locationView}>
            <Image source={require('../../assets/images/map.png')}></Image>
            <Text style={Styles.locationText}>
              {/* Thaltej gam, Ahmedabad, Ahmedabad */}
              {props.item.statename?.name + ',  ' + props.item.districtname?.name + ',  ' + props.item.talukaname?.name + ', ' + props.item.villagename?.name}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};


const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    // marginTop: 60,
  },
  text: {
    fontSize: 25,
    color: '#000000',
    fontFamily: 'SF-Pro-Text-Bold',
    marginTop: 20,
    // fontWeight:400
  },
  button: {
    // width : Dimensions.get('window').width,
    height: 50,
    backgroundColor: '#884D2B',
    borderRadius: 15,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 120,
  },
  btnText: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'SF-Pro-Text-Medium',
  },
  topText: {
    marginLeft: 20,
    marginTop: 25,
    fontSize: 18,
    color: '#000000',
    fontFamily: 'SF-Pro-Text-Medium',
  },
  flatItemView: {
    // height: 145,
    borderRadius: 22,
    marginHorizontal: 20,
    marginVertical: 8,
    backgroundColor: '#FFB03A',
  },
  flatItemView1: {
    // height: 145,
    borderRadius: 22,
    marginLeft: 8,
    backgroundColor: '#FBF8F7',
    padding: 15,
  },
  nameText: {
    fontSize: 18,
    color: '#000000',
    fontFamily: 'SF-Pro-Text-Bold',
  },
  flatItemMiddleView: {
    height: 55,
    flexDirection: 'row',
    padding: 10,
    // borderRadius:22,
    // marginLeft:8,
    backgroundColor: '#FFFFFF',
    // padding:15
  },
  brownSubText: {
    fontSize: 14,
    fontFamily: 'SF-Pro-Text-Bold',
    color: '#884D2B',
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
    marginLeft: 5,
    marginTop: 5,
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    fontFamily: 'SF-Pro-Text-Medium',
    color: '#7B797E',
    marginLeft: 5,
  },
});
