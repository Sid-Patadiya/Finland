import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Font from '../../../theme/Font';
import FSize from '../../../theme/FSize';

export default function JobsCardDetailsJS(props) {
  return (
    <View style={styles.container}>
      <ImageBackground source={props.backgroundImg} style={styles.image}>
        <View style={styles.translucent}>
          <View
            style={{
              flexDirection: 'row',
              alignContent: 'space-between',
              flex: 1,
            }}>
            {/* left part */}
            <ScrollView style={{flex: 1}}>
              <View style={styles.row}>
                <View style={{paddingTop: hp(3)}}>
                  <View style={styles.profileCirle}>
                    <Image
                      style={styles.pImg}
                      source={props.profilePicture}></Image>
                  </View>
                </View>

                <View style={{paddingLeft: wp(3), paddingTop: hp(4)}}>
                  <Text style={styles.name}>{props.name}</Text>

                  <View style={styles.row}>
                    <Text style={styles.designation}>{props.company}</Text>
                    <View style={styles.urgentVacancy}>
                      <Text style={styles.urgentVacancyText}>
                        urgent Vacancy
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={{flex: 1, paddingBottom: hp(3)}}>
                <Text style={styles.openPosition}>
                  Open position - {props.designation}
                </Text>
                <Text style={styles.description}>{props.details}</Text>

                <Text style={[styles.aboutMeDesc, {marginTop: hp(1)}]}>
                  {props.aboutText}
                </Text>
                <Text style={styles.heading}>Experience</Text>
                <Text style={styles.aboutMeDesc}>
                  {props.experienceYear} Years of Experience required
                </Text>

                <Text style={styles.heading}>Employment Type</Text>
                <View style={[styles.row, {alignItems: 'center'}]}>
                  <Text style={styles.empType}>Full Time</Text>
                  <View style={styles.dot}></View>
                  <Text style={styles.empType}>Part Time</Text>
                  {/* <Text style={styles.empTypeYellow}>(Available 20 Hrs/week)</Text> */}
                </View>

                <Text style={styles.heading}>Salary</Text>
                <Text style={styles.aboutMeDesc}>{props.salary}</Text>
              </View>
              {/* <View style={{paddingVertical:hp(4)}}></View> */}
            </ScrollView>

            {/* right part */}
            <View
              style={{
                alignItems: 'center',
                paddingHorizontal: wp(4),
                paddingTop: hp(4),
              }}>
              {/* right part */}
              <View style={styles.whiteBackground}>
                <Text style={styles.percent}>99%</Text>
                <Text style={styles.Match}>Match</Text>
              </View>

              <View style={{paddingTop: hp(2)}}>
                <TouchableOpacity style={styles.whiteBackground}>
                  <Image
                    style={styles.img60}
                    source={require('../../../assets/Icon/add.png')}></Image>
                </TouchableOpacity>
              </View>

              <View style={{paddingTop: hp(2)}}>
                <TouchableOpacity
                  style={[styles.whiteBackground, {paddingRight: 4}]}>
                  <Image
                    style={styles.img60}
                    source={require('../../../assets/Icon/share.png')}></Image>
                </TouchableOpacity>
              </View>

              <View style={{paddingTop: hp(2)}}>
                <TouchableOpacity
                  style={[
                    styles.circleBackground,
                    {backgroundColor: '#0D3068', paddingLeft: 2},
                  ]}>
                  <Image
                    style={styles.img50}
                    source={require('../../../assets/Icon/personJS.png')}></Image>
                </TouchableOpacity>
              </View>

              <View style={{paddingTop: hp(2)}}>
                <TouchableOpacity
                  style={[
                    styles.circleBackground,
                    {backgroundColor: '#D93E30'},
                  ]}>
                  <Image
                    style={styles.img40}
                    source={require('../../../assets/Icon/x.png')}></Image>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* button  and distance*/}
          <View
            style={[
              styles.row,
              {
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: hp(2),
              },
            ]}>
            <TouchableOpacity onPress={props.onPress} style={styles.btnBox}>
              <Text style={styles.btnText}>See Full Details</Text>
            </TouchableOpacity>

            <View
              style={[styles.row, {alignItems: 'center', paddingRight: wp(3)}]}>
              <View style={{height: hp(3), width: hp(3)}}>
                <Image
                  style={styles.img}
                  source={require('../../../assets/Icon/location.png')}></Image>
              </View>
              <Text style={styles.kmAway}>3 km away</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    flex: 1,
    borderRadius: hp(3),
    // marginBottom:hp(0.1)
  },
  img: {
    // borderRadius:hp(5),
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  img60: {
    // borderRadius:hp(5),
    // paddingLeft:20,
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
  img50: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
  img40: {
    // borderRadius:hp(5),
    // paddingLeft:20,
    width: '40%',
    height: '40%',
    resizeMode: 'contain',
  },
  pImg: {
    borderRadius: hp(5),
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  translucent: {
    // paddingTop: hp(4),
    borderRadius: hp(3),
    flex: 1,
    backgroundColor: '#000000c0',
    paddingLeft: wp(3),
  },

  profileCirle: {
    height: hp(9),
    width: hp(9),
    overflow: 'hidden',
    // height: 48,
    // width: 48,
    // width: wp(12.3),
    borderWidth: hp(0.3),
    borderColor: '#FFFFFF',
    borderRadius: hp(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  yellowBackground: {
    // width: 48,
    height: hp(3),
    backgroundColor: '#FFCB3F',
    borderWidth: hp(0.2),
    borderRadius: hp(5),
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    top: hp(-1.4),
  },
  premiumText: {
    fontSize: FSize.fs9,
    color: '#76480B',
    fontFamily: Font.PoppinsRegular,
    fontWeight: '600',
    textAlign: 'center',
  },
  name: {
    color: '#ffffff',
    fontSize: FSize.fs12,
    fontWeight: '300',
    fontFamily: Font.PoppinsRegular,
    lineHeight: 22,
  },
  designation: {
    fontFamily: Font.PoppinsRegular,
    fontWeight: '500',
    fontSize: FSize.fs14,
    lineHeight: 22,
    color: '#FFFFFF',
  },
  urgentVacancy: {
    alignItems: 'center',
    marginLeft: wp(3),
    paddingHorizontal: wp(3),
    borderRadius: hp(4),
    borderWidth: hp(0.2),
    borderColor: '#fff',
    paddingVertical: hp(0.4),
  },
  urgentVacancyText: {
    // paddingLeft: wp(1),
    top: 1,
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: FSize.fs11,
    fontFamily: Font.PoppinsRegular,
  },
  row: {
    flexDirection: 'row',
  },
  description: {
    width: wp(65),
    marginTop: hp(1),
    fontFamily: Font.PoppinsRegular,
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: FSize.fs13,
    lineHeight: 22,
  },
  openPosition: {
    marginTop: hp(1.5),
    fontFamily: Font.PoppinsRegular,
    color: '#FFFFFF',
    // fontWeight: '600',
    // fontWeight: 'bold',
    fontSize: FSize.fs12,
  },
  heading: {
    marginTop: hp(1),
    fontFamily: Font.PoppinsRegular,
    color: '#FFFFFF',
    // fontWeight: '600',
    fontWeight: 'bold',
    fontSize: FSize.fs14,
    lineHeight: 22,
  },
  aboutMeDesc: {
    // width: wp(80),
    fontFamily: Font.PoppinsRegular,
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: FSize.fs12,
    lineHeight: 18,
  },
  dot: {
    height: hp(1),
    width: hp(1),
    borderRadius: hp(3),
    backgroundColor: '#FFFFFF',
    marginHorizontal: wp(3),
  },
  empType: {
    fontFamily: Font.PoppinsRegular,
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: FSize.fs12,
    lineHeight: 18,
  },
  empTypeYellow: {
    fontFamily: Font.PoppinsRegular,
    paddingLeft: wp(1),
    color: '#FFBB37',
    fontWeight: '400',
    fontSize: FSize.fs12,
    lineHeight: 18,
  },
  btnBox: {
    marginTop: hp(2),
    backgroundColor: '#0D3068',
    height: hp(6),
    // width: wp(30),
    paddingHorizontal: wp(4),
    borderRadius: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    textAlign: 'center',
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  kmAway: {
    fontSize: FSize.fs12,
    fontWeight: '400',
    fontFamily: Font.PoppinsRegular,
    color: '#FFFFFF',
    paddingLeft: wp(2),
  },
  whiteBackground: {
    backgroundColor: '#FFFFFF',
    height: hp(5.5),
    width: hp(5.5),
    // paddingLeft: 2,
    borderRadius: hp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  percent: {
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs10,
    fontWeight: '400',
    textAlign: 'center',
    color: '#808080',
    alignItems: 'baseline',
    top: 2,
  },
  Match: {
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs9,
    fontWeight: '400',
    textAlign: 'center',
    color: '#808080',
    top: -2,
  },
  circleBackground: {
    height: hp(5.5),
    width: hp(5.5),
    borderRadius: hp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
