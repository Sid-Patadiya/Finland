import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FSize from '../theme/FSize';

export default function ProfileNavigation(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <View style={styles.iconBox}>
            <Image style={styles.icon} source={props.image}></Image>
          </View>
        </View>

        <View style={[styles.row, {justifyContent: 'space-between', flex: 1}]}>
          <View>
            <Text style={styles.text}>{props.label}</Text>
          </View>

          <View style={{width: wp(8)}}>
            <View style={{width: hp(2.7), height: hp(2.7)}}>
              <Image
                style={styles.arrow}
                source={require('../assets/Icon/arrowRight.png')}></Image>
            </View>
          </View>
        </View>
      </View>
      {/* line */}
      {props.noLine == true ? null : (
        <View
          style={{
            borderBottomColor: '#d9d9d9',
            borderBottomWidth: hp(0.1),
            marginLeft: wp(15),
          }}></View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#F0F6FF',
    height: hp(5.2),
    width: hp(5.2),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp(4),
    marginVertical: 12,
    borderRadius: hp(1),
  },
  iconBox: {
    width: hp(3.7),
    height: hp(3.7),
  },
  icon: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
  arrow: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    color: '#656567',
    fontSize: FSize.fs14,
    fontWeight: '400',
  },
});
