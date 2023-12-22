import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FSize from '../theme/FSize';

const CustomSwitchJS = props => {
  const [getSelectionMode, setSelectionMode] = useState(props.selectionMode);
  
  console.log('props.selectionMode', getSelectionMode);
  const updateSwitchData = value => {
    console.log('value:::', value);
    setSelectionMode(value);
    props.onSelectSwitch(value);
  };

  return (
    <View style={styles.tabStyle}>
      <TouchableOpacity
        activeOpacity={'Ongoing Job'}
        onPress={() => updateSwitchData({key: 'Ongoing Job'})}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomColor:
            getSelectionMode.key === 'Ongoing Job' ? '#0D3068' : '#D4D6DB',
          borderBottomWidth:
            getSelectionMode.key === 'Ongoing Job' ? hp(0.3) : hp(0),
        }}>
        <Text
          style={{
            color:
              getSelectionMode.key === 'Ongoing Job' ? '#0D3068' : '#444444',
            fontWeight: getSelectionMode.key === 'Ongoing Job' ? '600' : '300',
            fontFamily: 'Poppins-Regular',
            fontSize: FSize.fs11,
          }}>
          {props.option1}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={'Unlocked by Recruiter'}
        onPress={() => updateSwitchData({key: 'Unlocked by Recruiter'})}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomWidth:
            getSelectionMode.key === 'Unlocked by Recruiter' ? hp(0.2) : hp(0),
          borderBottomColor:
            getSelectionMode.key === 'Unlocked by Recruiter'
              ? '#0D3068'
              : '#D4D6DB',
        }}>
        <Text
          style={{
            color:
              getSelectionMode.key === 'Unlocked by Recruiter'
                ? '#0D3068'
                : '#444444',
            fontWeight:
              getSelectionMode.key === 'Unlocked by Recruiter' ? '500' : '300',
            fontFamily: 'Poppins-Regular',
            fontSize: FSize.fs11,
          }}>
          {props.option2}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={'Applied Jobs'}
        onPress={() => updateSwitchData({key: 'Applied Jobs'})}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomWidth:
            getSelectionMode.key === 'Applied Jobs' ? hp(0.2) : hp(0),
          borderBottomColor:
            getSelectionMode.key === 'Applied Jobs' ? '#0D3068' : '#D4D6DB',
        }}>
        <Text
          style={{
            color:
              getSelectionMode.key === 'Applied Jobs' ? '#0D3068' : '#444444',
            fontWeight: getSelectionMode.key === 'Applied Jobs' ? '500' : '300',
            fontFamily: 'Poppins-Regular',
            fontSize: FSize.fs11,
          }}>
          {props.option3}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomSwitchJS;

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
