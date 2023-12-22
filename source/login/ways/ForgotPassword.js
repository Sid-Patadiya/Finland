import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../component/loader';

import {OtpRequest} from '../../redux/Action/OtpAction';
import {loaderAction} from '../../redux/Action/LoaderAction';
import {ToastDisplay} from '../../redux/Action/ToastAction';

import FSize from '../../theme/FSize';
import Font from '../../theme/Font';
import CustomButton from '../../component/CustomButton';
import {CountryPicker} from 'react-native-country-codes-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {Lang} from '../../translation/lang';

export default function ForgotPassword({navigation}) {
  const IsFocused = useIsFocused();
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');

  const [phoneNumber, setPhoneNumber] = useState('');

  //------------- Language -------------\\

  const [ln, setLn] = useState('en');
  useEffect(() => {
    const setLang = async () => {
      setLn(await AsyncStorage.getItem('LanguageCode'));
    };
    setLang();
  }, [IsFocused]);

  const dispatch = useDispatch();

  const loaderResponse = useSelector(state => state.loader);
  console.log('loder-->', loaderResponse.loader);

  const GetPassword = () => {
    if (phoneNumber === '') {
      dispatch(
        ToastDisplay({
          type: 'nagative',
          title: 'Please Enter Mobile Number',
        }),
      );
    }
    //  else if (phoneNumber.length >= 10) {
    //   dispatch(
    //     ToastDisplay({
    //       type: 'nagative',
    //       title: 'Mobile Number is not Valide',
    //     }),
    //   );
    // }
    else {
      let bodyData = {
        phone: '+91' + phoneNumber,
        user_types: 'jobseeker',
      };

      console.log('BodyData ===>', bodyData);
      // navigation.navigate('ResetPassword');
      dispatch(OtpRequest(bodyData, navigation));
      dispatch(loaderAction(true));
    }
  };

  return (
    <View style={{backgroundColor: '#FFFAF6', flex: 1}}>
      <View style={styles.image}>
        <View style={{width: 240, height: 200}}>
          <Image
            style={styles.img}
            source={require('../../assets/Icon/jobSeekerLogin/ForgotPassword.png')}></Image>
        </View>
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

      {/* <View style={styles.textboxinnerOne}>
        <View style={{height: 20, width: 20, marginHorizontal: hp(1.5)}}>
          <Image
            style={styles.img}
            source={require('../../assets/Icon/Login/call.png')}></Image>
        </View>

        <TextInput
          placeholderTextColor={'#96989A'}
          placeholder="Enter Mobile Number"
          keyboardType="number-pad"
          style={styles.inputFeed}
          onChangeText={val => setPhoneNumber(val)}
        />
      </View> */}

      <TouchableOpacity
        style={{marginHorizontal: wp(5), paddingTop: hp(2)}}
        onPress={() => GetPassword()}>
        <CustomButton btnTxt={Lang[ln].Auth['Get password']} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: hp(38),
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
  textboxinnerOne: {
    borderWidth: hp(0.1),
    borderColor: '#D2D2D2',
    marginHorizontal: wp(5),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2),
    paddingHorizontal: wp(3),
    borderRadius: 5,
    paddingVertical: hp(0.2),
  },
  inputFeed: {
    color: '#96989A',
    fontSize: FSize.fs13,
    fontFamily: Font.PoppinsRegular,
    width: '80%',
    top: 2,
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
