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

import Font from '../theme/Font';
import FSize from '../theme/FSize';
import LinearGradient from 'react-native-linear-gradient';

export default function HireRequestElementJS(props) {
  var x = props.progress;
  var y = parseInt(x) / 100;

  return (
    <View style={styles.box}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.imageContainer}>
          <ImageBackground
            resizeMode="cover"
            source={props.bgImage == "Java" || props.bgImage == "" || props.bgImage == null ? `${require('../assets/Icon/bgTwojs.png')}` : { uri: props.bgImage }}
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
                  <Image
                    style={styles.imgx}
                    source={props.profilePic == "abcd.png" || props.profilePic == "" || props.profilePic == null ? `${require('../assets/Icon/Vector.png')}` : { uri: props.profilePic }}></Image>
                </View>

                <View style={{ paddingLeft: wp(1.5) }}>
                  <Text style={styles.name}>{props.name}</Text>
                  <Text style={styles.desc}>{props.company_name}</Text>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>

        <View style={{ flex: 1, paddingLeft: wp(2) }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.Heading}>{props.job}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
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
              {props.percentage_match == null || props.percentage_match == "" || parseInt(props.percentMatch) == 0 ?
                <Text style={styles.percentMatch}>
                  10 % Match
                </Text> :
                <Text style={styles.percentMatch}>
                  {parseInt(props.percentage_match)}% Match
                </Text>
              }
            </View>


          </View>
          <View style={{ marginBottom: hp(2) }}>
            {props.urgent_vacancy == true ? (
              <Text style={styles.subHeading}>
                Required {props.job} Immediately
              </Text>
            ) : null}
          </View>

          {props.duration == null || props.duration == "" ? null :
            <View style={[styles.spacebetween,]}>
              <Text style={styles.title}>Job Duration</Text>
              <Text style={styles.titleDetails}>{props.duration}</Text>
            </View>
          }

          {props.package == null || props.package == "" ? null :
            <View style={styles.spacebetween}>
              <Text style={styles.title}>Package</Text>
              <Text style={styles.titleDetails}>
                {props.currency}{` `}{props.package} {props.compensation_details}
              </Text>
            </View>
          }

          {props.location == "" || props.location == null ? null :
            <View style={styles.spacebetween}>
              <Text style={styles.title}>Current Location</Text>
              <Text style={styles.titleDetails}>{props.location} KM away</Text>
            </View>
          }

          {props.sentRequest == null || props.sentRequest == "" ? null :
            <Text style={styles.days}>Request Sent {props.sentRequest} Ago</Text>
          }
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        {props.Accept !== 'ACCEPTED' ?

          props.reject !== 'REJECTED' ? (
            <TouchableOpacity style={styles.btnOne} onPress={props.onPressReject}>
              <Text style={styles.btnTextOne}>Reject</Text>
            </TouchableOpacity>
          ) : (
            <View style={[styles.btnOne, { backgroundColor: '#ffcccc' }]}>
              <Text style={styles.btnTextOne}>Rejected</Text>
            </View>
          )

          : null}
        {props.reject !== 'REJECTED' ?

          props.Accept !== 'ACCEPTED' ? (
            <TouchableOpacity style={styles.btnTwo} onPress={props.onPressAccept}>
              <Text style={styles.btnTextTwo}>Accept</Text>
            </TouchableOpacity>
          ) : (
            <View style={[styles.btnTwo, { backgroundColor: '#ddffcc' }]}>
              <Text style={[styles.btnTextTwo, { color: '#000000' }]}>Accepted</Text>
            </View>
          )
          : null}


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  days: {
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs9,
    textAlign: 'right',
    marginTop: hp(0.5),
    color: '#444444',
  },
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
    fontFamily: Font.PoppinsRegular,
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
  },

  btnOne: {
    width: wp(40),
    marginTop: hp(1.8),
    backgroundColor: '#FFF',
    borderWidth: hp(0.15),
    borderColor: '#EA4A3B',
    paddingVertical: hp(0.4),
    borderRadius: hp(5),
  },
  btnTextOne: {
    textAlign: 'center',
    color: '#EA4A3B',
    fontSize: FSize.fs11,
    fontFamily: Font.PoppinsRegular,
    top: 1.5,
  },
  btnTwo: {
    width: wp(40),
    marginTop: hp(1.8),
    backgroundColor: '#7AB880',
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
