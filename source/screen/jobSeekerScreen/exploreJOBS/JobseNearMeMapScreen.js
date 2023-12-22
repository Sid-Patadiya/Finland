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
import AsyncStorage from '@react-native-async-storage/async-storage';
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


export default function JobseNearMeMapScreen({ route, navigation }) {
  var lat = route?.params.latitude
  var long = route?.params.longitude

  const [currentLatitude, setCurrentLatitude] = useState(lat);
  const [currentLongitude, setCurrentLongitude] = useState(long);

  // const [markerList, setMarkerList] = useState(Markers);

  console.log('currentLatitude::::', currentLatitude);
  console.log('currentLongitude::::', currentLongitude);

  useEffect(() => {
    if (currentLatitude == undefined || currentLongitude == undefined) {
      requestPermission();
    }
  }, []);


  const requestPermission = async () => {
    try {
      let isPermitedExternalStorage = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      const Granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location access required',
          message: 'Catzapp need to access your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancle',
          buttonPositive: 'OK',
        },
      );
      if (Granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        Alert.alert('Permission Denide');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getCurrentLocation = async () => {
    await Geolocation.getCurrentPosition(
      async position => {
        const currentLatitude = position.coords.latitude;
        const currentLongitude = position.coords.longitude;
        setCurrentLatitude(currentLatitude);
        setCurrentLongitude(currentLongitude);
        // console.log(">>>>>>>>>>>>>>>>>>", currentLatitude);
        // console.log(">>>>>>>>>>>>>>>>>>>>>",currentLongitude)
        // RNGeocoder.isInit('API_KEY');
        // let add = Geocoder.geocodePosition(
        //   position.coords.latitude,
        //   position.coords.longitude,
        // );
        // var NY = {
        //   lat: currentLatitude,
        //   lng: currentLongitude,
        // };

        // await Geocoder.geocodePosition(NY).then(res => {
        //   // console.log('res::', JSON.stringify(res));
        //   var myAddress = res['0'];
        //   console.log(myAddress);
        //   setCurrentAddress(myAddress);
        // });
      },

      error => {
        Alert.alert(error.message.toString());
      },
    );
  };

  const dispatch = useDispatch();

  const loaderResponse = useSelector(state => state.loader);
  const NearByJobsData = useSelector(state => state.jobseNearMe);
  // console.log('NearByJobsData~~~~~~~~~~~~~~~~>', NearByJobsData);

  const NearByJobsWcData = useSelector(state => state.jobseNearMewc);
  // console.log('NearByJobsWcData~~~~~~~~~~~~~~~~>', NearByJobsWcData);

  const [searchJobsData, setSearchJobsData] = useState([]);

  useEffect(() => {
    if (route?.params !== undefined) {
      console.log('route?.params.key', route?.params.key);
      if (route?.params.key == 'JobsNearMe') {
        // setCurrentLatitude(route?.params.latitude)
        // setCurrentLongitude(route?.params.longitude)
        if (NearByJobsData.data !== null) {
          if (NearByJobsData?.data?.length !== 0) {
            setSearchJobsData(NearByJobsData.data);
          }
        }
      } else if (route?.params.key == 'JobsNearMewc') {
        setCurrentLatitude(route?.params.latitude)
        setCurrentLongitude(route?.params.longitude)
        if (NearByJobsWcData.data !== null) {
          if (NearByJobsWcData?.data?.length !== 0) {
            setSearchJobsData(NearByJobsWcData.data);
          }
        }
      }
    }
  }, [route?.params.key, NearByJobsData, NearByJobsWcData]);

  const selectFilterItem = (item, currentLatitude, currentLongitude) => {
    console.log
    console.log('item----', item);
    let temp = searchJobsData;

    temp.map((tempItem, tenpIndex) => {
      // console.log('item ====>', tempItem);
      if (tempItem.id === item.id) {
        if (item.check !== undefined) {
          if (item.check === true) {
            item.check = false;
            navigation.navigate('JobsNearMeBlackCard', { item, latitude: currentLatitude, longitude: currentLongitude });
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
      setSearchJobsData([...temp]);
    });
  };

  const [location, setLocation] = useState({});

  // checking the login
  const [loginToken, setLoginToken] = useState('');
  // console.log('loginToken===', loginToken);

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('LoginAccessToken');
      setLoginToken(token);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          paddingVertical: hp(1.5),
          flexDirection: 'row',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={{ height: hp(3), width: hp(3), marginHorizontal: hp(2) }}>
            <Image
              style={styles.img}
              source={require('../../../assets/Icon/arrowOrange.png')}></Image>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 1,
        }}>
        {currentLatitude && currentLongitude ? (
          <MapView
            style={{
              flex: 1,
            }}
            showsUserLocation={true}
            zoomControlEnabled
            // initialCamera={{
            //   center: {
            //     latitude: currentLatitude,
            //     longitude: currentLongitude,
            //   },
            //   pitch: 45,
            //   heading: 90,
            //   altitude: 1000,
            //   zoom: 16,
            // }}
            initialRegion={{
              latitude: currentLatitude,
              longitude: currentLongitude,
              latitudeDelta: 0.472,
              longitudeDelta: 0.422,
            }}>
            {searchJobsData.map(
              (item, index) => (
                console.log(item),
                (
                  <>
                    <Marker
                      onPress={() => selectFilterItem(item, currentLatitude, currentLongitude)}
                      key={item.id}
                      coordinate={{
                        latitude: parseFloat(item.work_location_lat),
                        longitude: parseFloat(item.work_location_long),
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

                              {/* <Text style={{ marginLeft: wp(5), fontSize: scale(9), paddingHorizontal: 4 }}>
                              {parseInt(item.distance)} km Away
                            </Text> */}
                              {item.distance <= 1 ? (
                                <Text style={[styles.matchText, { color: '#000000' }]}>Less than a KM Away</Text>
                              ) : (
                                <Text style={[styles.matchText, { color: '#000000', marginLeft: wp(3), paddingHorizontal: wp(2) }]}>{parseInt(item.distance)} KM Away</Text>
                              )}
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
                              {loginToken == null ? <View></View> :
                                <View style={styles.matchView}>
                                  <ImageBackground
                                    source={Images.rightCircle}
                                    style={styles.rightCircleIcon}>
                                    <Image
                                      source={Images.right}
                                      style={styles.rightIcon}
                                    />
                                  </ImageBackground>
                                  {item.percentage_match == 0 ||
                                    item.percentage_match == null ||
                                    parseInt(item.percentage_match) == 0 ? (
                                    <Text style={styles.matchText}>10 % Match</Text>
                                  ) : (
                                    <Text style={styles.matchText}>
                                      {parseFloat(item.percentage_match)} % Match
                                    </Text>
                                  )}
                                </View>
                              }
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
                            }}>
                            <Image
                              source={{ uri: item.category_image }}
                              // resizeMode='contain'
                              style={{ width: 50, height: 50 }}
                            />
                          </TouchableOpacity>
                          {loginToken == null ? null :
                            <View style={[styles.matchView, { marginTop: -10 }]}>
                              <ImageBackground
                                source={Images.rightCircle}
                                style={styles.rightCircleIcon}>
                                <Image
                                  source={Images.right}
                                  style={styles.rightIcon}
                                />
                              </ImageBackground>
                              {parseFloat(item.percentage_match) == "" || item.percentage_match == null ?
                                <Text style={styles.matchText}>
                                  10 %
                                </Text> :
                                <Text style={styles.matchText}>
                                  {parseFloat(item.percentage_match)} %
                                </Text>
                              }
                            </View>
                          }
                        </View>
                      </View>
                    </Marker>
                  </>
                )
              ),
            )}
          </MapView>
        ) : null}
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
