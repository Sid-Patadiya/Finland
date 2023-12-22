import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  PermissionsAndroid,
  SafeAreaView,
} from 'react-native';
import Font from '../../theme/Font';
import FSize from '../../theme/FSize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../component/loader';
import { SignUpRequest } from '../../redux/Action/SignUpAction';
import { loaderAction } from '../../redux/Action/LoaderAction';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useIsFocused } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import { LocationRequest } from '../../redux/Action/LocationAction';
import Geocoder from 'react-native-geocoding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
import { CountryPicker } from 'react-native-country-codes-picker';
import { Lang } from '../../translation/lang';
import PushNotification from 'react-native-push-notification';





export default function SignUp({ navigation }) {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');

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




  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [username, setName] = useState('');
  const [nameAlert, setNameAlert] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneNumberAlert, setPhoneNumberAlert] = useState('');

  const [password, setPassword] = useState('');
  const [passwordAlert, setPasswordAlert] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordAlert, setConfirmPasswordAlert] = useState('');

  //------------- Language -------------\\

  const [ln, setLn] = useState('en');
  useEffect(() => {
    const setLang = async () => {
      setLn(await AsyncStorage.getItem('LanguageCode'));
    };
    setLang();
  }, [isFocused]);

  const [passwordVisible, setPasswordVisible] = useState(true);
  const pattern =
    /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/;
  const loaderResponse = useSelector(state => state.loader);
  console.log('loder-->', loaderResponse.loader);

  // on click confirm checking the validation
  const validation = () => {
    if (username === '') {
      setNameAlert('Enter name');
    } else if (phone === '') {
      setPhoneNumberAlert('Enter PhoneNumber');
    } else if (password === '') {
      setPasswordAlert('Enter Password');
    } else if (password != confirmPassword) {
      setConfirmPasswordAlert(`Password doesn't Matches`);
    } else if (password.trim().length < 8) {
      setConfirmPasswordAlert('Password must be minimum of 8 character');
    } else {
      let bodyData = {
        username: countryCode + phone,
        phone: countryCode + phone,
        password: password,
        user_types: 'jobseeker',
        firebase_token: firebase_token.token
      };
      console.log('BodyData ===>', bodyData);
      dispatch(SignUpRequest(bodyData, navigation));
      dispatch(loaderAction(true));
      // const phoneNumber = countryCode + phone;
      // navigation.navigate('InterOtp', { phoneNumber });
    }
  };

  // console.log('selectCountry::', selectCountry);
  // const onSelect = (item, key) => {
  //   console.log('item ::', item);
  //   setSelectCountry(item.code);
  // };

  // const [currentLatitude, setCurrentLatitude] = useState(0);
  // const [currentLongitude, setCurrentLongitude] = useState(0);
  // // const [currentAddress, setCurrentAddress] = useState([]);
  // const [currentAddress, setCurrentAddress] = useState('Current Location');
  // console.log('currentLatitude-->', currentLatitude);
  // console.log('currentLongitude-->', currentLongitude);

  // const [loginToken, setLoginToken] = useState('');
  // useEffect(() => {
  //   (async () => {
  //     const token = await AsyncStorage.getItem('LoginAccessToken');
  //     // console.log('tokeprofileDatan--->', profileData);
  //     setLoginToken(token);
  //   })();
  // }, []);

  // const CurrentLocation = (currentLatitude, currentLongitude) => {
  //   let bodydata = {
  //     latitude: currentLatitude,
  //     longitude: currentLongitude,
  //   };
  //   dispatch(LocationRequest(bodydata));
  // };
  // useEffect(() => {
  //   requestPermission();
  // }, [isFocused]);
  // const requestPermission = async () => {
  //   try {
  //     let isPermitedExternalStorage = await PermissionsAndroid.check(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     );
  //     const Granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'Location access required',
  //         message: 'This app need to access',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancle',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (Granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       // Alert.alert('Permission Granted');
  //       getCurrentLocation();
  //     } else {
  //       Alert.alert('Permission Denide');
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const getCurrentLocation = async () => {
  //   await Geolocation.getCurrentPosition(
  //     async position => {
  //       const currentLatitude = position.coords.latitude;

  //       const currentLongitude = position.coords.longitude;

  //       setCurrentLatitude(currentLatitude);

  //       setCurrentLongitude(currentLongitude);

  //       var NY = {
  //         lat: currentLatitude,
  //         lng: currentLongitude,
  //       };

  //       await Geocoder.geocodePosition(NY).then(res => {
  //         // console.log('res::', JSON.stringify(res));
  //         var myAddress = res['0'];
  //         console.log(myAddress);
  //         console.log(res);
  //         setCurrentAddress(myAddress);
  //       });
  //     },

  //     error => {
  //       Alert.alert(error.message.toString());
  //     },
  //   );
  // };
  // function updateAddress(currentLatitude, currentLongitude) {
  //   Geocoder.from(currentLatitude, currentLongitude).then(json => {
  //     var addressComponent = json.results[0].address_components;
  //     var add = addressComponent[0]?.long_name;
  //     var addT = addressComponent[1]?.short_name;
  //     var myAddress = [add + addT];
  //     console.log(json.results[0]);
  //     setCurrentAddress(myAddress);
  //   });
  // }
  // cosnt[countryCode, setCountryCode] = useState('')
  // useEffect(() => {
  //   console.log('fsfsfsafaf', RNLocalize.getLocales());
  //   console.log(RNLocalize.getCurrencies());
  //   console.log(RNLocalize.getCountry());

  // }, [])

  //   function setCounteycode(params) {
  //   // var country_code =
  // }

  // update
  console.log('mmmmmmmmmmm', RNLocalize.getLocales());
  // update phone number on the basis of device locaiton
  function updateCountryCode() {
    var countryDetails = RNLocalize.getLocales();
    console.log('nnnnnnnnnnnnnn', countryDetails);

    let country_code = countryDetails.countryCode;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#FFFAF6' }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'rgba(13, 48, 104, 1)',
            fontFamily: Font.PoppinsSemiBold,
            marginTop: heightPercentageToDP(3),
            fontSize: FSize.fs20,
          }}>
          {Lang[ln].Auth['Register to Catch-Up Jobs']}
        </Text>
        <ScrollView style={styles.mainView}>
          <View style={{ height: heightPercentageToDP(30), width: '100%' }}>
            <Image
              source={require('../../assets/Icon/Login/splash.png')}
              resizeMode={'contain'}
              style={{ height: '100%', width: '100%' }}></Image>
          </View>

          <Text style={[styles.enterText]}>
            {Lang[ln].Auth['Enter Your Name']}
          </Text>

          <TextInput
            placeholder={Lang[ln].Auth['Enter Your Full Name']}
            style={styles.textInputStyle}
            onChangeText={username => [setName(username), setNameAlert('')]}
          />
          <Text>{nameAlert}</Text>

          <Text style={styles.enterText}>
            {' '}
            {Lang[ln].Auth['Enter Your Phone Number']}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              // flex:1
            }}>
            <TouchableOpacity
              onPress={() => setShow(true)}
              style={{
                borderBottomWidth: 1,
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
              placeholder={Lang[ln].Auth['Phone Number']}
              style={styles.textInputStyle}
              keyboardType="number-pad"
              onChangeText={phone => [setPhone(phone), setPhoneNumberAlert('')]}
            />

            {/* // For showing picker just put show state to show prop */}

            <CountryPicker
              style={{
                modal: {
                  height: hp(40),
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
          </View>

          <Text style={{ textAlign: 'left' }}>{phoneNumberAlert}</Text>

          <Text style={styles.enterText}>
            {Lang[ln].Auth['Set a password']}
          </Text>

          <TextInput
            placeholder={Lang[ln].Auth['Enter Your Password Here']}
            style={styles.textInputStyle}
            onChangeText={password => [
              setPassword(password),
              setPasswordAlert(''),
            ]}
          />
          <Text>{passwordAlert}</Text>

          <Text style={styles.enterText}>
            {Lang[ln].Auth['Confirm password']}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderColor: '#E2E4E5',
            }}>
            <TextInput
              placeholder={Lang[ln].Auth['Enter Your Password Again']}
              secureTextEntry={passwordVisible ? true : false}
              style={styles.confirmPasswordInput}
              onChangeText={confirmPassword => [
                setConfirmPassword(confirmPassword),
                setConfirmPasswordAlert(''),
              ]}
            />
            <TouchableOpacity
              style={{ height: hp(6), width: wp(9), padding: 5 }}
              onPress={() => setPasswordVisible(!passwordVisible)}>
              <Image
                source={
                  passwordVisible
                    ? require('../../assets/Icon/Login/eyeClosed.png')
                    : require('../../assets/Icon/Login/eyeIcon.png')
                }
                resizeMode="contain"
                style={styles.img}
              />
            </TouchableOpacity>
          </View>

          <Text style={{ color: '#34C759' }}>{confirmPasswordAlert}</Text>

          <TouchableOpacity style={styles.button} onPress={validation}>
            <Text style={styles.buttonText}>{Lang[ln].Auth['Confirm']}</Text>
          </TouchableOpacity>
          <View style={{ height: heightPercentageToDP(10) }}></View>
        </ScrollView>
        <Loader val={loaderResponse.loader} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  countryCodetxt: {
    fontSize: FSize.fs13,
    color: '#444444',
  },
  valueText: {
    fontSize: FSize.fs12,
    color: '#444444',
  },
  mainView: {
    flex: 1,
    backgroundColor: '#FFFAF6',
    // justifyContent: 'center',
    paddingHorizontal: 30,
  },
  enterText: {
    color: '#0D3068',
    fontSize: FSize.fs15,
    // marginTop: 10,
    fontFamily: Font.PoppinsRegular,
  },
  textInputStyle: {
    flex: 1,
    color: '#444444',
    borderBottomWidth: 1,
    borderColor: '#E2E4E5',
    // paddingHorizontal: widthPercentageToDP(3),
    fontSize: FSize.fs13,
    fontFamily: Font.PoppinsRegular,
    // height: heightPercentageToDP(4)
  },
  phnNumberInput: {
    borderBottomWidth: 1,
    borderColor: '#E2E4E5',
    // paddingHorizontal: 20,
    fontSize: FSize.fs15,
    fontFamily: Font.PoppinsRegular,
    width: '70%',
  },
  confirmPasswordInput: {
    // flex: 1,
    // paddingHorizontal: 20,
    color: '#444444',
    fontSize: FSize.fs13,
    fontFamily: Font.PoppinsRegular,
    width: '85%',
  },
  dropDownStyle: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E2E4E5',
    height: 120,
    width: '30%',
    // top: -20,
    backgroundColor: '#FFFF',
  },
  countryCode: {
    // flex: 1,
    borderBottomWidth: 1,
    borderColor: '#E2E4E5',
    flexDirection: 'row',
    alignItems: 'center',
    width: '23%',
    justifyContent: 'space-around',
  },
  downFill: {
    height: 7,
    width: 13,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal: 50,
    paddingVertical: 10,
    marginTop: heightPercentageToDP(2),
    borderRadius: heightPercentageToDP(1),
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: FSize.fs15,
    fontFamily: Font.PoppinsRegular,
  },
});
