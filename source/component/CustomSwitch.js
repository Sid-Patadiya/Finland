import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CustomSwitch = props => {
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
            borderBottomColor:
              getSelectionMode == 1 ? 'rgba(13, 48, 104, 0.6)' : '#D4D6DB',
            borderBottomWidth: getSelectionMode == 1 ? hp(0.2) : hp(0),
          }}>
          <Text
            style={{
              color: getSelectionMode == 1 ? '#0D3068' : '#3D3E40',
              fontWeight: getSelectionMode == 1 ? 'bold' : '400',
              fontFamily: 'Poppins-Regular',
              fontSize: hp(2),
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
            borderBottomColor:
              getSelectionMode == 2 ? 'rgba(13, 48, 104, 0.6)' : '#D4D6DB',
          }}>
          <Text
            style={{
              color: getSelectionMode == 2 ? '#0D3068' : '#3D3E40',
              fontWeight: getSelectionMode == 2 ? 'bold' : '400',
              fontFamily: 'Poppins-Regular',
              fontSize: hp(2),
            }}>
            {props.option2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomSwitch;

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
