import React from 'react';
import {
  View,
  Image,
  TextInput,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Font from '../theme/Font';
import FSize from '../theme/FSize';
import Images from '../theme/Images';
import {scale} from '../theme/Scalling';

const SearchJS = props => {
  return (
    <TouchableOpacity style={styles.textboxinnerOne} onPress={props.onPress}>
      <View style={styles.icon}>
        <Image style={styles.img} source={Images.searchJS}></Image>
      </View>
      <TextInput
        numberOfLines={1}
        multiline={false}
        placeholderTextColor="#939393"
        placeholder={props.placeholder}
        style={styles.inputFeed}
        onChangeText={props.onChangeText}
        value={props.value}
      />
    </TouchableOpacity>
  );
};
export default SearchJS;
const styles = StyleSheet.create({
  textboxinnerOne: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: wp(4),
    marginHorizontal: scale(10),
    borderRadius: hp(3),
    borderColor: '#D2D2D2',
    borderWidth: hp(0.1),
  },

  inputFeed: {
    flex: 1,
    // color: 'red',
    color: '#939393',
    fontSize: FSize.fs12,
    fontFamily: Font.PoppinsRegular,
    width: '100%',
    marginBottom: scale(-3),
  },
  icon: {
    height: hp(3),
    width: hp(3),
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});
