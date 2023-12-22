import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
  FlatList,
  PermissionsAndroid,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Font from '../../../theme/Font';
import FSize from '../../../theme/FSize';
import MapView, { Marker } from 'react-native-maps';
import Share from 'react-native-share';
import { IgnoreJobsRequest } from '../../../redux/Action/IgnoreJobsAction';
import MapViewDirections from 'react-native-maps-directions';
import Color from '../../../theme/Color';
import { scale } from '../../../theme/Scalling';
import Images from '../../../theme/Images';
import { useIsFocused } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import { ProfileRequest } from '../../../redux/Action/ProfileAction';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import SuccessModal from '../SuccessModal';


const GOOGLE_MAPS_APIKEY = 'AIzaSyAyu-6Pv7RaiohWH1bWpQqwXbx7roNG_GA';

export default function JobsCardDetailsTWO(props) {
  const isFocused = useIsFocused();

  const [ShowDetails, setShowDetails] = useState(false);

  const handleShare = async () => {
    let options = {
      title: `Share title`,
      message: `This is share description.`,
      url: `https://jobportal.atwpl.com/jobs/${props.item.id}`,
      subject: `Share subject`,
    };
    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };


  //getting location from the profile--------------------
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    dispatch(ProfileRequest());
    // requestPermission();
  }, [isFocused]);
  // console.log('ProfileDataResponse -----> ', ProfileDataResponse);
  const ProfileDataResponse = useSelector(state => state.profile);



  console.log("profileDAta>>>>>>>>>>>", profileData)
  // var lat = props.latitudex;
  // var lng = props.Longitudex;
  // console.log(">>>>>>>>>>>>>>>>>", lat, lng);

  useEffect(() => {

    if (ProfileDataResponse.data !== null) {
      setProfileData(ProfileDataResponse.data.data);
      // setCurrentLatitude(Number(parseFloat(profileData.latitude)));
      // setCurrentLongitude(Number(parseFloat(profileData.longitude)));
      // console.log("ssssssssssssssssss", currentLatitude, currentLongitude)
    } else {
      dispatch(ProfileRequest());
      // requestPermission();
      // setCurrentLatitude(parseFloat(props.latitudex));
      // setCurrentLongitude(parseFloat(props.longitudex));
    }
  }, [ProfileDataResponse.data]);

  //---------------------------- Get Current Location ---------------------------- \\
  const [currentLatitude, setCurrentLatitude] = useState(props.currentLatitude);
  const [currentLongitude, setCurrentLongitude] = useState(props.currentLongitude);

  console.log('currentLatitudexxxxx', currentLatitude);
  console.log('currentLongitudexxxxxxxxxxx', currentLongitude);

  // useEffect(() => {
  //   console.log("currentlocationisundefined")
  //  {currentLatitude == undefined || currentLongitude == undefined ? 
  //   requestPermission() : null
  //   }
  // }, [isFocused]);


  // const requestPermission = async () => {
  //   try {
  //     let isPermitedExternalStorage = await PermissionsAndroid.check(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     );
  //     const Granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'Location access required',
  //         message: 'This app need to access',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancle',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (Granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       // Alert.alert('Permission Granted');
  //       getCurrentLocation();
  //     } else {
  //       // Alert.alert('Permission Denide');
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const getCurrentLocation = async () => {
  //   await Geolocation.getCurrentPosition(
  //     async position => {
  //       const currentLatitude = position.coords.latitude;
  //       const currentLongitude = position.coords.longitude;
  //       setCurrentLatitude(currentLatitude);
  //       setCurrentLongitude(currentLongitude);
  //     },
  //     error => {
  //       Alert.alert(error.message.toString());
  //     },
  //   );
  // };

  const [showModal, setShowModal] = useState(false);

  return (
    <View style={{ marginVertical: hp(1) }}>
      <View style={styles.container}>
        <ImageBackground
          // source={props.backgroundImg == "Akash" || props.backgroundImg == "" || props.backgroundImg == null 
          // ? `${require('../../../assets/Icon/backGround.png')}` : { uri: props.backgroundImg }}
          source={require('../../../assets/Icon/backGround.png')}
          style={styles.image}>
          <View style={styles.translucent}>
            {/* left part */}
            <ScrollView nestedScrollEnabled={true} style={{ flex: 1 }}>
              <View style={[styles.row, { paddingTop: 20 }]}>
                <View style={styles.profileCirle}>
                  <Image
                    style={styles.pImg}
                    resizeMode="cover"
                    source={
                      props.profilePicture == "" ||
                        props.profilePicture == null ||
                        props.profilePicture == 'https://staging.jobportalapi.atwpl.com/abc.png' ||
                        props.profilePicture == "abcd.png"

                        ? `${require('../../../assets/Icon/Vector.png')}`
                        : { uri: props.profilePicture }
                    }></Image>
                </View>

                <View style={{ paddingLeft: wp(3) }}>
                  <Text style={styles.name}>{props.name}</Text>

                  <View style={styles.row}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                      style={[styles.designation,]}>{props.company}</Text>
                    {props.urgentVacancy ? (
                      <Text style={styles.urgentVacancyText}>
                        Urgent Vacancy
                      </Text>
                    ) : null}
                  </View>
                </View>
              </View>

              <View style={{ flex: 1, paddingBottom: hp(3) }}>
                <Text style={styles.openPosition}>
                  Open position - {props.designation}
                </Text>
                {props.short_description == null || props.short_description == "" ? null :
                  <Text style={styles.description}>{props.short_description}</Text>
                }
                <Text
                  style={[
                    styles.aboutMeDesc,
                    { marginTop: hp(1), paddingRight: hp(8) },
                  ]}>
                  {props.details}
                </Text>

                <Text style={styles.heading}>Experience</Text>
                <Text style={styles.aboutMeDesc}>
                  {parseInt(props.experienceYear)} Years of Experience required
                </Text>

                <Text style={styles.heading}>Employment Type</Text>
                <View style={styles.row}>
                  <Text style={styles.empType}>{props.EmploymentType}</Text>
                  {/* <View style={styles.dot}></View> */}
                  {/* <Text style={styles.empType}>Part Time </Text> */}
                  {/* <Text style={styles.empTypeYellow}>(Available 20 Hrs/week)</Text> */}
                </View>
                <Text style={styles.heading}>{'Compensation Amount'}</Text>
                <Text style={styles.aboutMeDesc}>
                  {props.CompensationAmount}
                </Text>

                {props.SeeFullDetails === true ? (
                  <>
                    <Text style={styles.heading}>Current Location</Text>
                    <Text style={[styles.aboutMeDesc, { paddingRight: hp(7) }]}>
                      {props.companyAddress}
                    </Text>

                    <Text style={styles.heading}>About Company</Text>
                    <Text style={[styles.aboutMeDesc, { paddingRight: hp(7) }]}>
                      {props.aboutCompany}
                    </Text>

                    {props.companyWebsite == null ? null :
                      <View style={[styles.row, { marginTop: hp(4) }]}>
                        <View
                          style={{
                            height: hp(3),
                            width: hp(3),
                            marginRight: wp(3),
                          }}>
                          <Image
                            style={styles.img}
                            source={require('../../../assets/Icon/globeWhite.png')}></Image>
                        </View>
                        <Text style={styles.aboutMeDesc}>
                          {props.companyWebsite}
                        </Text>
                      </View>
                    }
                    <View style={[styles.row, { marginTop: hp(1.5) }]}>
                      <View style={{ height: hp(3), width: hp(3) }}>
                        <Image
                          style={styles.img}
                          source={require('../../../assets/Icon/location.png')}></Image>
                      </View>
                      <Text
                        style={[styles.aboutMeDesc, { marginHorizontal: wp(3) }]}>
                        {props.companyAddress}
                      </Text>
                      {props.distance == null || props.distance == "" ?
                        null :
                        <Text style={styles.aboutMeDesc}>
                          ({parseInt(props.distance)} KM away)
                        </Text>
                      }
                    </View>
                  </>
                ) : (
                  <View
                    style={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginVertical: hp(2),
                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                      onPress={props.onPress}
                      style={styles.btnBox}>
                      <Text style={styles.btnText}>See Full Details</Text>
                    </TouchableOpacity>

                    {props.distance == null || props.distance == "" ? null :
                      <View
                        style={[
                          styles.row,
                          { alignItems: 'center', paddingHorizontal: hp(3) },
                        ]}>
                        <View style={{ height: hp(3), width: hp(3) }}>
                          <Image
                            style={styles.img}
                            source={require('../../../assets/Icon/location.png')}></Image>
                        </View>
                        <Text style={styles.kmAway}>
                          ({parseInt(props.distance)} KM Away)
                        </Text>
                      </View>
                    }
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
      {props.SeeFullDetails == true && (
        <View style={{ marginTop: hp(-0.5) }}>
          <View
            style={{ flex: 1, backgroundColor: '#FFFAF6', borderRadius: hp(3) }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                paddingLeft: wp(4),
                paddingVertical: hp(3),
                paddingBottom: hp(2),
                flex: 1,
                width: '85%',
              }}>
              {props.skills == [] || props.skills == "" ? null :
                <>
                  <Text style={styles.headingb}>Skills</Text>
                  <FlatList
                    data={props.Skills}
                    horizontal
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                      console.log('item=========>', item);
                      return (
                        <View
                          style={[
                            styles.row,
                            {
                              paddingVertical: hp(1),
                              display: 'flex',
                              flexWrap: 'wrap',
                            },
                          ]}>
                          <Text style={styles.detailsb}>{item.skill_name}</Text>
                        </View>
                      );
                    }}
                  />
                </>
              }
              <Text style={styles.headingb}>Education</Text>
              <View
                style={[
                  styles.row,
                  { paddingVertical: hp(1), display: 'flex', flexWrap: 'wrap' },
                ]}>
                <Text style={styles.detailsb}>{props.highest_degree_name}</Text>
              </View>

              <Text style={styles.headingb}>Passout year</Text>
              <View
                style={[
                  styles.row,
                  { paddingVertical: hp(1), display: 'flex', flexWrap: 'wrap' },
                ]}>
                <Text style={styles.detailsb}>
                  {props.degree_completion_year}
                </Text>
              </View>

              <Text style={styles.headingb}>License Required</Text>
              <View
                style={[
                  styles.row,
                  { paddingVertical: hp(1), display: 'flex', flexWrap: 'wrap' },
                ]}>
                {props.liscense_required ? (
                  <Text style={styles.detailsb}>Yes</Text>
                ) : (
                  <Text style={styles.detailsb}>No</Text>
                )}
              </View>

              <Text style={styles.headingb}>No. of Vacancies</Text>
              <View
                style={[
                  styles.row,
                  { paddingVertical: hp(1), display: 'flex', flexWrap: 'wrap' },
                ]}>
                <Text style={styles.detailsb}>{props.no_of_vacancy} Vacancies</Text>
              </View>

              <Text style={styles.headingb}>Job Duration</Text>
              <View
                style={[
                  styles.row,
                  { paddingVertical: hp(1), display: 'flex', flexWrap: 'wrap' },
                ]}>
                <Text style={styles.detailsb}>
                  {moment(props.from_date).format('DD MMM, YYYY')}
                  - {moment(props.to_date).format('DD MMM, YYYY')}
                </Text>
              </View>
            </ScrollView>
          </View>

          <View style={{ flex: 1 }}>
            {console.log('cureent lati-longi>>>>>>', currentLatitude, currentLongitude)}
            {console.log('cureent lati-longi>>>>>>', typeof (parseFloat(currentLatitude)), typeof (Number(currentLongitude)))}

            <MapView
              style={{
                height: 500,
                width: '100%',
              }}
              // showsUserLocation={true}
              // zoomControlEnabled
              initialRegion={{
                // latitude: Number(parseFloat(currentLatitude).toFixed(7)),
                // longitude: Number(parseFloat(currentLongitude).toFixed(7)),
                latitude: parseFloat(currentLatitude),
                longitude: parseFloat(currentLongitude),
                latitudeDelta: 0.472,
                longitudeDelta: 0.422,
              }}
            // initialCamera={{
            //   center: {
            //     latitude: currentLatitude,
            //     longitude: currentLongitude
            //   },
            //   pitch: 45,
            //   heading: 90,
            //   altitude: 1000,
            //   zoom: 16,
            // }}

            >
              <Marker
                coordinate={{
                  // latitude: Number(parseFloat(currentLatitude).toFixed(7)),
                  // longitude: Number(parseFloat(currentLongitude).toFixed(7)),
                  latitude: parseFloat(currentLatitude),
                  longitude: parseFloat(currentLongitude),
                }}>
                <View style={{ height: 50, width: 50 }}>
                  <Image
                    source={
                      profileData.image == "" ||
                        profileData.image == null
                        // props.profileData == 'https://staging.jobportalapi.atwpl.com/abc.png' ||
                        // props.profileData == "abcd.png"
                        ? `${require('../../../assets/Icon/Vector.png')}`
                        : { uri: profileData.image }}
                    style={{ height: 50, width: 50, borderRadius: 30 }}></Image>
                </View>

                <Text
                  style={{
                    backgroundColor: '#F28B00',
                    color: '#FFFF',
                    fontSize: FSize.fs13,
                    paddingHorizontal: 12,
                    // paddingVertical: 2,
                    borderRadius: 10,
                    textAlign: 'center',
                    fontFamily: Font.PoppinsSemiBold,
                  }}>
                  You
                </Text>
              </Marker>
              <Marker
                onPress={() => setShowDetails(!ShowDetails)}
                coordinate={{
                  latitude: parseFloat(props.latitude),
                  longitude: parseFloat(props.longitude),
                }}>
                <View style={{ alignItems: 'center', flex: 1 }}>
                  {ShowDetails == true && (
                    <View
                      style={{
                        backgroundColor: 'white',
                        borderRadius: 5,
                        flex: 1,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <View style={{ height: 20, width: 20, borderRadius: 10, margin: 5, backgroundColor: '#8A4918', overflow: 'hidden' }}>
                          <Image
                            source={
                              props.profilePicture == "" ||
                                props.profilePicture == null ||
                                props.profilePicture == 'https://staging.jobportalapi.atwpl.com/abc.png' ||
                                props.profilePicture == "abcd.png"
                                ? `${require('../../../assets/Icon/Vector.png')}`
                                : { uri: props.profilePicture }}
                            style={{ height: 20, width: 20, borderRadius: 30 }}></Image>
                        </View>
                        <View>
                          <Text style={{ fontSize: scale(10), paddingLeft: 4 }}>
                            {props.name}
                          </Text>
                          <Text
                            style={{
                              fontSize: scale(9),
                              paddingLeft: 4,
                              paddingRight: 20,
                              color: '#444444',
                              fontFamily: Font.PoppinsSemiBold,
                            }}>
                            {props.company}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}>
                            <View style={styles.matchView}>
                              <ImageBackground
                                source={Images.rightCircle}
                                style={styles.rightCircleIcon}>
                                <Image
                                  source={Images.right}
                                  style={styles.rightIcon}
                                />
                              </ImageBackground>
                              <Text style={styles.matchText}>
                                {parseInt(props.percentage_match)}% Match
                              </Text>
                            </View>
                          </View>
                        </View>
                        {props.distance == null || props.distance == "" ? null :
                          <Text
                            style={{
                              textAlignVertical: 'center',
                              fontSize: scale(8),
                              paddingHorizontal: 10,
                              color: '#000',
                              fontFamily: Font.PoppinsSemiBold,
                            }}>
                            ({parseInt(props.distance)} KM Away)
                          </Text>}
                      </View>
                    </View>
                  )}
                  <View style={{ height: 50, width: 50 }}>
                    <Image
                      source={
                        props.profilePicture == "" ||
                          props.profilePicture == null ||
                          props.profilePicture == 'https://staging.jobportalapi.atwpl.com/abc.png' ||
                          props.profilePicture == "abcd.png"

                          ? `${require('../../../assets/Icon/Vector.png')}`
                          : { uri: props.profilePicture }
                      }
                      style={{ height: 50, width: 50, borderRadius: 30 }}></Image>
                  </View>
                </View>
              </Marker>

              <MapViewDirections
                mode="DRIVING"
                apikey={GOOGLE_MAPS_APIKEY}
                timePrecision="now"
                strokeWidth={5}
                strokeColor="#007AFF"
                origin={{
                  // latitude: parseFloat(currentLatitude),
                  // longitude: parseFloat(currentLongitude),
                  // latitude: parseFloat(currentLatitude),
                  // longitude: parseFloat(currentLongitude),
                  latitude: props.currentLatitude,
                  longitude: props.currentLongitude,
                }}
                destination={{
                  latitude: parseFloat(props.latitude),
                  longitude: parseFloat(props.longitude),
                  // latitude: 26.4499,
                  // longitude: 80.3319,
                }}
              />
            </MapView>
          </View>
        </View>
      )}

      {/*  ----------- Side Barrr -----------> */}
      {/* {props.Sidebar === true ? (
        <View
          style={{
            position: 'absolute',
            right: 0,
            paddingRight: wp(4),
            marginTop: hp(8),
          }}>
          {props.percentage_match == 0 || props.percentage_match == null ? (
            <View style={styles.whiteBackground}>
              <Text style={styles.percent}>10 %</Text>
              <Text style={styles.Match}>Match</Text>
            </View>
          ) : (
            <View style={styles.whiteBackground}>
              <Text style={styles.percent}>{parseInt(props.percentage_match)}</Text>
              <Text style={styles.Match}>Match</Text>
            </View>
          )}

          <View style={{ paddingTop: hp(2) }}>
            <TouchableOpacity
              style={styles.whiteBackground}
              onPress={props?.add}>
              <Image
                style={[styles.img60, { paddingLeft: hp(3) }]}
                source={require('../../../assets/Icon/add.png')}></Image>
            </TouchableOpacity>
          </View>

          <View style={{ paddingTop: hp(2) }}>
            <TouchableOpacity
              style={styles.whiteBackground}
              onPress={() => handleShare()}>
              <Image
                style={styles.img60}
                source={require('../../../assets/Icon/share.png')}></Image>
            </TouchableOpacity>
          </View>

          <View style={{ paddingTop: hp(2) }}>
            <TouchableOpacity
              // onPress={props.person}
              onPress={() => {
                loginToken == null ? setShowModal(true) : props.person;
              }}
              style={[styles.circleBackground, { backgroundColor: '#FFFFFF' }]}>
              <Image
                style={{ height: '80%', width: '80%' }}
                resizeMode={'cover'}
                source={require('../../../assets/Icon/applyNow.png')}></Image>
            </TouchableOpacity>
          </View>

          <View style={{ paddingTop: hp(2) }}>
            <TouchableOpacity
              onPress={props?.DeleteData}
              style={[styles.circleBackground, { backgroundColor: '#D93E30' }]}>
              <Image
                style={styles.img40}
                source={require('../../../assets/Icon/x.png')}></Image>
            </TouchableOpacity>
          </View>

          <SuccessModal
            visible={showModal}
            onRequestClose={() => setShowModal(false)}
            message={'Please do Login/Sign up'}
            onPress={() => setShowModal(false)}
            onPressOk={() => navigation.replace('AuthTopTabNavigation')}
          />
        </View>
      ) : null} */}
    </View>
  );
}

const styles = StyleSheet.create({
  urgentVacancyText: {
    // paddingLeft: wp(1),
    marginLeft: wp(3),
    paddingHorizontal: wp(3),
    borderRadius: hp(4),
    borderWidth: hp(0.2),
    borderColor: '#fff',
    paddingTop: hp(0.4),
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: FSize.fs11,
    fontFamily: Font.PoppinsRegular,
  },
  container: {
    overflow: 'hidden',
    flex: 1,
    // height:hp(90),
    borderRadius: hp(2),
  },

  img: {
    // borderRadius:hp(5),
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  img50: {
    // borderRadius:hp(5),
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },

  img60: {
    // borderRadius:hp(5),
    // paddingLeft:20,
    width: '60%',
    height: '60%',
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
    // borderRadius: hp(3),
    flex: 1,
    backgroundColor: '#000000c0',
    paddingLeft: wp(3),
  },

  profileCirle: {
    height: hp(9),
    width: hp(9),
    borderWidth: hp(0.3),
    overflow: 'hidden',
    // marginHorizontal:wp(2),
    borderColor: '#FFFFFF',
    borderRadius: hp(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  yellowBackground: {
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
    fontSize: FSize.fs14,
    fontWeight: '300',
    fontFamily: Font.PoppinsRegular,
    lineHeight: 22,
  },
  designation: {
    fontFamily: Font.PoppinsRegular,
    fontWeight: '500',
    fontSize: FSize.fs12,
    lineHeight: 22,
    color: '#FFFFFF',
  },
  verified: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: wp(3),
  },
  verifiedText: {
    paddingLeft: wp(1),
    color: '#007AFF',
    fontWeight: '500',
    fontSize: FSize.fs12,
    fontFamily: Font.PoppinsRegular,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  openPosition: {
    marginTop: hp(1.5),
    fontFamily: Font.PoppinsRegular,
    color: '#FFFFFF',
    // fontWeight: '600',
    // fontWeight: 'bold',
    fontSize: FSize.fs12,
  },
  description: {
    width: wp(65),
    marginTop: hp(2),
    fontFamily: Font.PoppinsSemiBold,
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: FSize.fs13,
    lineHeight: 22,
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
  headingb: {
    marginTop: hp(1),
    fontFamily: Font.PoppinsRegular,
    color: '#444444',
    // fontWeight: '600',
    fontWeight: 'bold',
    fontSize: FSize.fs14,
    lineHeight: 22,
  },
  detailsb: {
    borderWidth: hp(0.1),
    borderColor: '#808080',
    color: '#808080',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.6),
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs12,
    borderRadius: hp(5),
    // top: 1
    textAlign: 'center',
    marginLeft: wp(2),
    marginBottom: hp(1),
  },
  aboutMeDesc: {
    // width: wp(80),
    fontFamily: Font.PoppinsRegular,
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: FSize.fs12,
    lineHeight: 18,
  },
  borderWidth: {
    borderWidth: hp(0.2),
    paddingHorizontal: wp(4),
    borderColor: '#FFFFFF',
    paddingTop: hp(0.4),
    borderRadius: hp(3),
  },
  dot: {
    height: hp(0.5),
    width: hp(0.3),
    borderRadius: hp(3),
    backgroundColor: '#FFFFFF',
    marginHorizontal: wp(2),
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
  //------ button-------
  btnBox: {
    backgroundColor: '#0D3068',
    height: hp(6),
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
  greenBackground: {
    backgroundColor: '#40A34A',
    height: hp(3.5),
    width: hp(3.5),
    borderRadius: hp(4),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(1),
  },
  imageDetails: {
    flex: 1,
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
  blueBackground: {
    backgroundColor: '#007AFF',
    height: hp(3.5),
    width: hp(3.5),
    borderRadius: hp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  yellowCircleBackground: {
    backgroundColor: '#FFCB3F',
    height: hp(5.5),
    width: hp(5.5),
    borderRadius: hp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBackground: {
    borderWidth: hp(0.1),
    borderColor: '#808080',
    backgroundColor: '#FFFFFF',
    height: hp(5.5),
    width: hp(5.5),
    borderRadius: hp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ///--------------
  matchView: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Color.Colorwhite,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  rightIcon: {
    height: scale(3.37),
    width: scale(4.47),
  },
  rightCircleIcon: {
    height: scale(8.5),
    width: scale(8.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchText: {
    fontFamily: Font.PoppinsRegular,
    fontSize: 9,
    left: scale(3.49),
    top: scale(1),
    color: Color.ERROR,
  },
});
