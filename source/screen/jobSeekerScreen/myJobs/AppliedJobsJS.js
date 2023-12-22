import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import RecomJobElementJS from '../../../component/RecomJobElementJS';
import SearchJs from '../../../component/SearchJS';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { AppliedJobsRequest } from '../../../redux/Action/AppliedJobsAction';
import { loaderAction } from '../../../redux/Action/LoaderAction';
import Loader from '../../../component/loader';
import { useIsFocused } from '@react-navigation/native';
import FSize from '../../../theme/FSize';

export default function AppliedJobsJS({ navigation, latitude, longitude }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [appliedData, setAppliedData] = useState([]);
  const [allData, setAllData] = useState([]);

  const loaderResponse = useSelector(state => state.loader);

  const AppliedJobsData = useSelector(state => state.appliedJobs);

  // console.log('AppliedJobsData-----', AppliedJobsData.data.data);
  useEffect(() => {
    if (AppliedJobsData.data !== null) {
      setAppliedData(AppliedJobsData?.data.data);
      setAllData(AppliedJobsData?.data.data);
    }
  }, [AppliedJobsData]);

  useEffect(() => {
    dispatch(AppliedJobsRequest());
    dispatch(loaderAction(true));
  }, [isFocused]);

  const onSearch = text => {
    let temp = allData;
    if (text) {
      const newData = temp.filter(function (item) {
        console.log('item---->', item);
        const CompanyName = item.company_name
          ? item.company_name.toUpperCase()
          : ''.toUpperCase();

        const Name = item.recruiter_name
          ? item.recruiter_name.toUpperCase()
          : ''.toUpperCase();

        const JobTitle = item.job_title
          ? item.job_title.toUpperCase()
          : ''.toUpperCase();

        const textData = text.toUpperCase();
        return (
          CompanyName.indexOf(textData) !== -1 ||
          Name.indexOf(textData) !== -1 ||
          JobTitle.indexOf(textData) !== -1
        );
      });
      setAppliedData(newData);
    } else {
      setAppliedData(temp);
    }
  };
  const [loginToken, setLoginToken] = useState('');
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('LoginAccessToken');
      // console.log('tokeprofileDatan--->', profileData);
      setLoginToken(token);
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {loginToken == null ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={{
              fontSize: FSize.fs23,
              textAlign: 'center',
              marginHorizontal: wp(19),
              lineHeight: hp(5),
            }}>
            LOGIN TO SEE THE APPLIED JOBS
          </Text>
        </View>
      ) : (
        <>
          <View
            style={{
              height: hp(6),
              marginVertical: hp(0.5),
              marginTop: hp(1.5),
            }}>
            <SearchJs
              placeholder={'Search by Jobs/categories'}
              onChangeText={text => onSearch(text)}
            />
          </View>

          <FlatList
            data={appliedData}
            renderItem={({ item }) => {
              return (
                <RecomJobElementJS
                  category_image={item.vacancy.category_image} //background image
                  image={item.recruiter_image || item.recruiter_profile}
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
                  compensation_details={item.vacancy.compensation_details} // per week/month/yesr
                  empType={item.employent_type}
                  kmAway={item.distance}
                  as={item.sent_at} //application sent at
                  onPress={() =>
                    navigation.navigate('BlackCardScreen', {
                      item,
                      key: 'details',
                      latitude:latitude,
                      longitude:longitude
                    })
                  }
                />
              );
            }}
          />
        </>
      )}

      <Loader val={loaderResponse.loader} />
    </View>
  );
}
const styles = StyleSheet.create({});

// <RecomJobElementJS
//   // viewed={true}
//   recruiter_image={item.recruiter_image}
//   image={require('../../../assets/Icon/plumber.png')}
//   job={item.job_title}
//   experience={item.total_experience}
//   location={item.work_location}
//   package={item.Package}
//   empType={item.employent_type}
//   match={item.matching_percentage}
//   kmAway={item.distance}
//   as={item.sent_at}
//   name={item.recruiter_name}
//   status={item.status}
// />
