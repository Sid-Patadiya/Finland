import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Font from '../theme/Font';
import FSize from '../theme/FSize';

export default function AccountOption({navigation}) {
  return (
    <View>
      <View style={styles.headerImg}>
        <Image
          style={styles.img}
          source={require('../assets/Icon/Login/accountOption.png')}></Image>
      </View>

      <View style={{paddingHorizontal: wp(8), marginTop: hp(5)}}>
        <TouchableOpacity
          style={[
            styles.labelBg,
            {backgroundColor: '#D4E6FF', borderColor: '#65A6FF'},
          ]}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.choose}>Create Account</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: hp(3),
        }}>
        <View style={styles.line}></View>
        <Text style={styles.txt}>Or</Text>
        <View style={styles.line}></View>
      </View>

      <View style={{paddingHorizontal: wp(8)}}>
        <TouchableOpacity
          style={[styles.labelBg, {borderColor: '#BFBFBF'}]}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signInTxt}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <View style={{paddingHorizontal: wp(8)}}>
        <TouchableOpacity
          style={[
            styles.labelBg,
            {
              borderColor: '#1877F2',
              marginTop: hp(3),
              backgroundColor: '#1877F2',
            },
          ]}>
          <View style={[styles.h4w4]}>
            <Image
              style={styles.imgx}
              source={require('../assets/Icon/Login/facebook.png')}></Image>
          </View>
          <Text style={styles.faceBook}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>

      <View style={{paddingHorizontal: wp(8)}}>
        <TouchableOpacity
          style={[styles.labelBg, {borderColor: '#BFBFBF', marginTop: hp(3)}]}>
          <View style={[styles.h4w4]}>
            <Image
              style={styles.imgx}
              source={require('../assets/Icon/Login/google.png')}></Image>
          </View>
          <Text style={styles.google}>Continue with Google</Text>
        </TouchableOpacity>
      </View>

      <View style={{paddingHorizontal: wp(8)}}>
        <TouchableOpacity
          style={[
            styles.labelBg,
            {
              borderColor: '#000000',
              marginTop: hp(3),
              backgroundColor: '#000000',
            },
          ]}>
          <View style={[styles.h4w4]}>
            <Image
              style={styles.imgx}
              source={require('../assets/Icon/Login/apple.png')}></Image>
          </View>
          <Text style={styles.faceBook}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImg: {
    // flex: 1,
    height: hp(30),
    width: wp(100),
    marginTop: hp(2),
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode: 'stretch',
  },

  imgx: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },

  labelBg: {
    height: hp(6),
    width: '100%',
    borderWidth: hp(0.15),
    borderRadius: hp(1),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  choose: {
    color: '#001D45',
    textAlign: 'center',
  },
  line: {
    borderBottomWidth: hp(0.15),
    borderBottomColor: '#D8D8D8',
    width: wp(35),
  },
  txt: {
    color: '#626262',
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs14,
    paddingHorizontal: wp(5),
  },
  signInTxt: {
    color: '#444444',
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs14,
    textAlign: 'center',
    fontWeight: '400',
  },
  faceBook: {
    color: '#FFFFFF',
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs14,
    textAlign: 'center',
    fontWeight: '400',
  },
  google: {
    color: ' rgba(0, 0, 0, 0.54)',
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs14,
    textAlign: 'center',
    fontWeight: '400',
  },
  h4w4: {
    height: hp(4),
    width: hp(4),
    borderRadius: hp(4),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(3),
  },
});
