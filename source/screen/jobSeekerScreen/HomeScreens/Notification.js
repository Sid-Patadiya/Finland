import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import Color from '../../../theme/Color';
import Images from '../../../theme/Images';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Font from '../../../theme/Font';
import {scale} from '../../../theme/Scalling';
import FSize from '../../../theme/FSize';
import HeaderNavigation from '../../../component/HeaderNavigation';

const notificationData = [
  {
    id: 1,
    title: 'HemaChandra, and 7 more candidates are found relevant ...',
    Image: Images.p1,
    Image1: Images.p2,
    Image2: Images.p3,
    day: 'Today',
    dots: Images.grayDots,
    button: 'View Candidates',
  },
  {
    id: 2,
    title:
      'Chetan, Ramesh and 2 others have messaged younng elit ut aliquam, purus sit amet ...',
    Image: Images.mesageInBoxJS,
    day: 'Today',
    button: 'View Candidates',
    dots: Images.grayDots,
  },
  {
    id: 3,
    title: 'HemaChandra, and 7 more candidates are found relevant ...',
    Image: Images.p1,
    Image1: Images.p2,
    Image2: Images.p3,
    day: '4h',
    dots: Images.grayDots,
    button: 'View Candidates',
  },
  {
    id: 4,
    title:
      'Chetan, Ramesh and 2 others have messaged younng elit ut aliquam, purus sit amet ...',
    Image: Images.mesageInBoxJS,
    day: '4h',
    button: 'View Candidates',
    dots: Images.grayDots,
  },
  {
    id: 5,
    title: 'HemaChandra, and 7 more candidates are found nrelevant ...',
    Image: Images.p1,
    Image1: Images.p2,
    Image2: Images.p3,
    day: '4h',
    dots: Images.grayDots,
    button: 'View Candidates',
  },
  {
    id: 6,
    title:
      'Chetan, Ramesh and 2 others have messaged younng elit ut aliquam, purus sit amet ...',
    Image: Images.mesageInBoxJS,
    day: '4h',
    button: 'View Candidates',
    dots: Images.grayDots,
  },
  {
    id: 7,
    title: 'HemaChandra, and 7 more candidates are found nrelevant ...',
    Image: Images.p1,
    Image1: Images.p2,
    Image2: Images.p3,
    day: '4h',
    dots: Images.grayDots,
    button: 'View Candidates',
  },
  {
    id: 8,
    title: 'Recruiter 1 has unclocked your Profile',
    Image: Images.personLockJS,
    day: '4h',
    button: 'View Candidates',
    dots: Images.grayDots,
  },
];

const Notification = ({navigation: {goBack}, navigation}) => {
  return (
    <View style={styles.container}>
      <HeaderNavigation
        onPress={() => navigation.goBack()}
        heading={'Notifications'}
      />

      {/* <FlatList
        data={notificationData}
        contentContainerStyle={{marginVertical: scale(10)}}
        renderItem={({item}) => {
          return (
            <View style={styles.flatlistStyle}>
              <View
                style={{
                  flex: 1,
                  marginLeft: scale(15),
                }}>
                <Image
                  source={item.Image}
                  resizeMode="contain"
                  style={styles.ImageStyle}
                />
                <Image
                  source={item.Image1}
                  resizeMode="contain"
                  style={styles.Image1Style}
                />
                <Image
                  source={item.Image2}
                  resizeMode="contain"
                  style={styles.Image2Style}
                />
              </View>

              <View style={styles.textView}>
                <Text style={styles.titleText}>{item.title}</Text>
                <TouchableOpacity style={styles.buttonView}>
                  <Text style={styles.buttonText}>{item.button}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.dayTextView}>
                <Text style={styles.dayText}>{item.day}</Text>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    margin: scale(10),
                  }}>
                  <View style={styles.dot}></View>
                  <View style={[styles.dot, {marginVertical: hp(0.3)}]}></View>
                  <View style={styles.dot}></View>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      /> */}
    </View>
  );
};
export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Colorwhite,
  },
  flatlistStyle: {
    flex: 1,
    paddingBottom: scale(10),
    flexDirection: 'row',
    paddingVertical: scale(1),
  },
  ImageStyle: {
    height: scale(30),
    width: scale(30),
  },
  Image1Style: {
    height: scale(30),
    width: scale(30),
    position: 'absolute',
    marginTop: hp(1),
    marginLeft: hp(1),
  },
  Image2Style: {
    height: scale(30),
    width: scale(30),
    position: 'absolute',
    marginTop: hp(2),
    marginLeft: hp(2),
  },
  textView: {
    flex: 5,
    justifyContent: 'space-between',
    marginLeft: scale(10),
    borderBottomWidth: 0.2,
    borderBottomColor: 'rgba(0, 0, 0, 0.1);',
  },
  titleText: {
    color: '#656567',
    fontFamily: Font.PoppinsRegular,
    fontSize: scale(9),
  },
  buttonView: {
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: scale(10),
    justifyContent: 'center',
    alignSelf: 'flex-start',
    borderColor: '#0D3068',
    borderRadius: scale(10),
    backgroundColor: '#E2EEFF',
    marginVertical: scale(10),
  },
  buttonText: {
    fontSize: scale(10),
    textAlign: 'center',
    color: Color.HeaderColor,
    fontFamily: Font.PoppinsRegular,
  },
  dayTextView: {
    flex: 1,
    // backgroundColor: '#666',
    borderBottomWidth: 0.2,
    borderBottomColor: 'rgba(0, 0, 0, 0.1);',
  },
  dayText: {
    fontSize: FSize.fs10,
    textAlign: 'center',
    marginRight: scale(10),
    fontFamily: Font.PoppinsRegular,
  },
  dot: {
    height: hp(0.6),
    width: hp(0.6),
    borderRadius: hp(1),
    overflow: 'hidden',
    backgroundColor: '#7A7D81',
  },
});
