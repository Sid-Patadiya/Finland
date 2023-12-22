import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Alert,
  PermissionsAndroid,
  Dimensions,
  TextInput,
  Linking,
  Platform
} from 'react-native';

import HeaderCompJS from '../../../component/HeaderCompJS';
import SearchJS from '../../../component/SearchJS';
import { ScrollView } from 'react-native-virtualized-view';
import axios from 'axios';
import Color from '../../../theme/Color';
import Font from '../../../theme/Font';
import Images from '../../../theme/Images';
import { scale } from '../../../theme/Scalling';
import GestureRecognizer from 'react-native-swipe-gestures';
import Speedometer from 'react-native-speedometer-chart';
import Geolocation from '@react-native-community/geolocation';
// import Geocoder from 'react-native-geocoder';
import Geocoder from 'react-native-geocoding';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FSize from '../../../theme/FSize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnGoingJobElementJS from '../../../component/OnGoingJobElementJS';
import RecomJobElementJS from '../../../component/RecomJobElementJS';
import UBRElementJS from '../../../component/UBRElementJS';
import JobsNearMeElementJS from '../../../component/JobsNearMeElementJS';
import { useDispatch, useSelector } from 'react-redux';
import { RecommendedJobRequest } from '../../../redux/Action/RecommendedJobAction';
import { loaderAction } from '../../../redux/Action/LoaderAction';
import { AppliedJobsRequest } from '../../../redux/Action/AppliedJobsAction';
import { useIsFocused } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { apiKey } from '../../../../config';
import { OngoingJobsRequest } from '../../../redux/Action/OngoingJobsAction';
import Loader from '../../../component/loader';
import { JobsNearMeRequest } from '../../../redux/Action/JobsNearMeAction';
import { JobsNearMewcRequest } from '../../../redux/Action/JobsNearMewcAction';
import { ProfileRequest } from '../../../redux/Action/ProfileAction';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import DashBoardSkeleton from '../../../theme/SkeletonScreens/DashBoardSkeleton';
import { ApplyNowRequest } from '../../../redux/Action/ApplyNowAction';
// import { Lang } from '../../../translation/lang';
import { LocationRequest } from '../../../redux/Action/LocationAction';
import { UnloackedBRRequest } from '../../../redux/Action/UnloackedBRAction';
import AutoCompleteInput from '../../../component/AutoCompleteInput';
import { CreateTimeSheetRequest } from '../../../redux/Action/CreateTimeSheetAction';
import { CreateEndJobRequest } from '../../../redux/Action/EndJobAction';
import PushNotification from 'react-native-push-notification';
import { VacancyDetailsSaga } from '../../../redux/Saga/VacancyDetailsSaga';
import {
  SET_LANGUAGE,
  VACANCY_DETAILS_RESPONSE,
} from '../../../redux/Services/Type';
import { vacancyDetailsRequest } from '../../../redux/Action/VacancyDetailsAction';
import { AddListRequest } from '../../../redux/Action/AddListAction';
import { AddMessageRequest } from '../../../redux/Action/AddMessageList';
import moment from 'moment';
import MapModal from '../../../MapModal';
import NewExploreJobElement from '../exploreJOBS/NewExploreJobElement';
import SuccessModal from '../SuccessModal';
// import { JobsNearMewcRequest } from '../../../redux/Action/JobsNearMewcAction';
import RNAndroidLocationEnabler from "react-native-android-location-enabler";

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
    PushNotification.localNotification(notification);
  },
});

const CandidatesNearMe = [
  {
    locationIcon: Images.locationImage,
    Title: '10 KM',
    // candidate: '100',
    km: 10,
    rightArrowIcon: Images.blackRightArrow,
  },
  {
    locationIcon: Images.locationImage,
    Title: '30 KM',
    // candidate: '100',
    km: 30,
    rightArrowIcon: Images.blackRightArrow,
  },
  {
    locationIcon: Images.locationImage,
    Title: '50 KM',
    candidate: '',
    km: 50,
    rightArrowIcon: Images.blackRightArrow,
  },
  {
    locationIcon: Images.locationImage,
    Title: '100 KM',
    candidate: '',
    km: 100,
    rightArrowIcon: Images.blackRightArrow,
  },
];

const GOOGLE_PLACES_API_KEY = 'AIzaSyAyu-6Pv7RaiohWH1bWpQqwXbx7roNG_GA';

const GOOGLE_PACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place';

