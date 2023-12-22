import React from 'react';

import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Color from '../theme/Color';
import Images from '../theme/Images';
import Font from '../theme/Font';
import FSize from '../theme/FSize';
import {scale} from '../theme/Scalling';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const HeaderCompJS = props => {
  var a = [null, '', undefined];
  return (
    <View style={styles.mainView}>
      <View>
        {props.name == "" || props.name == null? (
          <Text style={styles.text1}>Hey, There</Text>
          ) : (
            <Text style={styles.text1}>Hey, {props.name}</Text>
        )}

        <TouchableOpacity style={{width:wp(50),}} onPress={props.onPressLocation}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
            numberOfLines={1}
            ellipsizeMode='tail'
            style={styles.text2}>{props.address}</Text>
            <View style={styles.arrowicon}>
              <Image
                source={Images.rightArrowJS}
                resizeMode="contain"
                style={styles.img}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={props.onPress}
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={{height: hp(3), width: hp(3)}}>
          <Image source={Images.NotificationIconJS} style={styles.img} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderCompJS;

const styles = StyleSheet.create({
  mainView: {
    paddingVertical: hp(0.8),
    paddingHorizontal: hp(2),
    // backgroundColor: Color.Colorwhite,
    backgroundColor: '#0D3068',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp(7),
  },

  text1: {
    fontSize: FSize.fs14,

    color: '#fff',
    fontFamily: Font.PoppinsSemiBold,
  },
  text2: {
    fontSize: FSize.fs10,
    color: '#fff',
    fontFamily: Font.PoppinsRegular,
  },
  arrowicon: {
    marginLeft: wp(2),
    height: hp(2),
    width: wp(3),
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});
