import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ProfileNavigation from '../../../component/ProfileNavigation';
import MyProfileCompJS from './MyProfileCompJS';
import FSize from '../../../theme/FSize';

import Font from '../../../theme/Font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderNavigation from '../../../component/HeaderNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileRequest } from '../../../redux/Action/ProfileAction';
import { loaderAction } from '../../../redux/Action/LoaderAction';
import Loader from '../../../component/loader';
// import { Lang } from '../../../translation/lang';
import { useIsFocused } from '@react-navigation/native';
import { SubscriptionPlanRequest } from '../../../redux/Action/SubscriptionPlanAction';
import GestureRecognizer from 'react-native-swipe-gestures';
import { scale } from '../../../theme/Scalling';
import { MySubscriptionRequest } from '../../../redux/Action/MySubscriptionAction';

export default function MyProfileJS({ navigation }) {
  const dispatch = useDispatch();
  const IsFocused = useIsFocused();
  const [modalState, setModalState] = useState('close');

  // * * * * * * * LANGUAGE PART * * * * * * *
  const [Lang, setLang] = useState({});
  useEffect(() => {
    AsyncStorage.getItem('LANGUAGE').then(lang => {
      setLang(JSON.parse(lang));
    });
  }, []);
  // * * * * * * * LANGUAGE PART * * * * * * *

  const [ln, setLn] = useState('en');
  useEffect(() => {
    const setLang = async () => {
      setLn(await AsyncStorage.getItem('LanguageCode'));
    };
    setLang();
  }, [IsFocused]);

  const [profileData, setProfileData] = useState([]);
  console.log('profileData-->', profileData);

  const loaderResponse = useSelector(state => state.loader);

  const [loginToken, setLoginToken] = useState('');
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('LoginAccessToken');
      setLoginToken(token);
    })();
  }, []);

  // ------------------------ Profile Data Api call -------------------------- \\
  const ProfileDataResponse = useSelector(state => state.profile);
  // console.log('ProfileDataResponse -----> ', ProfileDataResponse);

  useEffect(() => {
    if (ProfileDataResponse.data !== null) {
      setProfileData(ProfileDataResponse.data.data);
    }
  }, [ProfileDataResponse.data]);
  useEffect(() => {
    dispatch(ProfileRequest());
    dispatch(loaderAction(true));
  }, [IsFocused]);
  //----------------- LOGOUT ---------------\\
  const Signout = () => {
    AsyncStorage.removeItem('LoginAccessToken');

    dispatch(loaderAction(true));
    navigation.replace('AuthTopTabNavigation');
  };

  const handleShowModal = () => {
    setModalState('modal');
  };

  const handleClose = () => {
    setModalState('close');
  };

  const PurchasedPlan = () => {
    let bodydata = {
      plan_id: 1,
    };

    dispatch(SubscriptionPlanRequest(bodydata));
    handleClose();
  };

  // ------------------------ subsc Data Api call -------------------------- \\
  const [mySubscriptionData, setMySubscriptionData] = useState([]);
  const MySubscriptionData = useSelector(state => state.mySubscription);
  console.log('MySubscriptionData -----> ', mySubscriptionData.plan_name);

  useEffect(() => {
    if (MySubscriptionData.data !== null) {
      setMySubscriptionData(MySubscriptionData.data.data);
    } else {
      dispatch(MySubscriptionRequest());
      dispatch(loaderAction(true));
    }
  }, [MySubscriptionData.data]);

  useEffect(() => {
    dispatch(loaderAction(true));
    setTimeout(() => {
      dispatch(loaderAction(false));
    }, 2000);
  }, []);

  return (
    <View style={styles.main}>
      {/* header */}
      <HeaderNavigation
        onPress={() => navigation.goBack()}
        heading={
          Lang && Object.keys(Lang).length > 0 && Lang[ln].Profile['My Profile']
        }
      />

      {/* login */}
      {loginToken == null ?
        (
          <View style={styles.login}>
            <Text style={styles.catchUpText}>
              {Lang &&
                Object.keys(Lang).length > 0 &&
                Lang[ln].Profile['Welcome to Catch-up']}
            </Text>

            <TouchableOpacity
              style={styles.loginbtn}
              onPress={() => navigation.replace('AuthTopTabNavigation')}>
              <Text style={styles.loginText}>
                {Lang &&
                  Object.keys(Lang).length > 0 &&
                  Lang[ln].Profile['Login']}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.replace('AuthTopTabNavigation')}
              style={{ paddingVertical: hp(1.5) }}>
              <Text style={styles.createAnAccount}>
                {Lang &&
                  Object.keys(Lang).length > 0 &&
                  Lang[ln].Profile['Create an account']}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <MyProfileCompJS
              onPress={() => navigation.navigate('EditProfileJS', { profileData })}
              image={profileData?.image}
              name={profileData?.first_name + ' ' + profileData?.last_name}
              designation={profileData?.profile_title}
              Experience={profileData?.experience_det}
              phone={profileData?.mobile_number}
              email={profileData?.email}
              profileComplited={
                profileData?.status_completion !== undefined
                  ? profileData?.status_completion
                  : '0%'
              }
              about={profileData?.cover_latter}
              onPressPlan={handleShowModal}
            // updated_at={profileData?.updated_at.slice(0,10)}
            />
          </View>
        )}

      <ScrollView>
        <View style={styles.boxOne}>
          <ProfileNavigation
            image={require('../../../assets/Icon/subscription.png')}
            label={
              Lang &&
              Object.keys(Lang).length > 0 &&
              Lang[ln].Profile['My Subscription']
            }
            onPress={() => navigation.navigate('MySubscription')}
          />

          <ProfileNavigation
            image={require('../../../assets/Icon/list.png')}
            label={
              Lang &&
              Object.keys(Lang).length > 0 &&
              Lang[ln].Profile['My Lists']
            }
            onPress={() =>
              navigation.navigate('MyList', {
                latitude: profileData?.latitude, longitude: profileData?.longitude
              })
            }
          />

          <ProfileNavigation
            image={require('../../../assets/Icon/vacancy.png')}
            label={
              Lang &&
              Object.keys(Lang).length > 0 &&
              Lang[ln].Profile['My Jobs']
            }
            onPress={() => navigation.navigate('MyJobsJS')}
          />

          <ProfileNavigation
            // noLine={true}
            image={require('../../../assets/Icon/unlocked.png')}
            label={
              Lang &&
              Object.keys(Lang).length > 0 &&
              Lang[ln].Profile['Unlocked by Recruiter']
            }
            onPress={() =>
              navigation.navigate('MyJobsJS', { key: 'Unlocked by Recruiter' })
            }
            loginToken={loginToken}
          />
          <ProfileNavigation
            noLine={true}
            image={require('../../../assets/Icon/HireJS.png')}
            label={
              Lang &&
              Object.keys(Lang).length > 0 &&
              Lang[ln].Profile['Hire Request']
            }
            onPress={() => navigation.navigate('HireRequestJS')}
            loginToken={loginToken}
          />
        </View>

        <View style={styles.boxOne}>
          <ProfileNavigation
            image={require('../../../assets/Icon/setting.png')}
            label={
              Lang &&
              Object.keys(Lang).length > 0 &&
              Lang[ln].Profile['Settings']
            }
            onPress={() => navigation.navigate('Settings')}
            loginToken={loginToken}
          />

          <ProfileNavigation
            image={require('../../../assets/Icon/lang.png')}
            label={
              Lang &&
              Object.keys(Lang).length > 0 &&
              Lang[ln].Profile['Change Language']
            }
            onPress={() => navigation.navigate('ChangeLanguage')}
          />
          {/* <TouchableOpacity
        style={styles.notification_View}
        onPress={() => navigation.navigate('ChangeLanguage')}>
        <Text style={styles.notification_Text}>
          {Lang && Object.keys(Lang).length > 0 && Lang[ln].Profile['Change Language']}
        </Text>
        <View style={{width: hp(6), height: hp(2.7)}}>
          <Image
            style={styles.arrow}
            source={require('../../../../assets/Icon/arrowRight.png')}></Image>
        </View>
      </TouchableOpacity> */}

          <ProfileNavigation
            image={require('../../../assets/Icon/alert.png')}
            label={
              Lang &&
              Object.keys(Lang).length > 0 &&
              Lang[ln].Profile['Alerts/Notifications']
            }
            onPress={() => navigation.navigate('Notification')}
          />

          <ProfileNavigation
            image={require('../../../assets/Icon/privacy.png')}
            label={
              Lang &&
              Object.keys(Lang).length > 0 &&
              Lang[ln].Profile['Privacy & Policies']
            }
            onPress={() => navigation.navigate('PrivacyPolicies')}
          />
          {loginToken == null ? null : (
            <ProfileNavigation
              noLine={true}
              image={require('../../../assets/Icon/support.png')}
              label={
                Lang &&
                Object.keys(Lang).length > 0 &&
                Lang[ln].Profile['Contact Support']
              }
              onPress={() =>
                navigation.navigate('ContactSupport', { profileData })
              }
            />
          )}
        </View>
        {loginToken !== null && (
          <TouchableOpacity
            onPress={() => Signout()}
            style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.btnContainer}>
              <Text style={styles.logoutTxt}>
                {Lang &&
                  Object.keys(Lang).length > 0 &&
                  Lang[ln].Profile['Log Out']}
              </Text>
            </View>
          </TouchableOpacity>
        )}

        <GestureRecognizer style={{ flex: 1 }} onSwipeDown={handleClose}>
          <Modal
            animationType="slide"
            transparent
            visible={modalState === 'modal'}
            onRequestClose={handleClose}>
            <View style={styles.mainView}>
              <TouchableOpacity style={styles.lineStyle}>
                <View style={styles.lineView}></View>
              </TouchableOpacity>

              <View style={styles.innerView}>
                <View style={styles.container}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.uptoText}>Upto</Text>

                    <Text style={styles.moreText}>12 X More Visibility</Text>

                    <Text style={styles.containText}>
                      Lorem ipsum dolorit consecteturadipiscing elit ut aliquam,
                      purs s amet luctus venenatis, lectus magna fringilla.
                    </Text>
                  </View>

                  <Image
                    source={require('../../../assets/Icon/pana.png')}
                    style={styles.imageStyle}
                  />
                </View>

                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => PurchasedPlan()}>
                  <Text style={styles.buttonText}>
                    Pay € {mySubscriptionData?.price}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </GestureRecognizer>
      </ScrollView>
      <Loader val={loaderResponse.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // color: '#E9EFF6',
    backgroundColor: '#FFFAF6',
  },
  login: {
    // flex:1,
    backgroundColor: '#FFFFFF',
    paddingVertical: hp(2),
  },
  catchUpText: {
    fontFamily: Font.PoppinsRegular,
    fontWeight: '600',
    fontSize: FSize.fs16,
    lineHeight: 22,
    color: '#656567',
    textAlign: 'center',
  },
  loginbtn: {
    backgroundColor: '#0D3068',
    height: hp(5),
    marginHorizontal: wp(25),
    borderRadius: hp(5),
    marginTop: hp(2),
    justifyContent: 'center',
  },
  loginText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
    fontWeight: '600',
    fontSize: FSize.fs14,
    textAlign: 'center',
  },
  createAnAccount: {
    color: '#656567',
    fontFamily: 'Poppins-Regular',
    fontSize: FSize.fs14,
    fontWeight: '400',
    textAlign: 'center',
  },
  boxOne: {
    marginTop: hp(2),
    backgroundColor: '#FFFFFF',
  },

  row: {
    flexDirection: 'row',
  },
  logoutBtn: {
    // borderWidth:hp(0.1),
    // backgroundColor:'#FFFFFF',
    // flex: 1,
    // height: 35,
    // width: 150,
  },
  btnContainer: {
    // width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 26,
    borderWidth: hp(0.1),
    borderColor: '#CBCBCB',
    backgroundColor: '#FFFFFF',
    borderRadius: hp(5),
    paddingHorizontal: wp(8),
  },
  logoutTxt: {
    color: '#8D8D8D',
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    paddingVertical: 10,
  },
  // modal
  mainView: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'flex-end',
  },
  lineStyle: {
    alignSelf: 'center',
    bottom: 10,
  },
  lineView: {
    width: wp(20),
    height: hp(0.5),
    backgroundColor: '#FFFFFF',
    borderRadius: wp(1),
  },
  innerView: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: wp(2),
    borderTopRightRadius: wp(2),
    height: hp(35),
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: hp(2),
  },
  uptoText: {
    marginTop: scale(20),
    color: '#343C44',
    fontSize: FSize.fs13,
    fontFamily: Font.PoppinsRegular,
  },
  moreText: {
    marginTop: scale(1),
    color: '#0D3068',
    fontSize: FSize.fs15,
    fontFamily: Font.PoppinsRegular,
  },
  containText: {
    marginTop: scale(8),
    color: '#343C44',
    fontSize: FSize.fs12,
    fontFamily: Font.PoppinsRegular,
    textAlign: 'auto',
  },
  imageStyle: {
    height: hp(20),
    width: hp(20),
    // marginTop: hp(5),
  },
  buttonStyle: {
    backgroundColor: '#0D3068',
    marginHorizontal: hp(4),
    borderRadius: hp(8),
    paddingVertical: hp(1),
    marginBottom: hp(3),
  },
  buttonText: {
    color: '#FFF',
    fontSize: 15,
    fontFamily: Font.PoppinsRegular,
    textAlign: 'center',
  },
});