import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Font from '../theme/Font';
import { scale } from '../theme/Scalling';
import FSize from '../theme/FSize';
import { useIsFocused } from '@react-navigation/native';
import { Lang } from '../translation/lang';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AvailablePartTime({
  values,
  onValuesChange,
  dayName,
  data,
  onPressaddItem,
  availabaleSlot,
  onPressDelete,
}) {
  console.log('values--->', values);
  const [timeSlot, setTimeSlot] = useState(false);
  // const [mondayValue, setMondayValue] = useState([0.0, 1]);
  // const [addRange, setAddRange] = useState([]);
  // const [availabaleSlot, setAvailabaleSlot] = useState(0);

  //---------Language---------\\
  const IsFocused = useIsFocused();
  const [ln, setLn] = useState('en');
  useEffect(() => {
    const setLang = async () => {
      setLn(await AsyncStorage.getItem('LanguageCode'));
    };
    setLang();
  }, [IsFocused]);

  // const addItem = () => {
  //   let temp = addRange;
  //   temp.push(mondayValue);
  //   console.log('temp::', temp);
  //   setAvailabaleSlot(temp.length);
  //   setAddRange([...temp]);
  // };

  // const deleteAddRange = index => {
  //   let temp = addRange;
  //   let newTemp = [];
  //   temp.map((mapItem, mapIndex) => {
  //     console.log('mapIndex::', mapIndex);
  //     console.log('index::', index);
  //     if (mapIndex !== index) {
  //       newTemp.push(mapItem);
  //     }
  //   });
  //   setAvailabaleSlot(newTemp.length);
  //   setAddRange([...newTemp]);
  // };
  return (
    <View style={styles.dayDropDownStyle}>
      <TouchableOpacity
        style={styles.dayView}
        onPress={() => setTimeSlot(!timeSlot)}>
        <Text style={styles.dayText}>{dayName}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {availabaleSlot !== 0 ? (
            <Text style={styles.timeText}>
              ({availabaleSlot}{' '}
              {timeSlot == true
                ? Lang[ln].Profile['Slots Available']
                : Lang[ln].Profile['Slots Entered']}
              )
            </Text>
          ) : null}

          <View style={styles.arrowImage}>
            <Image
              source={require('../assets/Icon/downArrowLight.png')}
              style={[
                styles.downArrow,
                { transform: [{ rotate: timeSlot ? '180deg' : '0deg' }] },
              ]}
            />
          </View>
        </View>
      </TouchableOpacity>
      {timeSlot === true ? (
        <>
          <Text style={styles.text2}>
            {Lang[ln].Profile['All times are in your local time']} (PST)
          </Text>

          <View style={styles.sliderView}>
            <View>
              <View style={styles.sliderInnerView}>
                <Text style={styles.timeSlotText}>Time Slot</Text>
                <Text style={styles.timeText}>
                  {(values[0]).toFixed(2)} {Lang[ln].Profile['am']} -{' '}
                  {(values[1]).toFixed(2)} {Lang[ln].Profile['pm']}
                </Text>
              </View>

              <View style={{ marginTop: hp(1.5) }}>
                <MultiSlider
                  // values={[mondayValue[0], mondayValue[1]]}
                  // onValuesChange={value => setMondayValue(value)}
                  step={1}
                  values={values}
                  onValuesChange={onValuesChange}
                  min={1}
                  sliderLength={250}
                  max={1440}
                  selectedStyle={{ backgroundColor: '#0D3068' }}
                  markerStyle={styles.markerStyle}
                  containerStyle={{
                    height: 10,
                  }}
                />
              </View>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={onPressaddItem}>
              <Text style={styles.addText}>{Lang[ln].Profile['Add']}</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.timeAddView}>
                  <Text style={styles.timeText}>
                    {(item[0]).toFixed(2)} am - {(item[1]).toFixed(2)} pm
                  </Text>
                  <TouchableOpacity
                    style={styles.xstyle}
                    onPress={() => onPressDelete(item, index)}>
                    <Image
                      source={require('../assets/Icon/x.png')}
                      style={styles.xImage}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  downArrow: {
    height: hp(2),
    width: hp(2.5),
    resizeMode: 'contain',
  },
  arrowImage: {
    padding: 5,
    marginLeft: hp(1.5),
  },
  dayDropDownStyle: {
    paddingVertical: hp(1.5),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#D2D2D2',
    paddingHorizontal: hp(2),
    marginVertical: hp(1),
  },
  dayView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayText: {
    color: '#444444',
    fontFamily: Font.PoppinsSemiBold,
    fontSize: 16,
    fontWeight: '400',
  },
  sliderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1),
    alignItems: 'center',
    flex: 1,
  },
  sliderInnerView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(10),
    alignItems: 'center',
  },
  text2: {
    color: '#444444',
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs13,
    fontWeight: '400',
    marginTop: hp(1.6),
  },
  timeSlotText: {
    color: '#454545',
    fontFamily: Font.PoppinsSemiBold,
    fontSize: FSize.fs13,
    fontWeight: '400',
  },
  timeText: {
    color: '#444444',
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs13,
    fontWeight: '400',
  },
  markerStyle: {
    backgroundColor: '#0D3068',
    height: scale(15),
    width: scale(15),
  },
  addButton: {
    marginTop: hp(1.5),
    backgroundColor: '#0D3068',
    alignItems: 'center',
    justifyContent: 'center',
    // height: hp(3),
    paddingVertical: hp(0.5),
    paddingHorizontal: hp(1),
    borderRadius: hp(2),
    marginHorizontal: hp(2),
  },
  addText: {
    color: '#FFFF',
    fontFamily: Font.PoppinsRegular,
    fontSize: 12,
    fontWeight: '400',
  },
  timeAddView: {
    marginRight: hp(2),
    marginVertical: hp(3),
    borderWidth: 1,
    borderColor: '#D2D2D2',
    padding: hp(1),
    borderRadius: 5,
  },
  xstyle: {
    backgroundColor: '#D93E30',
    position: 'absolute',
    right: hp(-1.4),
    top: hp(-1.5),
    borderRadius: hp(2),
    padding: 5,
  },
  xImage: {
    height: hp(1),
    width: hp(1),
    resizeMode: 'contain',
    margin: 2,
  },
});
