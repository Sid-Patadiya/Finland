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
import ApplicantsDetailsCard from '../../../../component/ApplicantsDetailsCard';
import FSize from '../../../../theme/FSize';
import Font from '../../../../theme/Font';

export default function ExploreJobsElementJS({
  navigation: {goBack},
  navigation,
}) {
  return (
    <View style={styles.main}>
      {/* back arrow and search */}
      <View style={[styles.row, {alignItems: 'center'}]}>
        <TouchableOpacity onPress={() => goBack()}>
          <View style={{height: 14, width: 16, marginHorizontal: 13}}>
            <Image
              style={styles.img}
              source={require('../../../../assets/Icon/arrowLeftBlue.png')}></Image>
          </View>
        </TouchableOpacity>

        <View style={styles.textboxinnerOne}>
          <View
            style={{
              width: wp(10),
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
            <View style={{width: 20, height: 20}}>
              <Image
                style={styles.img}
                source={require('../../../../assets/Icon/searchIcon.png')}></Image>
            </View>
          </View>

          <View
            style={{
              width: wp(80),
              paddingLeft: wp(3),
            }}>
            <TextInput
              placeholder="Search by Job Title/Company"
              style={styles.inputFeed}
            />
          </View>
        </View>
      </View>

      {/* filters */}
      <View
        style={{
          flexDirection: 'row',
          marginBottom: hp(2),
          alignItems: 'center',
        }}>
        <View>
          <Text style={styles.filterText}>Filters :</Text>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.blueBackground}>
            <Text style={styles.BlueBackgroundText}>Plumber</Text>
            <TouchableOpacity style={{paddingRight: wp(2), paddingLeft: wp(1)}}>
              <View style={{height: 13, width: 13}}>
                <Image
                  style={styles.img}
                  source={require('../../../../assets/Icon/x1.png')}></Image>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.blueBackground}>
            <Text style={styles.BlueBackgroundText}>
              Within 20 mi of Radius
            </Text>
            <TouchableOpacity style={{paddingRight: wp(2), paddingLeft: wp(1)}}>
              <View style={{height: 13, width: 13}}>
                <Image
                  style={styles.img}
                  source={require('../../../../assets/Icon/x1.png')}></Image>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.blueBackground}>
            <Text style={styles.BlueBackgroundText}>Skill 1</Text>
            <TouchableOpacity style={{paddingRight: wp(2), paddingLeft: wp(1)}}>
              <View style={{height: 13, width: 13}}>
                <Image
                  style={styles.img}
                  source={require('../../../../assets/Icon/x1.png')}></Image>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.blueBackground}>
            <Text style={styles.BlueBackgroundText}>Skill 2</Text>
            <TouchableOpacity style={{paddingRight: wp(2), paddingLeft: wp(1)}}>
              <View style={{height: 13, width: 13}}>
                <Image
                  style={styles.img}
                  source={require('../../../../assets/Icon/x1.png')}></Image>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* background image and transparent view zone */}
      <View style={{flex: 1}}>
        <ApplicantsDetailsCard
          backgroundImg={require('../../../../assets/Icon/backGround.png')}
          profilePicture={require('../../../../assets/Icon/px.png')}
          name={'Ramesh D'}
          designation={'Plumber'}
          verified={true}
          details={
            'Plumber with 5+ Years of Experience working with Builders and individuals '
          }
          aboutMe={
            'We Lorem ipsum dolor sit amet, consectadipiscing elit, sed do eiusmsit at,consectetur adipiscing eliem Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusm.eiusmsit at,consectetur adipiscing eliem Lorem ipsum dolor sit amet, consectetur adipiscing elit'
          }
          experienceYear={'5'}
          onPress={() => navigation.navigate('ApplicationSeeFullDetails')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginHorizontal: wp(3),
    backgroundColor: '#E9EFF6',
  },
  filterText: {
    color: '#000000',
    fontFamily: Font.PoppinsRegular,
    fontWeight: '300',
    fontSize: FSize.fs14,
    lineHeight: 22,
    paddingRight: wp(2),
  },
  blueBackground: {
    marginHorizontal: wp(2),
    backgroundColor: '#1374DF',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: hp(3),
    paddingVertical: hp(0.3),
  },
  BlueBackgroundText: {
    paddingTop: hp(0.4),
    fontSize: FSize.fs12,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 20,
    // paddingHorizontal: wp(3),
    paddingLeft: wp(3),
    color: '#FFFFFF',
    fontFamily: Font.PoppinsRegular,
  },
  textboxinnerOne: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    height: hp(6),
    // height: 40,
    borderWidth: hp(0.1),
    borderColor: '#D2D2D2',
    marginRight: wp(5),
    flexDirection: 'row',
    borderRadius: hp(3),
    marginVertical: hp(2),
  },
  inputFeed: {
    color: '#939393',
    top: 2,
    fontSize: FSize.fs12,
    fontWeight: '300',
    fontFamily: Font.PoppinsRegular,
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
