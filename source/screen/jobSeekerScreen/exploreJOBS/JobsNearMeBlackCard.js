import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
  FlatList,
  Modal,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import JobsCardDetailsJS from './JobsCardDetailsJS';
import FSize from '../../../theme/FSize';
import Font from '../../../theme/Font';
import SearchJS from '../../../component/SearchJS';
import JobsCardDetailsTWO from '../exploreJOBS/JobsCardDetailsTWO';
import { useDispatch, useSelector } from 'react-redux';
import { SearchJobsRequest } from '../../../redux/Action/SearchJobsAction';
import { loaderAction } from '../../../redux/Action/LoaderAction';
import Loader from '../../../component/loader';
import { IgnoreJobsRequest } from '../../../redux/Action/IgnoreJobsAction';
import { ApplyNowRequest } from '../../../redux/Action/ApplyNowAction';
import SearchJobsJS from './SearchJobsJS';
import { useIsFocused } from '@react-navigation/native';
import Images from '../../../theme/Images';
import { scale } from '../../../theme/Scalling';
import GestureRecognizer from 'react-native-swipe-gestures';
import Color from '../../../theme/Color';
import CreateJobList from '../../../component/CreateJobList';
import { GetCreatePlayListRequest } from '../../../redux/Action/GetCreatePlayListAction';
import { AddListRequest } from '../../../redux/Action/AddListAction';
import { CreatePlayListRequest } from '../../../redux/Action/CreatePlayListAction';
import SuccessModal from '../SuccessModal';
import { JobsNearMewcRequest } from '../../../redux/Action/JobsNearMewcAction';
import Share from 'react-native-share';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileRequest } from '../../../redux/Action/ProfileAction';

