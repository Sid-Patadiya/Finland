import React, { useState, useEffect, useMemo, useReducer, useCallback } from 'react';
import { View, ActivityIndicator, Platform, NativeModules } from 'react-native';

import StackNavigation from './source/route/StackNavigation';
import { useFocusEffect, useIsFocused, NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider, useDispatch } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import store from './source/redux/Store/store';
import * as RNFS from 'react-native-fs'
import Constant from './source/theme/Constant';

const Stack = createNativeStackNavigator();

const App = () => {

  const [isLoading, setIsLoading] = useState(true);

  // -----------------update application laguage----------------------
  const [languages, setLanguages] = useState([
    { language: 'English', code: 'en', selected: false },
    { language: 'Finnish', code: 'fi', selected: false },
  ]);
  const [ln, setLn] = useState('en');
  useEffect(() => {
    const setLang = async () => {
      setLn(await AsyncStorage.getItem('LanguageCode'));
    };
    setLang();
  });
  useEffect(() => {
    const onToggleSwitch = (indx, languageCode) => {
      let updateData = [...languages];
      const newState = updateData.map(obj => {
        if (obj.selected === true) {
          return { ...obj, selected: false };
        }
        return obj;
      });
      AsyncStorage.setItem('LanguageCode', languageCode);
      newState[indx].selected = !newState[indx].selected;
      setLanguages(newState);
      console.log('the toggle changed the language to', languageCode);
    };
    const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;
    console.log("device language is ::::::::", deviceLanguage);
    {
      let enArray = ["en", "en_au", "en_AU", "en_ca", "en_CA", "en_gb", "en_GB", "en_ie", "en_IE", "en_in", "en_IN", "en_sg", "en_SG", "en_us", "en_US", "en_za", "en_za"]
      if (enArray.includes(deviceLanguage)) {
        //function to define to set language english
        console.log('language got chnaged to english');
        onToggleSwitch(0, "en");
      }
      else if (deviceLanguage == "fi") {
        // function to define finnish language
        console.log('language got chnaged to finnish');
        onToggleSwitch(2, "fi");
      }
      else {
        // default will be english
        console.log('default language is english');
        onToggleSwitch(0, "en")
      }
    }
    // ------------------language ends here ------------------------


    // sessionInfo();
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 2000);
  }, []);

  // * * * * * * Read file and store data to local * * * * * * * * * 
  useEffect(() => {
    readFile()
  }, [])

  const readFile = async () => {
    let current_id = await AsyncStorage.getItem('CURRENT_LANGUAGE_ID');
    fetch(Constant.baseURL + Constant.end_Point.UPDATED_LANGUAGE, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(response => response.json())
      .then(json => {
        if (json?.status_code == 200) {
          let _ln = json?.data[json?.data?.length - 1];
          if (current_id && JSON.stringify(current_id) == JSON.stringify(_ln.id)) {
            setIsLoading(false);
          }
          else {
            console.log('* * * NEW LANGUAGE * * *')
            AsyncStorage.setItem('CURRENT_LANGUAGE_ID', JSON.stringify(_ln.id));
            let _fromUrl = _ln.language;
            let _toFile = `${RNFS.DocumentDirectoryPath}/Lang.json`;
            RNFS.downloadFile({ fromUrl: _fromUrl, toFile: _toFile }).promise.then((res) => {
              RNFS.readFile(_toFile, 'ascii')
                .then(async (res) => {
                  await AsyncStorage.setItem('LANGUAGE', res);
                  setIsLoading(false);
                })
                .catch((err) => {
                  console.log("Error ::", err.message, err.code);
                });
            }).catch((error) => {
              console.log("Error ::", error)
            })
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  // * * * * * * Read file and store data to local * * * * * * * * * 

  // useFocusEffect(
  //   useCallback(() => {
  //     getLanguage();
  //     return () => { };
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []),
  // );

  // ----- 3--------  if loading is set to be true then
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }



  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StackNavigation">
          <Stack.Screen
            name="StackNavigation"
            component={StackNavigation}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
