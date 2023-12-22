import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
('../../../');
import Color from '../../../theme/Color';
import Font from '../../../theme/Font';
import Images from '../../../theme/Images';
import FSize from '../../../theme/FSize';

import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {scale} from '../../../theme/Scalling';

import MultiSlider from '@ptomasroos/react-native-multi-slider';
import SearchJS from '../../../component/SearchJS';
import HeaderNavigation from '../../../component/HeaderNavigation';

// const lookingData = [
//   {
//     id: 1,
//     job: 'Plumber',
//   },
//   {
//     id: 2,
//     job: 'Painter',
//   },
//   {
//     id: 3,
//     job: 'Carpenter',
//   },
//   {
//     id: 4,
//     job: 'Driver',
//   },
//   {
//     id: 5,
//     job: 'Technician',
//   },
//   {
//     id: 6,
//     job: 'Nurse',
//   },
//   {
//     id: 7,
//     job: 'Construction',
//   },
//   {
//     id: 8,
//     job: 'Electrician',
//   },
// ];

const candidateTypeData = [
  {
    id: 1,
    title: 'Free',
  },
  {
    id: 2,
    title: 'Verified',
  },
  {
    id: 3,
    title: 'Premium',
  },
];
const SearchJobsJS = ({
  onSelect,
  data,
  goBack,
  searchNow,
  experienceValue,
  experienceValueChange,
  distanceValue,
  distanceValueChange,
  // ageValue,
  // ageValueChange,
  salaryValue,
  salaryValueChange,
}) => {
  // const [lookingDataValue, setLookingDataValue] = useState(lookingData);

  const [employValue, setEmployValue] = useState(null);

  const [genderValue, setGenderValue] = useState(null);

  // const [experienceValue, setExperienceValue] = useState([0, 3]);
  // const [distanceValue, setDistanceValue] = useState(50);
  // const [ageValue, setAgeValue] = useState([0, 1]);
  // const [salaryValue, setSalaryValue] = useState([3, 7]);

  // const experienceValueChange = values => setExperienceValue(values);
  // const ageValueChange = values => setAgeValue(values);
  // const salaryValueChange = values => setSalaryValue(values);

  const selectLokingItem = item => {
    console.log('item----', item);
    let temp = lookingDataValue;

    temp.map((tempItem, tenpIndex) => {
      console.log('item ====>', tempItem);
      if (tempItem.id === item.id) {
        if (item.check !== undefined) {
          if (item.check === true) {
            item.check = false;
          } else {
            item.check = true;
          }
        } else {
          temp[tenpIndex] = {...tempItem, check: true};
        }
      } else {
        if (tempItem.check !== undefined) {
          if (tempItem.check === true) {
            tempItem.check = false;
          }
        }
      }
      setLookingDataValue([...temp]);
    });
  };

  return (
    <View style={styles.container}>
      <HeaderNavigation onPress={goBack} heading={'Search Jobs'} />

      <View style={{flex: 1, marginTop: hp(2)}}>
        {/* <SearchJS placeholder={'Search by Job /Title/Category'} />


        <Text style={styles.headerText}>Looking For</Text>

        <FlatList
          data={lookingDataValue}
          scrollEnabled={true}
          horizontal
          showsHorizontalScrollIndicator={false}
          View
          contentContainerStyle={{paddingHorizontal: wp(4)}}
          renderItem={({item}) => {
            return (
              <View style={{flexDirection: 'row', display: 'flex'}}>
                <TouchableOpacity
                  style={[
                    styles.flatlistView,
                    item.check === true
                      ? {
                          backgroundColor: '#0D3068',
                        }
                      : {
                          backgroundColor: 'rgba(0, 0, 0, 0.08)',
                          borderColor: 'rgba(0, 0, 0, 0.1)',
                          borderWidth: scale(2),
                        },
                  ]}
                  onPress={() => selectLokingItem(item)}>
                  <Text
                    style={[
                      styles.jobText,
                      item.check === true
                        ? {color: Color.Colorwhite}
                        : {
                            color: Color.ColorBlack,
                          },
                    ]}>
                    {item.job}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />

        <TouchableOpacity style={styles.dropDownView}>
          <Text style={styles.field}>Select Skills *</Text>

          <View style={{height: hp(2.5), width: hp(2.5)}}>
            <Image
              style={{height: '100%', width: '100%', resizeMode: 'contain'}}
              source={Images.downArrow}
            />
          </View>
        </TouchableOpacity> */}

        <Text style={styles.headerText}>Employment Type</Text>

        <View style={styles.typesView}>
          <FlatList
            data={data}
            horizontal
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.typesStyles,
                    item.check === true
                      ? {
                          backgroundColor: '#0D3068',
                        }
                      : {
                          backgroundColor: 'rgba(0, 0, 0, 0.08)',
                          borderColor: 'rgba(0, 0, 0, 0.1)',
                          borderWidth: scale(2),
                        },
                  ]}
                  onPress={() => onSelect(item, index)}>
                  <Text
                    style={[
                      styles.jobText,
                      item.check === true
                        ? {color: Color.Colorwhite}
                        : {
                            color: Color.ColorBlack,
                          },
                    ]}>
                    {item.type}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* experience */}
        <View style={styles.sliderView}>
          <View style={styles.sliderInnerView}>
            <Text style={styles.field}>Experience</Text>
            <Text style={styles.field}>
              {experienceValue[0]} - {experienceValue[1]} Years
            </Text>
          </View>

          <MultiSlider
            // values={[experienceValue[0], experienceValue[1]]}
            // onValuesChange={value => experienceValueChange(value)}
            values={experienceValue}
            onValuesChange={experienceValueChange}
            min={0}
            max={30}
            selectedStyle={{backgroundColor: '#0D3068'}}
            markerStyle={styles.markerStyle}
            containerStyle={{
              height: 10,
              paddingHorizontal: scale(20),
              paddingBottom: 15,
              flex: 1,
            }}
          />
        </View>

        <View style={styles.sliderView}>
          <View style={styles.sliderInnerView}>
            <Text style={styles.field}>Maximum Distance</Text>
            <Text style={styles.field}>{distanceValue} KM</Text>
          </View>
          <MultiSlider
            // sliderLength={300}
            onValuesChange={distanceValueChange}
            min={0}
            max={100}
            selectedStyle={{backgroundColor: '#0D3068'}}
            markerStyle={styles.markerStyle}
            containerStyle={{
              height: 10,
              paddingHorizontal: scale(20),
              paddingBottom: 15,
              flex: 1,
            }}
          />
        </View>

        {/* <View style={styles.sliderView}>
          <View style={styles.sliderInnerView}>
            <Text style={styles.field}>Age</Text>
            <Text style={styles.field}>
              {ageValue[0]} - {ageValue[1]}
            </Text>
          </View>
          <MultiSlider
            values={ageValue}
            // sliderLength={330}
            onValuesChange={ageValueChange}
            min={0}
            max={50}
            selectedStyle={{backgroundColor: '#0D3068'}}
            markerStyle={styles.markerStyle}
            containerStyle={{height: 10, paddingHorizontal: scale(20),  paddingBottom: 15,flex: 1}}
          />
        </View> */}
        <View style={styles.sliderView}>
          <View style={styles.sliderInnerView}>
            <Text style={styles.field}>Salary</Text>
            <Text style={styles.field}>
              {salaryValue[0]}k - {salaryValue[1]}k
            </Text>
          </View>
          <MultiSlider
            values={salaryValue}
            // sliderLength={330}
            onValuesChange={salaryValueChange}
            min={0}
            max={100}
            selectedStyle={{backgroundColor: '#0D3068'}}
            markerStyle={styles.markerStyle}
            containerStyle={{
              height: scale(10),
              paddingHorizontal: scale(20),
              paddingBottom: 15,
              flex: 1,
            }}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.buttonView} onPress={searchNow}>
        <Text style={styles.btnText}>Search Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchJobsJS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAF6',
  },
  //--------------------- SreachBar style

  headerText: {
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs14,
    fontWeight: '500',
    color: '#454545',
    marginHorizontal: wp(4),
    marginTop: hp(2),
  },
  searchView: {
    height: 40,
    marginTop: scale(12),
    marginHorizontal: scale(10),
  },
  textboxinnerOne: {
    flex: 1,
    paddingHorizontal: scale(7),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: scale(1),
    height: scale(37),
    borderRadius: scale(20),
    borderWidth: scale(0.1),
  },

  text: {
    fontSize: scale(14),
    fontFamily: Font.PoppinsRegular,
    color: Color.ColorBlack,
    marginHorizontal: scale(15),
    marginTop: scale(15),
    fontWeight: '500',
  },
  //--------------------- Flatlist Styels

  flatlistView: {
    // flex: 1,
    // display: 'flex',
    // flexWrap: 'wrap',
    borderRadius: hp(7),
    justifyContent: 'center',
    alignItems: 'center',

    marginHorizontal: wp(2),

    paddingHorizontal: wp(3),

    paddingVertical: hp(0.5),
    marginVertical: hp(0.5),
  },

  jobText: {
    fontFamily: Font.PoppinsRegular,
    fontWeight: '600',
    fontSize: FSize.fs12,
    textAlign: 'center',
  },
  //-------------------
  field: {
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs12,
    color: '#96989A',
  },
  dropDownView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: scale(0.5),
    marginHorizontal: scale(15),
    borderRadius: scale(20),
    paddingHorizontal: scale(15),
    marginVertical: scale(10),
    paddingVertical: scale(10),
  },
  typesView: {
    // flex: 1,
    flexDirection: 'row',
    marginTop: scale(5),
    marginHorizontal: scale(12),
  },
  typesStyles: {
    marginTop: hp(1),
    paddingVertical: hp(0.6),
    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: wp(4),
    marginHorizontal: wp(1.5),

    borderRadius: hp(3),

    // marginHorizontal: scale(2),
    // paddingHorizontal: scale(15),
    // marginVertical: scale(2),
  },

  sliderView: {
    // height:heightPercentageToDP(5),
    // flex: 1,
    // justifyContent: 'space-around',
    borderWidth: scale(0.5),
    borderColor: Color.TextGrayColor,

    marginHorizontal: wp(4),
    paddingHorizontal: wp(3),
    marginBottom: hp(2),

    paddingVertical: hp(2),
    marginVertical: hp(2),
    borderRadius: hp(1),
  },
  sliderInnerView: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(3),
    paddingBottom: hp(1),
  },
  markerStyle: {
    backgroundColor: '#0D3068',
    height: scale(20),
    width: scale(20),
  },
  //-------
  buttonView: {
    backgroundColor: '#0D3068',
    marginHorizontal: scale(20),
    marginBottom: scale(20),
    height: scale(35),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(20),
    marginTop: scale(10),
  },
  btnText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
    fontFamily: Font.PoppinsRegular,
  },
});
