import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import SearchJs from '../../../component/SearchJS';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { UnloackedBRRequest } from '../../../redux/Action/UnloackedBRAction';
import ULBRElementJS from '../../../component/ULBRElementJS';
import FSize from '../../../theme/FSize';
import { AddMessageRequest } from '../../../redux/Action/AddMessageList';
import moment from 'moment/moment';
import { loaderAction } from '../../../redux/Action/LoaderAction';


export default function UnlockedByRecruiterJS({ navigation, latitude, longitude }) {
  //  -------------------------------------Unlocked by Recruiter Api Call --------------------------------- \\
  const dispatch = useDispatch();
  const isFocused = useIsFocused;
  const [unlockedRecruiterData, setUnlockedRecruiterData] = useState([]);
  const [allData, setAllData] = useState([]);
  const UnlockedRecruiterResponse = useSelector(state => state.unloackedBR);
  console.log(
    'UnlockedRecruiterResponse-----',
    UnlockedRecruiterResponse?.data?.data,
  );
  useEffect(() => {
    if (UnlockedRecruiterResponse.data !== null) {
      setUnlockedRecruiterData(UnlockedRecruiterResponse?.data?.data);
      setAllData(UnlockedRecruiterResponse?.data?.data);
    }
  }, [UnlockedRecruiterResponse]);
  useEffect(() => {
    dispatch(UnloackedBRRequest());

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

        const Title = item.title ? item.title.toUpperCase() : ''.toUpperCase();

        const textData = text.toUpperCase();

        return (
          CompanyName.indexOf(textData) !== -1 ||
          Name.indexOf(textData) !== -1 ||
          Title.indexOf(textData) !== -1
        );
      });

      setUnlockedRecruiterData(newData);
    } else {
      setUnlockedRecruiterData(temp);
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

  //------------ CHAT NOW ---------

  const ChatNow = item => {
    let bodydata = {
      recruiter_id: item.recruiter_id,
      recruiter_image: item.recruiter_profile_pic,
      name: item.recruiter_name,
      last_seen: '12-12-2023',
    };
    console.log(bodydata);
    dispatch(AddMessageRequest(bodydata));
    // navigation.navigate('ChatJS', {item});
  };

  return (
    <View style={{ flex: 1 }}>
      {loginToken == null ? (
        <View
          style={{
            flex: 1,
            marginHorizontal: wp(2),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
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
          <View style={{ flex: 1, paddingHorizontal: wp(3) }}>
            <FlatList
              // contentContainerStyle={{paddingHorizontal: hp(1)}}
              showsHorizontalScrollIndicator={false}
              data={unlockedRecruiterData}
              renderItem={({ item }) => {
                return (
                  <>
                    <ULBRElementJS
                      bgImage={item.vacancy.category_image}
                      profilePic={item.recruiter_profile_pic}
                      name={item.vacancy.contact_person_name}
                      company_name={item.vacancy.company_name}
                      job={item.vacancy.title}
                      percentage_match={parseFloat(item.percentage_match)}
                      experience={item.vacancy.experience}
                      location={item.vacancy.work_location}
                      currency={item.vacancy.currency}
                      package={item.vacancy.compensation_amount}
                      term={item.vacancy.compensation_details}
                      kmAway={parseInt(item.distance)}
                      posted={moment
                        .utc(item.vacancy.posted_on)
                        .local()
                        .startOf('seconds')
                        .fromNow()}
                      empType={item.vacancy.emp_details}
                      onPress={() => ChatNow(item)}
                      onItemPress={() =>
                        navigation.navigate('UBRBlckCardScreen', {
                          item,
                          key: 'details',
                          latitude: latitude,
                          longitude: longitude
                        })
                      }
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
