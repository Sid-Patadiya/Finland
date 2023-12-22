import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {TextInput} from 'react-native-gesture-handler';
import Font from '../../theme/Font';
import FSize from '../../theme/FSize';

import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../component/loader';
import {OtpRequest} from '../../redux/Action/OtpAction';
import {loaderAction} from '../../redux/Action/LoaderAction';
import {ToastDisplay} from '../../redux/Action/ToastAction';
import CustomButton from '../../component/CustomButton';
import {CountryPicker} from 'react-native-country-codes-picker';
import {Lang} from '../../translation/lang';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

export default function ThroughOtp({navigation}) {
  const dispatch = useDispatch();
  const IsFocused = useIsFocused();
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  //------------- Language -------------\\

  const [ln, setLn] = useState('en');
  useEffect(() => {
    const setLang = async () => {
      setLn(await AsyncStorage.getItem('LanguageCode'));
    };
    setLang();
  }, [IsFocused]);

  const loaderResponse = useSelector(state => state.loader);
  console.log('loder-->', loaderResponse.loader);

  const SendOtp = () => {
    if (phoneNumber === '') {
      dispatch(
        ToastDisplay({
          type: 'nagative',
          title: 'Please Enter Mobile Number',
        }),
      );
    } else {
      let bodyData = {
        phone: countryCode + phoneNumber,
        user_types: 'jobseeker',
      };
      let key = 'login';
      console.log('BodyData ===>', bodyData);
      // navigation.navigate('InterOtp', { phoneNumber });
      dispatch(OtpRequest(bodyData, navigation, key));
      dispatch(loaderAction(true));
      //   navigation.navigate('otp')
    }
  };

  const doRegister = () => {
    let request = {
      user_Phone: phoneNumber,
    };
    postData(request, mobile_siteConfig.MOB_SIGN_UP)
      .then((res: any) => {
        if (res.data && res.data.hasOwnProperty('token')) {
          AsyncStorage.setItem(
            mobile_siteConfig.MOB_ACCESS_TOKEN_KEY,
            res.data.token.accessToken,
          );
          AsyncStorage.setItem(
            mobile_siteConfig.USER_DATA,
            JSON.stringify(res.user),
          );
          //   navigation.navigate('otp')
          props.onPress;
        } else {
          Alert.alert('Error', res.data);
        }
      })
      .catch(error => {});
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFFAF6'}}>
      <Loader val={loaderResponse.loader} />

      <View style={styles.imageVIew}>
        <Image
          style={styles.img}
          source={require('../../assets/Icon/jobSeekerLogin/Otp.png')}></Image>
      </View>

      <Text style={styles.text}>
        Lorem ipsum dolor sit amet, consectadipi sed do eiusm sed do eiusmo tem
        Lorem ipsum dolor
      </Text>

      <View style={styles.textboxinnerOne}>
        <View style={{height: 20, width: 20, alignItems: 'center'}}>
          <Image
            style={styles.img}
            source={require('../../assets/Icon/Login/call.png')}></Image>
        </View>
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
          style={styles.inputFeed}
        />
      </View>

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

      <TouchableOpacity
        style={{marginHorizontal: wp(5), paddingTop: hp(2)}}
        onPress={() => SendOtp()}>
        <CustomButton btnTxt={Lang[ln].Auth['Send OTP']} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  imageVIew: {
    height: '30%',
    width: '50%',
    alignSelf: 'center',
    marginVertical: hp(5),
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
    fontSize: FSize.fs13,
    fontFamily: Font.PoppinsRegular,
    marginVertical: hp(1.5),
  },
  textboxinnerOne: {
    paddingVertical: hp(0.2),
    borderWidth: hp(0.1),
    borderColor: '#D2D2D2',
    marginHorizontal: wp(5),
    paddingHorizontal: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: hp(0.5),
  },
  inputFeed: {
    color: '#96989A',
    fontSize: FSize.fs15,
    fontFamily: Font.PoppinsRegular,
    width: '80%',
  },

  countryCode: {
    // flex: 1,
    // borderBottomWidth: 1,
    // borderColor: '#E2E4E5',
    // backgroundColor:'red',
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
    flex: 0.1,
    // height:hp(5),
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
