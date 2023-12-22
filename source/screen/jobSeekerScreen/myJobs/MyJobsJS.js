import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import CustomSwitchJS from '../../../component/CustomSwitchJS';
import OnGoingJobsJS from './OnGoingJobsJS';
import UnlockedByRecruiterJS from './UnlockedByRecruiterJS';
import AppliedJobsJS from './AppliedJobsJS';
import HeaderNavigation from '../../../component/HeaderNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsktoLogin from '../../../AsktoLogin'
import { ProfileRequest } from '../../../redux/Action/ProfileAction';
import { useIsFocused } from '@react-navigation/native';


export default function MyJobsJS({ navigation, route }) {
  const [workTab, setWorkTab] = useState(route.params);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  console.log('route', route);

  const onSelectSwitch = value => {
    console.log('value', value);
    setWorkTab(value);
  };

  // checking the login
  const [loginToken, setLoginToken] = useState('');
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('LoginAccessToken');
      // console.log('tokeprofileDatan--->', profileData);
      setLoginToken(token);
    })();
  }, []);

  // my profile data

  // ------------------------ Profile Data Api call -------------------------- \\
  const [profileData, setProfileData] = useState([]);
  const ProfileDataResponse = useSelector(state => state.profile);
  useEffect(() => {
    if (ProfileDataResponse.data !== null) {
      setProfileData(ProfileDataResponse.data.data);


      setCurrentLatitude(parseFloat(ProfileDataResponse.data.data.latitude).toFixed(6));
      setCurrentLongitude(parseFloat(ProfileDataResponse.data.data.longitude).toFixed(6));
    } else {
      dispatch(ProfileRequest());
    }
  }, [ProfileDataResponse.data]);

  useEffect(() => {
    dispatch(ProfileRequest());
  }, [isFocused]);


  const [currentLatitude, setCurrentLatitude] = useState(profileData.latitude);
  const [currentLongitude, setCurrentLongitude] = useState(profileData.longitude);

  console.log('ProfileDataResponse -----> ', currentLatitude, currentLongitude);

  return (
    <View style={{ flex: 1, backgroundColor: '#E9EFF6' }}>
      <HeaderNavigation
        onPress={() => navigation.goBack()}
        heading={'MyJobs'}
      />

      {loginToken == null ?
        <AsktoLogin navigation={navigation} />

        : (
          <>
            <CustomSwitchJS
              // selectionMode={1}
              onSelectSwitch={onSelectSwitch}
              option1="Ongoing Jobs"
              option2="Unlocked By Recruiter"
              option3="Applied Jobs"
              selectionMode={workTab !== undefined ? workTab : { key: 'Ongoing Job' }}
            />

            <View style={{ flex: 1, width: wp(100) }}>
              {workTab !== undefined ? (
                workTab.key === 'Ongoing Job' ? (
                  <OnGoingJobsJS navigation={navigation} />
                ) : workTab.key === 'Unlocked by Recruiter' ? (
                  <UnlockedByRecruiterJS navigation={navigation} latitude={currentLatitude} longitude={currentLongitude} />
                ) : workTab.key === 'Applied Jobs' ? (
                  <AppliedJobsJS navigation={navigation} latitude={currentLatitude} longitude={currentLongitude} />
                ) : null
              ) : (
                <OnGoingJobsJS navigation={navigation} />
              )}
            </View>
          </>
        )}
    </View>
  );
}

const styles = StyleSheet.create({});

// {/* {workTab == 1 ? */}
//                     {/* // (<ScrollView>
//                     //     {/* <Loggin navigation={navigation} onPress={() => navigation.navigate('TabNavigation')} /> */}
//                     //     <Loggin navigation={navigation} onPress={() => navigation.navigate('JobSeekerTabNavigation')} />

//                     // </ScrollView>)
//                     // : (<ScrollView>
//                     //     <OtpStack navigation={navigation} />
//                     // </ScrollView>) */}
//                 {/* // } */}
