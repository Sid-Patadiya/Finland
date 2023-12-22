import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FSize from '../theme/FSize';

export default function CreateJobList(props) {
  return (
    <>
      <View style={styles.head}>
        <Text style={styles.joblistText}>{props.jobListName}</Text>
        <TouchableOpacity
          style={{width: 20, marginRight: wp(5)}}
          onPress={props.onPress}>
          <View style={styles.Image}>
            <Image
              style={styles.img}
              source={require('../assets/Icon/plus.png')}></Image>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.line}></View>
    </>
  );
}

const styles = StyleSheet.create({
  head: {
    // width: wp(95),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  line: {
    borderBottomWidth: hp(0.1),
    borderBottomColor: 'rgba(0, 0, 0, 0.1);',
    marginVertical: hp(1.5),
    marginHorizontal: hp(1.5),
  },
  joblistText: {
    paddingLeft: wp(5),
    color: '#444444',
    fontWeight: '400',
    fontSize: FSize.fs14,
    fontFamily: 'Poppins-Regular',
  },
  Image: {
    height: hp(2.4),
    width: hp(2.4),
    // marginRight:wp(20)
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
