import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import SearchJS from '../../../../component/SearchJS';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import HireRequestElementJS from '../../../../component/HireRequestElementJS';
import HeaderNavigation from '../../../../component/HeaderNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { loaderAction } from '../../../../redux/Action/LoaderAction';
import { HireRequestsRequest } from '../../../../redux/Action/HireRequestsAction';
import { AcceptHireRequestsRequest } from '../../../../redux/Action/AcceptHireRequestsAction';
import Loader from '../../../../component/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment/moment';
import AsktoLogin from '../../../../AsktoLogin';

export default function HireRequestJS({ navigation }) {

  const dispatch = useDispatch();
  const loaderResponse = useSelector(state => state.loader);
  const HireRequestDataResponse = useSelector(state => state.hireRequests);
  console.log(
    // 'HireRequestDataResponse---->',
    // HireRequestDataResponse.data.data,
    HireRequestDataResponse?.data?.data,
  );
  const [hireRequestData, setHireRequestData] = useState([]);
  useEffect(() => {
    if (HireRequestDataResponse.data !== null) {
      setHireRequestData(HireRequestDataResponse?.data?.data);
    } else {
      dispatch(HireRequestsRequest());
      dispatch(loaderAction(true));
    }
  }, [HireRequestDataResponse?.data]);

  const AcceptHire = item => {
    console.log('acccept_id--->', item);
    let bodydata = {
      vacancy_id: item,
      status: 'ACCEPTED',
    };
    dispatch(AcceptHireRequestsRequest(bodydata));
    dispatch(loaderAction(true));
  };
  const RejectHire = item => {
    console.log('reject_id--->', item);
    let bodydata = {
      vacancy_id: item,
      status: 'REJECTED',
    };
    dispatch(AcceptHireRequestsRequest(bodydata));
    dispatch(loaderAction(true));
  };


  // checking the login
  const [loginToken, setLoginToken] = useState('');
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('LoginAccessToken');
      setLoginToken(token);
    })();
  }, []);


  return (
    <View style={{ flex: 1 }}>

      <HeaderNavigation
        heading={'Hire Requests'}
        onPress={() => navigation.goBack()}
      />
      {loginToken == null || loginToken == "" ? <AsktoLogin navigation={navigation} /> :
        <>

          <View style={{ marginTop: hp(2), }}>
            <SearchJS placeholder={'Search by Job Title/Company'} />
          </View>
          <View style={{ paddingHorizontal: wp(3) }}>
            <FlatList
              data={hireRequestData}
              renderItem={({ item }) => {
                // console.log('item_one>>>>>>>>>',item.vacancy_det.vacancy_id)
                return (
                  <>
                    <HireRequestElementJS
                      bgImage={item.vacancy_det ? item.vacancy_det.category_image : item.category_image}
                      profilePic={item.recruiter_image}
                      name={item.recruiter_name} //recruiter name
                      company_name={item.company_name} //company name
                      job={item.vacancy_det ? item.vacancy_det.title : item.title} //job title
                      percentage_match={item.percentage_match}
                      urgent_vacancy={item.vacancy_det ? item.vacancy_det.urgent_vacancy : item.urgent_vacancy} //urgent vacancy
                      duration={moment(item.from_date).format('DD MMM, YYYY') + ` - ` + moment(item.to_date).format('DD MMM, YYYY')}

                      // + ' - ' + item.to_date.split("-").reverse().join("-")
                      currency={item.vacancy_det ? item.vacancy_det.currency : item.currency}
                      package={item.vacancy_det ? item.vacancy_det.compensation_amount : item.compensation_amount}
                      compensation_details={item.vacancy_det ? item.vacancy_det.compensation_details : item.compensation_details}

                      location={parseInt(item.distance)} //change the current lcoation to distance
                      sentRequest={item.sent_at}
                      reject={item.status}
                      Accept={item.status}
                      onPressReject={() => RejectHire(item.vacancy_det.vacancy_id)}
                      onPressAccept={() => AcceptHire(item.vacancy_det.vacancy_id)}
                    />
                  </>
                );
              }}
            />
          </View>

          <Loader val={loaderResponse.loader} />
        </>
      }
    </View>
  );
}

const styles = StyleSheet.create({});
