import { View, Text, SafeAreaView, Image } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AddLeadScreen from '../screens/AddLeadScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#884D2B',
        tabBarInactiveTintColor: "#413E49",
        tabBarStyle: {
          backgroundColor: '#FFF6EF',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingBottom: 5,
          paddingTop: 10,
          height: 60,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: tabInfo =>
            tabInfo.focused ? (
              <Image source={require('../../assets/images/home_fill.png')} style={{ width: 34, height: 34 }} />
            ) : (
              <Image source={require('../../assets/images/home.png')} style={{ width: 34, height: 34 }} />
            ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddLeadScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Add',
          tabBarIcon: tabInfo =>
            tabInfo.focused ? (
              <Image source={require('../../assets/images/add_fill.png')} style={{ width: 34, height: 34 }} />
            ) : (
              <Image source={require('../../assets/images/add.png')} style={{ width: 34, height: 34 }} />
            ),
          unmountOnBlur: true
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: tabInfo =>
            tabInfo.focused ? (
              <Image source={require('../../assets/images/profile_fill.png')} style={{ width: 34, height: 34 }} />
            ) : (
              <Image source={require('../../assets/images/profile.png')} style={{ width: 34, height: 34 }} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function BottomTabBar() {
  return (
    // <SafeAreaView>
    // {/* <NavigationContainer> */}
    <MyTabs />
    // {/* </NavigationContainer> */}
    // </SafeAreaView>
  );
}
