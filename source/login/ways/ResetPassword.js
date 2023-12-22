import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import FSize from '../../theme/FSize';
import Font from '../../theme/Font';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {useDispatch, useSelector} from 'react-redux';
import {VerifyOtpRequest} from '../../redux/Action/VerifyOtpAction';
import {loaderAction} from '../../redux/Action/LoaderAction';
import {ToastDisplay} from '../../redux/Action/ToastAction';
import Loader from '../../component/loader';
import CustomButton from '../../component/CustomButton';

export default function ResetPassword({route, navigation}) {
  // let {phone} = route.params;

  const [otp, setOtp] = useState('');
  console.log('Otp:::', otp);

  const dispatch = useDispatch();

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

      console.log('BodyData ===>', bodyData);
      // navigation.navigate('ChangePassword');
      dispatch(VerifyOtpRequest(bodyData, navigation));
      dispatch(loaderAction(true));
    }
  };
  return (
    <View style={{backgroundColor: '#FFFAF6', flex: 1, alignItems: 'center'}}>
      <View style={styles.image}>
        <View style={{width: 240, height: 200}}>
          <Image
            style={styles.img}
            source={require('../../assets/Icon/jobSeekerLogin/Otp.png')}></Image>
        </View>
      </View>

      <Text style={styles.text}>
        We Have sent One Time Password to
        {/* {phone.slice(3, 13)} */}
      </Text>
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
        <CustomButton btnTxt={'Submit OTP'} />
      </TouchableOpacity>

      <Loader val={loaderResponse.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: hp(38),
    // marginVertical: hp(8),
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
    fontFamily: Font.PoppinsRegular,
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
