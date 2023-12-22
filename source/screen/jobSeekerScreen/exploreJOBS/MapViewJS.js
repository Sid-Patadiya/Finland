import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  PermissionsAndroid,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
// import Geocoder from 'react-native-geocoder';
import Color from '../../../theme/Color';
import { scale } from '../../../theme/Scalling';
import Font from '../../../theme/Font';
import Images from '../../../theme/Images';
import { useDispatch, useSelector } from 'react-redux';
import { RecommendedJobRequest } from '../../../redux/Action/RecommendedJobAction';
import { loaderAction } from '../../../redux/Action/LoaderAction';

// const Markers = [
//   {
//     id: 1,
//     lat: 22.3226772,
//     lon: 70.7685856,
//   },
//   {
//     id: 2,
//     lat: 21.3226772,
//     lon: 71.7685856,
//   },
//   {
//     id: 3,
//     lat: 23.3226772,
//     lon: 73.7685856,
//   },
//   {
//     id: 4,
//     lat: 24.3226772,
//     lon: 74.7685856,
//   },
//   {
//     id: 5,
//     lat: 25.3226772,
//     lon: 75.7685856,
//   },
//   {
//     id: 6,
//     lat: 26.4499,
//     lon: 80.3319,
//   },
// ];

export default function MapViewJS({ navigation, latitude, longitude }) {
  const [currentLatitude, setCurrentLatitude] = useState(latitude);
  const [currentLongitude, setCurrentLongitude] = useState(longitude);

  // const [markerList, setMarkerList] = useState(Markers);

  console.log('currentLatitude::::', currentLatitude);
  console.log('currentLongitude::::', currentLongitude);

  // useEffect(() => {
  //   requestPermission();
  // }, []);

  // const requestPermission = async () => {
  //   try {
  //     let isPermitedExternalStorage = await PermissionsAndroid.check(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     );

  //     const Granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'Location access required',
  //         message: 'Catzapp need to access your location',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancle',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (Granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       getCurrentLocation();
  //     } else {
  //       Alert.alert('Permission Denide');
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
  //       // console.log(">>>>>>>>>>>>>>>>>>", currentLatitude);
  //       // console.log(">>>>>>>>>>>>>>>>>>>>>",currentLongitude)
  //       // RNGeocoder.isInit('API_KEY');
  //       // let add = Geocoder.geocodePosition(
  //       //   position.coords.latitude,
  //       //   position.coords.longitude,
  //       // );
  //       var NY = {
  //         lat: currentLatitude,
  //         lng: currentLongitude,
  //       };

  //       // await Geocoder.geocodePosition(NY).then(res => {
  //       //   // console.log('res::', JSON.stringify(res));
  //       //   var myAddress = res['0'];
  //       //   console.log(myAddress);
  //       //   setCurrentAddress(myAddress);
  //       // });
  //     },

  //     error => {
  //       Alert.alert(error.message.toString());
  //     },
  //   );
  // };

  const dispatch = useDispatch();
  const [recommendedData, setRecommendedData] = useState([]);
  // console.log('recommendedData--->', recommendedData);

  const loaderResponse = useSelector(state => state.loader);
  const RecommendeJobsData = useSelector(state => state.recommendedJob);
  // console.log('RecommendeJobsData-----', RecommendeJobsData.data);

  useEffect(() => {
    if (RecommendeJobsData.data !== null) {
      setRecommendedData(RecommendeJobsData.data);
    } else {
      dispatch(RecommendedJobRequest());
      dispatch(loaderAction(true));
    }
  }, [RecommendeJobsData.data]);

  const selectFilterItem = item => {
    console.log('item----', item);
    let temp = recommendedData;

    temp.map((tempItem, tenpIndex) => {
      // console.log('item ====>', tempItem);
      if (tempItem.id === item.id) {
        if (item.check !== undefined) {
          if (item.check === true) {
            item.check = false;
            navigation.navigate('MapBlackCardScreen', { item, latitude: currentLatitude, longitude: currentLongitude });
          } else {
            item.check = true;
          }
        } else {
          temp[tenpIndex] = { ...tempItem, check: true };
        }
      } else {
        if (tempItem.check !== undefined) {
          if (tempItem.check !== false) {
            tempItem.check = false;
          }
        }
      }
      setRecommendedData([...temp]);
    });
  };

  const [location, setLocation] = useState({});

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
        }}>
        <MapView
          style={{
            flex: 1,
          }}
          showsUserLocation={true}
          zoomControlEnabled
          // loadingEnabled
          initialCamera={{
            center: {
              latitude: Number(parseFloat(currentLatitude)),
              longitude: Number(parseFloat(currentLongitude)),
            },
            pitch: 45,
            heading: 90,
            altitude: 1000,
            zoom: 16,
          }}
          initialRegion={{
            latitude: Number(parseFloat(currentLatitude)),
            longitude: Number(parseFloat(currentLongitude)),
            latitudeDelta: 0.272,
            longitudeDelta: 0.222,
          }}>
          {recommendedData.map(
            (item, index) => (
              console.log(item),
              (
                <>
                  <Marker
                    onPress={() => selectFilterItem(item)}
                    key={item.id}
                    coordinate={{
                      latitude: item.work_location_lat,
                      longitude: item.work_location_long,
                    }}>
                    <View style={{ flex: 5 }}>
                      {item.check && (
                        <View
                          style={{ backgroundColor: 'white', borderRadius: 5 }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text style={{ fontSize: scale(12), paddingLeft: 4 }}>
                              {item.title}
                            </Text>

                            <Text style={{ marginLeft: wp(5), fontSize: scale(9), paddingHorizontal: 4 }}>
                              {parseInt(item.distance)} KM away
                            </Text>
                          </View>

                          <Text
                            style={{
                              fontSize: scale(9),
                              paddingLeft: 4,
                              marginBottom: hp(1.5),
                            }}>
                            {item.about_company}
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
                              {parseInt(item.percentage_match) == 0 ||
                                item.percentage_match == null ||
                                item.percentage_match == 0 ? (
                                <Text style={styles.matchText}>10 % Match</Text>
                              ) : (
                                <Text style={styles.matchText}>
                                  {parseInt(item.percentage_match)} % Match
                                </Text>
                              )}
                            </View>

                            <TouchableOpacity>
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: '#007AFF',
                                  paddingRight: 2,
                                }}>
                                View Job
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}

                      <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                          onPress={() => alert('hello')}
                          style={{
                            width: 50,
                            height: 50,
                            borderColor: 'white',
                            borderWidth: 2,
                            borderRadius: 5,
                            overflow: 'hidden',
                            backgroundColor: '#8A4918'
                          }}>
                          <Image
                            source={
                              item.category_image == "" || item.category_image == null ? `${require('../../../assets/ico-carpenter.jpg')}` : { uri: item.category_image }}
                            // resizeMode='contain'
                            style={{ width: 50, height: 50 }}
                          />
                        </TouchableOpacity>


                        <View style={[styles.matchView, { marginTop: -10 }]}>
                          <ImageBackground
                            source={Images.rightCircle}
                            style={styles.rightCircleIcon}>
                            <Image
                              source={Images.right}
                              style={styles.rightIcon}
                            />
                          </ImageBackground>
                          {parseInt(item.percentage_match) == 0 || parseInt(item.percentage_match) == null || parseInt(item.percentage_match) == "" ?
                            <Text style={styles.matchText}>
                              10 %
                            </Text> :
                            <Text style={styles.matchText}>
                              10 %
                            </Text>}
                        </View>
                      </View>
                    </View>
                  </Marker>
                </>
              )
            ),
          )}
        </MapView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'#666',
    // height:widthPercentageToDP(100),
    backgroundColor: Color.BackgroundColor,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
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
    // color: Color.ColorBlack,
    color: 'red',
  },
});
