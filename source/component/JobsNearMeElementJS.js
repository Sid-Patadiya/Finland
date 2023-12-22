import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { scale } from '../theme/Scalling';
import Font from '../theme/Font';
import Color from '../theme/Color';
import FSize from '../theme/FSize';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Lang } from '../translation/lang';

const JobsNearMeElementJS = props => {
  const isFocused = useIsFocused();

  const [ln, setLn] = useState('en');
  useEffect(() => {
    const setLang = async () => {
      setLn(await AsyncStorage.getItem('LanguageCode'));
    };
    setLang();
  }, [isFocused]);
  return (
    <TouchableOpacity style={styles.flatlistStyle2} onPress={props.onPress} activeOpacity={1}>
      <View
        style={{
          backgroundColor: '#E9EFF6',
          height: hp(5.5),
          width: hp(5.5),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../assets/Icon/locationjs.png')}
          style={styles.img70}
        />
      </View>

      <View style={styles.flatlistStyleInnerView}>
        <Text style={styles.candTitleText}>
          {Lang[ln].JobsNM['Within']} {props.title} {Lang[ln].JobsNM['radius']}
        </Text>
        {/* 
        {props.item == 0 ? null :
          <Text style={styles.candText}>
            {props.candidate} {Lang[ln].JobsNM['Candidatess']}
          </Text>
        } */}
      </View>

      <View
        style={{ height: hp(2.5), width: hp(3), marginLeft: wp(5) }}>
        <Image
          resizeMode="contain"
          style={{ height: '100%', width: '100%' }}
          source={require('../assets/Icon/arrowLeft.png')}
        />
      </View>
    </TouchableOpacity>
  );
};

export default JobsNearMeElementJS;

const styles = StyleSheet.create({
  flatlistStyle2: {
    marginTop: scale(10),
    backgroundColor: Color.Colorwhite,
    borderRadius: scale(3),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(10),
    marginHorizontal: hp(1),
    justifyContent: 'space-around',
  },

  img70: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },

  flatlistStyleInnerView: {
    marginHorizontal: scale(15),
    // alignItems: 'center',
    flex: 1,
  },

  candTitleText: {
    color: '#494949',
    fontSize: FSize.fs13,
    fontFamily: Font.PoppinsSemiBold,
  },
  candText: {
    color: '#444444',
    fontSize: FSize.fs11,
    fontFamily: Font.PoppinsRegular,
  },
});
