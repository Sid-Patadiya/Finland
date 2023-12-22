import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FSize from '../theme/FSize';

const MapCardViewJS = props => {
  const [getSelectionMode, setSelectionMode] = useState(props.selectionMode);

  console.log('props.selectionMode', getSelectionMode.key);
  const updateSwitchData = value => {
    console.log('value:::', value);
    setSelectionMode(value);
    props.onSelectSwitch(value);
  };

  return (
    <View style={styles.tabStyle}>
      <TouchableOpacity
        activeOpacity={'Map View'}
        onPress={() => updateSwitchData({key: 'Map View'})}
        style={{
          justifyContent: 'center',
          alignItems: 'center',

          paddingHorizontal: hp(2),
          borderBottomColor:
            getSelectionMode.key == 'Map View' ? '#0D3068' : '#D4D6DB',
          borderBottomWidth:
            getSelectionMode.key == 'Map View' ? hp(0.2) : hp(0),
        }}>
        <Text
          style={{
            color: getSelectionMode.key == 'Map View' ? '#0D3068' : '#444444',
            fontWeight: getSelectionMode.key == 'Map View' ? '600' : '300',
            fontFamily: 'Poppins-Regular',
            fontSize: FSize.fs17,
          }}>
          {props.option1}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={'Card View'}
        onPress={() => updateSwitchData({key: 'Card View'})}
        style={{
          justifyContent: 'center',
          alignItems: 'center',

          paddingHorizontal: hp(2),
          borderBottomWidth:
            getSelectionMode.key == 'Card View' ? hp(0.2) : hp(0),
          borderBottomColor:
            getSelectionMode.key == 'Card View' ? '#0D3068' : '#D4D6DB',
        }}>
        <Text
          style={{
            color: getSelectionMode.key == 'Card View' ? '#0D3068' : '#444444',
            fontWeight: getSelectionMode.key == 'Card View' ? '500' : '300',
            fontFamily: 'Poppins-Regular',
            fontSize: FSize.fs17,
          }}>
          {props.option2}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MapCardViewJS;

const styles = StyleSheet.create({
  tabStyle: {
    backgroundColor: '#FFFFFF',
    height: hp(7),
    width: wp(100),
    flexDirection: 'row',
    justifyContent: 'space-evenly',

    shadowColor: 'black',
    shadowOffset: {width: wp(0.1), height: hp(0.1)},
    elevation: hp(1),
    shadowOpacity: 1,
  },
});
