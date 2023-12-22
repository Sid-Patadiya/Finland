import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import FSize from '../../theme/FSize';
import Font from '../../theme/Font';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../component/loader';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {VerifyOtpRequest} from '../../redux/Action/VerifyOtpAction';
import {loaderAction} from '../../redux/Action/LoaderAction';

import {ToastDisplay} from '../../redux/Action/ToastAction';
import CustomButton from '../../component/CustomButton';
import {Lang} from '../../translation/lang';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

export default function InterOtp({route, navigation}) {
  let {phone} = route.params;
  console.log('Route::::', phone);
  const [otpResponse, setOtpResponse] = useState('');
  const [otp, setOtp] = useState('');
  console.log('Otp:::', otp);

  const dispatch = useDispatch();
  const IsFocused = useIsFocused();

  const [ln, setLn] = useState('en');
  useEffect(() => {
    const setLang = async () => {
      setLn(await AsyncStorage.getItem('LanguageCode'));
    };
    setLang();
  }, [IsFocused]);

  const loaderResponse = useSelector(state => state.loader);
  console.log('loder-->', loaderResponse.loader);

  const OtpVerify = () => {
    if (otp === '') {
      dispatch(
        ToastDisplay({
          type: 'nagative',
          title: 'Please Otp',
        }),
      );
    } else {
      let bodyData = {
        phone: phone,
        otp: otp,
        user_types: 'jobseeker',
      };
      let key = 'LoginOtp';
      console.log('BodyData ===>', bodyData);
      dispatch(VerifyOtpRequest(bodyData, navigation, key));
      dispatch(loaderAction(true));
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFFAF6', alignItems: 'center'}}>
      <View style={styles.image}>
        <View style={{height: 200, width: 260}}>
          <Image
            style={styles.img}
            source={require('../../assets/Icon/jobSeekerLogin/Otp.png')}></Image>
        </View>
      </View>
      <Text style={styles.text}>{Lang[ln].Auth['we have sent an OTP to']}</Text>
      {/* <Text style={styles.text}>+91 {phone.slice(3, 13)} </Text> */}
      <OTPInputView
        style={{width: '80%', height: hp(10)}}
        pinCount={6}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={code => setOtp(code)}
      />

      <TouchableOpacity
        style={{marginHorizontal: wp(5), width: '85%'}}
        onPress={() => OtpVerify()}>
        <CustomButton btnTxt={Lang[ln].Auth['Submit']} />
      </TouchableOpacity>

      <View
        style={{
          marginTop: hp(2),
          flexDirection: 'row',
          paddingTop: hp(2),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: Font.PoppinsRegular,
            fontSize: FSize.fs13,
            fontWeight: '400',
            color: '#444444',
          }}>
          {Lang[ln].Auth['Didn`t Receive Code Yet?']}
        </Text>
        <TouchableOpacity style={{paddingLeft: wp(5)}}>
          <Text
            style={{
              color: '#007AFF',
              fontSize: FSize.fs14,
              fontWeight: '500',
              fontFamily: Font.PoppinsRegular,
            }}>
            {Lang[ln].Auth['Resend OTP']}
          </Text>
        </TouchableOpacity>
      </View>
      <Loader val={loaderResponse.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    // marginVertical: hp(8),
    height: hp(36),
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  text: {
    color: '#444444',
    paddingHorizontal: wp(7),
    textAlign: 'center',
    fontSize: FSize.fs13,
    fontFamily: 'Poppins-Regular',
  },

  underlineStyleBase: {
    borderRadius: 5,
    borderColor: 'rgba(112,112,112,0.4)',
    borderWidth: 1,
    color: '#000',
  },
  underlineStyleHighLighted: {
    borderColor: '#000',
  },
});