const DashBoard = ({ navigation }) => {
  const [modalState, setModalState] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [recommendedData, setRecommendedData] = useState([]);
  const [ongoingData, setOngoingData] = useState([]);
  const [jobsNearMeData, setJobsNearMeData] = useState([]);

  const [searchData, setSearchData] = useState('');


  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(null);
  const [applyModal, setApplyModal] = useState(false);
  const [applyModalx, setApplyModalx] = useState(false);

  const loaderResponse = useSelector(state => state.loader);

  // * * * * * * * LANGUAGE PART * * * * * * *
  const [Lang, setLang] = useState({});
  useEffect(() => {
    AsyncStorage.getItem('LANGUAGE').then(lang => {
      setLang(JSON.parse(lang));
    });
  }, []);
  // * * * * * * * LANGUAGE PART * * * * * * *

  //----------------------------------- Language Code -----------------------------\\
  const [ln, setLn] = useState('en');
  useEffect(() => {
    const setLang = async () => {
      setLn(await AsyncStorage.getItem('LanguageCode'));
    };
    setLang();
    setSearchData('');
  }, [isFocused]);

  //----------------------------------- OnGoing Jobs Api Call -----------------------------\\
  const OngoingJobsResponse = useSelector(state => state.ongoingJobs);
  // console.log('OngoingJobsResponse -----> ', OngoingJobsResponse.data);
  // console.log('OngoingJobsResponse -----> ', OngoingJobsResponse);

  useEffect(() => {
    if (OngoingJobsResponse.data !== null) {
      setOngoingData(OngoingJobsResponse.data);
    } else {
      dispatch(OngoingJobsRequest());
      dispatch(loaderAction(true));
    }
  }, [OngoingJobsResponse.data]);

  //----------------------------------- Jobs Near Me Api Call -----------------------------\\

  // const JobsNearMeData = useSelector(state => state.jobseNearMe);
  // console.log('JobsNearMeData -----> ', JobsNearMeData);
  const Nearbyme = item => {
    const bodydata = {
      radius: item.km,
    };

    dispatch(JobsNearMeRequest(bodydata));
    navigation.navigate('JobseNearMeMapScreen', { key: 'JobsNearMe', latitude: currentLatitude, longitude: currentLongitude });
    // navigation.navigate('JobseNearMeMapScreen', { key: 'JobsNearMewc', latitude: currentLatitude, longitude: currentLongitude });
  };

  // useEffect(() => {

  // }, [third])


  // useEffect(() => {
  //   Nearbyme(100);
  //   CurrentLocation(currentLatitude, currentLongitude)
  // }, [currentAddress])

  // useEffect(() => {
  //   if (JobsNearMeData.data !== null) {
  //     setJobsNearMeData(JobsNearMeData.data);
  //   } else {
  //     // dispatch(loaderAction(true));
  //   }
  // }, [JobsNearMeData.data]);6
  // * * * Deep linking * * *

  const vacancyDetails = useSelector(state => state?.vacancyDetails);

  useEffect(() => {
    Linking.getInitialURL().then(url => {
      var n = url.lastIndexOf('/');
      var id = url.substring(n + 1);
      dispatch(vacancyDetailsRequest({ vacancy_id: id }));
    });
    Linking.addEventListener('url', ({ url }) => {
      var n = url.lastIndexOf('/');
      var id = url.substring(n + 1);
      dispatch(vacancyDetailsRequest({ vacancy_id: id }));
    });
  }, []);

  //deeplinking job details>>
  useEffect(() => {
    console.log('vacancyDetails =>', vacancyDetails?.data?.data);
    if (vacancyDetails?.data?.data) {
      navigation.navigate('ExploreJobs', {
        item: vacancyDetails?.data?.data,
        key: 'details',
      });
      // clear reduser
      dispatch({
        type: VACANCY_DETAILS_RESPONSE,
        payload: null,
      });
    }
  }, [vacancyDetails?.data?.data]);

  //----------------------------------- Recommended Jobs Api Call -----------------------------\\
  const RecommendeJobsData = useSelector(state => state.recommendedJob);
  // console.log('RecommendeJobsData-----', RecommendeJobsData.data);

  useEffect(() => {
    if (RecommendeJobsData.data !== null) {
      // if(RecommendeJobsData.data)

      var newData = RecommendeJobsData.data.filter(item => {
        return (item.status = 'APPROVED');
      });
      setRecommendedData(newData);
      // console.log('new recommended jobs>>>>>>>>>>>>>', newData)
    } else {
      dispatch(RecommendedJobRequest());
      dispatch(loaderAction(true));
    }
  }, [RecommendeJobsData.data]);
  // console.log('recommmended data>>>>>>>>>>>',recommendedData.status)

  const [clicked, setClicked] = useState(0);

  const ApplyNow = id => {
    console.log('item===>>>', id);
    const bodydata = {
      vacancy_id: id,
    };
    dispatch(ApplyNowRequest(bodydata));
    setClicked(1);
    // dispatch(ApplyNowRequest({ bodydata }));
    dispatch(loaderAction(true));
  };
  //  -------------------------------------Unlocked by Recruiter Api Call --------------------------------- \\

  const [unlockedRecruiterData, setUnlockedRecruiterData] = useState([]);

  const UnlockedRecruiterResponse = useSelector(state => state.unloackedBR);
  // console.log('UnlockedRecruiterResponse-----', UnlockedRecruiterResponse.data);
  useEffect(() => {
    if (UnlockedRecruiterResponse.data !== null) {
      setUnlockedRecruiterData(UnlockedRecruiterResponse?.data?.data);
    }
  }, [UnlockedRecruiterResponse]);
  // console.log('UnlockedRecruiterResponse-----', unlockedRecruiterData);

  useEffect(() => {
    dispatch(UnloackedBRRequest());
    dispatch(loaderAction(true));
  }, [isFocused]);

  //  -------------------------------------Applied jobs  Api Call --------------------------------- \\

  const [appliedData, setAppliedData] = useState([]);
  const AppliedJobsData = useSelector(state => state.appliedJobs);
  // console.log('AppliedJobsData-----', AppliedJobsData.data);
  useEffect(() => {
    if (AppliedJobsData.data !== null) {
      setAppliedData(AppliedJobsData?.data.data);
    }
  }, [AppliedJobsData]);

  useEffect(() => {
    dispatch(AppliedJobsRequest());
    dispatch(loaderAction(true));
  }, [isFocused]);

  //---------------------------- Get Current Location ---------------------------- \\

  // useEffect(() => {
  //   onSearch();
  // }, []);

  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);
  // const [currentAddress, setCurrentAddress] = useState([]);
  const [currentAddress, setCurrentAddress] = useState('Current Location');
  // console.log('currentLatitude-->', currentLatitude);
  // console.log('currentLongitude-->', currentLongitude);

  // Search by geo-location (reverse geo-code)
  Geocoder.init('AIzaSyAyu-6Pv7RaiohWH1bWpQqwXbx7roNG_GA'); // use a valid API key

  // checking the login
  const [loginToken, setLoginToken] = useState('');
  // console.log('loginToken===', loginToken);

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('LoginAccessToken');
      // console.log('tokeprofileDatan--->', token);
      setLoginToken(token);
      requestPermission();
      token == null ? requestPermission() : null
    })();
  }, []);

  useEffect(() => {
    requestPermission()
  }, []);
  // getting permission for the locaiton....

  const requestPermission = async () => {
    console.log('requestingThePermission');
    try {
      let isPermitedExternalStorage = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      const Granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location access required',
          message: 'This app need to access',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancle',
          buttonPositive: 'OK',
        },
      );

      if (Granted === PermissionsAndroid.RESULTS.GRANTED) {
        (async () => {
          const token = await AsyncStorage.getItem('LoginAccessToken');
          console.log('tokeprofileDatandsdsds--->', token);
          setLoginToken(token);
          // getCurrentLocation();
        })();
        if (Platform.OS === 'android') {
          RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
            .then(resp => {
              // alert(resp);

              console.log('resp~~~~~~~~~', resp)
              if (resp == 'enabled' || resp === "already-enabled") {
                getCurrentLocation();

              }
            }).catch(err => {
              // alert("Error " + err.message + ", Code : " + err.code);
            });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };



  const getCurrentLocation = async () => {
    console.log('gettingCurrentLocationzz');
    await Geolocation.getCurrentPosition(
      async position => {
        const currentLatitude = position.coords.latitude;
        const currentLongitude = position.coords.longitude;
        CurrentLocation(currentLatitude, currentLongitude);//current location to update on meta data
        setCurrentLatitude(currentLatitude);
        setCurrentLongitude(currentLongitude);

        Nearbymexc(currentLatitude, currentLongitude);//jobs near me without token
        Nearbymexxc();
        // if (loginToken == null) {
        //   console.log('zzzzzzzzzzzzzz');
        //   Nearbymexc(currentLatitude, currentLongitude);
        // } else {
        //   console.log('xxxxxxxxxxxxxxxxxxx');
        //   Nearbymexc(currentLatitude, currentLongitude);
        //   CurrentLocation(currentLatitude, currentLongitude);
        // }
        updateAddress(currentLatitude, currentLongitude);
        setModalState(false);
        if (showModal == null) {
          setShowModal(true);
        }
      },
      error => {
        Alert.alert(error.message.toString());
      },
    );
  };

  // converting the api to the address
  function updateAddress(currentLatitude, currentLongitude) {
    Geocoder.from(currentLatitude, currentLongitude).then(json => {
      var addressComponent = json.results[0].address_components;
      var add = addressComponent[0]?.long_name;
      var addT = addressComponent[1]?.short_name;
      var myAddress = [add + addT];
      console.log(myAddress);
      setCurrentAddress(myAddress);
    });
  }

  // Geocoder.from(currentLatitude, currentLongitude).then(json => {
  //   var addressComponent = json.results[0].address_components;
  //   // console.log(addressComponent);
  //   console.log('currentAddress add----->>>>', addressComponent);
  // //   console.log('currentAddress----->>>>', addressComponent.short_name);
  // })
  // console.log("my address...", currentAddress);

  // ------------------------ Profile Data Api call -------------------------- \\
  const [profileData, setProfileData] = useState([]);
  const ProfileDataResponse = useSelector(state => state.profile);
  // console.log('ProfileDataResponse -----> ', ProfileDataResponse);
  useEffect(() => {
    if (ProfileDataResponse.data !== null) {
      setProfileData(ProfileDataResponse.data.data);
    } else {
      dispatch(ProfileRequest());
    }
  }, [ProfileDataResponse.data]);
  useEffect(() => {
    dispatch(ProfileRequest());
  }, [isFocused]);
  // console.log('profileDAta>>>>>>>>>>>', profileData);
  // update the locaiton from meta data to the the header

  useEffect(() => {
    if (profileData !== null) {
      let userLat = profileData.latitude;
      let userLong = profileData.longitude;
      updateAddress(userLat, userLong);
    } else {
      console.log('user is not loged in and hence we dont have his location');
    }
  }, []);

  // useEffect(() => {
  //   dispatch(loaderAction(true));
  //   setTimeout(() => {
  //     dispatch(loaderAction(false));
  //   }, 2000);
  // }, [isFocused]);

  // --------------------------update Location api call --------------------------\\
  const CurrentLocation = (currentLatitude, currentLongitude) => {
    console.log('latitude and longitude is', currentLatitude, currentLongitude);
    let bodydata = {
      latitude: parseFloat(currentLatitude).toFixed(6),
      longitude: parseFloat(currentLongitude).toFixed(6),
    };
    dispatch(LocationRequest(bodydata));
    console.log('location request sent succesfully');
    setModalState(false);
  };
  //----------------------------------

  const [predictions, setPredictions] = useState([]);

  const [fetchPredictions, setFetchPredictions] = useState(false);

  const [address, setAddress] = useState('');

  const [recentLocation, setRecentLocation] = useState([]);

  const onChangeText = async () => {
    console.log('Result is--->', address);

    const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?key=${GOOGLE_PLACES_API_KEY}&input=${address}`;
    try {
      const result = await axios.request({
        method: 'post',
        url: apiUrl,
      });

      if (result) {
        const {
          data: { predictions },
        } = result;
        setPredictions(predictions);
        setFetchPredictions(false);
      }
    } catch (e) {
      setFetchPredictions(false);
      console.log(e);
    }
  };

  //on clicked suggestion
  const onSuggestionClicked = (placeId, description) => {
    // Search by address
    setCurrentAddress(description); //setting the locaiton from the search tap

    Geocoder.from(description)
      .then(json => {
        var location = json.results[0].geometry.location;
        console.log('respose>>>>>>>>>>>>>', location);
        console.log('response lat>>>', location.lat);
        console.log('response long>>>', location.lng);
        //              aaaaaaaaaaaaa
        // updatting at the meta data
        setCurrentLatitude(json.results[0].geometry.location.lat);

        setCurrentLongitude(json.results[0].geometry.location.lng);

        CurrentLocation(json.results[0].geometry.location.lat, json.results[0].geometry.location.lng);//meta data api update
        setModalState(false);
      })
      .catch(error => console.warn(error));

    const location = {
      location: description,
    };
    console.log('location--->', recentLocation);
    recentLocation.push(location);
    setRecentLocation([...recentLocation]);
  };
  // update time sheet
  const UpdateTimeSheet = item => {
    let bodydata = {
      application_id: item.id,
      from_date: item.from_date,
      to_date: item.to_date,
      end_Jobs: false,
    };
    console.log(bodydata);
    dispatch(
      CreateTimeSheetRequest(bodydata, item, navigation, { key: 'TimeSheet' }),
    );
    // navigation.navigate('TimeSheetDetails', {item});
  };

  // end job------------------------------------------------------------------------------
  const endJob = item => {
    let bodydata = {
      vacancy_id: item.vacancy,
    };
    console.log(bodydata);
    dispatch(CreateEndJobRequest(bodydata));
    // navigation.navigate('UpdateTimeSheetJS');
  };
  // jobs near me without token
  const Nearbymewc = item => {
    // getCurrentLocation();
    // console.log('item:::::::::', item);
    console.log('lat, long', currentLatitude, currentLongitude);
    const bodydata = {
      radius: item.km,
      latitude: currentLatitude,
      longitude: currentLongitude,
    };
    dispatch(JobsNearMewcRequest(bodydata));
    navigation.navigate('JobseNearMeMapScreen', { key: 'JobsNearMewc', latitude: currentLatitude, longitude: currentLongitude });
    // navigation.navigate('ExploreJobs', {key: 'JobsNearMewc'});
  };

  //------------ CHAT NOW ---------

  const ChatNow = item => {
    // console.log('item=====<>', item);
    let bodydata = {
      recruiter_id: item.recruiter_id,
      recruiter_image: item.recruiter_profile_pic,
      name: item.vacancy.contact_person_name,
      last_seen: '20-01-2023',
    };
    // console.log('bodydata=========', bodydata);
    dispatch(AddMessageRequest(bodydata));
    navigation.navigate('ChatJS', { item });
  };

  // map modal on the start up


  // jobs near me with token
  // const Nearbymexcxc = (currentLatitude, currentLongitude) => {
  //   console.log('lat, long', currentLatitude, currentLongitude);
  //   const bodydata = {
  //     radius: 400,
  //   };
  //   dispatch(JobsNearMeRequest(bodydata));
  //   // console.log('bodyDataaaaaaaaaa', bodydata);
  // };

  // put it in function. getting the jobs near me without token response in the state
  // const NearByJobsData = useSelector(state => state.jobseNearMe);
  // useEffect(() => {
  //   if (NearByJobsData.data !== null) {
  //     console.log('NearByJobsData.data', NearByJobsData.data);
  //     if (NearByJobsWcData.data.length !== 0) {
  //       setSearchJobsData(NearByJobsWcData.data);
  //       console.log('NearByJobsWcData--->', searchJobsData);
  //     }
  //   }
  // }, [NearByJobsWcData.data]);

  // jobs near me without token

  useEffect(() => {


  }, [isFocused])

  // jobs near me without token by default
  const Nearbymexc = (currentLatitude, currentLongitude) => {
    console.log('lat, long', currentLatitude, currentLongitude);
    const bodydata = {
      radius: 400000,
      latitude: currentLatitude,
      longitude: currentLongitude,
    };
    dispatch(JobsNearMewcRequest(bodydata));
    // console.log('bodyDataaaaaaaaaa', bodydata);
  };
  const [searchJobsData, setSearchJobsData] = useState([]);
  const NearByJobsWcData = useSelector(state => state.jobseNearMewc);
  useEffect(() => {
    if (NearByJobsWcData.data !== null) {
      // console.log('NearByJobsWcData.data', NearByJobsWcData.data);
      if (NearByJobsWcData.data.length !== 0) {
        setSearchJobsData(NearByJobsWcData.data);
        // console.log('NearByJobsWcData--->', searchJobsData);
      }
    }
  }, [NearByJobsWcData.data]);

  // jobs near me with token by default
  const Nearbymexxc = item => {
    const bodydata = {
      radius: 4000000,
    };
    dispatch(JobsNearMeRequest(bodydata));
  };
  const [searchJobsDatax, setSearchJobsDatax] = useState([]);
  const NearByJobsData = useSelector(state => state.jobseNearMe);
  useEffect(() => {
    if (NearByJobsData.data !== null) {
      // console.log('NearByJobsWcData.data', NearByJobsWcData.data);
      if (NearByJobsData.data.length !== 0) {
        setSearchJobsDatax(NearByJobsData.data);
        // console.log('NearByJobsWcData--->', searchJobsData);
      }
    }
  }, [NearByJobsData.data]);



  return (
    <View style={styles.container}>
      <HeaderCompJS
        name={profileData?.first_name}
        onPress={() => navigation.navigate('Notification')}
        onPressLocation={() => setModalState(true)}
        address={currentAddress}
      />
      <View style={styles.textboxinnerOne}>
        {/* <SearchJS placeholder={'Search by Candidates/categories/Services'} /> */}
        <TextInput
          numberOfLines={1}
          multiline={false}
          value={searchData}
          keyboardAppearance="light"
          placeholderTextColor="#939393"
          placeholder={'Search by Jobs/Categories/Company'}
          onChangeText={text => setSearchData(text)}
          style={styles.inputFeed}
        />
        {searchData !== '' ? (
          <TouchableOpacity
            onPress={() => [
              navigation.navigate('ExploreJobs', 
              { searchData, key: 'search', latitude: currentLatitude, longitude: currentLongitude }),
            ]}>
            <View style={styles.iconx}>
              <Image style={styles.img} source={Images.searchJS}></Image>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
      <ScrollView style={styles.searchView}>
        {loaderResponse.loader === true ? (
          <DashBoardSkeleton enabled={loaderResponse.loader} />
        ) : (
          <>
            {/*  ************************* ON GOING JOBS*********************************** */}
            {loginToken == null ? null : (
              <>
                {ongoingData == '' || ongoingData == null ? null : (
                  <View style={styles.headerView}>
                    <Text style={styles.headerText}>
                      {Lang &&
                        Object.keys(Lang).length > 0 &&
                        Lang[ln].DashBoard['Ongoing Jobs']}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('MyJobsJS', { key: 'Ongoing Job' })
                      }
                    >
                      <Text style={styles.headerTextTwo}>
                        {Lang &&
                          Object.keys(Lang).length > 0 &&
                          Lang[ln].DashBoard['View All']}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                <FlatList
                  data={ongoingData.slice(0, 5)}
                  horizontal
                  contentContainerStyle={{ paddingHorizontal: hp(1) }}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => {
                    return (
                      <>
                        <OnGoingJobElementJS
                          onPress={() => UpdateTimeSheet(item)}
                          // endJob={() => endJob(item)}
                          endJob={() => setShow(true)}
                          company_image={item.company_image} // category image
                          Pofile={item.category_image} //image
                          jobName={item.job_title}
                          id={item.vacancy}
                          companyName={item.company_name}
                          description={item.job_description}
                          from_date={moment(item.from_date).format(
                            'DD MMM, YYYY',
                          )}
                          to_date={moment(item.to_date).format('DD MMM, YYYY')}
                          discription={item.discription}
                        // JobStatus={}
                        />
                        <SuccessModal
                          visible={show}
                          onRequestClose={() => setShow(false)}
                          message={'Are you sure, you want to end this job?'}
                          onPress={() => setShow(false)}
                          onPressOk={() => {
                            endJob(item);
                            setShow(false);
                          }}
                        />
                      </>
                    );
                  }}
                />
                {/* ********************************* subscription*************************** */}
                <View style={styles.infoView}>
                  <View style={styles.infoTextView}>
                    <Text style={styles.infoText1}>
                      {Lang &&
                        Object.keys(Lang).length > 0 &&
                        Lang[ln].DashBoard['Your Subscription Info']}
                    </Text>
                    <Text style={styles.infoText2}>
                      Lorem ipsum dolor sit amet, consectadipi sed do eiusm sed
                      do eiusmo tem Lorem ipsum dolor
                    </Text>
                  </View>
                  <View
                    style={{
                      height: hp(20),
                      width: wp(40),
                      bottom: hp(4),
                      right: 0,
                      position: 'absolute',
                    }}>
                    <ImageBackground
                      resizeMode="contain"
                      // resizeMode='cover'
                      source={require('../../../assets/Icon/subscriptionJS.png')}
                      style={styles.img}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('MySubscription')}
                    style={[
                      styles.subscription,
                      {
                        width: wp(55),
                        position: 'absolute',
                        bottom: hp(2),
                        left: wp(2),
                      },
                    ]}>
                    <Text style={styles.subText}>
                      {Lang &&
                        Object.keys(Lang).length > 0 &&
                        Lang[ln].DashBoard['Upgrade your Subscription']}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* -------------------------------------//Recommended jobs -----------------------------*/}
                {recommendedData == '' || recommendedData == null ? null : (
                  <View style={styles.headerView}>
                    <Text style={styles.headerText}>
                      {Lang &&
                        Object.keys(Lang).length > 0 &&
                        Lang[ln].DashBoard['Recommended Jobs']}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('RecommendedJobs', {
                          key: 'Map View',
                          latitude: currentLatitude,
                          longitude: currentLongitude
                        })
                      }>
                      <Text style={styles.headerTextTwo}>
                        {Lang &&
                          Object.keys(Lang).length > 0 &&
                          Lang[ln].DashBoard['View All']}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* <View style={{marginRight: wp(2)}}> */}
                <FlatList
                  data={recommendedData.slice(0, 5)}
                  listKey="recommendedData"
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => {
                    // console.log('item====>', item);
                    return (
                      <RecomJobElementJS
                        clicked={clicked}
                        image={item.recruiter_profile} //rec image
                        category_image={item.category_image} //background image
                        RECRUITER_VIEWED={item.status} // recruiter viewed   // viewed-status???
                        contact_person_name={item.contact_person_name} // name
                        company_name={item.about_company} // company name changerequest
                        percentage_match={item.percentage_match} //ends with %
                        job={item.title} //job title
                        urgent={item.urgent_vacancy}
                        experience={item.experience[0].experience} //experience
                        location={item.work_location}
                        currency={item.currency}
                        package={item.compensation_amount} //package
                        compensation_details={item.compensation_details} // per week/month/yesr
                        empType={item.emp_details} //full part time??
                        kmAway={item.distance} //
                        as={item.sent_at} //application sent at                       
                        onPressApplyNow={() => ApplyNow(item.id)}
                        posted={moment(item.created_on).fromNow()}
                        onPress={() =>
                          navigation.navigate('MapBlackCardScreen', {
                            item,
                            key: 'details',
                            latitude: currentLatitude,
                            longitude: currentLongitude
                          })
                        }
                      // incomingText={incomingText}
                      />
                    );
                  }}
                />
              </>
            )}
          </>
        )}
        {/* </View> */}
        {/*------------------------------------------------------- Speddometeer Mode------------------------- */}

        <View style={[styles.meterView, { marginTop: hp(2) }]}>
          <View style={{ paddingHorizontal: wp(4) }}>
            {loginToken == null ? (
              <>
                <Speedometer
                  size={hp(20)}
                  value={1}
                  totalValue={100}
                  showIndicator
                  outerColor="#d3d3d3"
                  internalColor="#218D18"
                />
                <Text
                  style={{
                    color: '#454545',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}>
                  0 %
                </Text>
              </>
            ) : (
              <>
                <Speedometer
                  size={hp(20)}
                  value={parseInt(profileData?.status_completion)}
                  totalValue={100}
                  showIndicator
                  outerColor="#d3d3d3"
                  internalColor="#218D18"
                />
                <Text
                  style={{
                    color: '#454545',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}>
                  {profileData?.status_completion}
                </Text>
              </>
            )}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.comProfileText}>
              {Lang &&
                Object.keys(Lang).length > 0 &&
                Lang[ln].DashBoard['Complete Your Profile']}
            </Text>
            <Text style={styles.meterText}>
              Lorem ipsum dolor sit amet, consectadipi sed do eiusm sed do
              eiusmo tem Lorem ipsum dolor
            </Text>

            {loginToken == null ? (
              <TouchableOpacity
                style={styles.subscription}
                recruiter_name
                onPress={() => navigation.replace('AuthTopTabNavigation')}
              // navigation.navigate('EditProfileJS', { profileData })
              >
                <Text
                  style={[
                    styles.subText,
                    { textAlign: 'center', marginHorizontal: wp(3) },
                  ]}>
                  {Lang &&
                    Object.keys(Lang).length > 0 &&
                    Lang[ln].DashBoard['Sign In Now']}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.subscription}
                onPress={() => {
                  navigation.navigate('EditProfileJS', { profileData });
                }}>
                <Text style={styles.subText}>
                  {Lang &&
                    Object.keys(Lang).length > 0 &&
                    Lang[ln].DashBoard['Complete Now']}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {/*------------------------------- Unlocked by Recruiter------------------------------------ */}

        <View style={{ flex: 1 }}>
          {loginToken == null ? null : (
            <>
              {unlockedRecruiterData == '' ||
                unlockedRecruiterData == null ? null : (
                <>
                  <View style={styles.headerView}>
                    <Text style={styles.headerText}>
                      {Lang &&
                        Object.keys(Lang).length > 0 &&
                        Lang[ln].DashBoard['Unlocked by Recruiter']}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('MyJobsJS', {
                          key: 'Unlocked by Recruiter',
                          latitude: currentLatitude,
                          longitude: currentLongitude,
                        })
                      }>
                      <Text style={styles.headerTextTwo}>
                        {Lang &&
                          Object.keys(Lang).length > 0 &&
                          Lang[ln].DashBoard['View All']}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <FlatList
                    horizontal
                    contentContainerStyle={{ paddingHorizontal: hp(1) }}
                    showsHorizontalScrollIndicator={false}
                    data={unlockedRecruiterData.slice(0, 5)}
                    renderItem={({ item }) => {
                      return (
                        <>
                          <UBRElementJS
                            Pofile={item.recruiter_profile_pic} //recruiter image
                            bgImg={item.vacancy.category_image} //background image::done
                            name={item.recruiter_name} //recruiter name
                            company_name={item.vacancy.company_name} //company name
                            percentage_match={parseFloat(item.percentage_match)} // Match  percent match
                            title={item.vacancy.title}
                            // date={item.vacancy.posted_on}
                            date={moment(item.vacancy.posted_on).format(
                              'DD MMM YYYY',
                            )}
                            ExpYear={item.vacancy.experience}
                            distance={parseInt(item.distance)}
                            onPress={() => ChatNow(item)}
                            onItemPress={() =>
                              navigation.navigate('UBRBlckCardScreen', {
                                item,
                                key: 'details',
                                latitude: currentLatitude,
                                longitude: currentLongitude
                              })
                            }
                          />
                        </>
                      );
                    }}
                  />
                </>
              )}
            </>
          )}

          {/* -----------------------------------------------//unlocked by recruiter ---------------------------------*/}
          <View
            style={{
              // marginHorizontal: hp(2),
              marginTop: hp(2),
            }}>
            {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.headerText}>
                {Lang[ln].DashBoard['Unlocked by Recruiter']}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('MyJobsJS', {
                    key: 'Unlocked by Recruiter',
                  })
                }>
                <Text style={styles.headerTextTwo}>
                  {Lang[ln].DashBoard['View All']}
                </Text>
              </TouchableOpacity>
            </View> */}

            {/* <FlatList
              horizontal
              contentContainerStyle={{ paddingHorizontal: hp(1) }}
              showsHorizontalScrollIndicator={false}
              data={unlockedRecruiterData}
              renderItem={({ item }) => {
                return (
                  <>
                    <UBRElementJS
                      bgImg={item.cat_image} //background image
                      Pofile={item.recruiter_image} //recruiter image
                      name={item.recruiter_name} //recruiter name
                      company_name={item.company_name} //company name
                      percentage_match={item.percentage_match} // Match  percent match
                      title={item.title}
                      date={item.post_date}
                      ExpYear={item.experience}
                      distance={item.distance}
                      onPress={() => navigation.navigate('ChatJS', { item })}
                      onItemPress={() => navigation.navigate('ExploreJobs', { item, key: 'details' })}
                    />
                  </>
                );
              }}
            /> */}
            {/* -----------------------------------------------//JOBS NEAR ME ---------------------------------*/}

            <View
              style={{
                marginHorizontal: hp(2),
                marginTop: hp(2),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.headerText}>
                  {Lang &&
                    Object.keys(Lang).length > 0 &&
                    Lang[ln].DashBoard['Jobs Near Me']}
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('JobseNearMeViewAll', {
                      key: 'Map View',
                      latitude: currentLatitude,
                      longitude: currentLongitude
                    })
                  }>
                  <Text style={styles.headerTextTwo}>
                    {Lang &&
                      Object.keys(Lang).length > 0 &&
                      Lang[ln].DashBoard['View All']}
                  </Text>
                </TouchableOpacity>

              </View>
              <Text style={styles.infoText3}>
                Lorem ipsum dolor sit amet, consectadipi sed do eiusm
              </Text>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <FlatList
                data={CandidatesNearMe}
                // horizontal
                listKey="CandidatesNearMe"
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingHorizontal: hp(1) }}
                numColumns={Math.ceil(CandidatesNearMe.length / 2)}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <JobsNearMeElementJS
                      item={item.length}
                      title={item.Title}
                      candidate={item.candidate}
                      onPress={() => {
                        loginToken == null ? Nearbymewc(item) : Nearbyme(item);
                      }}
                    />
                  );
                }}
              />
            </ScrollView>

            {/* -----------------------------------------------Applied jobs ---------------------------------*/}
            {loginToken == null ? null : (
              <>
                {appliedData == '' || appliedData == null ? null : (
                  <View
                    style={{
                      marginHorizontal: hp(2),
                      marginTop: hp(2),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.headerText}>
                        {Lang &&
                          Object.keys(Lang).length > 0 &&
                          Lang[ln].DashBoard['Applied Jobs']}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('MyJobsJS', { key: 'Applied Jobs' })
                        }>
                        <Text style={styles.headerTextTwo}>
                          {Lang &&
                            Object.keys(Lang).length > 0 &&
                            Lang[ln].DashBoard['View All']}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.infoText3}>
                      Lorem ipsum dolor sit amet, consectadipi sed do eiusm
                    </Text>
                  </View>
                )}

                <View style={{ marginBottom: hp(3) }}>
                  <FlatList
                    data={appliedData.slice(0, 5)}
                    listKey="appliedData"
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                      return (
                        // applied jobs
                        <RecomJobElementJS
                          category_image={item.vacancy.category_image} //background image
                          image={item.recruiter_profile_pic || item.recruiter_profile || item.recruiter_image}
                          contact_person_name={item.recruiter_name} // name
                          company_name={item.vacancy.company_name} // company name
                          RECRUITER_VIEWED={item.status} // recruiter viewed?
                          percentage_match={item.percentage_match} //ends with %
                          job={item.vacancy.job_category_name} //job title
                          urgent={item.vacancy.urgent_vacancy}
                          experience={item.total_experience} //expeience
                          location={item.work_location}
                          currency={item.currency} //currency
                          package={item.vacancy.compensation_amount} //package
                          compensation_details={
                            item.vacancy.compensation_details
                          } // per week/month/yesr
                          empType={item.employent_type}
                          kmAway={item.distance}
                          as={item.sent_at} //application sent at
                          onPress={() =>
                            navigation.navigate('BlackCardScreen', {
                              item,
                              key: 'details',
                              latitude: currentLatitude, longitude: currentLongitude
                            })
                          }
                        />
                      );
                    }}
                  />
                </View>
              </>
            )}
          </View>
        </View>

        {loginToken == null ? (
          <View style={{ flex: 1, marginTop: hp(2) }}>
            <Text style={[styles.headerText, { marginLeft: wp(4) }]}>
              Explore Jobs
            </Text>

            <FlatList
              data={searchJobsData}
              listKey="recommendedData"
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {
                // console.log('itemmmmm>>>>>>>',item)
                return (
                  <NewExploreJobElement
                    // onPressApplyNow={() => ApplyNow(item.id)}
                    // onPressApplyNow={() => ApplyNow(item.id)}
                    image={
                      item.recruiter_image ||
                      item.recruiter_profile ||
                      item.recruiter_profile_pic
                    }
                    category_image={item.category_image} //background image
                    contact_person_name={
                      item.contact_person_name || item.recruiter_name
                    } // name
                    company_name={item.company_details?.company_name} // company name
                    // RECRUITER_VIEWED={item.status} // recruiter viewed?
                    // percentage_match={item.percentage_match} //ends with %
                    job={item.title} //job title
                    urgent={item.urgent_vacancy}
                    experience={parseInt(item.total_experience) || parseInt(item.experience_name)} //expeience
                    location={item.work_location}
                    currency={item.currency} //currency
                    package={item.compensation_amount} //package
                    compensation_details={item.compensation_details} // per week/month/yesr
                    empType={item.emp_details}
                    kmAway={item.distance}
                    as={item.sent_at} //application sent at
                    onPressApply={() => setApplyModal(true)}
                    onPress={() =>
                      navigation.navigate('ExploreJobsBlackCardScreen', { item, latitude: currentLatitude, longitude: currentLongitude })
                    }
                  />
                );
              }}
            />
          </View>
        ) : null}
        <SuccessModal
          visible={applyModal}
          onRequestClose={() => setApplyModal(false)}
          message={'Please do Login/Sign up'}
          onPress={() => setApplyModal(false)}
          onPressOk={() => navigation.replace('AuthTopTabNavigation')}
        />

        <SuccessModal
          visible={applyModalx}
          onRequestClose={() => setApplyModalx(false)}
          message={'Are you sure to end this job?'}
          onPress={() => setApplyModalx(false)}
        // onPressOk={() => navigation.replace('AuthTopTabNavigation')}
        />
      </ScrollView>
      {/* {loginToken == null ? (
        <MapModal
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
          currentLatitude={currentLatitude}
          currentLongitude={currentLongitude}
          searchJobsDatax={searchJobsData}
          navigation={navigation}
          // message={'Please do Login/Sign up'}
          // onPress={() => setShowModal(false)}
          // onPressOk={() => navigation.replace('AuthTopTabNavigation')}
        />
      ) : null} */}
      <Modal
        transparent
        visible={showModal}
        onRequestClose={() => setShowModal(false)}>
        <MapModal
          onRequestClose={() => setShowModal(false)}
          profileData={profileData}
          currentLatitude={currentLatitude}
          currentLongitude={currentLongitude}
          searchJobsDatax={loginToken == null ? searchJobsData : searchJobsDatax}

          navigation={navigation}
        // message={'Please do Login/Sign up'}
        // onPress={() => setShowModal(false)}
        // onPressOk={() => navigation.replace('AuthTopTabNavigation')}
        />
      </Modal>
      {/* ************************************ Location Modal ************************************ */}
      <GestureRecognizer
        style={{ flex: 1, position: 'absolute' }}
        onSwipeDown={() => {
          setModalState(false), setAddress('');
        }}>
        <Modal
          // animationType="slide"
          transparent
          visible={modalState}
          onRequestClose={() => {
            setModalState(false), setAddress('');
          }}>
          <View style={styles.centeredView}>
            <View
              style={{
                // marginTop: hp(23.5),
                // justifyContent: 'flex-end',
                backgroundColor: '#FFFFFF',
                flex: 1,
              }}>
              <TouchableOpacity style={styles.linePosition}>
                <View style={styles.headNavLine}></View>
              </TouchableOpacity>
              <View style={styles.bottomShteetView}>
                <View
                  style={{
                    paddingHorizontal: hp(2),
                    paddingVertical: hp(2),
                  }}>
                  <TouchableOpacity
                    style={styles.locationImageView}
                    onPress={() => getCurrentLocation()}>
                    <Image
                      source={Images.CurrentLocation}
                      style={{ height: scale(20), width: scale(20) }}
                    />
                    <Text style={styles.locationImageText}>
                      {Lang &&
                        Object.keys(Lang).length > 0 &&
                        Lang[ln].DashBoard['Use my Current Location']}
                    </Text>
                  </TouchableOpacity>

                  <AutoCompleteInput
                    // label={i18n.t('profile_creation.add_address')}
                    serchIconInput={true}
                    list={predictions}
                    show={address.length ? true : false}
                    inputvalue={address}
                    onChange={data => {
                      setAddress(data);
                      if (data !== '') {
                        onChangeText();
                        setFetchPredictions(true);
                      } else {
                        setPredictions([]);
                      }
                    }}
                    listname="description"
                    load={fetchPredictions}
                    onPress={(placeId, description) => {
                      console.log('description---->', description);
                      console.log('placeId---->', placeId);
                      setPredictions([]);
                      onSuggestionClicked(placeId, description);
                      //define to update current location
                    }}
                  />
                </View>
                <View style={{ marginTop: hp(5) }}></View>
                <View style={styles.line}></View>
                {/* <Text style={styles.recentText}>
                  {Lang &&
                    Object.keys(Lang).length > 0 &&
                    Lang[ln].DashBoard['Recent Locations']}
                </Text> */}
                {/* <View
                  style={{
                    backgroundColor: 'white',
                    height: Dimensions.get('screen').height / 3,
                    marginTop: hp(1),
                    marginHorizontal: hp(1),
                  }}>
                  <FlatList
                    data={recentLocation}
                    // inverted
                    listKey="locationData"
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                      return (
                        <View style={styles.flatlistStyle1}>
                          <View style={styles.markLocationImage}>
                            <View style={{ alignItems: 'center' }}>
                              <Image source={Images.markLocation} style={{}} />
                            </View>
                            <View style={styles.locationData}>
                              <Text style={styles.locationDataText1}>
                                {item.location}
                              </Text>
                              <Text style={styles.locationDataText2}>
                                {item.location}
                              </Text>
                            </View>
                          </View>
                        </View>
                      );
                    }}
                  />
                </View> */}
                {/* <TouchableOpacity style={styles.showView}>
                  <Text style={{ color: Color.OrangeColor }}>
                    {Lang[ln].DashBoard['Show More']}
                  </Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
        </Modal>
      </GestureRecognizer>
      {/* <Loader val={loaderResponse.loader} /> */}
    </View>
  );
};

export default DashBoard;

const styles = StyleSheet.create({
  textboxinnerOne: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: wp(4),
    marginHorizontal: scale(10),
    borderRadius: hp(3),
    borderColor: '#D2D2D2',
    borderWidth: hp(0.1),
    marginTop: hp(2),
  },

  textboxinnerOnex: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: wp(4),
    borderRadius: hp(3),
    borderColor: '#D2D2D2',
    borderWidth: hp(0.1),
    marginTop: hp(1),
  },

  inputFeed: {
    flex: 1,
    // color: 'red',
    color: '#939393',
    fontSize: FSize.fs12,
    fontFamily: Font.PoppinsRegular,
    width: '100%',
    marginBottom: scale(-3),
  },
  icon: {
    marginTop: hp(1.5),
    height: hp(3),
    width: hp(3),
  },
  iconx: {
    // marginTop:hp(1.5),
    height: hp(3),
    width: hp(3),
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  searchView: {
    flex: 1,
  },
  //---------------------
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp(1.5),
    marginHorizontal: hp(2),
  },
  headerText: {
    fontFamily: Font.PoppinsSemiBold,
    fontSize: FSize.fs17,
    fontWeight: '500',
    color: '#686969',
  },
  headerTextTwo: {
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs14,
    fontWeight: '500',
    color: '#FF4A39',
  },

  flatlistView: {
    flex: 1,
    marginTop: scale(10),
    marginHorizontal: scale(5),
    borderRadius: scale(3),
    backgroundColor: Color.Colorwhite,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(15),
  },
  titleText: {
    fontFamily: Font.PoppinsRegular,
    fontSize: 13,
    color: 'rgba(75, 75, 75, 1)',
    marginTop: scale(3),
    textAlign: 'center',
  },
  candidatesText: {
    fontFamily: Font.PoppinsRegular,
    fontSize: 9,
    color: Color.OrangeLightColor,
    textAlign: 'center',
  },
  showView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(10),
  },
  downText: {
    fontFamily: Font.PoppinsRegular,
    color: Color.OrangeColor,
    fontSize: scale(10),
  },
  infoView: {
    height: hp(25),
    marginTop: hp(3),
    flex: 1,
    paddingLeft: wp(3),
    backgroundColor: Color.Colorwhite,
    borderRadius: hp(0.5),
    marginHorizontal: hp(2),
  },
  infoTextView: {
    justifyContent: 'center',
    // alignItems: 'center'
    // justifyContent: 'flex-start',
    // alignItems: 'center'
    // marginHorizontal: scale(10),
    // width: wp(80)
  },
  infoText1: {
    fontSize: FSize.fs14,
    fontFamily: Font.PoppinsRegular,
    color: '#4B4B4B',
    fontWeight: '700',
    marginTop: scale(15),
  },
  infoText2: {
    width: wp(55),
    fontSize: FSize.fs12,
    top: scale(5),
    color: '#444444',
    fontFamily: Font.PoppinsRegular,
  },
  infoText3: {
    color: '#444444',
    fontSize: FSize.fs11,
    fontFamily: Font.PoppinsRegular,
    // marginLeft: wp(2)
  },
  subscription: {
    backgroundColor: '#000000',
    borderRadius: hp(5),
    // paddingHorizontal: wp(3),
    paddingVertical: hp(0.7),
    // width: wp(60),
    marginTop: hp(1.8),
  },
  subText: {
    top: 1.5,
    color: '#ffffff',
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs13,
    textAlign: 'center',
  },
  buttonComponentStyles: {
    flex: 1,
    borderRadius: scale(20),
    backgroundColor: Color.TextBlueColor,
    justifyContent: 'center',
    padding: scale(5),
  },

  //=-------------------------- Recommended Candidate Screen
  recommText: {
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs15,
    color: Color.TextGrayColor,
    fontWeight: '500',
    fontFamily: Font.PoppinsRegular,
  },
  flatlistView2: {
    flex: 1,
    marginVertical: scale(11),
    marginHorizontal: scale(6),
    alignItems: 'center',
    backgroundColor: Color.Colorwhite,
    borderRadius: scale(3),
    flexDirection: 'row',
    paddingVertical: scale(10),
  },
  premiumView: {
    position: 'absolute',
    alignSelf: 'flex-start',
    marginLeft: scale(-7),
    marginTop: scale(-7),
  },
  fileIcon: {
    height: scale(10.71),
    width: scale(10.71),
  },
  profileImageCandidate: {
    marginLeft: hp(1),
    height: scale(121),
    width: scale(117),
  },
  recommNameView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  nameTextCandidate: {
    fontSize: scale(13),
    fontWeight: '500',
    color: Color.ColorBlack,
    fontFamily: Font.PoppinsRegular,
  },
  varifyView: {
    flexDirection: 'row',
    alignItems: 'center',
    left: hp(1),
  },
  varifyText: {
    fontSize: 9,
    fontWeight: '500',
    color: Color.TextBlueColor,
    fontFamily: Font.PoppinsRegular,
    left: hp(0.5),
  },
  jobTextCandidate: {
    fontSize: 10,
    fontWeight: '400',
    color: Color.ColorBlack,
    fontFamily: Font.PoppinsRegular,
  },
  detailViewCandidate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(2),
  },
  availableTextCandidate: {
    fontFamily: Font.PoppinsRegular,
    fontSize: 8.5,
    color: Color.YellowTextColor,
  },
  experienceTextCandidate: {
    fontFamily: Font.PoppinsRegular,
    fontSize: 10,
    fontWeight: '300',
    color: '#444444',
  },
  yearTextCandidate: {
    fontFamily: Font.PoppinsRegular,
    fontSize: 10,
    fontWeight: '700',
    color: Color.ColorBlack,
  },
  matchViewCandidate: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  rightIconCandidate: {
    height: scale(3.37),
    width: scale(4.47),
  },
  rightCircleIconCandidate: {
    height: scale(10.5),
    width: scale(10.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchTextCandidate: {
    fontFamily: Font.PoppinsRegular,
    fontSize: 9,
    left: scale(3.49),
    top: scale(1),
    color: Color.OrangeColor,
  },
  lastseenTextCandidate: {
    fontFamily: Font.PoppinsRegular,
    fontSize: 9,
    textAlign: 'center',
  },
  timeTextCandidate: {
    fontSize: 9,
    fontFamily: Font.PoppinsRegular,
    color: Color.TextBlueColor,
    textAlign: 'center',
    fontWeight: '800',
    marginLeft: scale(2),
  },
  //------------------- Modal style
  centeredView: {
    flex: 1,
    backgroundColor: '#000000aa',
  },
  linePosition: {
    bottom: 10,
    alignSelf: 'center',
  },
  headNavLine: {
    width: wp(20),
    height: hp(0.5),
    backgroundColor: '#FFFFFF',
    borderRadius: wp(1),
  },
  bottomShteetView: {
    // flex: 1,
    backgroundColor: '#FFFFFF',
    // marginTop: Dimensions.get('screen').height/4.25,
    justifyContent: 'flex-end',
  },
  line: {
    borderBottomWidth: hp(0.1),
    borderBottomColor: 'rgba(0, 0, 0, 0.1);',
    paddingVertical: hp(0.7),
    marginHorizontal: hp(2),
  },
  locationImageView: {
    flexDirection: 'row',
    marginTop: hp(2),
    marginHorizontal: scale(16),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(1),
  },
  locationImageText: {
    marginLeft: hp(1),
    color: Color.HeaderColor,
    fontSize: 14,
    fontFamily: Font.PoppinsRegular,
  },
  recentText: {
    marginTop: scale(8),
    paddingHorizontal: scale(20),
    color: Color.HeaderColor,
    fontSize: 12,
    fontFamily: Font.PoppinsRegular,
  },
  flatlistStyle1: {
    marginTop: hp(0.5),
    // marginHorizontal: scale(5),
  },
  markLocationImage: {
    flexDirection: 'row',
    marginHorizontal: 10,
    margin: hp(0.5),
    // alignItems: 'center',
  },
  locationData: {
    marginLeft: 10,
    borderBottomWidth: hp(0.03),
    borderBottomColor: 'rgba(0, 0, 0, 0.1);',
    paddingVertical: hp(0.7),
  },
  locationDataText1: {
    fontSize: 12,
    fontWeight: '500',
    color: Color.ColorBlack,
    fontFamily: Font.PoppinsRegular,
  },
  locationDataText2: {
    fontSize: 12,
    fontFamily: Font.PoppinsRegular,
  },

  //------------------------------- Speedometer Styles
  meterView: {
    // flex: 1,
    backgroundColor: Color.Colorwhite,
    paddingVertical: hp(2),
    paddingRight: wp(2),
    alignItems: 'center',
    marginHorizontal: hp(2),
    flexDirection: 'row',
  },
  comProfileText: {
    // textAlign: 'center',
    fontSize: FSize.fs12,
    fontWeight: '700',
    color: Color.ColorBlack,
    fontFamily: Font.PoppinsRegular,
  },
  meterText: {
    // textAlign: 'center',
    fontSize: FSize.fs11,
    color: '#444444',
    marginTop: hp(1),
    fontFamily: Font.PoppinsRegular,
  },
  //-------------------------------------  UnlockedScreen

  hederTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(6),
    marginTop: scale(10),
  },
  hederText: {
    fontSize: scale(14),
    color: Color.TextGrayColor,
    fontWeight: '500',
    fontFamily: Font.PoppinsRegular,
  },
  allProTextView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  allProText: {
    marginHorizontal: scale(4),
    fontSize: scale(11),
    fontFamily: Font.PoppinsRegular,
  },
  downArrowIcon: {
    width: scale(10),
    height: scale(6),
  },
  flatlistStyle: {
    borderRadius: scale(3),
    marginTop: scale(5),
    paddingVertical: scale(13),
    alignItems: 'center',
    backgroundColor: Color.Colorwhite,
    marginHorizontal: scale(6),
    flex: 1,
    paddingHorizontal: scale(7),
  },
  shortedView: {
    backgroundColor: Color.ColorBlack,
    opacity: scale(0.6),
    height: scale(20),
    width: scale(60),
    borderRadius: scale(2),
    alignSelf: 'flex-end',
    justifyContent: 'center',
    margin: scale(5),
  },
  shortedText: {
    fontFamily: Font.PoppinsRegular,
    fontSize: 9,
    color: Color.Colorwhite,
    fontWeight: '500',
    textAlign: 'center',
  },
  fileIconView: {
    backgroundColor: Color.ColorBlack,
    opacity: scale(0.45),
    height: scale(19),
    width: scale(19),
    borderRadius: scale(10),
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 1,
    right: scale(1),
    margin: scale(5),
    position: 'absolute',
  },
  fileIcon: {
    height: scale(10.71),
    width: scale(10.71),
  },
  profileImage: {
    height: scale(144),
    width: scale(165),
  },
  matchView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(5),
    backgroundColor: Color.Colorwhite,
    marginTop: scale(-8),
    flexDirection: 'row',
    borderRadius: scale(20),
  },
  rightIcon: {
    height: scale(3.37),
    width: scale(4.47),
  },
  rightCircleIcon: {
    height: scale(10),
    width: scale(10.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchText: {
    fontFamily: Font.PoppinsRegular,
    fontSize: 9,
    marginLeft: scale(3),
    marginTop: scale(2),
    color: Color.HeaderColor,
  },
  nameText: {
    fontSize: 14,
    fontWeight: '500',
    color: Color.ColorBlack,
    fontFamily: Font.PoppinsRegular,
    marginTop: hp(0.5),
  },
  jobText: {
    fontSize: 9,
    fontWeight: '400',
    color: Color.ColorBlack,
    fontFamily: Font.PoppinsRegular,
    textAlign: 'center',
  },
  timeText: {
    fontSize: 10,
    fontFamily: Font.PoppinsRegular,
    color: Color.TextBlueColor,
    textAlign: 'center',
    flex: 1,
    backgroundColor: '#E4F1FF',
    paddingHorizontal: scale(7),
    borderRadius: scale(20),
    marginTop: scale(5),
    paddingVertical: 2,
  },
  detailView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scale(10),
  },
  yearText: {
    fontFamily: Font.PoppinsRegular,
    fontSize: scale(9),
    textAlign: 'center',
    fontWeight: '600',
    color: Color.ColorBlack,
  },
  experienceText: {
    fontFamily: Font.PoppinsRegular,
    fontSize: 9,
  },
  lineView: {
    borderWidth: scale(0.2),
    opacity: scale(0.07),
    height: scale(34.5),
  },
  kmText: {
    fontFamily: Font.PoppinsRegular,
    fontSize: scale(9),
    textAlign: 'center',
    fontWeight: '600',
    color: Color.ColorBlack,
  },
  locationText: {
    fontFamily: Font.PoppinsRegular,
    fontSize: 9,
  },
  candidateTextView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(10),
    alignItems: 'center',
    marginHorizontal: scale(7),
  },
  candidateText: {
    fontSize: scale(15),
    fontWeight: '500',
    color: '#686969',
    fontFamily: Font.PoppinsRegular,
  },
  candidateText2: {
    fontSize: 9,
    fontWeight: '300',
    color: '#444444',
    fontFamily: Font.PoppinsRegular,
    // left:hp(1)
  },
  viewAllText: {
    fontSize: scale(11),
    color: '#FF4A39',
    fontFamily: Font.PoppinsRegular,
  },
  //--------------     Candidate Flatlist Styeles

  locationImage: {
    height: hp(5),
    width: hp(5),
    marginHorizontal: scale(5),
  },
});
