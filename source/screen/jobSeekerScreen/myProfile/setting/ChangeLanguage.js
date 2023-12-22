import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
  NativeModules,
} from 'react-native';
import HeaderNavigation from '../../../../component/HeaderNavigation';
import Color from '../../../../theme/Color';

import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Font from '../../../../theme/Font';
import FSize from '../../../../theme/FSize';
// import { Lang } from '../../../../translation/lang';

const ChangeLanguage = ({ navigation }) => {
  const [languages, setLanguages] = useState([]);
  console.log(languages)
  const [ln, setLn] = useState('en');

  // * * * * * * * LANGUAGE PART * * * * * * * 
  const [Lang, setLang] = useState({})
  useEffect(() => {
    AsyncStorage.getItem('LANGUAGE').then((lang) => {
      setLang(JSON.parse(lang));
    })
  }, [])
  // * * * * * * * LANGUAGE PART * * * * * * * 

  useEffect(() => {
    initData()
  }, [Lang])

  const initData = async () => {
    let _language = [];
    Object.keys(Lang).map((l, i) => {
      _language.push({
        code: l,
        language: Lang[l].language,
        selected: false
      })
    })
    setLanguages([..._language])
    let _ln = await AsyncStorage.getItem('LanguageCode');
    setLn(_ln)
  }


  // useEffect(() => {
  //   const setLang = async () => {
  //     setLn(await AsyncStorage.getItem('LanguageCode'));
  //   };
  //   setLang();
  // });

  // useEffect(() => {
  //   // getLanguage();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     // getLanguage();

  //     return () => { };
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []),
  // );

  // const getLanguage = async () => {
  //   const language = await AsyncStorage.getItem('LanguageCode');
  //   if (language !== null) {
  //     let updateData = [...languages];
  //     const setLanguageState = updateData.map(obj => {
  //       if (obj.selected === true) {
  //         return { ...obj, selected: false };
  //       }
  //       return obj;
  //     });
  //     const newState = setLanguageState.map(obj => {
  //       if (obj.code === language) {
  //         return { ...obj, selected: true };
  //       }
  //       return obj;
  //     });
  //     setLanguages(newState);
  //   } else {
  //     let updateData = [...languages];
  //     updateData[0].selected = true;
  //     setLanguages(updateData);
  //   }
  // };

  const onToggleSwitch = (status, indx, languageCode) => {
    AsyncStorage.setItem('LanguageCode', languageCode);
    setLn(languageCode)
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderNavigation
          onPress={() => navigation.goBack()}
          heading={Lang && Object.keys(Lang).length > 0 && Lang[ln].Profile['Change Language']}
        />
        <View style={{ marginHorizontal: 20 }}>
          <Text style={styles.title}>
            {Lang && Object.keys(Lang).length > 0 && Lang[ln].Profile['Select Language']}
          </Text>
          {languages.map((item, index) => {
            return (
              <View style={styles.switchContainer} key={String(index)}>
                <Text style={styles.label}>{item.language}</Text>
                <Switch
                  trackColor={{ false: '#767577', true: '#767577' }}
                  thumbColor={item?.code == ln ? '#007AFF' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={isOn => onToggleSwitch(isOn, index, item.code)}
                  value={item?.code == ln}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default ChangeLanguage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Colorwhite,
  },
  title: {
    fontSize: FSize.fs19,
    fontWeight: '700',
    fontFamily: Font.PoppinsSemiBold,
    letterSpacing: 0.05,
    lineHeight: 16,
    paddingTop: 22,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  label: {
    fontSize: FSize.fs19,
    fontWeight: '400',
    fontFamily: Font.PoppinsSemiBold,
    // color: colors.inputLabelColor,
    letterSpacing: 0.05,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    // marginTop: 10,
    borderBottomWidth: 1,
  },
});
