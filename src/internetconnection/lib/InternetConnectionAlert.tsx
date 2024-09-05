import * as React from "react";
import { Text, View,Image } from "react-native";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import DropdownAlert from "react-native-dropdownalert";
/**
 * ? Local Imports
 */
import styles from "./InternetConnectionAlert.style";
//const InfoIcon = require('../../../assets/Header/no-signal.png');
type DropdownAlertType = "info" | "warn" | "error" | "custom" | "success";

interface IProps {
  type: DropdownAlertType;
  title: string;
  message: string;
  payload?: object;
  interval?: number;
  onChange: (state: NetInfoState) => void;
}

interface IState {}

export default class InternetConnectionAlert extends React.Component<
  IProps,
  IState
> {
  dropDownAlertRef: any;

  componentDidMount() {
    this.listenIsInternetAvailable();
  }

  listenIsInternetAvailable = () => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      const { isConnected } = state;
      this.props.onChange && this.props.onChange(state);
      this.showAlert(isConnected);
    });
    return () => {
      unsubscribe();
    };
  };
  
  showAlert = (isConnected: boolean) => {
    if (!isConnected) {
      const {
        type = "custom",
        title = "",
        message = "You are offline. Please check your internet connection",
       // payload = {source: InfoIcon},
        payload,
        interval,
      } = this.props;
      this.dropDownAlertRef.alertWithType(
        type,
        title,
        message,
        payload,
        interval,
      );
    } else {
      this.dropDownAlertRef.closeAction();
    }
  };

  renderAlert = () => {
    return (
      <View style={{  
      position: "absolute",
     // bottom: 70,
      width: "100%",
      top: 50,
      flexDirection: "row",
     }}>
      
      <DropdownAlert 
      containerStyle={{ backgroundColor: '#272c3f' }}
       messageStyle={{ color: 'white',textAlign: 'center' }} 
        ref={(ref) => (this.dropDownAlertRef = ref)}
        tapToCloseEnabled={false}
        panResponderEnabled={false}
        closeInterval={0} // ? Cancel auto close
        {...this.props}
      />
      {/* <Text>hi</Text> */}
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.children}
        {this.renderAlert()}
      </View>
    );
  }
}
