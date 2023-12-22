import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomButton from '../../../../component/CustomButton';
import Font from '../../../../theme/Font';
import FSize from '../../../../theme/FSize';
import HeaderNavigation from '../../../../component/HeaderNavigation';
import {ChangePasswordRequest} from '../../../../redux/Action/ChangePasswordAction';
import {loaderAction} from '../../../../redux/Action/LoaderAction';
import {useDispatch, useSelector} from 'react-redux';
import {ToastDisplay} from '../../../../redux/Action/ToastAction';
import Loader from '../../../../component/loader';

export default function UpdatePassword({navigation}) {
  const dispatch = useDispatch();
  const loaderResponse = useSelector(state => state.loader);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const Hendle_ChangePassword = () => {
    if (phoneNumber === '') {
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
    } else if (password !== confirmPassword) {
      dispatch(
        ToastDisplay({
          type: 'nagative',
          title: 'Password Does not Match',
        }),
      );
    } else {
      let bodyData = {
        phone: '+91' + phoneNumber,
        password: password,
        user_types: 'jobseeker',
      };
      console.log('BodyData ===>', bodyData);
      let key = 'Update Password';
      dispatch(ChangePasswordRequest(bodyData, navigation, key));
      dispatch(loaderAction(true));
    }
  };
  return (
    <View style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <HeaderNavigation
        onPress={() => navigation.goBack()}
        heading={'Update Password'}
      />
      <ScrollView>
        <View style={styles.image}>
          <View style={{width: 240, height: 200}}>
            <Image
              style={styles.img}
              source={require('../.././../../assets/Icon/Login/getPassword.png')}></Image>
          </View>
        </View>

        <TextInput
          placeholder="Enter Mobile Number"
          placeholderTextColor={'#96989A'}
          keyboardType="numeric"
          onChangeText={text => setPhoneNumber(text)}
          style={styles.textboxinnerOne}
        />

        <TextInput
          placeholder="Enter Password"
          placeholderTextColor={'#96989A'}
          onChangeText={text => setPassword(text)}
          style={styles.textboxinnerOne}
        />

        <TextInput
          placeholder="Enter Cofirm Password"
          placeholderTextColor={'#96989A'}
          onChangeText={text => setConfirmPassword(text)}
          style={styles.textboxinnerOne}
        />

        <TouchableOpacity
          onPress={() => Hendle_ChangePassword()}
          style={{marginHorizontal: wp(5), paddingTop: hp(2)}}>
          <CustomButton btnTxt={'Update password'} />
        </TouchableOpacity>
      </ScrollView>
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

  textboxinnerOne: {
    paddingVertical: hp(1.5),
    borderWidth: hp(0.1),
    borderColor: '#D2D2D2',
    marginHorizontal: wp(5),
    fontSize: FSize.fs17,
    fontFamily: Font.PoppinsRegular,
    marginTop: hp(3),
    borderRadius: hp(0.5),
    paddingHorizontal: hp(2),
  },
});
