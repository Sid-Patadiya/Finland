import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import SearchJS from '../../../component/SearchJS';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import RecomJobElementJS from '../../../component/RecomJobElementJS';
import { useDispatch, useSelector } from 'react-redux';
import { RecommendedJobRequest } from '../../../redux/Action/RecommendedJobAction';
import Loader from '../../../component/loader';
import { loaderAction } from '../../../redux/Action/LoaderAction';
import { ApplyNowRequest } from '../../../redux/Action/ApplyNowAction';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { JobsNearMeRequest } from '../../../redux/Action/JobsNearMeAction';
import { JobsNearMewcRequest } from '../../../redux/Action/JobsNearMewcAction';
// import { ApplyNowRequest } from '../../../redux/Action/ApplyNowAction';

const RecommendedJobsData = [
  {
    id: 1,
    apply: true,
    image: require('../../../assets/Icon/plumber.png'),
    job: 'Plumber',
    experience: '2-3 ',
    location: 'Finland',
    package: '$200 - $300 ',
    empType: 'Part Time/Full Time',
    kmAway: '1',
    posted: '1',
  },
  {
    id: 2,
    apply: false,
    image: require('../../../assets/Icon/plumber.png'),
    job: 'Plumber',
    experience: '2-3 ',
    location: 'Finland',
    package: '$200 - $300 ',
    empType: 'Part Time/Full Time',
    kmAway: '4',
    posted: '3',
  },
  {
    id: 3,
    apply: false,
    image: require('../../../assets/Icon/plumber.png'),
    job: 'Plumber',
    experience: '2-3 ',
    location: 'Finland',
    package: '$200 - $300 ',
    empType: 'Part Time/Full Time',
    kmAway: '5',
    posted: '2',
  },
  {
    id: 4,
    apply: true,
    image: require('../../../assets/Icon/plumber.png'),
    job: 'Plumber',
    experience: '2-3 ',
    location: 'Finland',
    package: '$200 - $300 ',
    empType: 'Part Time/Full Time',
    kmAway: '6',
    posted: '2',
  },
  {
    id: 5,
    apply: true,
    image: require('../../../assets/Icon/plumber.png'),
    job: 'Plumber',
    experience: '2-3 ',
    location: 'Finland',
    package: '$200 - $300 ',
    empType: 'Part Time/Full Time',
    kmAway: '6',
    posted: '2',
  },
  {
    id: 6,
    apply: true,
    image: require('../../../assets/Icon/plumber.png'),
    job: 'Plumber',
    experience: '2-3 ',
    location: 'Finland',
    package: '$200 - $300 ',
    empType: 'Part Time/Full Time',
    kmAway: '6',
    posted: '2',
  },
];
export default function JMVLCardViewJS({ navigation, latitude, longitude }) {

  const [currentLatitude, setCurrentLatitude] = useState(latitude);
  const [currentLongitude, setCurrentLongitude] = useState(longitude);



  useEffect(() => {
    Nearbymexc(currentLatitude, currentLongitude);//jobs near me without token
    Nearbymexxc();
  }, [latitude])

  console.log('currentLatitude::::', latitude);
  console.log('currentLongitude::::', longitude);

  const dispatch = useDispatch();

  const loaderResponse = useSelector(state => state.loader);
  const NearByJobsData = useSelector(state => state.jobseNearMe);

  console.log('NearByJobsData~~~~~~~~~~~~~~~~>', NearByJobsData);

  const NearByJobsWcData = useSelector(state => state.jobseNearMewc);
  console.log('NearByJobsWcData~~~~~~~~~~~~~~~~>', NearByJobsWcData);

  const [searchJobsData, setSearchJobsData] = useState([]);

  const Nearbymexc = (currentLatitude, currentLongitude) => {
    console.log('lat, long', currentLatitude, currentLongitude);
    const bodydata = {
      radius: 400,
      latitude: currentLatitude,
      longitude: currentLongitude,
    };
    dispatch(JobsNearMewcRequest(bodydata));
    // console.log('bodyDataaaaaaaaaa', bodydata);
  };

  // // jobs near me with token by default
  const Nearbymexxc = item => {
    const bodydata = {
      radius: 400,
    };
    dispatch(JobsNearMeRequest(bodydata));
  };

  useEffect(() => {
    if (NearByJobsData.data !== null) {
      if (NearByJobsData?.data?.length !== 0) {
        setSearchJobsData(NearByJobsData.data);
      }
    }
    if (NearByJobsWcData.data !== null) {
      if (NearByJobsWcData?.data?.length !== 0) {
        setSearchJobsData(NearByJobsWcData.data);
      }
    }
    // }
  }, [latitude, NearByJobsData, NearByJobsWcData]);

  const [location, setLocation] = useState({});

  // console.log("searchJobsData>>>>>>>>>>>>>>>>>>>>>", searchJobsData);

  const ApplyNow = id => {
    console.log('item===>>>', id);
    const bodydata = {
      vacancy_id: id,
    };
    dispatch(ApplyNowRequest(bodydata));
    // setClicked(1);
    // dispatch(ApplyNowRequest({ bodydata }));
    dispatch(loaderAction(true));
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: hp(2) }}>
        <SearchJS placeholder={'Search by Job /Title/Category'} />
      </View>
      <FlatList
        data={searchJobsData}
        renderItem={({ item, index }) => {
          return (
            <RecomJobElementJS
              onPress={() =>
                navigation.navigate('JobsNearMeBlackCard', {
                  item,
                  latitude: currentLatitude, longitude: currentLongitude
                })}
              RECRUITER_VIEWED={'APPROVED'}
              image={item.recruiter_profile_pic} //rec image
              category_image={item.category_image} //background image
              // RECRUITER_VIEWED={item.status} // recruiter viewed   // viewed-status???
              contact_person_name={item.contact_person_name} // name
              company_name={item.company_details.company_name} // company name
              percentage_match={parseInt(item.percentage_match)} //ends with %
              job={item.title} //job title
              urgent={item.urgent_vacancy}
              experience={item.experience_name} //expeience
              location={item.work_location}
              currency={item.currency}
              package={item.compensation_amount} //package
              compensation_details={item.compensation_details} // per week/month/yesr
              empType={item.emp_details} //full part time??
              kmAway={item.distance}
              // as={item.sent_at} //application sent at
              onPressApplyNow={() => ApplyNow(item.id)}
            // posted={moment(item.created_on).fromNow()}

            />
          );
        }}
      />
      <Loader val={loaderResponse.loader} />
    </View>
  );
}

const styles = StyleSheet.create({});
