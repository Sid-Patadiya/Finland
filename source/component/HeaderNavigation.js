import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Font from '../theme/Font';
import FSize from '../theme/FSize';

export default function HeaderNavigation(props) {
  return (
    <View
      style={{
        backgroundColor: '#0D3068',
        height: hp(7),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            width: wp(15),
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={props.onPress}>
          <Image
            style={{
              width: '40%',
              height: '40%',
              resizeMode: 'contain',
            }}
            source={require('../assets/Icon/backArrowWhite.png')}></Image>
        </TouchableOpacity>

        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              fontFamily: Font.PoppinsRegular,
              color: '#FFFFFF',
              fontWeight: '500',
              fontSize: FSize.fs16,
              lineHeight: 21,
            }}>
            {props.heading}
          </Text>
        </View>
      </View>

      <View style={{flex: 1, alignItems: 'flex-end'}}>
        {props.lastSeen == true ? (
          <TouchableOpacity style={{paddingHorizontal: wp(4)}}>
            <View style={styles.dot}></View>
            <View style={styles.dot}></View>
            <View style={styles.dot}></View>
          </TouchableOpacity>
        ) : null}
      </View>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    height: hp(0.5),
    margin: hp(0.2),
    width: hp(0.5),
    backgroundColor: '#FFF',
    borderRadius: hp(1),
  },
});