export default function ExploreJobsBlackCardScreen({ route, navigation }) {
  const [searchJobsData, setSearchJobsData] = useState([route?.params.item]);
  const [currentLatitude, setCurrentLatitude] = useState(route?.params.latitude);
  const [currentLongitude, setCurrentLongitude] = useState(route?.params.longitude);
  // console.log("gfgfdfcgfhgvhghg", currentLatitude, currentLongitude);

  const [showFullDetails, setShowFullDetails] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  //------------------------- Filter Data-------------
  const [percent, setPercent] = useState(0);

  const [showModal, setShowModal] = useState(false);

  const loaderResponse = useSelector(state => state.loader);

  // ------------------------ Profile Data Api call -------------------------- \\
  const [profileData, setProfileData] = useState([]);

  const ProfileDataResponse = useSelector(state => state.profile);

  useEffect(() => {
    if (ProfileDataResponse.data !== null) {
      setProfileData(ProfileDataResponse.data.data);
    } else {
      dispatch(ProfileRequest());
      dispatch(loaderAction(true));
    }
  }, [ProfileDataResponse.data]);

  //----------------- Ignore Jobs --------------------//

  const DeleteData = () => {
    // console.log('* * * Ignore * * *');
    // let bodydata = {
    //   vacancy_id: id,
    // };
    // dispatch(IgnoreJobsRequest(bodydata));
    setShowFullDetails(false);
  };

  //----------------- Apply Jobs --------------------//

  const ApplyNow = () => {
    console.log('* * * Apply * * *');
    if (loginToken) {
      let bodydata = {
        vacancy_id: searchJobsData[0].id,
      };

      dispatch(ApplyNowRequest(bodydata));
    } else {
      setShowModal(true);
    }
  };

  //_------------------------  Create PlayList Modal----------------------------- \\
  const [modalState, setModalState] = useState('close');
  const [openAddbutton, setOpenAddbutton] = useState(false);
  const [writeList, setWriteList] = useState('');
  const [addLists, setAddLists] = useState([]);

  const CretaeListData = useSelector(state => state.getCretatePlayList);
  // console.log('CretaeListData...>>>', CretaeListData.data);

  const handleShowModal = () => {
    setModalState('modal');
  };

  const handleClose = () => {
    setModalState('close');
    setOpenAddbutton(false);
  };

  const CreateList = () => {
    let bodydata = {
      title: writeList,
    };
    // console.log(bodydata);
    dispatch(CreatePlayListRequest(bodydata));
    setWriteList('');
    dispatch(GetCreatePlayListRequest());
    dispatch(loaderAction(true));
    // setModalState(false);
  };

  const addToList = item => {
    console.log(searchJobsData);
    let bodydata = {
      // vacancy_id: searchJobsData[0].vacancy.vacancy_id,
      vacancy_id: searchJobsData[0].id,
      title_id: item.id,
    };
    // console.log(bodydata);
    dispatch(AddListRequest(bodydata));
    dispatch(loaderAction(true));
    handleClose();
  };

  useEffect(() => {
    if (CretaeListData.data !== null) {
      setAddLists(CretaeListData.data.data);
    }
  }, [CretaeListData.data]);

  useEffect(() => {
    dispatch(GetCreatePlayListRequest());
  }, []);

  const handleShare = async () => {
    let options = {
      title: `Share title`,
      message: `This is share description.`,
      url: `https://jobportal.atwpl.com/jobs/${searchJobsData[0].id}`,
      subject: `Share subject`,
    };
    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  // checking the login
  const [loginToken, setLoginToken] = useState('');
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('LoginAccessToken');
      // console.log('tokeprofileDatan--->', token);
      setLoginToken(token);
    })();
  }, []);

  function handleShowModel() {
    setShowModal(true);
  }

  return (
    <View style={styles.main}>
      {/* back arrow and search */}
      <View
        style={[
          styles.row,
          {
            // alignItems: 'center',
            // justifyContent: 'center',
            paddingVertical: hp(1.5),
            // marginHorizontal: wp(8),
            // marginRight:wp(4)
          },
        ]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={{ height: hp(3), width: hp(3), marginHorizontal: hp(2) }}>
            <Image
              style={styles.img}
              source={require('../../../assets/Icon/arrowOrange.png')}></Image>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={searchJobsData}
          renderItem={({ item }) => {
            console.log('item~~~~',item)
            return (
              <GestureRecognizer
              // onSwipeRight={() => ApplyNow()}
              // onSwipeLeft={() => DeleteData()}
              >
                <JobsCardDetailsTWO
                  currentLatitude={currentLatitude}
                  currentLongitude={currentLongitude}
                  short_description={item.short_description}
                  category_image={item.category_image}
                  profilePicture={item.category_image}
                  name={item.contact_person_name}
                  company={item.company_details.company_name}
                  designation={item.title}
                  details={item.job_description}
                  // SeeFullDetails={showFullDetails}
                  SeeFullDetails={true}

                  urgentVacancy={item.urgent_vacancy}
                  experienceYear={item.experience_name}
                  CompensationAmount={item.currency + `${' '}` + item.compensation_amount + `${' '}` + item.compensation_details}
                  aboutCompany={item.company_details.about_company}
                  liscense_required={item.liscense_required}
                  no_of_vacancy={item.no_of_vacancy}
                  EmploymentType={item.emp_details}
                  companyWebsite={item.company_details.company_website}
                  companyAddress={item.work_location}
                  from_date={item.from_date}
                  to_date={item.to_date}
                  distance={item.distance}
                  highest_degree_name={item.highest_degree_name}
                  degree_completion_year={item.degree_completion_year}
                  Skills={item.skill_set || item.skill_set}
                  latitude={item.work_location_lat}
                  longitude={item.work_location_long}
                  DeleteData={() => DeleteData(item?.id)}
                  add={() => {
                    loginToken == null ? setShowModal(true) : handleShowModal();
                  }}
                  onPress={() => setShowFullDetails(true)}
                />
              </GestureRecognizer>
            );
          }}
        />

        {/******************* Create Play list Modal *******************/}

        <GestureRecognizer style={{ flex: 1 }} onSwipeDown={handleClose}>
          <Modal
            animationType="slide"
            transparent
            backdropOpacity={0.3}
            visible={modalState === 'modal'}
            onRequestClose={handleClose}>
            {/* // modal container */}
            <View style={styles.centeredView}>
              <TouchableOpacity>
                <View style={styles.linePosition}>
                  <View style={styles.headNavLine}></View>
                </View>
              </TouchableOpacity>

              <View style={styles.modalInsideView}>
                <View style={{ paddingVertical: hp(1) }}>
                  <Text style={styles.addToPlayList}>Add to a List</Text>
                </View>

                <TouchableOpacity
                  style={styles.createPlayList}
                  onPress={() => setOpenAddbutton(!openAddbutton)}>
                  <View
                    style={{
                      paddingLeft: wp(2),
                      width: hp(3.5),
                      height: hp(3.5),
                    }}>
                    <Image
                      style={styles.img}
                      source={require('../../../assets/Icon/playlsit.png')}></Image>
                  </View>
                  <View>
                    <Text style={styles.PlaylistText}>Create New List</Text>
                  </View>
                </TouchableOpacity>
                {openAddbutton ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      marginHorizontal: hp(2),
                    }}>
                    <TextInput
                      style={{
                        borderWidth: 1,
                        width: '80%',
                        borderRadius: 10,
                        paddingHorizontal: hp(1),
                      }}
                      value={writeList}
                      placeholder="Write your lists"
                      onChangeText={text => setWriteList(text)}
                    />
                    <TouchableOpacity
                      onPress={() => CreateList()}
                      disabled={!writeList ? true : false}
                      style={{
                        //   borderWidth: 1,
                        padding: hp(1.5),
                        borderRadius: 10,
                        opacity: !writeList ? 0.4 : null,
                        backgroundColor: '#1374DF',
                      }}>
                      <Text style={{ fontSize: 15, color: Color.Colorwhite }}>
                        Add
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}

                <View style={styles.Modalline}></View>

                <FlatList
                  data={addLists}
                  renderItem={({ item }) => {
                    console.log('item', item);
                    return (
                      <>
                        <CreateJobList
                          jobListName={item.title}
                          onPress={() => addToList(item)}
                        />
                      </>
                    );
                  }}
                />


              </View>
              <Loader val={loaderResponse.loader} />
            </View>
          </Modal>
        </GestureRecognizer>

        {/* *********************************** Right Side Bar *********************************** */}

        <View
          style={{
            position: 'absolute',
            right: 0,
            paddingRight: wp(4),
            marginTop: hp(8),
          }}>
          {loginToken == null ? null :
            <View style={styles.whiteBackground}>
              <Text style={styles.percent}>
                {parseInt(searchJobsData[0].percentage_match) == 0 || parseInt(searchJobsData[0].percentage_match) == null ? '10 %' : parseInt(searchJobsData[0].percentage_match) + '%'}
              </Text>
              <Text style={styles.Match}>Match</Text>
            </View>
          }
          <View style={{ paddingTop: hp(2) }}>
            <TouchableOpacity
              style={styles.whiteBackground}
              onPress={() => {
                loginToken == null ? setShowModal(true) : handleShowModal();
              }}>
              <Image
                style={[styles.img60, { paddingLeft: hp(3) }]}
                source={require('../../../assets/Icon/add.png')}></Image>
            </TouchableOpacity>
          </View>

          <View style={{ paddingTop: hp(2) }}>
            <TouchableOpacity
              style={styles.whiteBackground}
              onPress={() => handleShare()}>
              <Image
                style={styles.img60}
                source={require('../../../assets/Icon/share.png')}></Image>
            </TouchableOpacity>
          </View>

          <View style={{ paddingTop: hp(2) }}>
            <TouchableOpacity
              onPress={() => {
                loginToken == null ? setShowModal(true) : ApplyNow();
              }}
              style={[styles.circleBackground, { backgroundColor: '#FFFFFF' }]}>
              <Image
                resizeMode='cover'
                style={{ height: '85%', width: '85%' }}
                source={require('../../../assets/Icon/applyNow.png')}></Image>
            </TouchableOpacity>
          </View>

          {/* <View style={{ paddingTop: hp(2) }}>
            <TouchableOpacity
              onPress={() => DeleteData()}
              style={[styles.circleBackground, { backgroundColor: '#D93E30' }]}>
              <Image
                style={styles.img40}
                source={require('../../../assets/Icon/x.png')}></Image>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
      {/* <Loader val={loaderResponse.loader} /> */}
      <SuccessModal
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        message={'Please do Login/Sign up'}
        onPress={() => setShowModal(false)}
        onPressOk={() => navigation.replace('AuthTopTabNavigation')}
      />
      {/* modal */}
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    borderBottomWidth: hp(0.1),
    borderBottomColor: '#000000',
    opacity: 0.1,
  },

  main: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  filterText: {
    color: '#000000',
    fontFamily: Font.PoppinsRegular,
    fontWeight: '300',
    fontSize: FSize.fs14,
    // lineHeight: 22,
    paddingRight: wp(2),
  },
  filterDataView: {
    marginHorizontal: wp(2),
    // backgroundColor: '#0D3068',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: hp(3),
    marginBottom: hp(1),
  },
  BlueBackgroundText: {
    paddingTop: hp(0.4),
    fontSize: FSize.fs12,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 20,
    // paddingHorizontal: wp(3),
    paddingLeft: wp(3),
    color: '#FFFFFF',
    fontFamily: Font.PoppinsRegular,
  },
  textboxinnerOne: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: wp(4),
    // marginHorizontal: scale(10),
    borderRadius: hp(3),
    borderColor: '#D2D2D2',
    borderWidth: hp(0.1),
  },

  inputFeed: {
    // flex: 1,
    // color: 'red',
    color: '#939393',
    fontSize: FSize.fs12,
    fontFamily: Font.PoppinsRegular,
    width: '75%',
    marginBottom: scale(-3),
  },
  icon: {
    height: hp(3),
    width: hp(3),
  },
  row: {
    flexDirection: 'row',
  },

  //--------
  whiteBackground: {
    borderWidth: hp(0.1),
    borderColor: '#808080',
    backgroundColor: '#FFFFFF',
    height: hp(5.5),
    width: hp(5.5),
    borderRadius: hp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  percent: {
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs10,
    fontWeight: '400',
    textAlign: 'center',
    color: '#808080',
    alignItems: 'baseline',
    top: 2,
  },
  Match: {
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs9,
    fontWeight: '400',
    textAlign: 'center',
    color: '#808080',
    top: -2,
  },
  circleBackground: {
    height: hp(5.5),
    width: hp(5.5),
    borderRadius: hp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenBackground: {
    backgroundColor: '#40A34A',
    height: hp(3.5),
    width: hp(3.5),
    borderRadius: hp(4),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(1),
  },
  imageDetails: {
    flex: 1,
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
  blueBackground: {
    backgroundColor: '#007AFF',
    height: hp(3.5),
    width: hp(3.5),
    borderRadius: hp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  yellowCircleBackground: {
    backgroundColor: '#FFCB3F',
    height: hp(5.5),
    width: hp(5.5),
    borderRadius: hp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    // borderRadius:hp(5),
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  img50: {
    // borderRadius:hp(5),
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },

  img60: {
    // borderRadius:hp(5),
    // paddingLeft:20,
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
  img40: {
    // borderRadius:hp(5),
    // paddingLeft:20,
    width: '40%',
    height: '40%',
    resizeMode: 'contain',
  },

  // Create  List Modal
  centeredView: {
    paddingTop: hp(48),
    flex: 1,
    backgroundColor: '#000000aa',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  linePosition: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hp(1),
  },
  headNavLine: {
    width: wp(20),
    height: hp(0.5),
    backgroundColor: '#FFFFFF',
    borderRadius: wp(1),
  },
  Modalline: {
    borderBottomWidth: hp(0.1),
    borderBottomColor: 'rgba(0, 0, 0, 0.1);',
    marginVertical: hp(1.5),
    marginHorizontal: hp(1.5),
  },
  PlaylistText: {
    marginLeft: wp(3),
    color: '#444444',
    fontWeight: '400',
    fontSize: FSize.fs14,
    fontFamily: 'Poppins-Regular',
  },
  addToPlayList: {
    color: '#444444',
    fontSize: FSize.fs16,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  modalInsideView: {
    marginTop: hp(1.5),
    paddingTop: hp(1),
    backgroundColor: '#FFFFFF',
    borderTopEndRadius: hp(2),
    borderTopStartRadius: hp(2),
    flex: 1,
  },
  createPlayList: {
    paddingTop: hp(1),
    flexDirection: 'row',
    paddingHorizontal: hp(2),
    alignItems: 'center',
    // alignContent:'center'
  },
  btnText: {
    fontSize: FSize.fs16,
    fontWeight: 14,
    fontWeight: '400',
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
  },
});
