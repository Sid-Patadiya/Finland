import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import SearchJs from '../../../component/SearchJS';
import OGJChildJs from '../../../component/OGJChildJs';
import {useDispatch, useSelector} from 'react-redux';
import {CreateTimeSheetRequest} from '../../../redux/Action/CreateTimeSheetAction';
import {OngoingJobsRequest} from '../../../redux/Action/OngoingJobsAction';
import FSize from '../../../theme/FSize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CreateEndJobRequest} from '../../../redux/Action/EndJobAction';
import SuccessModal from '../SuccessModal';
import { loaderAction } from '../../../redux/Action/LoaderAction';


export default function OnGoingJobsJS({navigation}) {
  const dispatch = useDispatch();

  //----------------------------------- OnGoing Jobs Api Call -----------------------------\\
  const [ongoingData, setOngoingData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [show, setShow] = useState(false);
  const OngoingJobsResponse = useSelector(state => state.ongoingJobs);
  console.log('OngoingJobsResponse -----> ', OngoingJobsResponse);

  useEffect(() => {
    if (OngoingJobsResponse.data !== null) {
      setOngoingData(OngoingJobsResponse.data);
      setAllData(OngoingJobsResponse.data);
    } else {
      dispatch(OngoingJobsRequest());
      dispatch(loaderAction(true));
    }
  }, [OngoingJobsResponse.data]);

  const UpdateTimeSheet = item => {
    let bodydata = {
      application_id: item.id,
      from_date: item.from_date,
      to_date: item.to_date,
      end_Jobs: false,
    };
    console.log(bodydata);
    dispatch(
      CreateTimeSheetRequest(bodydata, item, navigation, {
        key: 'UpdateTimeSheet',
      }),
    );

    // navigation.navigate('UpdateTimeSheetJS', {item});
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

  const onSearch = text => {
    let temp = allData;
    console.log('ongoingData-->', ongoingData);
    if (text) {
      const newData = temp.filter(function (item) {
        console.log('item---->', item);
        const CompanyName = item.company_name
          ? item.company_name.toUpperCase()
          : ''.toUpperCase();
        const JobTitle = item.job_title
          ? item.job_title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return (
          CompanyName.indexOf(textData) !== -1 ||
          JobTitle.indexOf(textData) !== -1
        );
      });
      setOngoingData(newData);
    } else {
      setOngoingData(temp);
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
    <View style={{flex: 1}}>
      {loginToken == null ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: FSize.fs23,
              textAlign: 'center',
              marginHorizontal: wp(19),
              lineHeight: hp(5),
            }}>
            LOGIN TO SEE UNLOCKED JOBS
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
          <View style={{paddingHorizontal: wp(3), flex: 1}}>
            <FlatList
              data={ongoingData}
              renderItem={({item}) => {
                return (
                  <>
                    <OGJChildJs
                      onPress={() => UpdateTimeSheet(item)}
                      endJob={() => setShow(true)}
                      // onPressTxt={'Update Time Sheet'}
                      bgImage={item.company_image}
                      profilePic={item.recruiter_image}
                      name={item.recruiter_name}
                      desc={item.job_description} //company name:--company_name
                      match={item.percent_match}
                      urgent_vacancy={item.urgent_vacancy}
                      job={item.job_title}
                      hireDate={item.hire_date.split('-').reverse().join('-')}
                      duration={
                        item.from_date.split('-').reverse().join('-') +
                        ' - ' +
                        item.to_date.split('-').reverse().join('-')
                      }
                      tHours={item.no_of_hours}
                      from_date={item.from_date}
                      to_date={item.to_date}
                    />
                    <SuccessModal
                      visible={show}
                      onRequestClose={() => setShow(false)}
                      // message={'Please do Login/Sign up'}
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
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});