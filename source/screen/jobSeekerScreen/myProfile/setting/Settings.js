import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Font from '../../../../theme/Font';
import HeaderNavigation from '../../../../component/HeaderNavigation';
import { useIsFocused } from '@react-navigation/native';
import { Lang } from '../../../../translation/lang';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings({ navigation }) {
  const [emailNotification, setEmailNotification] = useState(false);
  const [Notification, setNotification] = useState(false);

  const IsFocused = useIsFocused();
  const [ln, setLn] = useState('en');
  useEffect(() => {
    const setLang = async () => {
      setLn(await AsyncStorage.getItem('LanguageCode'));
    };
    setLang();
  }, [IsFocused]);

    // checking the login
    const [loginToken, setLoginToken] = useState('');
    useEffect(() => {
      (async () => {
        const token = await AsyncStorage.getItem('LoginAccessToken');
        setLoginToken(token);
      })();
    }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <HeaderNavigation
        onPress={() => navigation.goBack()}
        heading={Lang[ln].Profile['Settings']}
      />

      <View style={styles.notification_View}>
        <Text style={styles.notification_Text}>
          {Lang[ln].Profile['Email Notification']}
        </Text>
        <Switch
          trackColor={{ false: '#767577', true: '#767577' }}
          thumbColor={emailNotification ? '#007AFF' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setEmailNotification(!emailNotification)}
          value={emailNotification}
        />
      </View>
      <View style={styles.notification_View}>
        <Text style={styles.notification_Text}>
          {Lang[ln].Profile['Notification']}
        </Text>
        <Switch
          trackColor={{ false: '#767577', true: '#767577' }}
          thumbColor={Notification ? '#007AFF' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setNotification(!Notification)}
          value={Notification}
        />
      </View>

      {/* <TouchableOpacity
        style={styles.notification_View}
        onPress={() => navigation.navigate('ChangeLanguage')}>
        <Text style={styles.notification_Text}>
          {Lang[ln].Profile['Change Language']}
        </Text>
        <View style={{width: hp(6), height: hp(2.7)}}>
          <Image
            style={styles.arrow}
            source={require('../../../../assets/Icon/arrowRight.png')}></Image>
        </View>
      </TouchableOpacity> */}
      {loginToken == null ? null :
        <TouchableOpacity
          style={styles.notification_View}
          onPress={() => navigation.navigate('UpdatePassword')}>
          <Text style={styles.notification_Text}>
            {Lang[ln].Profile['Update Password']}
          </Text>
          <View style={{ width: hp(6), height: hp(2.7) }}>
            <Image
              style={styles.arrow}
              source={require('../../../../assets/Icon/arrowRight.png')}></Image>
          </View>
        </TouchableOpacity>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  notification_View: {
    flexDirection: 'row',
    backgroundColor: '#dfdfdf',
    marginHorizontal: hp(3),
    padding: hp(1.5),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(2),
    borderRadius: hp(1),
  },
  notification_Text: {
    color: '#000000',
    fontFamily: Font.RobotoRegular,
    fontSize: hp(2.2),
  },
  arrow: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
