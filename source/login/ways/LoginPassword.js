import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import Font from '../../theme/Font';
import FSize from '../../theme/FSize';

import CustomButton from '../../component/CustomButton';
import { loaderAction } from '../../redux/Action/LoaderAction';
import { LoginRequest } from '../../redux/Action/LoginAction';
import { ToastDisplay } from '../../redux/Action/ToastAction';
import Loader from '../../component/loader';
import { CountryPicker } from 'react-native-country-codes-picker';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Lang } from '../../translation/lang';
import PushNotification from 'react-native-push-notification';


export default function LoginPassword({ navigation }) {



  const dispatch = useDispatch();
  // const selector = useSelector();
  const IsFocused = useIsFocused();
  const [firebase_token, setfirebase_token] = useState('')

  useEffect(() => {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('LOGINTOKEN:', token.token);
        setfirebase_token(token)

      },
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        PushNotification.localNotification(notification);
      },
    });
  }, [])
  const loaderResponse = useSelector(state => state.loader);

  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [passwordVisible, setPasswordVisible] = useState(true);

  //------------- Language -------------\\

  const [ln, setLn] = useState('en');
  useEffect(() => {
    const setLang = async () => {
      setLn(await AsyncStorage.getItem('LanguageCode'));
    };
    setLang();
    dispatch(loaderAction(false));
  }, [IsFocused]);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [selectCountry, setSelectCountry] = useState('+91');

  const [countryShowOption, setCountryShowOption] = useState(false);

  const onSelect = (item, key) => {
    console.log('item ::', item);
    setSelectCountry(item.code);
  };

  console.log('loder-->', loaderResponse.loader);

  const loginButton = () => {
    if (phoneNumber === '' && password === '') {
      dispatch(
        ToastDisplay({
          type: 'nagative',
          title: 'Please Enter MobileNumber &  Password',
        }),
      );
    } else if (phoneNumber === '') {
      dispatch(
        ToastDisplay({
          type: 'nagative',
          title: 'Please Enter MobileNumber',
        }),
      );
    } else if (password === '') {
      dispatch(
        ToastDisplay({
          type: 'nagative',
          title: 'Please Enter  Password',
        }),
      );
    } else {
      let bodyData = {
        phone: countryCode + phoneNumber,
        password: password,
        user_types: 'jobseeker',
        "firebase_token": firebase_token.token
      };
      console.log('BodyData ===>', bodyData);
      dispatch(LoginRequest(bodyData, navigation));
      dispatch(loaderAction(true));
    }
  };

  // --------------updatating device country code as per region

  return (
    <View style={{ backgroundColor: '#FFFAF6', flex: 1 }}>
      <ScrollView>
        <View style={styles.image}>
          <Image
            style={styles.img}
            source={require('../../assets/Icon/jobSeekerLogin/Login.png')}></Image>
        </View>

        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectadipi sed do eiusm sed do eiusmo
          tem Lorem ipsum dolor
        </Text>

        <View style={styles.textboxinnerOne}>
          <View style={{ height: 20, width: 20, alignItems: 'center' }}>
            <Image
              style={styles.img}
              source={require('../../assets/Icon/Login/call.png')}></Image>
          </View>

          {/* <TouchableOpacity
            style={styles.countryCode}
            onPress={() => setCountryShowOption(!countryShowOption)}>
            <Text style={styles.countryCodetxt}>
              {selectCountry !== undefined ? selectCountry : '+91'}
            </Text>
            <Image
              source={require('../../assets/Icon/downFill.png')}
              style={[
                styles.downFill,
                { transform: [{ rotate: countryShowOption ? '180deg' : '0deg' }] },
              ]}
            />
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => setShow(true)}
            style={{
              // borderBottomWidth: 1,
              borderColor: '#E2E4E5',
              alignItems: 'center',
              width: '23%',
              justifyContent: 'space-around',
            }}>
            <Text
              style={{
                fontSize: FSize.fs13,
                color: '#444444',
              }}>
              {countryCode}
            </Text>
          </TouchableOpacity>

          <TextInput
            placeholderTextColor={'#96989A'}
            keyboardType="number-pad"
            placeholder={Lang[ln].Auth['Enter Mobile Number']}
            onChangeText={val => setPhoneNumber(val)}
            style={[styles.inputFeed, { width: '70%' }]}
          />

          <CountryPicker
            // inputPlaceholder={'country'}
            // searchMessage={'Some search message here'}
            style={{
              // Styles for whole modal [View]
              modal: {
                height: hp(40),
                // backgroundColor: 'red'
              },
            }}
            show={show}
            // when picker button press you will get the country object with dial code
            pickerButtonOnPress={item => {
              console.log('item>>>>>', item);
              setCountryCode(item.dial_code);
              setShow(false);
            }}
          />

          {/* </View> */}
        </View>
        {/* {countryShowOption ? (
          <ScrollView style={styles.dropDownStyle} nestedScrollEnabled={true}>
            {countryCode.map((val, i) => {
              console.log('value', val);
              return (
                <TouchableOpacity
                  key={String(i)}
                  onPress={() => [onSelect(val), setCountryShowOption(false)]}
                  style={{
                    flex: 1,
                    paddingVertical: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Text style={styles.valueText}>{val.flag}</Text>
                  <Text style={styles.valueText}>{val.code}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : null} */}

        <View style={styles.textboxinnerOne}>
          <View style={{ height: 20, width: 20 }}>
            <Image
              style={styles.img}
              source={require('../../assets/Icon/Login/lock.png')}></Image>
          </View>

          <TextInput
            placeholderTextColor={'#96989A'}
            secureTextEntry={passwordVisible ? true : false}
            placeholder={Lang[ln].Auth['Enter Password']}
            style={[styles.inputFeed, { width: '80%' }]}
            onChangeText={password => setPassword(password)}
          />

          <TouchableOpacity
            style={{ height: 20, width: 20, alignItems: 'center' }}
            onPress={() => setPasswordVisible(!passwordVisible)}>
            <Image
              style={styles.img}
              source={
                passwordVisible
                  ? require('../../assets/Icon/Login/eyeClosed.png')
                  : require('../../assets/Icon/Login/eyeIcon.png')
              }></Image>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{ marginHorizontal: wp(5), paddingTop: hp(2) }}
          onPress={() => loginButton()}>
          <CustomButton btnTxt={Lang[ln].Auth['Login']} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text
            style={{
              color: '#007AFF',
              fontSize: FSize.fs13,
              textAlign: 'center',
              fontFamily: Font.PoppinsRegular,
              marginVertical: 10,
              textDecorationLine: 'underline',
            }}>
            {Lang[ln].Auth['Forgot Password']}
          </Text>
        </TouchableOpacity>
        <View
          style={{ flexDirection: 'row', margintop: hp(1), alignSelf: 'center' }}>
          <Text
            style={{
              fontSize: FSize.fs15,
              color: '#454545',
              fontFamily: Font.PoppinsRegular,
            }}>
            {Lang[ln].Auth['Don`t have an account?']}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text
              style={{
                color: '#007AFF',
                fontSize: FSize.fs15,
                textDecorationLine: 'underline',
                fontFamily: Font.PoppinsRegular,
              }}>
              {Lang[ln].Auth['SignUp']}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => navigation.replace('TabNavigation')}
          style={{ alignSelf: 'center', paddingVertical: hp(2) }}>
          <Text
            style={{
              color: '#007AFF',
              fontSize: FSize.fs22,
              textDecorationLine: 'underline',
              fontFamily: Font.PoppinsRegular,
            }}>
            {Lang[ln].Auth['Skip']}
          </Text>
        </TouchableOpacity>
        <Loader val={loaderResponse.loader} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    marginVertical: hp(7),
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  text: {
    color: '#444444',
    paddingHorizontal: wp(8),
    textAlign: 'center',
    fontSize: FSize.fs11,
    fontFamily: Font.PoppinsRegular,
  },
  textboxinnerOne: {
    height: hp(7),
    borderWidth: hp(0.1),
    borderColor: '#D2D2D2',
    marginHorizontal: wp(5),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: hp(0.5),
    paddingHorizontal: hp(2),
    marginTop: hp(2),
  },
  inputFeed: {
    color: 'black',
    fontSize: FSize.fs13,
    fontFamily: Font.PoppinsRegular,

    marginHorizontal: 10,
    // top: 4,
  },
  logintext: {
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: FSize.fs15,
    fontFamily: Font.PoppinsRegular,
  },
  countryCode: {
    // flex: 1,
    // borderBottomWidth: 1,
    // borderColor: '#E2E4E5',
    flexDirection: 'row',
    alignItems: 'center',
    width: widthPercentageToDP(15),
    justifyContent: 'space-around',
  },
  countryCodetxt: {
    fontSize: FSize.fs13,
    color: '#444444',
  },
  downFill: {
    height: 7,
    width: 13,
  },

  dropDownStyle: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E2E4E5',
    height: 120,
    // width: '30%',
    width: widthPercentageToDP(22),
    marginLeft: wp(7),
    // top: -20,
    backgroundColor: '#FFFF',
  },

  valueText: {
    fontSize: FSize.fs12,
    color: '#444444',
  },
});
