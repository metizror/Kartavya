import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import BottomTabBar from './src/route/BottomTabBar';
import AddLeadScreen2 from './src/screens/AddLeadScreen2';
import AddLeadScreen3 from './src/screens/AddLeadScreen3';
import DetailsScreen from './src/screens/DetailsScreen';
import DoneScreen from './src/screens/DoneScreen';
import EditLeadScreen from './src/screens/EditLeadScreen';
import InternetConnectionAlert from './src/internetconnection/lib/InternetConnectionAlert';
import AboutScreen from './src/screens/AboutScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <InternetConnectionAlert>
    <NavigationContainer>
      <StatusBar backgroundColor="#884D2B" />
<Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomTabBar"
          component={BottomTabBar}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddLead2"
          component={AddLeadScreen2}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="AddLead3"
          component={AddLeadScreen3}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="Detail"
          component={DetailsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Done"
          component={DoneScreen}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="Edit"
          component={EditLeadScreen}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name="ForgotPsw"
          component={ForgotPasswordScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </InternetConnectionAlert>
  );
};

export default App;
