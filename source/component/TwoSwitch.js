import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FSize from '../theme/FSize';
import Font from '../theme/Font';

const TwoSwitch = props => {
  const [getSelectionMode, setSelectionMode] = useState(props.selectionMode);

  const updateSwitchData = value => {
    setSelectionMode(value);
    props.onSelectSwitch(value);
  };

  return (
    <View style={styles.tabStyle}>
      <View style={{width: wp(35)}}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updateSwitchData(1)}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomColor: getSelectionMode == 1 ? '#0D3068' : '#D4D6DB',
            borderBottomWidth: getSelectionMode == 1 ? hp(0.2) : hp(0),
          }}>
          <Text
            style={{
              color: getSelectionMode == 1 ? '#0D3068' : '#3D3E40',
              fontFamily:
                getSelectionMode == 1
                  ? Font.PoppinsSemiBold
                  : Font.PoppinsRegular,
              fontSize: FSize.fs17,
            }}>
            {props.option1}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{width: wp(35)}}>
        <TouchableOpacity
          activeOpacity={2}
          onPress={() => updateSwitchData(2)}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: getSelectionMode == 2 ? hp(0.2) : hp(0),
            borderBottomColor: getSelectionMode == 2 ? '#0D3068' : '#D4D6DB',
          }}>
          <Text
            style={{
              color: getSelectionMode == 2 ? '#0D3068' : '#3D3E40',
              fontWeight: getSelectionMode == 2 ? '400' : '400',
              fontFamily:
                getSelectionMode == 2
                  ? Font.PoppinsSemiBold
                  : Font.PoppinsRegular,
              fontSize: FSize.fs16,
            }}>
            {props.option2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TwoSwitch;

const styles = StyleSheet.create({
  tabStyle: {
    height: hp(5),
    width: wp(100),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderBottomWidth: hp(0.1),
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
  },
});
