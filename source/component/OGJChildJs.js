import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import * as Progress from 'react-native-progress';

import Font from '../theme/Font';
import FSize from '../theme/FSize';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

export default function zOGJChildJs(props) {
  var x = props.progress;
  var y = parseInt(x) / 100;


  // To set two dates to two variables
  var date1 = new Date(props.from_date);
  var date2 = new Date(props.to_date);
  var today = new Date();

  var Difference_In_Time = date2.getTime() - date1.getTime(); //time difference between from date and to date
  var itme_passed = today.getTime() - date1.getTime(); //time difference between current date and form date

  // To calculate the no. of days between two dates
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  var timePassedAlready = itme_passed / (1000 * 3600 * 24);
  //To display the final no. of days (result)

  // progress status
  function percentageCalculator() {
    var result = ((timePassedAlready / Difference_In_Days) * 10).toFixed(2);
    console.log("percentageCalculator", Number(result));
    return Number(result)
  }

  return (
    <View style={styles.box}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.imageContainer}>
          <ImageBackground
            resizeMode="cover"
            // source={props.bgImage}
            source={props.Pofile == "" || props.profile == null ? `${require('../assets/Icon/bgOnejs.png')}` : { uri: props.Pofile }}
            style={{
              flex: 1,
              height: '100%',
              width: '100%',
              alignItems: 'center',
            }}>
            <LinearGradient
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              colors={['rgba(0, 0, 0, 0) 100%)', '#020202']}
              style={{ width: '100%' }}>
              <View style={styles.row}>
                <View style={styles.profile}>
                  <Image style={styles.imgx} source={props.Pofile == "" || props.profile == null || props.profile == "Akash" ? `${require('../assets/Icon/Vector.png')}` : { uri: props.Pofile }}></Image>
                </View>

                <View style={{ paddingLeft: wp(1.5) }}>
                  <Text style={styles.name}>{props.name}</Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    style={styles.desc}>{props.desc}</Text>
                </View>
              </View>
            </LinearGradient>

            <View style={{ position: 'absolute', bottom: 0 }}>
              <Progress.Bar
                progress={percentageCalculator()}
                width={hp(17)}
                color={'#0D3068'}
                height={hp(0.5)}
                unfilledColor={'#C4C4C4'}
                borderColor={'#FFF'}
                borderRadius={hp(5)}
              />
            </View>
          </ImageBackground>
        </View>

        <View style={{ flex: 1, paddingLeft: wp(2) }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              display: 'flex',
              flexWrap: 'wrap',
            }}>
            <Text style={styles.Heading}>{props.job}</Text>

            {parseInt(props.match) == "" || parseInt(props.match) == null || parseInt(props.match) == 0 ?
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: 'flex',
                  flexWrap: 'wrap',
                }}>
                <View
                  style={{
                    height: hp(3),
                    width: hp(3),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={styles.img}
                    source={require('../assets/Icon/matchTick.png')}></Image>
                </View>
                <Text style={styles.percentMatch}>10 % Match</Text>
              </View>
              :
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: 'flex',
                  flexWrap: 'wrap',
                }}>
                <View
                  style={{
                    height: hp(3),
                    width: hp(3),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={styles.img}
                    source={require('../assets/Icon/matchTick.png')}></Image>
                </View>
                <Text style={styles.percentMatch}>{parseInt(props.match)} % Match</Text>
              </View>
            }

          </View>

          <View style={{ marginBottom: hp(2) }}>
            {props.urgent_vacancy == true ?
              (
                <Text style={styles.subHeading}>
                  Required {props.job} Immediately
                </Text>
              ) : (
                null
              )}
          </View>

          {props.hireDate == "" || props.hireDate == null ? null :
            <View style={[styles.spacebetween]}>
              <Text style={styles.title}>Hire Date</Text>
              <Text style={styles.titleDetails}>{moment(props.hireDate).format('DD MMM, YYYY')}</Text>
            </View>
          }

          {props.duration == "" || props.duration == null ? null :
            <View
              style={[styles.spacebetween, { display: 'flex', flexWrap: 'wrap' }]}>
              <Text style={styles.title}>Job Duration</Text>
              <Text style={styles.titleDetails}>
                {moment(props.from_date).format('DD MMM, YYYY')} {` `}
                {moment(props.to_date).format('DD MMM, YYYY')}
              </Text>
            </View>
          }
          {props.tHours == null ? null :
            <View style={styles.spacebetween}>
              <Text style={styles.title}>Hours Worked</Text>
              <Text style={styles.titleDetails}>{props.tHours} Hours</Text>
            </View>
          }
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: hp(1),
        }}>
        {props.show == false ? null :
          <TouchableOpacity style={styles.btnOne} onPress={props.onPress}
          >
            <Text style={styles.btnTextOne}>Update Time Sheet</Text>
          </TouchableOpacity>
        }

        <TouchableOpacity style={styles.btnTwo}
          onPress={props.endJob}
        >
          <Text style={styles.btnTextTwo}>End Job</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imgx: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    // overflow: 'hidden',
  },
  img: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
  box: {
    backgroundColor: '#FFFFFF',
    paddingTop: hp(2),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    marginVertical: hp(1),
    borderRadius: hp(0.5),
  },
  imageContainer: {
    backgroundColor: '#FAF4E7',
    width: hp(17),
    borderRadius: hp(1),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  applicationsBox: {
    position: 'absolute',
    bottom: hp(-1),
    // alignItems: 'center',
    // justifyContent: 'center'
    height: hp(3),
    paddingHorizontal: wp(4),
    borderRadius: hp(3),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0D3068',
  },

  Heading: {
    color: '#454545',
    // width: wp(47),
    fontWeight: '500',
    fontSize: FSize.fs12,
    lineHeight: 22,
    fontFamily: Font.PoppinsRegular,
  },
  subHeading: {
    color: '#454545',
    fontWeight: '400',
    fontSize: FSize.fs8,
    fontFamily: Font.PoppinsRegular,
    // lineHeight:22
  },
  spacebetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingTop: hp(1.5)
  },
  title: {
    color: '#444444',
    fontWeight: '300',
    // lineHeight:22,
    fontSize: FSize.fs10,
    fontFamily: Font.PoppinsRegular,
  },
  titleDetails: {
    color: '#444444',
    fontFamily: Font.PoppinsSemiBold,
    fontSize: FSize.fs10,
    fontWeight: '500',
    textAlign: 'right',
  },
  posted: {
    color: '#b3b3b3',
    fontSize: FSize.fs8,
    textAlign: 'right',
    fontFamily: Font.PoppinsRegular,
    paddingTop: hp(1),
    fontWeight: '400',
  },
  applications: {
    color: '#FFFFFF',
    fontSize: FSize.fs11,
    fontWeight: '400',
    fontFamily: Font.PoppinsRegular,
  },
  percentMatch: {
    color: '#1B2C6B',
    fontSize: FSize.fs9,
    fontWeight: '400',
    fontFamily: Font.PoppinsRegular,
  },
  appSent: {
    backgroundColor: '#D5FDD9',
    paddingHorizontal: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp(2),
    height: hp(3),
  },
  appSentText: {
    color: '#0D3F12',
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs8,
  },

  imgFrame: {
    height: hp(27),
    width: hp(27),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: hp(1),
    // justifyContent: 'center'
    // overflow: 'hidden',
  },
  profile: {
    backgroundColor: '#666',
    // margin: hp(0.5),
    borderRadius: hp(5),
    overflow: 'hidden',
    height: hp(4),
    width: hp(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs7,
    color: '#FFF',
  },
  desc: {
    fontFamily: Font.PoppinsSemiBold,
    fontSize: FSize.fs9,
    color: '#FFF',
    paddingRight: hp(1)
  },

  btnOne: {
    width: wp(40),
    marginTop: hp(1.8),
    backgroundColor: '#FFF',
    borderWidth: hp(0.15),
    borderColor: '#CBCBCB',
    paddingVertical: hp(0.4),
    borderRadius: hp(5),
  },
  btnTextOne: {
    textAlign: 'center',
    color: '#717171',
    fontSize: FSize.fs11,
    fontFamily: Font.PoppinsRegular,
    top: 1.5,
  },
  btnTwo: {
    width: wp(40),
    marginTop: hp(1.8),
    backgroundColor: '#0D3068',
    paddingVertical: hp(0.4),
    borderRadius: hp(5),
  },

  btnTextTwo: {
    top: 1.5,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: FSize.fs11,
    fontFamily: Font.PoppinsRegular,
  },
});
