import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Font from '../theme/Font';
import InterOtp from '../login/ways/InterOtp';
import ThroughOtp from '../login/ways/ThroughOtp';
import LoginPassword from '../login/ways/LoginPassword';
import ForgotPassword from '../login/ways/ForgotPassword';
import ChangePassword from '../login/ways/ChangePassword';
import ResetPassword from '../login/ways/ResetPassword';
import SignUp from '../login/ways/SignUp';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import FSize from '../theme/FSize';
import {
  getFocusedRouteNameFromRoute,
  useIsFocused,
} from '@react-navigation/native';
import TabNavigation from './TabNavigation';
import {Lang} from '../translation/lang';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={LoginPassword}>
      <Stack.Screen name="LoginPassword" component={LoginPassword} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />

      {/* <Stack.Screen name="TabNavigation" component={TabNavigation} /> */}
      {/* <Stack.Screen name="AccountOption" component={AccountOption} /> */}
    </Stack.Navigator>
  );
};

const OtpStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={ThroughOtp}>
      <Stack.Screen name="ThroughOtp" component={ThroughOtp} />
      <Stack.Screen name="InterOtp" component={InterOtp} />
    </Stack.Navigator>
  );
};

const AuthTopTabNavigation = () => {
  const IsFocused = useIsFocused();

  //------------- Language -------------\\

  const [ln, setLn] = useState('en');
  useEffect(() => {
    const setLang = async () => {
      setLn(await AsyncStorage.getItem('LanguageCode'));
    };
    setLang();
  });

  const TabBarOption = {
    tabBarPressColor: 'white',
    tabBarIndicatorStyle: {
      backgroundColor: 'rgba(13, 48, 104, 0.6)',
    },
    tabBarPressOpacity: 0,

    tabBarLabelStyle: {
      fontWeight: '600',
      fontSize: 17,
      fontFamily: Font.PoppinsRegular,
      textTransform: 'none',
    },

    tabBarActiveTintColor: 'darkblue',
    tabBarInactiveTintColor: 'gray',
    tabBarIndicatorStyle: {
      width: '35%',
      alignSelf: 'center',
      marginHorizontal: 30,
      justifyContent: 'center',
      borderRadius: 20,
      bottom: -1.5,
    },
    tabBarStyle: {
      marginHorizontal: 10,
      elevation: 0,
      width: '90%',
      alignSelf: 'center',
      borderBottomWidth: 0.5,
      backgroundColor: '#FFFAF6',
      borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    },
  };
  return (
    <View style={{flex: 1, backgroundColor: '#FFFAF6'}}>
      <Text
        style={{
          textAlign: 'center',
          color: 'rgba(13, 48, 104, 1)',
          fontFamily: Font.PoppinsSemiBold,
          marginTop: heightPercentageToDP(3),
          fontSize: FSize.fs20,
        }}>
        {Lang[ln].Auth['Login to Catch-Up Jobs']}
      </Text>
      <Tab.Navigator initialRouteName="LoginStack" screenOptions={TabBarOption}>
        <Tab.Screen
          name="Login"
          component={LoginStack}
          options={({route}) => ({
            tabBarLabel: Lang[ln].Auth['Login'],
            tabBarStyle: (route => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? '';
              if (routeName === 'SignUp') {
                return {display: 'none'};
              } else {
                return {display: 'flex'};
              }
              return;
            })(route),
          })}
        />
        <Tab.Screen
          name="Otp"
          component={OtpStack}
          options={({route}) => ({
            tabBarLabel: Lang[ln].Auth['Otp'],
            tabBarStyle: (route => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? '';
              if (routeName === 'SignUp') {
                return {display: 'none'};
              } else {
                return {display: 'flex'};
              }
              return;
            })(route),
          })}
        />
      </Tab.Navigator>
    </View>
  );
};
export default AuthTopTabNavigation;
