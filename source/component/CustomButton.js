import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Font from '../theme/Font';
import FSize from '../theme/FSize';
// import { TouchableOpacity } from 'react-native-gesture-handler';

export default function CustomButton({btnTxt}) {
  return (
    <View
      style={{
        height: hp(6),
        backgroundColor: '#0D3068',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: hp(0.5),
      }}>
      <Text style={styles.text}>{btnTxt}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: FSize.fs15,
    fontFamily: Font.PoppinsRegular,
  },
});
