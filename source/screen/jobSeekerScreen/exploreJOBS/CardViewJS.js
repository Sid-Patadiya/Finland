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
export default function CardViewJS({ navigation, latitude, longitude }) {

  const [currentLatitude, setCurrentLatitude] = useState(latitude);
  const [currentLongitude, setCurrentLongitude] = useState(longitude);

  const dispatch = useDispatch();
  const [recommendedData, setRecommendedData] = useState('');

  const IsFocused = useIsFocused();

  const [ln, setLn] = useState('en');
  useEffect(() => {
    const setLang = async () => {
      setLn(await AsyncStorage.getItem('LanguageCode'));
    };
    setLang();
  }, [IsFocused]);

  const loaderResponse = useSelector(state => state.loader);
  const RecommendeJobsData = useSelector(state => state.recommendedJob);
  // console.log('RecommendeJobsData-----', RecommendeJobsData.data);

  useEffect(() => {
    if (RecommendeJobsData.data !== null) {
      // if(RecommendeJobsData.data)

      var newData = RecommendeJobsData.data.filter(item => {
        return (item.status = 'APPROVED');
      });
      setRecommendedData(newData);
      // console.log('new recommended jobs>>>>>>>>>>>>>', newData);
    } else {
      dispatch(RecommendedJobRequest());
      dispatch(loaderAction(true));
    }
  }, [RecommendeJobsData.data]);

  const ApplyNow = id => {
    // console.log('item===>>>', id);
    const bodydata = {
      vacancy_id: id,
    };
    dispatch(ApplyNowRequest(bodydata));
    dispatch(loaderAction(true));
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: hp(2) }}>
        <SearchJS placeholder={'Search by Job /Title/Category'} />
      </View>
      <FlatList
        data={recommendedData}
        renderItem={({ item, index }) => {
          return (
            <RecomJobElementJS
              // image={item.recruiter_profile} //rec image
              category_image={item.category_image} //background image
              RECRUITER_VIEWED={item.status} // recruiter viewed   // viewed-status???
              contact_person_name={item.contact_person_name} // name
              company_name={item.about_company} // company name
              percentage_match={item.percentage_match} //ends with %
              job={item.title} //job title
              urgent={item.urgent_vacancy}
              experience={item.experience[0].experience} //expeience
              location={item.work_location}
              currency={item.currency}
              package={item.compensation_amount} //package 
              compensation_details={item.compensation_details} // per week/month/yesr
              empType={item.emp_details} //full part time??
              kmAway={item.search_radious}
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
            // apply={item.applied}
            // urgent={item.urgent_vacancy}
            // image={require('../../../assets/Icon/plumber.png')}
            // job={item.title}
            // experience={item.experience_name}
            // location={item.work_location}
            // package={item.compensation_amount}
            // empType={item.emp_details}
            // kmAway={
            //   item.search_radious === undefined
            //     ? item.search_radious.slice(0, 7)
            //     : item.search_radious
            // }
            // posted={item.posted_on}
            // name={item.contact_person_name}
            // onPressApplyNow={() => ApplyNow(item.id)}
            />
          );
        }}
      />
      <Loader val={loaderResponse.loader} />
    </View>
  );
}

const styles = StyleSheet.create({});
