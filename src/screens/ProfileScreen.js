import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Image,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Headers from '../components/header';
import Icons from '../components/themes/icons';
import Fonts from '../components/themes/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';


export default function ProfileScreen({ navigation }) {
  // var userData;
  const [userData, setUserData] = useState({});
  const [imagePath, setImagePath] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUserStoreData();
  }, []);

  const getUserStoreData = async () => {
    var userData = JSON.parse(await AsyncStorage.getItem('userData'));
    console.log('user data get from storage : ' + userData.image);
    setUserData(userData);
    setImagePath(userData.image);
    setFirstName(userData.first_name);
    setLastName(userData.last_name);
    setEmail(userData.email);
  };

  const openImagePicker = () => {
    Alert.alert('Select Image', 'Choose any one option:', [
      {
        text: 'Camera',
        onPress: () => openCamera(),
      },
      {
        text: 'Gallery',
        onPress: () => openGallery(),
      },
      {
        text: 'Remove Image',
        onPress: () => removeImage(),
        style: 'destructive',
      },
    ],
      {
        onDismiss: () => console.log('Alert dismissed without selecting any option'),
        cancelable: true,
      });
  };


  const logOutDialog = () => {
    Alert.alert('Alert', 'Are you sure want to logOut', [
      {
        text: 'No',
        onPress: () => { },
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          AsyncStorage.clear();
          navigation.replace('Login');
        },
      },
    ]);
  };



  const deleteAccountApiCall = () => {
    setIsLoading(true)
    let data = JSON.stringify({
      id: userData.id,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://kartavya.metizcrm.com/api/deleteuser',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        setIsLoading(false)
        console.log(JSON.stringify(response.data));
        AsyncStorage.clear();
        navigation.replace('Login');
      })
      .catch(error => {
        setIsLoading(false)
        console.log(error);
      });
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteAccountApiCall(),
        },
      ]
    );
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      //  cropping: true,
    }).then(image => {
      setImagePath(image.path);
      console.log('select image from camera  :' + image.path);
    });
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      // cropping: true,
    }).then(image => {
      setImagePath(image.path);
      console.log('image from gallery is :' + image.path);
    });
  };
  const removeImage = () => {
    setImagePath('');
    console.log('Image removed successfully');
  };


  const updateBtnPress = () => {
    setIsLoading(true)
    let data = new FormData();
    data.append('first_name', firstName);
    data.append('last_name', lastName);
    data.append('email', email);
    data.append('image', {
      uri: imagePath,
      name: 'image.jpg',
      type: 'image/jpeg',
    });
    data.append('id', userData.id);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://kartavya.metizcrm.com/api/update-profile',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    };
    console.log('profile data is :' + JSON.stringify(config.data));
    axios
      .request(config)
      .then(async response => {
        setIsLoading(false)
        console.log('in response ' + JSON.stringify(response.data));
        if (response.status == 200) {
          Alert.alert('Your Profile is updated.');

          await AsyncStorage.setItem(
            'userData',
            JSON.stringify(response.data.data),
          );
        }
      })
      .catch(error => {
        setIsLoading(false)
        console.log('in on error is :' + error);
      });
  };

  return (
    <SafeAreaView style={Styles.container}>
      <Headers navigation={navigation} title="Profile" />
      <View style={Styles.mainView}>
        <View style={Styles.rowView}>
          <TouchableWithoutFeedback onPress={() => openImagePicker()}>
            <View style={Styles.profileCircleView}>
              {imagePath ? (
                <Image
                  style={{ width: 50, height: 50 }}
                  source={{ uri: imagePath }}
                />
              ) : (
                <Icons.Profile />
              )}
            </View>
          </TouchableWithoutFeedback>

          <View style={Styles.profileNameView}>
            <View style={Styles.rowView}>
              <Text style={[Styles.text14]}>First Name : </Text>
              <TextInput
                style={[Styles.text16, { padding: 0 }]}
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            <View style={Styles.rowView}>
              <Text style={[Styles.text14]}>Last Name : </Text>
              <TextInput
                style={[Styles.text16, { padding: 0 }]}
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
            <TextInput
              style={[Styles.text16, { padding: 0 }]}
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>
        <PressableView
          title="About us"
          top={30}
          onPress={() => {
            navigation.navigate('About');
          }}
        />
        <PressableView
          title="Delete my Account"
          top={10}
          onPress={() => handleDeleteAccount()}
        />
        <PressableView
          title="Logout"
          top={10}
          logout={true}
          onPress={() => logOutDialog()}
        />
        <TouchableOpacity
          style={Styles.button}
          onPress={() => updateBtnPress()}>
          <Text style={Styles.loginText}>Update Profile</Text>
        </TouchableOpacity>
        {isLoading ?
          <View style={Styles.centeredView}>
            <ActivityIndicator size="large" color="#884D2B" animating={true} />
          </View>
          : null}

      </View>
    </SafeAreaView>
  );
}

const PressableView = props => {
  return (
    <Pressable
      style={[Styles.pressableView, { marginTop: props.top }]}
      onPress={props.onPress}>
      <View style={Styles.rowView}>
        {props.logout ? <Icons.LogOut /> : <Icons.AboutUs />}

        <Text style={[Styles.text14, { color: '#1D2348', marginLeft: 15 }]}>
          {props.title}
        </Text>
      </View>
    </Pressable>
  );
};

const Styles = StyleSheet.create({
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
  container: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    padding: 30,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileCircleView: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    backgroundColor: '#884D2B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileNameView: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  text16: {
    fontSize: 16,
    fontFamily: Fonts.SF_Pro_Text_Bold,
    color: '#1D2348',
  },
  text14: {
    fontSize: 14,
    fontFamily: Fonts.SF_Pro_Text_Bold,
    color: '#776C71',
  },
  pressableView: {
    padding: 15,
    backgroundColor: '#F4F8FB',
    borderRadius: 7,
  },
  button: {
    // marginHorizontal:40,
    height: 50,
    width: '50%',
    backgroundColor: '#884D2B',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 110,
  },
  loginText: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'SF-Pro-Text-Medium',
    // fontWeight:400
  },
});
