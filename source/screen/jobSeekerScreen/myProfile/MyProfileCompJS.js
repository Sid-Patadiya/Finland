import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FSize from '../../../theme/FSize';
import Font from '../../../theme/Font';
import * as Progress from 'react-native-progress';
import GestureRecognizer from 'react-native-swipe-gestures';
import {scale} from '../../../theme/Scalling';
import {useIsFocused} from '@react-navigation/native';
import {Lang} from '../../../translation/lang';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileDetails(props) {
  // modal
  const IsFocused = useIsFocused();
  const [ln, setLn] = useState('en');
  useEffect(() => {
    const setLang = async () => {
      setLn(await AsyncStorage.getItem('LanguageCode'));
    };
    setLang();
  }, [IsFocused]);

  var x = props.profileComplited;
  var y = parseInt(x) / 100;

  return (
    <View style={styles.main}>
      <View style={[styles.row, {alignItems: 'center'}]}>
        <View style={styles.circle}>
          <View
            style={{
              height: hp(8),
              width: hp(8),
              borderRadius: hp(4),
              overflow: 'hidden',
            }}>
            <Image
              style={styles.img}
              source={
                props.image == "" || props.phone == null
                  ? require('../../../assets/Icon/Vector.png'):{uri: props.image}
              }
              resizeMode={'cover'}></Image>
          </View>
          {props.is_premium == true ? (
            <Text
              style={{
                color: '#76480B',
                backgroundColor: '#FFCB3F',
                borderColor: '#FFFFFF',
                fontSize: FSize.fs15,
                textAlign: 'center',
                borderWidth: 1,
                borderRadius: hp(1),
                paddingHorizontal: hp(1),
                // fontFamily: Font.PoppinsRegular,
                position: 'absolute',
                bottom: -7,
              }}>
              Premium
            </Text>
          ) : null}
        </View>

        <View style={{paddingLeft: wp(3), flex: 1}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {props.name == '' || props.image == null ? (
              <Text style={styles.name}>User Name</Text>
            ) : (
              <Text style={styles.name}>{props.name} </Text>
            )}

            <TouchableOpacity
              style={{paddingRight: 20, top: hp(-1)}}
              onPress={props.onPress}>
              <View style={{height: hp(2.3), width: hp(2.3)}}>
                <Image
                  style={styles.img}
                  source={require('../../../assets/Icon/editB.png')}></Image>
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.phoneNumber}>{props.designation}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {props.Experience == '' || props.Experience == null ? (
              <Text style={styles.phoneNumber}>0 Years of Experience</Text>
            ) : (
              <Text style={styles.phoneNumber}>
                {props.Experience}+ Years of Experience
              </Text>
            )}
            <View style={styles.recruiterView}>
              <Text style={styles.recruiterTxt}>Recruiter View</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{marginTop: hp(1.5)}}>
        <View
          style={[styles.row, {alignItems: 'center', alignContent: 'center'}]}>
          <View style={{height: 11, width: 11}}>
            <Image
              style={styles.img}
              resizeMode="contain"
              source={require('../../../assets/Icon/messageJS.png')}></Image>
          </View>
          {props.email == '' || props.email == null ? (
            <Text style={styles.website}>user's.email.com</Text>
          ) : (
            <Text style={styles.website}>{props.email}</Text>
          )}

          {props.email == '' || props.email == null ? null : (
            <TouchableOpacity>
              <Text style={styles.verify}>Verify</Text>
            </TouchableOpacity>
          )}
        </View>

        <View
          style={[styles.row, {alignItems: 'center', alignContent: 'center'}]}>
          <View style={{height: 11, width: 11}}>
            <Image
              style={styles.img}
              resizeMode="contain"
              source={require('../../../assets/Icon/callJS.png')}></Image>
          </View>

          {props.phone !== '' && props.phone !== null ? (
            <>
              <Text style={styles.website}>{props.phone}</Text>
              <TouchableOpacity>
                <Text style={styles.verify}>Verify</Text>
              </TouchableOpacity>
            </>
          ) :  <Text style={styles.website}>User's Contact Number</Text> }
        </View>
      </View>

      <View style={{paddingTop: hp(1)}}>
        <Text style={styles.about}>About Me</Text>
        <View style={{flexDirection: 'row', paddingRight: hp(7)}}>
          {props.about == '' || props.about == null ? (
            <Text
              numberOfLines={3}
              ellipsizeMode="tail"
              style={styles.aboutText}>
              Fill about me to show content..
            </Text>
          ) : (
            <Text
              numberOfLines={3}
              ellipsizeMode="tail"
              style={styles.aboutText}>
              {props.about}
            </Text>
          )}
          {/* <Text style={styles.viewMore}>View More</Text> */}
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: hp(1),
        }}>
        <Text
          style={{
            color: '#1B2C6B',
            fontSize: FSize.fs10,
            fontFamily: Font.PoppinsRegular,
          }}>
          {props.profileComplited} Profile is Completed
        </Text>
        <Text
          style={{
            color: '#8D8D8D',
            fontSize: FSize.fs10,
            fontFamily: Font.PoppinsRegular,
            paddingRight: wp(5),
          }}>
          {/* Last update on {props.updated_at.split('-').reverse().join('-')} */}
        </Text>
      </View>

      <Progress.Bar
        progress={y}
        width={wp(92)}
        color={'#158420'}
        height={hp(1.5)}
        unfilledColor={'#C4C4C4'}
        borderColor={'#FFF'}
        borderRadius={hp(5)}
      />

      <TouchableOpacity
        style={{
          height: hp(6),
          backgroundColor: '#0D3068',
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: wp(20),
          borderRadius: hp(10),
          marginTop: hp(1.5),
          paddingVertical: hp(0.5),
        }}
        onPress={props.onPressPlan}>
        <Text
          style={{
            color: '#FFFFFF',
            fontFamily: Font.PoppinsRegular,
            fontSize: FSize.fs13,
            top: 1,
          }}>
          {Lang[ln].Profile['Upgrade Plan']}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  recruiterView: {
    borderWidth: hp(0.1),
    borderColor: '#808080',
    alignContent: 'center',
    marginHorizontal: wp(2),
    borderRadius: hp(4),
  },
  recruiterTxt: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.4),
    fontSize: FSize.fs8,
    fontFamily: Font.PoppinsRegular,
    color: '#808080',
  },
  verify: {
    color: '#007AFF',
    fontSize: FSize.fs10,
    fontFamily: Font.PoppinsRegular,
    // marginLeft: wp(4),
    fontWeight: '700',
  },
  main: {
    backgroundColor: '#FFFFFF',
    paddingLeft: wp(4),
    paddingVertical: hp(2),
  },
  img: {
    width: '100%',
    height: '100%',
    // resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
  },
  circle: {
    width: hp(10),
    height: hp(8),
    // borderRadius: hp(10),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  name: {
    color: '#454545',
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
    fontSize: FSize.fs14,
  },
  phoneNumber: {
    color: '#454545',
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    fontSize: FSize.fs11,
  },
  website: {
    width: '40%',
    color: '#454545',
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    fontSize: FSize.fs11,
    paddingLeft: wp(2),
    marginTop: hp(0.5),
  },
  about: {
    color: '#444444',
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    fontSize: FSize.fs14,
  },
  aboutText: {
    color: '#454545',
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    fontSize: FSize.fs11,
    paddingRight: wp(2),
    // lineHeight: 17,
  },
  viewMore: {
    color: '#8D8D8D',
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    fontSize: 8,
    lineHeight: 17,
  },

  // modal
  mainView: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'flex-end',
  },
  lineStyle: {
    alignSelf: 'center',
    bottom: 10,
  },
  lineView: {
    width: wp(20),
    height: hp(0.5),
    backgroundColor: '#FFFFFF',
    borderRadius: wp(1),
  },
  innerView: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: wp(2),
    borderTopRightRadius: wp(2),
    height: hp(35),
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: hp(2),
  },
  uptoText: {
    marginTop: scale(20),
    color: '#343C44',
    fontSize: FSize.fs13,
    fontFamily: Font.PoppinsRegular,
  },
  moreText: {
    marginTop: scale(1),
    color: '#0D3068',
    fontSize: FSize.fs15,
    fontFamily: Font.PoppinsRegular,
  },
  containText: {
    marginTop: scale(8),
    color: '#343C44',
    fontSize: FSize.fs12,
    fontFamily: Font.PoppinsRegular,
    textAlign: 'auto',
  },
  imageStyle: {
    height: hp(20),
    width: hp(20),
    // marginTop: hp(5),
  },
  buttonStyle: {
    backgroundColor: '#0D3068',
    marginHorizontal: hp(4),
    borderRadius: hp(8),
    paddingVertical: hp(1),
    marginBottom: hp(3),
  },
  buttonText: {
    color: '#FFF',
    fontSize: 15,
    fontFamily: Font.PoppinsRegular,
    textAlign: 'center',
  },
});
