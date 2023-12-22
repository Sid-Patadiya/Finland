import {
  StyleSheet,
  Text,
  View,
  FlatList,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import HeaderNavigation from '../../../component/HeaderNavigation';
import { RecommendedJobRequest } from '../../../redux/Action/RecommendedJobAction';
import { useDispatch, useSelector } from 'react-redux';
import RecomJobElementJS from '../../../component/RecomJobElementJS';
import FSize from '../../../theme/FSize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsktoLogin from '../../../AsktoLogin';
import { ApplyNowRequest } from '../../../redux/Action/ApplyNowAction';
import { useIsFocused } from '@react-navigation/native';
// import { Lang } from '../../../translation/lang';
import { SearchJobsRequest } from '../../../redux/Action/SearchJobsAction';
import { JobsNearMewcRequest } from '../../../redux/Action/JobsNearMewcAction';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import NewExploreJobElement from './NewExploreJobElement';
import SuccessModal from '../SuccessModal';
import { loaderAction } from '../../../redux/Action/LoaderAction';
import moment from 'moment';


const NewExploreJobs = ({ navigation }) => {
  const [recommendedData, setRecommendedData] = useState([]);
  const dispatch = useDispatch();
  const IsFocused = useIsFocused();

  const [ln, setLn] = useState('en');
  useEffect(() => {
    const setLang = async () => {
      setLn(await AsyncStorage.getItem('LanguageCode'));
    };
    setLang();
  }, [IsFocused]);

  // * * * * * * * LANGUAGE PART * * * * * * *
  const [Lang, setLang] = useState({});
  useEffect(() => {
    AsyncStorage.getItem('LANGUAGE').then(lang => {
      setLang(JSON.parse(lang));
    });
  }, []);
  // * * * * * * * LANGUAGE PART * * * * * * *

  //----------------------------------- Recommended Jobs Api Call -----------------------------\\
  const RecommendeJobsData = useSelector(state => state.recommendedJob);
  // console.log('RecommendeJobsData-----', RecommendeJobsData.data);

  useEffect(() => {
    if (RecommendeJobsData.data !== null) {
      // if(RecommendeJobsData.data)
      var newData = RecommendeJobsData.data.filter(item => {
        return (item.status = 'POSTED');
      });
      setRecommendedData(newData);
      // console.log('new recommended jobs>>>>>>>>>>>>>', newData)
    } else {
      dispatch(RecommendedJobRequest());
      dispatch(loaderAction(true));
    }
  }, [RecommendeJobsData.data]);
  // console.log('recommmended data>>>>>>>>>>>',recommendedData.status)

  // checking the login
  const [loginToken, setLoginToken] = useState();

  useEffect(() => {
    console.log('checking the access token now');
    (async () => {
      const token = await AsyncStorage.getItem('LoginAccessToken');
      console.log('token--->', token);
      setLoginToken(token);
    })();
  }, []);

  const ApplyNow = id => {
    console.log('item===>>>', id);
    const bodydata = {
      vacancy_id: id,
    };
    dispatch(ApplyNowRequest(bodydata));
    // dispatch(ApplyNowRequest({bodydata}));
    dispatch(loaderAction(true));
  };

  //---------------------------- Get Current Location ---------------------------- \\
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);
  // Search by geo-location (reverse geo-code)
  Geocoder.init('AIzaSyAyu-6Pv7RaiohWH1bWpQqwXbx7roNG_GA'); // use a valid API key

  useEffect(() => {
    requestPermission();
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
          message: 'This app need to access',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancle',
          buttonPositive: 'OK',
        },
      );
      if (Granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Alert.alert('Permission Granted');
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
        {
          loginToken == null
            ? console.log('you dont have a login')
            : console.log('you have a login')
          // CurrentLocation(currentLatitude, currentLongitude);
        }
        //  updateAddress(currentLatitude, currentLongitude);
        //  setModalState(false);
        Nearbymewc(currentLatitude, currentLongitude);
      },
      error => {
        Alert.alert(error.message.toString());
      },
    );
  };

  // jobs near me without token
  const Nearbymewc = item => {
    console.log('item:::::::::', item);
    console.log('lat, long', currentLatitude, currentLongitude);
    const bodydata = {
      radius: 50000,
      latitude: currentLatitude,
      longitude: currentLongitude,
    };
    dispatch(JobsNearMewcRequest(bodydata));
    // navigation.navigate('ExploreJobs', { key: 'JobsNearMe' });//to navigate it to the another page.
  };

  const [searchJobsData, setSearchJobsData] = useState([]);
  const NearByJobsWcData = useSelector(state => state.jobseNearMewc);
  // console.log('NearByJobsWcData--->', NearByJobsWcData);

  useEffect(() => {
    if (NearByJobsWcData.data !== null) {
      if (NearByJobsWcData.data.length !== 0) {
        setSearchJobsData(NearByJobsWcData.data);
      }
    }
  }, [NearByJobsWcData.data]);

  const [showModal, setShowModal] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <HeaderNavigation
        onPress={() => navigation.goBack()}
        heading={
          Lang &&
          Object.keys(Lang).length > 0 &&
          Lang[ln].ExploreJobs['Explore Jobs']
        }
      />
      <View style={{ flex: 1 }}>
        {loginToken == null ? (
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
                  image={item.recruiter_image || item.recruiter_profile || item.recruiter_profile_pic}
                  category_image={item.category_image} //background image
                  contact_person_name={item.contact_person_name || item.recruiter_name} // name
                  company_name={item.company_details?.company_name} // company name
                  RECRUITER_VIEWED={item.status} // recruiter viewed?
                  // percentage_match={parseInt(item.percentage_match)} //ends with %
                  job={item.title} //job title
                  urgent={item.urgent_vacancy}
                  experience={item.total_experience || item.experience_name} //expeience
                  location={item.work_location}
                  currency={item.currency} //currency
                  package={item.compensation_amount} //package
                  compensation_details={item.compensation_details} // per week/month/yesr
                  empType={item.emp_details}
                  kmAway={item.distance}
                  as={item.sent_at} //application sent at
                  onPressApply={() => setShowModal(true)}
                  onPress={() =>
                    navigation.navigate('ExploreJobsBlackCardScreen', { item,latitude:currentLatitude, longitude:currentLongitude })
                  }
                />
              );
            }}
          />
        ) : (
          <FlatList
            data={recommendedData}
            listKey="recommendedData"
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <RecomJobElementJS
                  //   onPressApplyNow={() => ApplyNow(item.id)}
                  //   // onPressApplyNow={() => ApplyNow(item.id)}
                  //   image={item.recruiter_image || item.recruiter_profile || item.recruiter_profile_pic}
                  //   category_image={item.category_image} //background image
                  //   contact_person_name={item.contact_person_name || item.recruiter_name} // name
                  //   company_name={
                  //     item.company_details ?
                  //       item.company_details.company_name
                  //       : item.company_name
                  //   } // company name
                  //   RECRUITER_VIEWED={item.status} // recruiter viewed?
                  //   // percentage_match={parseInt(item.percentage_match)} //ends with %
                  //   job={item.title} //job title
                  //   urgent={item.urgent_vacancy}
                  //   experience={item.total_experience || item.experience_name} //expeience
                  //   location={item.work_location}
                  //   currency={item.currency} //currency
                  //   package={item.compensation_amount} //package
                  //   compensation_details={item.compensation_details} // per week/month/yesr
                  //   empType={item.emp_details}
                  //   kmAway={item.distance}
                  //   as={item.sent_at} //application sent at
                  //   onPressApply={() => setShowModal(true)}
                  //   onPress={() =>
                  //     navigation.navigate('ExploreJobsBlackCardScreen', { item })
                  //   }
                  // />
                  // clicked={clicked}
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
                    navigation.navigate('BlackCardScreen', {
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
        )}
      </View>

      <SuccessModal
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        message={'Please do Login/Sign up'}
        onPress={() => setShowModal(false)}
        onPressOk={() => navigation.replace('AuthTopTabNavigation')}
      />
    </View>
  );
};

export default NewExploreJobs;

const styles = StyleSheet.create({});
