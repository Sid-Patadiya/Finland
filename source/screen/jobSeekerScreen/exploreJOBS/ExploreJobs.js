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
  Animated,
  Dimensions,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
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
import Swiper from 'react-native-deck-swiper';
import SwipeCards from 'react-native-swipe-cards';

const EMPTypeData = [
  {
    id: 1,
    type: 'Part Time',
  },
  {
    id: 2,
    type: 'Full Time',
  },
  {
    id: 3,
    type: 'Contract',
  },
];

export default function ExploreJobs({ route, navigation }) {
  const SearchData = route?.params;
  // console.log('SearchData===>', SearchData);
  const [currentLatitude, setCurrentLatitude] = useState(route?.params.latitude);
  const [currentLongitude, setCurrentLongitude] = useState(route?.params.longitude);

  // console.log("currentLatitudexxxxxxxxxx>>>>>>", currentLatitude, currentLongitude);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const useSwiper = useRef(null);

  //------------------------- Filter Data-------------
  const [filterData, setFilterData] = useState([]);

  const [empType, setEmpType] = useState(EMPTypeData);

  const [percent, setPercent] = useState(0);
  const [experienceValue, setExperienceValue] = useState([0, 3]);
  const [distanceValue, setDistanceValue] = useState([0]);
  // const [ageValue, setAgeValue] = useState([3, 7]);
  const [salaryValue, setSalaryValue] = useState([3, 7]);

  const [modalVisible, setModalVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const loaderResponse = useSelector(state => state.loader);

  const SearchDataResponse = useSelector(state => state.searchJobs);

  // console.log('SearchDataResponse ::', SearchDataResponse);

  const NearByJobsWcData = useSelector(state => state.jobseNearMewc);
  // console.log('NearByJobsData--->', NearByJobsWcData);

  const [searchData, setSearchData] = useState('');

  const [filterVisible, setFilterVisible] = useState(false);

  const [searchJobsData, setSearchJobsData] = useState([]);
  const [useEffectState, setUseEffectState] = useState([]);
  const [countIndex, setCountIndex] = useState(0);
  console.log('countIndex---->', countIndex);

  const [showFullDetails, setShowFullDetails] = useState(false);

  // ------------------------ Profile Data Api call -------------------------- \\
  const [profileData, setProfileData] = useState([]);

  const ProfileDataResponse = useSelector(state => state.profile);
  // console.log('ProfileDataResponse -----> ', ProfileDataResponse);

  useEffect(() => {
    if (ProfileDataResponse.data !== null) {
      setProfileData(ProfileDataResponse.data.data);
    } else {
      dispatch(ProfileRequest());
      dispatch(loaderAction(true));
    }
  }, [ProfileDataResponse.data]);
  // ********************** Explore Jobs Data ********************** \\
  useEffect(() => {
    console.log('dsdasdasdf');
    setUseEffectState([]);
    setSearchJobsData([]);
    setFilterData([]);
    setSearchData('');
  }, [isFocused]);

  useEffect(() => {
    console.log('route?.params.key;;;;;;', route.params.key);
    if (route?.params !== undefined) {
      setSearchData(SearchData.searchData);
      if (route?.params.key == 'search') {
        console.log('IFFF');
        let bodydata = {
          keyword: route?.params.searchData,
        };
        dispatch(SearchJobsRequest(bodydata));
        dispatch(loaderAction(true));
      } else if (route?.params.key == 'JobsNearMewc') {
        if (NearByJobsWcData.data !== null) {
          if (NearByJobsWcData.data.length !== 0) {
            setSearchJobsData(NearByJobsWcData.data);
            console.log('NearByJobsWcData.data~~~', NearByJobsWcData.data)
            setCountIndex(0);
          } else {
            console.log('0->>>');
            setCountIndex(-1);
          }
        } else {
          console.log('1->>>');
          setCountIndex(-1);
        }
      } else {
        setUseEffectState([]);
        setSearchJobsData([]);
        console.log('2->>>');
        setCountIndex(-1);
      }
    } else {
      console.log('3->>>');
      setUseEffectState([]);
      setSearchJobsData([]);
      setCountIndex(-1);
    }
  }, [route?.params.key, NearByJobsWcData.data]);

  useEffect(() => {
    if (SearchDataResponse.data !== null) {
      if (SearchDataResponse.data.data.length !== 0) {
        console.log(
          'SearchDataResponse.data.data----->',
          SearchDataResponse.data.data,
        );
        setSearchJobsData(SearchDataResponse.data.data);
        setCountIndex(0);
      } else {
        setCountIndex(-1);
      }
    }
  }, [SearchDataResponse.data]);

  useEffect(() => {
    let temp = [];
    let data = searchJobsData;
    if (data.length !== 0) {
      data.map((mapItem, mapIndex) => {
        if (temp.length === 0) {
          if (mapIndex === countIndex) {
            temp.push(mapItem);
          }
        }
      });
      setUseEffectState([...temp]);
    }
  }, [countIndex, searchJobsData, SearchDataResponse, NearByJobsWcData]);

  //----------------- Ignore Jobs --------------------//

  const DeleteData = () => {
    // console.log('* * * Ignore * * *');
    let bodydata = {
      vacancy_id: useEffectState[0].id,
    };
    dispatch(IgnoreJobsRequest(bodydata));
    setShowFullDetails(false);
    if (searchJobsData.length - 1 >= countIndex) {
      setCountIndex(countIndex + 1);
    }
  };

  // useEffect(() => {
  //   if (route?.params?.key == 'details') {
  //     setUseEffectState([route?.params?.item]);
  //   }
  // }, []);

  //----------------- Apply Jobs --------------------//

  const ApplyNow = () => {
    useSwiper.swipeLeft;
    // console.log('* * * Apply * * *');
    if (loginToken) {
      let bodydata = {
        // vacancy_id: useEffectState[0].id,
        vacancy_id: useEffectState[0].id,
      };
      dispatch(ApplyNowRequest(bodydata));
      if (searchJobsData.length - 1 >= countIndex) {
        setCountIndex(countIndex + 1);
      }
    } else {
      setShowModal(true);
    }
  };

  //**************************** Seach Data ******************************\\
  const SearchJobsData = () => {
    console.log('searchData-->', searchData);
    let bodydata = {
      keyword: searchData,
    };
    // console.log('bodydata=====>', bodydata);
    dispatch(SearchJobsRequest(bodydata));
    setCountIndex(0);
    // console.log('SearchDataResponse.data.data---',SearchDataResponse.data.data);
    // if (SearchDataResponse.data.data !== []) {
    //   setCountIndex(0);
    // }
    dispatch(loaderAction(true));
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
    let bodydata = {
      vacancy_id: useEffectState[0].id,
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
      url: `https://jobportal.atwpl.com/jobs/${useEffectState[0].id}`,
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

  //------------------------- Filter Data-------------

  const selectEmpType = (item, index) => {
    let updateData = [...empType];
    const newState = updateData.map(obj => {
      if (obj.check === true) {
        return { ...obj, check: false };
      }
      return obj;
    });
    newState[index].check = !newState[index].check;
    setEmpType(newState);
  };

  const SerachFilterData = () => {
    var type = [];
    empType.map(mitem => {
      if (mitem.check == true) {
        type.push(mitem.type);
      }
    });
    if (type.length !== 0) {
      var temp = [
        { type: type },
        { Experience: experienceValue },
        { Within: distanceValue },
        // {Age: ageValue},
        { Salary: salaryValue },
      ];
    } else {
      var temp = [
        { Experience: experienceValue },
        { Within: distanceValue },
        // {Age: ageValue},
        { Salary: salaryValue },
      ];
    }

    filterData.push(temp);
    setFilterData(temp);

    let temp_filterType = type;
    //   if (type.length !== 0) {
    //     var filData = searchJobsData.filter(item => {
    //       if (
    //         item.emp_details == temp[0].type ||
    //         (temp[3].Salary[0] * 1000 <= parseFloat(item.compensation_amount) &&
    //           parseFloat(item.compensation_amount) <= temp[3].Salary[1] * 1000) ||
    //         (temp[1].Experience[0].toString() <= item.experience_name &&
    //           item.experience_name <= temp[1].Experience[1].toString()) ||
    //         item.search_radious >= temp[2].Within.toString()
    //       ) {
    //         return item;
    //       }
    //     });
    //     console.log('temp_filterType1111----->', filData);
    //   } else {
    //     var filData = searchJobsData.filter(item => {
    //       if (
    //         (temp[2].Salary[0] * 1000 <= parseFloat(item.compensation_amount) &&
    //           parseFloat(item.compensation_amount) <= temp[2].Salary[1] * 1000 &&
    //           item.compensation_amount <=
    //             (temp[2].Salary[1] * 1000).toString()(
    //               temp[1].Experience[0].toString() <= item.experience_name &&
    //                 item.experience_name <= temp[1].Experience[1].toString(),
    //             )) ||
    //         item.search_radious >= temp[2].Within.toString()
    //       ) {
    //         console.log('temp_filterType2222----->');

    //         return item;
    //       }
    //     });
    //     console.log('temp_filterType2222----->', filData);
    //   }

    //   if (filData.length === 0) {
    //     setCountIndex(-1);
    //     setFilterVisible(false);
    //   } else {
    //     setCountIndex(0);
    //     setSearchJobsData(filData);
    //     setFilterVisible(false);
    //   }
    // };
    if (type.length !== 0) {
      var filData = searchJobsData.filter(item => {
        console.log('temp[0].type----->', temp[1].Experience[1]);
        if (
          item.emp_details == temp[0].type &&
          temp[1].Experience[0] <= parseFloat(item.experience_name) &&
          parseFloat(item.experience_name) <= temp[1].Experience[1] &&
          item.search_radious >= temp[2].Within.toString() &&
          temp[3].Salary[0] * 1000 <= parseFloat(item.compensation_amount) &&
          parseFloat(item.compensation_amount) <= temp[3].Salary[1] * 1000 &&
          item.search_radious >= temp[2].Within.toString() &&
          temp[3].Salary[0] * 1000 <= parseFloat(item.compensation_amount) &&
          parseFloat(item.compensation_amount) <= temp[3].Salary[1] * 1000
        ) {
          return item;
        }
      });
    } else {
      var filData = searchJobsData.filter(item => {
        if (
          temp[0].Experience[0] <= parseFloat(item.experience_name) &&
          parseFloat(item.experience_name) <= temp[0].Experience[1] &&
          item.search_radious >= temp[1].Within.toString() &&
          temp[0].Experience[0].toString() <= item.experience_name &&
          item.experience_name <= temp[0].Experience[1].toString() &&
          item.search_radious >= temp[1].Within.toString() &&
          temp[2].Salary[0] * 1000 <= parseFloat(item.compensation_amount) &&
          parseFloat(item.compensation_amount) <= temp[2].Salary[1] * 1000
        ) {
          return item;
        }
      });
      console.log('temp_filterType2222----->', filData);
    }

    if (filData.length === 0) {
      setCountIndex(-1);
      setFilterVisible(false);
    } else {
      setCountIndex(0);
      setSearchJobsData(filData);
      setFilterVisible(false);
    }
  };
  // // ********************** Remove Filter Data ********************** \\
  const RemoveFilterData = item => {
    let temp = filterData;
    let newTemp = [];
    temp.map((mapItem, mapIndex) => {
      if (mapItem !== item) {
        newTemp.push(mapItem);
      }
    });
    setFilterData([...newTemp]);
    console.log('filterData', filterData);
    if (filterData.length == 1) {
      setCountIndex(0);
    }
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

  const Cards = [
    { name: '1', image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif' },
    { name: '2', image: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif' },
    { name: '3', image: 'https://media.giphy.com/media/LkLL0HJerdXMI/giphy.gif' },
    { name: '4', image: 'https://media.giphy.com/media/fFBmUMzFL5zRS/giphy.gif' },
    { name: '5', image: 'https://media.giphy.com/media/oDLDbBgf0dkis/giphy.gif' },
    { name: '6', image: 'https://media.giphy.com/media/7r4g8V2UkBUcw/giphy.gif' },
    { name: '7', image: 'https://media.giphy.com/media/K6Q7ZCdLy8pCE/giphy.gif' },
    { name: '8', image: 'https://media.giphy.com/media/hEwST9KM0UGti/giphy.gif' },
    {
      name: '9',
      image: 'https://media.giphy.com/media/3oEduJbDtIuA2VrtS0/giphy.gif',
    },
  ];
  return (
    <View style={styles.main}>
      {/* back arrow and search */}
      <View
        style={[
          styles.row,
          {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: hp(1.5),
            marginHorizontal: wp(8),
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

        {route?.params?.key == 'search' ? (
          <View style={styles.textboxinnerOne}>
            {/* <SearchJS placeholder={'Search by Candidates/categories/Services'} /> */}
            <TextInput
              numberOfLines={1}
              multiline={false}
              value={searchData}
              placeholderTextColor="#939393"
              placeholder={'Search by Candidates/categories/Services'}
              onChangeText={text => {
                console.log(text), setSearchData(text);
              }}
              style={styles.inputFeed}
            />
            {searchData !== '' ? (
              <TouchableOpacity onPress={() => SearchJobsData()}>
                <View style={styles.icon}>
                  <Image style={styles.img} source={Images.searchJS}></Image>
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
        ) : (
          <View style={{ width: wp(100) - hp(5) }} />
        )}
        {route?.params?.key == 'search' ? (
          <TouchableOpacity onPress={() => setFilterVisible(true)}>
            <View
              style={{ height: hp(3), width: hp(3), marginHorizontal: wp(3) }}>
              <Image
                style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
                source={require('../../../assets/Icon/filter.png')}></Image>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: hp(1.5),
            alignItems: 'center',
            paddingLeft: wp(3),
          }}>
          <Modal visible={filterVisible} onRequestClose={setFilterVisible}>
            <SearchJobsJS
              goBack={setFilterVisible}
              searchNow={() => SerachFilterData()}
              data={empType}
              onSelect={(item, index) => selectEmpType(item, index)} //done
              experienceValue={experienceValue}
              experienceValueChange={val => setExperienceValue(val)}
              // ageValue={ageValue}
              // ageValueChange={val => setAgeValue(val)}
              distanceValue={distanceValue}
              distanceValueChange={val => setDistanceValue(val)}
              salaryValue={salaryValue}
              salaryValueChange={val => setSalaryValue(val)}
            />
          </Modal>
        </View>

        {route?.params?.key == 'search' ? (
          <View style={styles.filterDataView}>
            {filterData.length !== 0 ? (
              <Text style={[styles.filterText, { color: '#000000' }]}>Filters :</Text>
            ) : null}

            <FlatList
              data={filterData}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor: Color.TextBlueColor,
                      borderWidth: scale(2),
                      borderColor: Color.TextBlueColor,
                      marginHorizontal: 10,
                      alignItems: 'center',
                      borderRadius: 10,
                      paddingHorizontal: 10,
                      flexDirection: 'row',
                    }}
                    onPress={() => RemoveFilterData(item)}>
                    {item.type && (
                      <Text style={styles.filterText}>{item.type.join()}</Text>
                    )}
                    {item.Experience && (
                      <Text style={styles.filterText}>
                        Experience Between {item.Experience.join(' - ')} Year
                      </Text>
                    )}
                    {item.Within ? (
                      <Text style={styles.filterText}>
                        Within {item.Within.join()} mi of Radius
                      </Text>
                    ) : null}
                    {/* {item.Age && (
                     <Text style={styles.filterText}>
                       Age Between {item.Age.join(' - ')} Year
                     </Text>
                   )} */}
                    {item.Salary && (
                      <Text style={styles.filterText}>
                        Salary Between {item.Salary.join('K' + ' - ')}K
                      </Text>
                    )}

                    <Image
                      source={require('../../../assets/Icon/x.png')}
                      style={{ height: 10, width: 10 }}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        ) : null}

        {useEffectState.length === 0 ? (
          <View
            style={{ flex: 9, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: FSize.fs23, fontWeight: '600' }}>
              No Data Found
            </Text>
          </View>
        ) : (
          // <View style={{ flex: 10 }}>
          //   <ScrollView>
          //     <SwipeCards
          //       ref={useSwiper}
          //       onSwipedRight={() => alert('hehgh')}
          //       // onSwipedRight={() => ApplyNow()}
          //       // onSwipedLeft={() => DeleteData()}

          //       containerStyle={{
          //         // marginLeft: -20,
          //         //marginTop: -Math.floor(SCREEN_HEIGHT * 0.01),
          //         // backgroundColor: 'black',
          //         flex: 1,
          //       }}

          //       showYup={false}
          //       showNope={false}
          //       cards={searchJobsData}
          //       // verticalSwipe={true}
          //       // infinite={false}
          //       // showSecondCard={true}
          //       // animateOverlayLabelsOpacity={true}
          //       // animateCardOpacity={true}
          //       // swipeBackCard={true}
          //       // cardIndex={0}
          //       // loop={true}
          //       // stackSize={2}
          //       renderCard={item => {
          //         return (
          //           <View style={{ flex: 1, height: '100%', width: '100%' }}>
          //             <JobsCardDetailsTWO
          //               // Sidebar={true}
          //               item={item}
          //               backgroundImg={require('../../../assets/Icon/backGround.png')}
          //               percentage_match={setPercent(item?.percentage_match)}
          //               profilePicture={item.recruiter_profile_pic}
          //               name={item.recruiter_name}
          //               company={item.company_details.company_name}
          //               designation={item.title}
          //               details={item.job_description}
          //               // aboutText={}
          //               SeeFullDetails={showFullDetails}
          //               urgentVacancy={item.urgent_vacancy}
          //               experienceYear={item.experience_name}
          //               CompensationAmount={
          //                 '€  ' + item.compensation_amount + '/pm'
          //               }
          //               aboutCompany={item.about_company}
          //               liscense_required={item.liscense_required}
          //               no_of_vacancy={item.no_of_vacancy}
          //               EmploymentType={item.emp_details}
          //               companyWebsite={item.company_details.company_website}
          //               companyAddress={item.work_location}
          //               from_date={item.from_date}
          //               to_date={item.to_date}
          //               distance={item.distance}
          //               highest_degree_name={item.highest_degree_name}
          //               degree_completion_year={item.degree_completion_year}
          //               // onPress={() => navigation.navigate('ExploreJobsDetailsJS')}
          //               onPress={() => setShowFullDetails(true)}
          //               Skills={item.skill_list}
          //               DeleteData={() => DeleteData()}
          //               add={() => {
          //                 loginToken == null
          //                   ? setShowModal(true)
          //                   : handleShowModal();
          //               }}
          //               person={() => ApplyNow(item.id)}
          //               latitude={parseFloat(item.work_location_lat)}
          //               longitude={parseFloat(item.work_location_long)}
          //               userCoordinates={profileData}
          //             />
          //           </View>
          //         );
          //       }}
          //     />
          //   </ScrollView>
          // </View>
          <FlatList
            data={useEffectState}
            renderItem={({ item }) => {
              return (
                // <SwipeCards>
                // <GestureRecognizer
                //   onSwipeRight={() => ApplyNow()}
                //   onSwipeLeft={() => DeleteData()}>
                  <JobsCardDetailsTWO
                    currentLatitude={currentLatitude}
                    currentLongitude={currentLongitude}
                    short_description={item.short_description}
                    // Sidebar={true}
                    item={item}
                    backgroundImg={item.category_image}
                    profilePicture={item.recruiter_profile_pic}
                    percentage_match={item.percentage_match}
                    name={item.contact_person_name || item.recruiter_name}
                    company={
                      item.company_details?.company_name || item.company_name
                    }
                    designation={item.title}
                    details={item.job_description}
                    // aboutText={item.short_description}
                    // SeeFullDetails={showFullDetails}
                    SeeFullDetails={true}

                    urgentVacancy={item.urgent_vacancy}
                    experienceYear={item.experience_name}
                    CompensationAmount={
                      item.currency + `${' '}` + item.compensation_amount + `${' '}` + item.compensation_details
                    }
                    aboutCompany={item.about_company}
                    liscense_required={item.liscense_required}
                    no_of_vacancy={item.no_of_vacancy}
                    EmploymentType={item.emp_details}
                    companyWebsite={item.company_details.company_website ? item.company_details.company_website : item.company_website}
                    companyAddress={item.work_location}
                    from_date={item.from_date}
                    to_date={item.to_date}
                    distance={item.distance}
                    highest_degree_name={item.highest_degree_name}
                    degree_completion_year={item.degree_completion_year}
                    // onPress={() => navigation.navigate('ExploreJobsDetailsJS')}
                    onPress={() => setShowFullDetails(true)}
                    Skills={item.skill_list || item.skill_set} //skills
                    DeleteData={() => DeleteData()}
                    add={() => {
                      loginToken == null
                        ? setShowModal(true)
                        : handleShowModal();
                    }}
                    person={() => ApplyNow()}
                    //---
                    // recruiterCoordinates={item}
                    latitude={item.work_location_lat}
                    longitude={item.work_location_long}
                    userCoordinates={profileData}
                  />
                // </GestureRecognizer>
                // </SwipeCards>
              );
            }}
          />
        )}

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

        {useEffectState.length !== 0 ? (
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
                  {percent == 0 || percent == null || percent == '' ? '10 %' : parseInt(percent)}
                </Text>
                <Text style={styles.Match}> Match</Text>
              </View>}

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
                  style={{ height: '80%', width: '80%' }}
                  resizeMode={'cover'}
                  source={require('../../../assets/Icon/applyNow.png')}></Image>
              </TouchableOpacity>
            </View>

            <View style={{ paddingTop: hp(2) }}>
              <TouchableOpacity
                onPress={() => DeleteData()}
                style={[styles.circleBackground, { backgroundColor: '#D93E30' }]}>
                <Image
                  style={styles.img40}
                  source={require('../../../assets/Icon/x.png')}></Image>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
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
    color: '#FFFFFF',
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
  ///
  card: {
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    elevation: 1,
  },
  thumbnail: {
    flex: 1,
    width: 300,
    height: 300,
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
