import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigation from './TabNavigation';

import AuthTopTabNavigation from './AuthTopTabNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignUp from '../login/ways/SignUp';
//-----9--------

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  //============  LoginAccessToken  ===========\\
  const [initRoute, setInitRoute] = useState(null);

  const sessionInfo = async () => {
    // AsyncStorage.setItem('LanguageCode', 'en');
    AsyncStorage.getItem('LoginAccessToken').then(value => {
      console.log('LoginAccessToken', value);
      if (value !== null) {
        setInitRoute('TabNavigation');
      } else {
        setInitRoute('AuthTopTabNavigation');
      }
    });
  };
  
  useEffect(() => {
    sessionInfo();
    AsyncStorage.getItem('LanguageCode').then(lan => {
      if (lan == undefined) {
        AsyncStorage.setItem('LanguageCode', 'en');
      }
    });
  }, [initRoute]);

  const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );

  return (
    <View style={styles.container}>
      <MyStatusBar backgroundColor="#042458" barStyle="light-content" />
      {initRoute !== null ? (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initRoute}>

          <Stack.Screen name="AuthTopTabNavigation" component={AuthTopTabNavigation} />
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
          <Stack.Screen name="SignUp" component={SignUp} />

        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'TabNavigation'}>

          <Stack.Screen name="TabNavigation" component={TabNavigation} />
          <Stack.Screen name="SignUp" component={SignUp} />

        </Stack.Navigator>
      )}
    </View>
  );
};
export default StackNavigation;

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: '#042458',
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B',
  },
});
