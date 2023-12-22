import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FSize from '../theme/FSize';
import Font from '../theme/Font';
import LinearGradient from 'react-native-linear-gradient';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Lang } from '../translation/lang';

export default function UBRElementJS(props) {
  const isFocused = useIsFocused();

  const [ln, setLn] = useState('en');
  useEffect(() => {
    const setLang = async () => {
      setLn(await AsyncStorage.getItem('LanguageCode'));
    };
    setLang();
  }, [isFocused]);
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.main}
      onPress={props?.onItemPress}
    >
      <View style={styles.imgFrame}>
        <ImageBackground
          resizeMode="cover"
          source=
          {props.bgImg == "" ? `${require('../assets/Icon/bgOnejs.png')}` : { uri: props.bgImg }}
          style={styles.img}
        >
          <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            colors={['rgba(0, 0, 0, 0)', '#020202']}>
            <View style={styles.row}>
              <View style={styles.profile}>
                <Image style={[styles.img]}
                  resizeMode={'cover'}
                  source=
                  {props.Pofile == "" ? `${require('../assets/Icon/Vector.png')}` : { uri: props.Pofile }}
                >
                </Image>
              </View>
              <View>
                <Text style={styles.name}>{props.name}</Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={[styles.desc, { fontSize: FSize.fs10, width: wp(30) }]}>{props.company_name}</Text>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>

      {parseInt(props.percentage_match) == 0 && props.distance <= 10 ? (
        <View style={styles.whiteBg}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: hp(3),
                width: hp(3),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={styles.img}
                source={require('../assets/Icon/matchTick.png')}></Image>
            </View>
            <Text style={styles.percentMatch}>
              10 % {Lang[ln].UBRecruiter['Match']}
            </Text>
          </View>
        </View>)
        : (
          <View style={styles.whiteBg}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  height: hp(3),
                  width: hp(3),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={styles.img}
                  source={require('../assets/Icon/matchTick.png')}></Image>
              </View>
              <Text style={styles.percentMatch}>
                {props.percentage_match} % {Lang[ln].UBRecruiter['Match']}
              </Text>
            </View>
          </View>
        )}

      {props.title == "" ? null : (
        <Text style={styles.designation}>
          {props.title} {Lang[ln].UBRecruiter['Needed']}
        </Text>
      )
      }

      <Text style={styles.company}>{props.company_name}</Text>

      {props.date == "" ? null : (
        <View style={styles.bg}>
          <Text style={styles.dateText}>
            {Lang[ln].UBRecruiter['Unlocked by Recruiter on']} {props.date.split("-").reverse().join("-")}
          </Text>
        </View>
      )}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: hp(2),
        }}>

        {props.ExpYear == "" ? null :
          <View style={{ marginHorizontal: hp(2) }}>
            <Text style={styles.subHeading}>
              {props.ExpYear} {Lang[ln].UBRecruiter['Years']}
            </Text>
            <Text style={styles.company}>
              {Lang[ln].UBRecruiter['Total Experience']}
            </Text>
          </View>
        }

        {props.distance == "" || props.ExpYear == "" ? null :
          <View style={styles.line}></View>
        }

        {props.distance == "" ? null : (
          <View style={{ marginHorizontal: hp(2) }}>
            <Text style={styles.subHeading}>
              {props.distance}
              {/* {Lang[ln].UBRecruiter['Km Away']} */}
              KM Away
            </Text>
            <Text style={styles.company}>
              {Lang[ln].UBRecruiter['Current Locaiton']}
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.btnOrange} onPress={props.onPress}>
        <Text
          style={{
            color: '#FFFFFF',
            fontFamily: Font.PoppinsRegular,
            fontSize: FSize.fs13,
          }}>
          {Lang[ln].UBRecruiter['Chat Now']}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FFF',
    paddingHorizontal: hp(2),
    marginHorizontal: hp(1),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(3),
  },
  imgFrame: {
    height: hp(27),
    width: hp(27),
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profile: {
    margin: hp(1),
    borderRadius: hp(3.5),
    height: hp(7),
    width: hp(7),
    overflow: 'hidden'
  },
  name: {
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs11,
    color: '#FFF',
  },
  desc: {
    fontFamily: Font.PoppinsSemiBold,
    fontSize: FSize.fs13,
    color: '#FFF',
  },
  whiteBg: {
    marginTop: hp(-4),
    backgroundColor: '#fff',
    paddingVertical: hp(0.7),
    width: hp(18),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp(8),
  },

  percentMatch: {
    top: 2,
    color: '#1B2C6B',
    fontSize: FSize.fs11,
    fontWeight: '400',
    fontFamily: Font.PoppinsRegular,
    paddingLeft: hp(1),
  },
  designation: {
    textAlign: 'center',
    marginTop: hp(1.5),
    color: '#2B2B2B',
    fontSize: FSize.fs13,
    fontFamily: Font.PoppinsSemiBold,
    // fontFamily: Font.PoppinsBold,
  },
  company: {
    textAlign: 'center',
    color: '#454545',
    fontSize: FSize.fs11,
    fontFamily: Font.PoppinsRegular,
  },
  bg: {
    backgroundColor: '#E9EFF6',
    // height: hp(6),
    paddingVertical: hp(1),
    // width: '85%',
    paddingHorizontal: hp(2),
    marginTop: hp(1),
    justifyContent: 'center',
    borderRadius: hp(1),
  },
  dateText: {
    textAlign: 'center',
    color: '#454545',
    fontSize: FSize.fs12,
    fontFamily: Font.PoppinsRegular,
  },
  line: {
    // marginTop: hp(1.8),
    // alignItems: 'center',
    height: hp(7),
    borderLeftWidth: hp(0.1),
    borderLeftColor: '#00000045',
    // marginHorizontal: hp(1),
  },
  subHeading: {
    color: '#444444',
    fontSize: FSize.fs11,
    fontFamily: Font.PoppinsRegular,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: hp(1),
  },
  btnOrange: {
    backgroundColor: '#0858AF',
    paddingHorizontal: wp(10),
    paddingVertical: hp(0.7),
    borderRadius: wp(4),
    marginTop: hp(1.5),
  },
});
