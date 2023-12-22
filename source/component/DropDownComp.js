import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Color from '../theme/Color';
import Font from '../theme/Font';
import FSize from '../theme/FSize';

export default function DropDown({
  data,
  value,
  placeholder,
  ItemName,
  onChangeText,
  inputShow,
  writeList,
  multiSelect = false,
  onSelect = () => {},
  onSelectMultiple = () => {},
  onAdd,
}) {
  const [show, setShow] = useState(false);

  const getNameById = () => {
    let _value = data?.filter(x => x?.id == value);
    if (_value && _value.length > 0) {
      return _value[0][ItemName];
    } else {
      return '';
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.dropdown} onPress={() => setShow(!show)}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: getNameById() ? '#000' : '#96989A'}}>
            {getNameById() ? getNameById() : placeholder}
          </Text>
        </View>

        <Image
          source={require('../assets/Icon/downArrowLight.png')}
          style={[styles.icon, show ? {transform: [{rotate: '180deg'}]} : null]}
          resizeMode="contain"
        />
      </TouchableOpacity>
      {show && (
        <View style={styles.itemStyle}>
          {inputShow && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                // marginHorizontal: hp(2),
              }}>
              <TextInput
                placeholderTextColor={'#96989A'}
                placeholder={'Add Your List'}
                style={styles.textInput}
                onChangeText={onChangeText}
              />
              <TouchableOpacity
                onPress={onAdd}
                disabled={!writeList ? true : false}
                style={{
                  //   borderWidth: 1,
                  padding: hp(1),
                  borderRadius: 10,
                  opacity: !writeList ? 0.4 : null,
                  backgroundColor: '#1374DF',
                }}>
                <Text style={{fontSize: 15, color: Color.Colorwhite}}>Add</Text>
              </TouchableOpacity>
            </View>
          )}

          <ScrollView nestedScrollEnabled={true}>
            {data?.map((val, i) => {
              console.log('val', val);
              return (
                <TouchableOpacity
                  style={{padding: hp(1)}}
                  key={String(i)}
                  onPress={
                    multiSelect == true
                      ? () => [onSelectMultiple(val)]
                      : () => [onSelect(val), setShow(false)]
                  }>
                  <Text style={{marginVertical: 2}}>{val[ItemName]}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: hp(0.1),
    borderColor: '#D2D2D2',
    borderRadius: hp(0.5),
    marginTop: hp(1.5),
    paddingVertical: hp(2),
    paddingHorizontal: hp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    height: hp(2),
    width: hp(3),
  },
  itemStyle: {
    borderWidth: hp(0.1),
    borderColor: '#D2D2D2',
    borderRadius: hp(0.5),
    height: Dimensions.get('screen').height / 4,
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: '#D2D2D2',
    borderRadius: hp(0.5),
    paddingHorizontal: hp(2),
    fontSize: FSize.fs13,
    fontWeight: '400',
    fontFamily: Font.PoppinsRegular,
    width: '85%',
  },
});
