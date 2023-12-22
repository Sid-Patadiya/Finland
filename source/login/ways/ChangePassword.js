import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import FSize from '../../theme/FSize';
import Font from '../../theme/Font';
import {ToastDisplay} from '../../redux/Action/ToastAction';
import {ChangePasswordRequest} from '../../redux/Action/ChangePasswordAction';
import {loaderAction} from '../../redux/Action/LoaderAction';
import Loader from '../../component/loader';
import CustomButton from '../../component/CustomButton';

export default function ChangePassword({route, navigation}) {
  // let {phone} = route.params;

  const [passwordVisible, setPasswordVisible] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const loaderResponse = useSelector(state => state.loader);
  console.log('loder-->', loaderResponse.loader);
  const ChangePassword = () => {
    if (password == '' && confirmPassword == '') {
      dispatch(
        ToastDisplay({
          type: 'nagative',
          title: 'Please Enter Password & ConfirmPassword',
        }),
      );
    } else if (password == '') {
      dispatch(
        ToastDisplay({
          type: 'nagative',
          title: 'Please Enter password',
        }),
      );
    } else if (confirmPassword == '') {
      dispatch(
        ToastDisplay({
          type: 'nagative',
          title: 'Please Enter Confirm Password',
        }),
      );
    } else if (password !== confirmPassword) {
      dispatch(
        ToastDisplay({
          type: 'nagative',
          title: "Password dosen't Match",
        }),
      );
    } else {
      let bodyData = {
        phone: phone,
        password: password,
        user_types: 'jobseeker',
      };

      console.log('BodyData ===>', bodyData);
      dispatch(ChangePasswordRequest(bodyData, navigation));
      dispatch(loaderAction(true));
    }
  };
  return (
    <ScrollView style={{backgroundColor: '#FFFAF6', width: '100%'}}>
      <View style={styles.image}>
        <View style={{width: 240, height: 200}}>
          <Image
            style={styles.img}
            source={require('../../assets/Icon/jobSeekerLogin/ForgotPassword.png')}></Image>
        </View>
      </View>

      <Text style={styles.text}>Reset Your Password</Text>

      <View style={{paddingHorizontal: wp(5)}}>
        <Text style={styles.enterText}>Set a password</Text>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={password => [setPassword(password)]}
        />
        <Text style={styles.enterText}>Confirm password</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: '#E2E4E5',
          }}>
          <TextInput
            secureTextEntry={passwordVisible ? true : false}
            style={styles.confirmPasswordInput}
            onChangeText={confirmPassword => [
              setConfirmPassword(confirmPassword),
            ]}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}>
            <Image
              source={
                passwordVisible
                  ? require('../../assets/Icon/eyeIcon.png')
                  : require('../../assets/Icon/eyeIcon.png')
              }
              resizeMode="contain"
              style={{height: 15, width: 30, margin: 10}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => ChangePassword()}
        style={{marginHorizontal: wp(5), paddingTop: hp(2), marginTop: hp(2)}}>
        <CustomButton btnTxt={'Update password'} />
      </TouchableOpacity>

      <Loader val={loaderResponse.loader} />
    </ScrollView>
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
    fontSize: FSize.fs18,
    fontFamily: Font.PoppinsRegular,
  },

  enterText: {
    marginTop: hp(1.5),
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs14,
    color: '#444',
  },
  textInputStyle: {
    color: '#444444',
    borderBottomWidth: 1,
    borderColor: '#E2E4E5',
    paddingHorizontal: 20,
    fontSize: FSize.fs13,
    fontFamily: Font.PoppinsRegular,
    // height: heightPercentageToDP(4)
  },

  confirmPasswordInput: {
    // flex: 1,
    paddingHorizontal: 20,
    color: '#444444',
    fontSize: FSize.fs13,
    fontFamily: Font.PoppinsRegular,
    width: '85%',
  },
});
