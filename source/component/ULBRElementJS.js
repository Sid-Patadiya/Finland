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

export default function ULBRElementJS(props) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.box}
      onPress={props?.onItemPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.imageContainer}>
          <ImageBackground
            resizeMode="cover"
            source={
              props.bgImage == '' ||
                props.bgImage == null ||
                props.bgImage == 'xyz.png'
                ? `${require('../assets/Icon/bgOnejs.png')}`
                : { uri: props.bgImage }
            }
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
                    resizeMode='cover'
                    source={
                      props.profilePic == '' ||
                        props.profilePic == null ||
                        props.profilePic ==
                        'https://staging.jobportalapi.atwpl.com/abc.png'
                        ? `${require('../assets/Icon/Vector.png')}`
                        : { uri: props.profilePic }
                    }></Image>
                </View>

                <View style={{ paddingLeft: wp(1.5) }}>
                  <Text style={styles.name}>{props.name}</Text>
                  <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={[styles.desc, {fontSize:FSize.fs9}]}>{props.company_name}</Text>
                </View>
              </View>
            </LinearGradient>

            <TouchableOpacity
              style={styles.applicationsBox}
              onPress={props.onPress}>
              <Text style={styles.applications}>Chat Now</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <View style={{ flex: 1.3, paddingLeft: wp(2) }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              // width: wp(40),
              flex: 1,
              // backgroundColor:'red'
            }}>

            <View style={{ flex: 1 }}>
              <Text ellipsizeMode="tail" numberOfLines={1} style={styles.Heading}>
                {props.job}
              </Text>
            </View>

            <View style={{ alignItems: 'flex-end', flex:1 }}>
              {props.percentage_match == '' ||
                (props.percentage_match == 0 && props.kmAway <= 0) ? (
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
                  <Text style={styles.percentMatch}>10 % Match</Text>
                </View>
              ) : (
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
                  <Text style={styles.percentMatch}>
                    {props.percentage_match} % Match
                  </Text>
                </View>
              )}
            </View>
          </View>

          <View style={{ marginBottom: hp(2) }}>
            {props.job == false ? null : (
              <Text style={styles.subHeading}>
                Required {props.job} Immediately
              </Text>
            )}
          </View>

          {props.experience == '' || props.experience == null ? null : (
            <View style={[styles.spacebetween]}>
              <Text style={styles.title}>Total Experience</Text>
              <Text style={styles.titleDetails}>{props.experience} Years</Text>
            </View>
          )}

          {props.location == '' || props.location == null ? null : (
            <View style={styles.spacebetween}>
              <Text style={styles.title}>Work Location</Text>
              <Text style={styles.titleDetails}>{props.location}</Text>
            </View>
          )}

          {props.package == '' || props.package == null ? null : (
            <View style={styles.spacebetween}>
              <Text style={styles.title}>Package</Text>
              <Text style={styles.titleDetails}>
                {props.currency} {props.package} {` `} {props.term}
              </Text>
            </View>
          )}

          {props.empType == '' || props.empType == null ? null : (
            <View
              style={[
                styles.spacebetween,
                { display: 'flex', flexWrap: 'wrap' },
              ]}>
              <Text style={styles.title}>Employment Type</Text>
              <Text style={styles.titleDetails}>{props.empType}</Text>
            </View>
          )}
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: hp(1),
        }}>
        {props.kmAway == '' || props.kmAway == null || props.kmAway == 0 ? (
          <Text style={styles.posted}>
            Current Location: Less than 1 KM Away
          </Text>
        ) : (
          <Text style={styles.posted}>
            Current Location: {props.kmAway} KM Away
          </Text>
        )}

        <Text style={styles.posted}>Posted {props.posted} day ago</Text>
      </View>
    </TouchableOpacity>
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
    // width: hp(17),
    flex: 0.7,
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
    fontSize: FSize.fs15,
    lineHeight: 22,
    fontFamily: Font.PoppinsRegular,
  },
  subHeading: {
    color: '#454545',
    fontWeight: '400',
    fontSize: FSize.fs10,
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
  },
});
