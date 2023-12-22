import React from 'react';
import {moderateScale, verticalScale} from '../theme/Scalling';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  StyleSheet,
  TextInput,
} from 'react-native';
import SearchJS from './SearchJS';
// import TextInputWithLabelComponent from '../TextInputWithLabel';
// import fonts from '../../';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Color from '../theme/Color';

const AutoCompleteInput = props => {
  let {
    listname = 'name',
    onPress,
    show,
    onChange,
    label,
    list = [],
    load = false,
    inputvalue = '',
    serchIconInput,
    placeholder,
    customstyle,
    value = '',
  } = props;

  return (
    <View style={styles.container}>
      {serchIconInput == true ? (
        <View
          style={{
            height: hp(6),
            marginVertical: hp(0.5),
            marginTop: hp(1.5),
          }}>
          <SearchJS
            placeholder={'Search by Area/Street/City Name'}
            onChangeText={text => onChange(text)}
            value={inputvalue}
          />

          {load && <ActivityIndicator style={styles.indicator} />}
        </View>
      ) : (
        <View
          style={{
            // height: hp(6),
            // marginVertical: hp(0.5),
            // marginTop: hp(1.5),
          }}>
          <TextInput
            placeholderTextColor={'#96989A'}
            placeholder={placeholder}
            style={customstyle}
            value={value}
            onChangeText={text => onChange(text)}
          />
          {load && <ActivityIndicator style={styles.indicator} />}
        </View>
      )}

      {show && (
        <View
          style={[
            styles.dropDownContainer,
            // {height: list.length <= 2 ? undefined : moderateScale(250)},
          ]}>
          <ScrollView nestedScrollEnabled={true}>
            {list.map((i, k) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    onPress(i.place_id, i.description);
                  }}>
                  <View
                    style={[
                      styles.dropDownItem,
                      {borderBottomWidth: k === list.length - 1 ? 0 : 1},
                    ]}>
                    {/* {/ {lefticon && <Icon type="entypo" name="location-pin" />} /} */}
                    <Text style={styles.itemText}>{i[listname]}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default AutoCompleteInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 10,
  },
  indicator: {
    position: 'absolute',
    bottom: 18,
    right: 18,
  },
  dropDownContainer: {
    borderRadius: 10,
    backgroundColor: 'white',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    marginTop: Platform.OS === 'ios' ? moderateScale(100) : moderateScale(60),
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 7,
    position: 'absolute',
    zIndex: 20,
  },
  dropDownItem: {
    borderBottomColor: Color.TextGrayColor,
    paddingHorizontal: moderateScale(5),
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  itemText: {
    width: '90%',
    textAlignVertical: 'center',
    fontSize: moderateScale(12),
    fontWeight: '500',
    // fontFamily: fonts.ProximaNova,
    paddingVertical: verticalScale(15),
    paddingLeft: moderateScale(10),
    color: Color.ColorBlack,
  },
});
