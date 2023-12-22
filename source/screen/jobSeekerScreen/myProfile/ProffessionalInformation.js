import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DocumentPicker from 'react-native-document-picker';
import { useDispatch, useSelector } from 'react-redux';
//Components
import DropDownComp from '../../../component/DropDownComp';
import AvailablePartTime from '../../../component/AvailablePartTime';
//themes
import Color from '../../../theme/Color';
import Font from '../../../theme/Font';
import FSize from '../../../theme/FSize';
import HeaderNavigation from '../../../component/HeaderNavigation';
import Images from '../../../theme/Images';
import { UpdateProfileRequest } from '../../../redux/Action/UpdateProfileAction';
import { loaderAction } from '../../../redux/Action/LoaderAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileCategoryRequest } from '../../../redux/Action/ProfileCategoryAction';
import Loader from '../../../component/loader';
import { useIsFocused } from '@react-navigation/native';
// import { Lang } from '../../../translation/lang';
import { GetAvailabilityPTRequest } from '../../../redux/Action/GetAvailabilityPTAction';
import { JobCategoryRequest } from '../../../redux/Action/JobCategoryAction';
import { JobSkillRequest } from '../../../redux/Action/JobSkillAction';
import {
  JobExperienceRequest,
  JobExperienceResponse,
} from '../../../redux/Action/JobExperienceAction';
import {
  JobEducationRequest,
  JobEducationResponse,
} from '../../../redux/Action/JobEducationAction';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import { LocationRequest } from '../../../redux/Action/LocationAction';
import AutoCompleteInput from '../../../component/AutoCompleteInput';
import axios from 'axios';
import { AvailabilityPTRequest } from '../../../redux/Action/AvailabilityPTAction';
import { ProfileResponse } from '../../../redux/Action/ProfileAction';
import UploadFileToAws from '../../../helper/UploadFileToAws';

const GOOGLE_PLACES_API_KEY = 'AIzaSyAyu-6Pv7RaiohWH1bWpQqwXbx7roNG_GA';

const GOOGLE_PACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place';

const ProffessionalInformation = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const IsFocused = useIsFocused();

  const [ln, setLn] = useState('en');
  useEffect(() => {
    AsyncStorage.getItem('LanguageCode')
      .then(_ln => {
        setLn(_ln);
      })
      .catch(err => { });
  }, [IsFocused]);

  const ProfileDetails = route?.params?.personalInfo.profileDetails;
  const loaderResponse = useSelector(state => state.loader);
  const ProfileCategoryResponse = useSelector(state => state.profileCategory);

  //----------------------- This Stats using DropDown data -------------------------//
  const [jobCategory, setJobCategory] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [highestDegree, setHighestDegree] = useState([]);

  // * * * * * * * LANGUAGE PART * * * * * * *
  const [Lang, setLang] = useState({});
  useEffect(() => {
    AsyncStorage.getItem('LANGUAGE').then(lang => {
      setLang(JSON.parse(lang));
    });
  }, []);
  // * * * * * * * LANGUAGE PART * * * * * * *

  //-------------------------------------------------------------------------------//
  const [selectCategory, setSelectCategory] = useState({
    id: '',
    category_name: '',
  });
  const [selectSkills, setSelectSkills] = useState({
    id: '',
    skill_name: '',
  });
  const [selectExperience, setSelectExperience] = useState({
    id: '',
    experience: '',
  });
  const [selectEducation, setSelectEducation] = useState({
    id: '',
    degree: '',
  });
  const [selectYear, setSelectYear] = useState({
    id: '',
    year: '',
  });
  const [selectEmploymentType, setSelectEmploymentType] = useState({
    id: '',
    type: '',
  });
  const [selectSalary, setSelectSalary] = useState('');
  const [selectCertificates, setSelectCertificates] = useState([]);
  const [selectLicences, setSelectLicences] = useState([]);

  const [certificatesList, setCertificatesList] = useState([]);
  const [LicencesList, setLicencesList] = useState([]);


  const [locationData, setLocationData] = useState('');
  const [address, setAddress] = useState([]);

  console.log();
  const [about, setAbout] = useState('');

  const [bodyData, setBodyData] = useState(ProfileDetails);
  console.log('bodyData--->', bodyData);

  const updateBodyData = (key, value) => {
    let newData = {
      ...bodyData,
      [key]: value,
    };
    console.log('*** bodyData ***', bodyData);
    setBodyData({ ...newData });
  };

  const [selct, setSelct] = useState([]);
  const [iD, setID] = useState([]);
  console.log('iD-------===', iD);
  const onSelectMultiple = item => {
    let selectedData = {
      skill_name: item.skill_name,
      id: item.id,
    };
    selct.push(selectedData);
    setSelct([...selct]);

    iD.push(item.id);
    setID([...iD]);
    const numbersString = iD.toString();
    updateBodyData('skills', numbersString);
  };

  //---------- Delete Licences ----------\\
  const deleteSkils = index => {
    let newTemp = [];
    selct.map((mapItem, mapIndex) => {
      if (mapIndex !== index) {
        newTemp.push(mapItem);
      }
    });
    setSelct([...newTemp]);
    let idtemp = [];
    iD.map((itmId, itmIdx) => {
      if (itmIdx !== index) {
        idtemp.push(itmId);
      }
    });
    setID([...idtemp]);
    const numbersString = iD.toString();
    updateBodyData('skills', numbersString);
  };

  const onSelect = (item, key) => {
    console.log('* * * * * * * * * * *');
    console.log('KEY ::', key);
    console.log('ITEM ::', item);
    console.log('* * * * * * * * * * *');

    if (key === 'Category') {
      setSelectCategory(item.id);
      updateBodyData('category', item.id);
    }
    //  else if (key === 'Skills') {
    //   setSelectSkills(item.id);
    //   updateBodyData('skills', item.id);
    // }
    else if (key === 'Experience') {
      setSelectExperience(item.id);
      updateBodyData('experience', item.id);
    } else if (key === 'Education') {
      setSelectEducation(item.id);
      updateBodyData('highest_education', item.id);
    } else if (key === 'Year') {
      setSelectYear(item.id);
      updateBodyData('passout_year', item.year);
    } else if (key === 'Employment Type') {
      setSelectEmploymentType(item.id);
      updateBodyData('employment_type', item.type);
    } else if (key === 'Salary') {
      setSelectSalary(item);
      updateBodyData('expected_salary', item);
    } // else if (key === 'location') {
    //   setAddress(item);
    //   updateBodyData('expected_salary', item.salary);
    // }
    else if (key === 'cover_latter') {
      setAbout(item);
      updateBodyData('cover_latter', item);
    }
  };

  //------------ Category Api call -------- \\
  useEffect(() => {
    if (
      ProfileCategoryResponse?.data !== null &&
      ProfileCategoryResponse.data.first !== null &&
      ProfileCategoryResponse.data.second !== null &&
      ProfileCategoryResponse.data.third !== null &&
      ProfileCategoryResponse.data.four !== null
    ) {
      setJobCategory(ProfileCategoryResponse.data.first);
      setSkills(ProfileCategoryResponse.data.second);
      setExperience(ProfileCategoryResponse.data.third);
      setHighestDegree(ProfileCategoryResponse.data.four);
    } else {
      dispatch(ProfileCategoryRequest());
    }
  }, [ProfileCategoryResponse?.data]);

  //---------- Upload Certificate ----------\\
  const selectOneFile = async () => {
    let res = await DocumentPicker.pickMultiple({
      type: [DocumentPicker.types.pdf],
    });
    console.log('response Multiple Select PDF', res);
    var temp = selectCertificates;

    res.map(async item => {

      console.log('item==', item);
      let imageUrl = await UploadFileToAws(item);
      console.log('itemdDdddd==', imageUrl.body.postResponse.location);
      temp.push(imageUrl.body.postResponse.location);
      console.log('temppush~~~~~~~', temp)
      setSelectCertificates(temp);

    });

    let value = certificatesList;
    res.map(item => {
      value.push(item);
    });
    setCertificatesList([...value]);
  };

  //---------- Delete Certificate ----------\\
  const DeleteSelectedDocument = index => {
    let temp = selectCertificates;
    let newTemp = [];
    temp.map((mapItem, mapIndex) => {
      console.log('mapIndex::', mapIndex);
      console.log('index::', index);
      if (mapIndex !== index) {
        newTemp.push(mapItem);
      }
    });
    setSelectCertificates([...newTemp]);


    let value = certificatesList;
    let valuenewTemp = [];
    value.map((mapItem, mapIndex) => {
      console.log('mapIndex::', mapIndex);
      console.log('index::', index);
      if (mapIndex !== index) {
        valuenewTemp.push(mapItem);
      }
    });
    setCertificatesList([...valuenewTemp]);
  };

  //---------- Upload Licences ----------\\
  const UploadLicences = async () => {
    let res = await DocumentPicker.pickMultiple({
      type: [DocumentPicker.types.pdf],
    });
    console.log('response Multiple Select PDF', res);
    var temp = selectLicences;

    res.map(async item => {
      console.log('item==', item);
      let imageUrl = await UploadFileToAws(item);
      console.log('itemdDdddd==', imageUrl);
      temp.push(imageUrl.body.postResponse.location);
      console.log('temppush~~~~~~~', temp)
      setSelectLicences(temp);
    });


    let value = LicencesList;
    res.map(item => {
      value.push(item);
    });
    setLicencesList([...value]);
  };
  //---------- Delete Licences ----------\\
  const DeleteSelectedLicneces = index => {
    let temp = selectLicences;
    let newTemp = [];
    temp.map((mapItem, mapIndex) => {
      console.log('mapIndex::', mapIndex);
      console.log('index::', index);
      if (mapIndex !== index) {
        newTemp.push(mapItem);
      }
    });
    setSelectLicences([...newTemp]);

    let value = LicencesList;
    let valuenewTemp = [];
    value.map((mapItem, mapIndex) => {
      console.log('mapIndex::', mapIndex);
      console.log('index::', index);
      if (mapIndex !== index) {
        valuenewTemp.push(mapItem);
      }
    });
    setLicencesList([...valuenewTemp]);
  };

  //--------------------  Availability part Time ----------------------\\

  const [ABPTdata, setABPTdata] = useState({});
  const AvailabilityPTData = useSelector(state => state.getAvailabilityPT);
  console.log('AvailabilityPTData---->', AvailabilityPTData.data);
  const _jobSkills = useSelector(state => state?.jobSkills?.data);
  const _jobEducation = useSelector(state => state.jobEducation?.data);
  const _jobExperience = useSelector(state => state.jobExperience?.data);

  const [days, setDays] = useState(Days);

  useEffect(() => {
    dispatch(ProfileCategoryRequest());
    dispatch(GetAvailabilityPTRequest());
  }, [_jobSkills, _jobExperience, _jobEducation]);

  useEffect(() => {
    if (AvailabilityPTData.data !== null) {
      // if (AvailabilityPTData.data.status_code === 200) {
      let filtered = Object.keys(AvailabilityPTData.data.data)
        .filter(key => !key.includes('user'))
        .reduce((obj, key) => {
          return Object.assign(obj, {
            [key]: AvailabilityPTData.data.data[key],
          });
        }, {});
      console.log('filtered===', filtered);
      setABPTdata(filtered);

      function toString(convert) {
        return convert.toString().replace(/[!.]/g, '');
      }
      let myFunc = num => Number(num);
      console.log('ABPTdata====', ABPTdata);
      Object.keys(ABPTdata).map((item, index) => {
        var myInt = toString(ABPTdata[item]);

        // var intArr = Array.from(String(myInt), myFunc);

        //
        let int_nums = ABPTdata[item].split(',').map(string_num => {
          if (Number.isInteger(string_num / 2)) {
            return parseFloat(string_num / 2);
          } else {
            return parseFloat(string_num / 2 - 0.2);
          }
        });

        const result = [];

        for (let i = 0; i < int_nums.length; i += 2) {
          if (int_nums.length > 1) {
            result.push(int_nums.slice(i, i + 2));
          }

        }

        days[index].timesloteArr = result;
        console.log('int_nums!!', int_nums.length)
        setDays([...days]);
      });
      // }
    }
  }, [AvailabilityPTData]);

  const addItem = (item, index) => {

    console.log('item~~~~~~~~~~~~~~~~~', item)

    days.map((mapItem, mapIndex) => {
      console.log('mapItem~~~~', mapItem)
      if (item.id === mapItem.id) {
        if (mapItem.timesloteArr.find(subArr => JSON.stringify(subArr) === JSON.stringify(item.sliderVal))) {
          Alert.alert('The Time Slot Already Exists')
        } else {
          days[mapIndex].timesloteArr.push(mapItem.sliderVal);
        }
      }
    });
    setDays([...days]);
  };

  const deleteAddRange = (subitem, subindex, item, index) => {
    let tmp = item;
    days.map((mapItem, mapIndex) => {
      if (tmp.id == mapItem.id) {
        tmp?.timesloteArr?.splice(subindex, 1);
        days[mapIndex].timesloteArr = tmp?.timesloteArr;
      }
    });
    setDays([...days]);
  };

  function time_convert(num) {
    var hours = Math.floor(num / 60);
    var cminutes = num % 60;
    var minutes = cminutes > 30 ? 30 : 0;
    return hours + '.' + minutes;
  }

  const setSliderValue = (value, item) => {
    if (
      parseFloat(time_convert(value[0])) <= 12 &&
      parseFloat(time_convert(value[1])) >= 12.3
    ) {
      let temp = days;
      temp.map((mapItem, mapIndex) => {
        if (item.id === mapItem.id) {
          temp[mapIndex].sliderVal = [
            parseFloat(time_convert(value[0])),
            parseFloat(time_convert(value[1])),
          ];
        }
      });
      console.log(temp);
      setDays([...temp]);
    }
  };
  //--------------------------------------------------\\
  const [category, setCategory] = useState('');
  const [addSkills, setAddSkills] = useState('');
  const [addExperience, setAddExperience] = useState('');
  const [addEducation, setAddEducation] = useState('');

  const AddlistsData = (item, key) => {
    console.log(key);
    console.log(item);
    if (key === 'Category') {
      setCategory(item);
    } else if (key === 'Skills') {
      setAddSkills(item);
    } else if (key === 'Experience') {
      setAddExperience(item);
    } else if (key === 'Education') {
      setAddEducation(item);
    }
  };

  // ----------- Add category ----------\\

  const addNewCategory = () => {
    let request = {
      category_name: category,
    };

    console.log('request=>', request);
    dispatch(JobCategoryRequest(request));
    setTimeout(() => {
      dispatch(ProfileCategoryRequest());
    }, 1000);
  };

  const addNewSkill = () => {
    let request = {
      skill_name: addSkills,
    };
    dispatch(JobSkillRequest(request));
    setTimeout(() => {
      dispatch(ProfileCategoryRequest());
    }, 1000);
  };

  const addNewExperience = () => {
    let request = {
      experience: addExperience,
    };
    dispatch(JobExperienceRequest(request));
    setTimeout(() => {
      dispatch(ProfileCategoryRequest());
    }, 1000);
  };

  const addNewEducation = () => {
    let request = {
      degree: addEducation,
    };
    dispatch(JobEducationRequest(request));
    setTimeout(() => {
      dispatch(ProfileCategoryRequest());
    }, 1000);
  };

  useEffect(() => { }, []);

  // ------------ submit data ------------\\

  const submitData = async () => {

    const token = await AsyncStorage.getItem('LoginAccessToken');
    const defaulImage =
      'https://www.zimlive.com/dating/wp-content/themes/gwangi/assets/images/avatars/user-avatar.png';
    let request = {
      short_description: 'hiiii',
      first_name: bodyData?.first_name,
      last_name: bodyData?.last_name,
      email: bodyData?.email,
      mobile_number: bodyData?.mobile_number,
      profile_title: bodyData?.profile_title,
      image: bodyData?.image || defaulImage,
      skills: bodyData?.skills,
      experience: bodyData?.experience,
      job_category: bodyData?.job_category || 1,
      highest_education: bodyData?.highest_education || 1,
      passout_year: bodyData?.passout_year || 1,
      certificate: selectCertificates.join(', '),
      employment_type: bodyData?.employment_type,
      expected_salary: bodyData?.expected_salary,
      currency: 'INR',
      cover_latter: bodyData?.cover_latter,
      license: selectLicences.join(', '),
      from_day: bodyData?.from_day,
      to_day: bodyData?.to_day,
      start_time: bodyData?.start_time,
      end_time: bodyData?.end_time,
      latitude: bodyData?.latitude,
      longitude: bodyData?.longitude,
    };
    console.log('request===>', request);
    dispatch(UpdateProfileRequest(request, navigation));

    //************************ MONDAY *****************************\\

    var mondayMerged = [].concat.apply([], days[0].timesloteArr);
    var finlemonday = mondayMerged.map((item, index) => {
      return (item * 2).toFixed(0);
    });
    const mondayfinleMerged = finlemonday.join(',');

    //************************ TUESDAY *****************************\\

    var tuesdayMerged = [].concat.apply([], days[1].timesloteArr);
    var finletuesday = tuesdayMerged.map((item, index) => {
      return (item * 2).toFixed(0);
    });
    const tuesdayfinleMerged = finletuesday.join(',');

    //************************ WEDNESDAY *****************************\\

    var wednesdayMerged = [].concat.apply([], days[2].timesloteArr);
    var finlewednesday = wednesdayMerged.map((item, index) => {
      return (item * 2).toFixed(0);
    });
    const wednesdayfinleMerged = finlewednesday.join(',');

    //************************ THURSDAY *****************************\\

    var thursdayMerged = [].concat.apply([], days[3].timesloteArr);
    var finlethursday = thursdayMerged.map((item, index) => {
      return (item * 2).toFixed(0);
    });
    const thursdayfinleMerged = finlethursday.join(',');

    //************************ FRIDAY *****************************\\

    var fridayMerged = [].concat.apply([], days[4].timesloteArr);
    var finlefriday = fridayMerged.map((item, index) => {
      return (item * 2).toFixed(0);
    });
    const fridayfinleMerged = finlefriday.join(',');

    //************************ SUNDAY *****************************\\

    var saturdayMerged = [].concat.apply([], days[5].timesloteArr);
    var finlesaturday = saturdayMerged.map((item, index) => {
      return (item * 2).toFixed(0);
    });
    const saturdayfinleMerged = finlesaturday.join(',');

    //************************ MONDAY *****************************\\

    var sundayMerged = [].concat.apply([], days[6].timesloteArr);
    var finlesunday = sundayMerged.map((item, index) => {
      return (item * 2).toFixed(0);
    });
    const sundayfinleMerged = finlesunday.join(',');

    let APTbodyData = {
      monday: mondayfinleMerged,
      tuesday: tuesdayfinleMerged,
      wednesday: wednesdayfinleMerged,
      thursday: thursdayfinleMerged,
      friday: fridayfinleMerged,
      saturday: saturdayfinleMerged,
      sunday: sundayfinleMerged,
    };
    console.log('APTbodyData;;', APTbodyData);

    dispatch(AvailabilityPTRequest(APTbodyData));
  };

  const createPT = async () => {
    // Constant.baseURL + Constant.end_Point.AVAILABILITYPT
    let request = Object.fromEntries(
      Days.map(k => [k.dayName, k.sliderVal.toString()]),
    );

    fetch(`${Constant.baseURL}${Constant.end_Point.AVAILABILITYPT}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    }).then(res => {
      console.log('res ::::', res);
      dispatch(GetAvailabilityPTRequest());
    });
  };

  //----------------------------------
  const [predictions, setPredictions] = useState([]);

  const [fetchPredictions, setFetchPredictions] = useState(false);

  const [recentLocation, setRecentLocation] = useState([]);

  const onChangeText = async () => {
    console.log('Result is--->', address);

    const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?key=${GOOGLE_PLACES_API_KEY}&input=${address}`;
    try {
      const result = await axios.request({
        method: 'post',
        url: apiUrl,
      });

      if (result) {
        const {
          data: { predictions },
        } = result;
        setPredictions(predictions);
        setFetchPredictions(false);
      }
      console.log('result====>', result);
    } catch (e) {
      setFetchPredictions(false);
      console.log(e);
    }
  };

  const onSuggestionClicked = (placeId, description) => {
    // Search by address
    setLocationData(description); //setting the locaiton from the search tap

    Geocoder.from(description)
      .then(json => {
        var location = json.results[0].geometry.location;
        console.log('respose>>>>>>>>>>>>>', location);
        console.log('response lat>>>', location.lat);
        console.log('response long>>>', location.lng);
        //              aaaaaaaaaaaaa
        // updatting at the meta data
        CurrentLocation(location.lat, location.lng);
        // console.log(myAddress);
      })
      .catch(error => console.warn(error));

    const location = {
      location: description,
    };
    console.log('location--->', recentLocation);
    recentLocation.push(location);
    setRecentLocation([...recentLocation]);
  };

  // -------------------------- Current Location api call --------------------------\\
  const CurrentLocation = (currentLatitude, currentLongitude) => {
    let bodydata = {
      latitude: currentLatitude,
      longitude: currentLongitude,
    };
    dispatch(LocationRequest(bodydata));
  };

  //---------------------------- Get Current Location ---------------------------- \\

  // Search by geo-location (reverse geo-code)
  Geocoder.init('AIzaSyAyu-6Pv7RaiohWH1bWpQqwXbx7roNG_GA'); // use a valid API key

  useEffect(() => {
    updateAddress();
  }, [IsFocused]);

  // converting the api to the address
  function updateAddress() {
    Geocoder.from(bodyData.latitude, bodyData.longitude).then(json => {
      var addressComponent = json.results[0].address_components;
      var add = addressComponent[0]?.long_name;
      var addT = addressComponent[1]?.short_name;
      var myAddress = [add + addT];
      console.log(addressComponent);
      setAddress(myAddress);
    });
  }

  return (
    <View style={styles.mainView}>
      <HeaderNavigation
        onPress={() => navigation.goBack()}
        heading={
          Lang && Object.keys(Lang).length > 0 && Lang[ln].Profile['My Profile']
        }
      />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}>
        <Text style={styles.InformationText}>
          {Lang &&
            Object.keys(Lang).length > 0 &&
            Lang[ln].Profile['Proffessional Information']}
        </Text>

        <DropDownComp
          data={ProfileCategoryResponse?.data?.first?.filter(x =>
            x?.category_name?.toLowerCase()?.includes(category?.toLowerCase()),
          )}
          value={selectCategory}
          onSelect={item => onSelect(item, 'Category')}
          ItemName={'category_name'}
          placeholder={
            bodyData.job_category !== undefined &&
              bodyData.job_category !== null &&
              bodyData.job_category !== ''
              ? bodyData.job_category
              : Lang && Object.keys(Lang).length > 0
                ? Lang[ln].Profile['Select Category']
                : ''
          }
          onChangeText={text => AddlistsData(text, 'Category')}
          inputShow={true}
          writeList={category}
          onAdd={addNewCategory}
        />

        <DropDownComp
          // data={skills}
          data={ProfileCategoryResponse?.data?.second?.filter(x =>
            x?.skill_name?.toLowerCase()?.includes(addSkills?.toLowerCase()),
          )}
          // value={selectSkills}
          onSelectMultiple={item => onSelectMultiple(item)}
          // onSelect={item => onSelect(item, 'Skills')}
          ItemName={'skill_name'}
          multiSelect={true}
          placeholder={
            Lang &&
            Object.keys(Lang).length > 0 &&
            Lang[ln].Profile['Select Skills']
          }
          // placeholder={
          //   bodyData.skill_set !== undefined &&
          //   bodyData.skill_set !== null &&
          //   bodyData.skill_set !== ''
          //     ? bodyData.skill_set[0].skill_name
          //     : Lang &&
          //       Object.keys(Lang).length > 0 &&
          //       Lang[ln].Profile['Select Skills']
          // }
          onChangeText={text => AddlistsData(text, 'Skills')}
          inputShow={true}
          writeList={addSkills}
          onAdd={addNewSkill}
        />
        {selct.length !== 0 || bodyData.skill_set.length !== 0 ? (
          <FlatList
            data={selct.length == 0 ? bodyData.skill_set : selct}
            numColumns={3}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    borderWidth: 0.5,
                    borderColor: '#6545',
                    borderRadius: 30,
                    padding: 5,
                    paddingHorizontal: 2,
                    marginHorizontal: 5,
                    marginVertical: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: hp(13.3),
                    justifyContent: 'space-around',
                  }}>
                  <Text
                    style={{
                      fontSize: FSize.fs12,
                      color: '#000',
                      textAlign: 'center',
                    }}>
                    {item.skill_name}
                  </Text>
                  {selct.length !== 0 ? (
                    <TouchableOpacity
                      onPress={() => deleteSkils(index)}
                      style={{ padding: 5 }}>
                      <Image
                        source={Images.wrongImage}
                        style={{ height: 10, width: 10 }}
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>
              );
            }}
          />
        ) : null}

        <AutoCompleteInput
          placeholder={
            Lang && Object.keys(Lang).length > 0
              ? Lang[ln].Profile['Enter Your Location']
              : ''
          }
          customstyle={styles.textInput}
          value={locationData !== '' ? locationData : address[0]}
          serchIconInput={false}
          list={predictions}
          show={address.length ? true : false}
          onChange={data => {
            setAddress(data);
            setLocationData(data);
            if (data !== '') {
              onChangeText();
              setFetchPredictions(true);
            } else {
              setPredictions([]);
            }
          }}
          listname="description"
          load={fetchPredictions}
          onPress={(placeId, description) => {
            console.log('description---->', description);
            console.log('placeId---->', placeId);

            setPredictions([]);
            onSuggestionClicked(placeId, description);
          }}
        />
        {/* <TextInput
          placeholderTextColor={'#96989A'}
          placeholder={Lang && Object.keys(Lang).length > 0 && Lang[ln].Profile['Enter Your Location']}
          style={styles.textInput}
          value={currentAddress[0]}
          onChangeText={text => setAddress(text)}
        /> */}
        <DropDownComp
          // data={experience}
          data={ProfileCategoryResponse?.data?.third?.filter(x =>
            x?.experience
              ?.toLowerCase()
              ?.includes(addExperience?.toLowerCase()),
          )}
          value={selectExperience}
          onSelect={item => onSelect(item, 'Experience')}
          ItemName={'experience'}
          placeholder={
            bodyData.experience_det !== undefined &&
              bodyData.experience_det !== null &&
              bodyData.experience_det !== ''
              ? bodyData.experience_det
              : Lang && Object.keys(Lang).length > 0
                ? Lang[ln].Profile['Select Your Experience']
                : ''
          }
          onChangeText={text => AddlistsData(text, 'Experience')}
          inputShow={true}
          writeList={addExperience}
          onAdd={addNewExperience}
        />
        <DropDownComp
          // data={highestDegree}
          data={ProfileCategoryResponse?.data?.four?.filter(x =>
            x?.degree?.toLowerCase()?.includes(addEducation?.toLowerCase()),
          )}
          value={selectEducation}
          onSelect={item => onSelect(item, 'Education')}
          ItemName={'degree'}
          placeholder={
            bodyData.highest_education !== undefined &&
              bodyData.highest_education !== null &&
              bodyData.highest_education !== ''
              ? bodyData.highest_education
              : Lang && Object.keys(Lang).length > 0
                ? Lang[ln].Profile['Select Highest Education']
                : ''
          }
          onChangeText={text => AddlistsData(text, 'Education')}
          inputShow={true}
          writeList={addEducation}
          onAdd={addNewEducation}
        />
        <DropDownComp
          data={YearData}
          value={selectYear}
          onSelect={item => onSelect(item, 'Year')}
          ItemName={'year'}
          placeholder={
            bodyData.passout_year !== undefined &&
              bodyData.passout_year !== null &&
              bodyData.passout_year !== ''
              ? bodyData.passout_year
              : Lang && Object.keys(Lang).length > 0
                ? Lang[ln].Profile['Passout Year']
                : ''
          }
        />

        {/* //------------------------------ Upload Certificate ------------------------------\\ */}

        <View style={styles.dropDownStyle}>
          <Text style={[styles.dropDownText, { color: '#96989A' }]}>
            {Lang &&
              Object.keys(Lang).length > 0 &&
              Lang[ln].Profile['Upload Certificates']}
          </Text>

          <TouchableOpacity style={styles.uploadStyle} onPress={selectOneFile}>
            <Text style={styles.uploadText}>
              {Lang &&
                Object.keys(Lang).length > 0 &&
                Lang[ln].Profile['Upload']}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>
          {Lang &&
            Object.keys(Lang).length > 0 &&
            Lang[ln].Profile['You can upload multiple certificates']}
        </Text>
        {certificatesList.length !== 0 ? (
          <View style={styles.documentView}>
            <FlatList
              nestedScrollEnabled
              data={certificatesList}
              renderItem={({ item, index }) => {
                console.log(item);
                return (
                  <View style={styles.documentinnerView}>
                    <Text
                      style={[
                        styles.dropDownText,
                        {
                          color: Color.ColorBlack,
                          paddingRight: 30,
                        },
                      ]}>
                      {item.name}
                    </Text>
                    <TouchableOpacity
                      onPress={() => DeleteSelectedDocument(index)}>
                      <Image
                        source={Images.wrongImage}
                        style={{ height: 20, width: 20 }}
                      />
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        ) : null}

        {/* //------------------------------ Upload Licences ------------------------------\\ */}

        <View style={styles.dropDownStyle}>
          <Text style={[styles.dropDownText, { color: '#96989A' }]}>
            {Lang &&
              Object.keys(Lang).length > 0 &&
              Lang[ln].Profile['Upload Licences']}
          </Text>

          <TouchableOpacity style={styles.uploadStyle} onPress={UploadLicences}>
            <Text style={styles.uploadText}>
              {Lang &&
                Object.keys(Lang).length > 0 &&
                Lang[ln].Profile['Upload']}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>
          {Lang &&
            Object.keys(Lang).length > 0 &&
            Lang[ln].Profile['You can upload multiple Licences']}
        </Text>
        {LicencesList.length !== 0 ? (
          <View style={styles.documentView}>
            <FlatList
              nestedScrollEnabled={true}
              data={LicencesList}
              renderItem={({ item, index }) => {
                console.log(item);
                return (
                  <View style={styles.documentinnerView}>
                    <Text
                      style={[
                        styles.dropDownText,
                        {
                          color: Color.ColorBlack,
                          paddingRight: 30,
                        },
                      ]}>
                      {item.name}
                    </Text>
                    <TouchableOpacity
                      onPress={() => DeleteSelectedLicneces(index)}>
                      <Image
                        source={Images.wrongImage}
                        style={{ height: 20, width: 20 }}
                      />
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        ) : null}

        {/* //------------------------------ Employment Type ------------------------------\\ */}

        <DropDownComp
          data={Employment_Type}
          value={selectEmploymentType}
          onSelect={item => {
            console.log('itememoprew', item), onSelect(item, 'Employment Type');
          }}
          ItemName={'type'}
          placeholder={
            bodyData.employment_type !== undefined &&
              bodyData.employment_type !== null &&
              bodyData.employment_type !== ''
              ? bodyData.employment_type
              : Lang && Object.keys(Lang).length > 0
                ? Lang[ln].Profile['Employment Type']
                : ''
          }
        />
        <TextInput
          placeholderTextColor={'#96989A'}
          placeholder={
            Lang && Object.keys(Lang).length > 0
              ? Lang[ln].Profile['Expected Salary']
              : ''
          }
          style={styles.textInput}
          value={bodyData.expected_salary}
          onChangeText={val => onSelect(val, 'Salary')}
        />
        {/* <DropDownComp
          data={Expected_Salary}
          value={selectSalary}
          onSelect={item => onSelect(item, 'Salary')}
          ItemName={'salary'}
          placeholder={Lang && Object.keys(Lang).length > 0 && Lang[ln].Profile['Expected Salary']}
          // data={dropDownItem}
          // onPress={val => onSelect(val, 'Salary')}
          // value={selectSalary}
          // text={'Expected Salary'}
        /> */}
        <TextInput
          placeholder={
            Lang && Object.keys(Lang).length > 0
              ? Lang[ln].Profile['Cover Letter/ About Yourself']
              : ''
          }
          multiline
          numberOfLines={5}
          style={styles.bigTextInput}
          value={bodyData.cover_latter}
          onChangeText={text => onSelect(text, 'cover_latter')}
        />
        <Text style={styles.availabilityText}>
          {Lang &&
            Object.keys(Lang).length > 0 &&
            Lang[ln].Profile['Availability for Part Time']}
        </Text>

        {/* ============================== Availability for Part Time ============================== */}
        <FlatList
          data={days}
          nestedScrollEnabled={true}
          renderItem={({ item, index }) => {
            return (
              <AvailablePartTime
                dayName={
                  Lang &&
                  Object.keys(Lang).length > 0 &&
                  Lang[ln].Profile[item.dayName]
                }
                values={item.sliderVal}
                onValuesChange={value => setSliderValue(value, item)}
                onPressaddItem={() => addItem(item, index)}
                data={item.timesloteArr}
                availabaleSlot={item.timesloteArr.length}
                onPressDelete={(subitem, subindex) =>
                  deleteAddRange(subitem, subindex, item, index)
                }
              />
            );
          }}
        />

        <TouchableOpacity style={styles.buttonStyle} onPress={submitData}>
          <Text style={styles.buttonText}>
            {Lang && Object.keys(Lang).length > 0 && Lang[ln].Profile['Submit']}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <Loader val={loaderResponse.loader} />
    </View>
  );
};
export default ProffessionalInformation;
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: Color.Colorwhite,
  },
  container: {
    flex: 1,
    marginHorizontal: hp(2),
    // paddingVertical: hp(2),
  },
  InformationText: {
    color: '#444444',
    fontFamily: Font.PoppinsRegular,
    fontSize: 13,
    fontWeight: '600',
    marginTop: hp(1),
  },
  dropDownStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(1.5),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#D2D2D2',
    marginTop: hp(2),
    flex: 0.5,
    paddingHorizontal: 15,
  },
  dropDownText: {
    color: '#96989A',
    fontFamily: Font.PoppinsRegular,
    fontSize: 15,
    fontWeight: '400',
    flex: 3,
  },
  downArrow: {
    height: hp(2),
    width: hp(2.5),
    resizeMode: 'contain',
  },

  textInput: {
    borderWidth: 1,
    borderColor: '#D2D2D2',
    borderRadius: hp(0.5),
    paddingHorizontal: hp(2),
    marginTop: hp(2),
    fontSize: FSize.fs13,
    fontWeight: '400',
    fontFamily: Font.PoppinsRegular,
  },
  uploadStyle: {
    // top: 1,
    alignItems: 'center',
    paddingVertical: hp(0.5),
    borderWidth: 1,
    borderRadius: hp(10),
    borderColor: '#8D8D8D',
    flex: 2,
  },
  uploadText: {
    top: 1,
    color: '#8D8D8D',
    fontFamily: Font.PoppinsRegular,
    fontSize: 11,
    fontWeight: '400',
  },
  text: {
    color: '#96989A',
    fontFamily: Font.PoppinsRegular,
    fontSize: 11,
    fontWeight: '400',
    textAlign: 'right',
    marginTop: hp(1),
  },
  documentView: {
    // flex: 1,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    marginVertical: 5,
    borderColor: '#96989A',
  },
  documentinnerView: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 0.5,
    marginVertical: 5,
    marginHorizontal: 5,
    borderColor: '#96989A',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bigTextInput: {
    borderWidth: 1,
    borderColor: '#D2D2D2',
    borderRadius: hp(0.5),
    paddingHorizontal: hp(2),
    marginTop: hp(2),
    fontSize: 15,
    fontWeight: '400',
    fontFamily: Font.PoppinsRegular,
    textAlignVertical: 'top',
    height: hp(15),
  },
  availabilityText: {
    color: '#444444',
    fontFamily: Font.PoppinsSemiBold,
    fontSize: 15,
    fontWeight: '600',
    marginTop: hp(1),
  },

  buttonStyle: {
    backgroundColor: '#0D3068',
    paddingVertical: hp(1),
    alignItems: 'center',
    marginHorizontal: hp(2),
    borderRadius: hp(4),
    marginVertical: hp(5),
  },
  buttonText: {
    color: '#FFFF',
    fontFamily: Font.PoppinsRegular,
    fontSize: 15,
    fontWeight: '500',
  },
});

const YearData = [
  {
    id: 1,
    year: '2023',
  },
  {
    id: 2,
    year: '2022',
  },
  {
    id: 3,
    year: '2021',
  },
  {
    id: 4,
    year: '2020',
  },
  {
    id: 5,
    year: '2019',
  },
  {
    id: 6,
    year: '2018',
  },
  {
    id: 7,
    year: '2017',
  },
  {
    id: 8,
    year: '2016',
  },
  {
    id: 9,
    year: '2015',
  },
  {
    id: 10,
    year: '2014',
  },
  {
    id: 11,
    year: '2013',
  },
  {
    id: 12,
    year: '2012',
  },
  {
    id: 13,
    year: '2011',
  },
  {
    id: 14,
    year: '2010',
  },
  {
    id: 15,
    year: '2009',
  },
  {
    id: 16,
    year: '2008',
  },
  {
    id: 17,
    year: '2007',
  },
  {
    id: 18,
    year: '2006',
  },
  {
    id: 19,
    year: '2005',
  },
  {
    id: 20,
    year: '2004',
  },
  {
    id: 21,
    year: '2003',
  },
  {
    id: 22,
    year: '2002',
  },
  {
    id: 23,
    year: '2001',
  },
  {
    id: 24,
    year: '2000',
  },
  {
    id: 25,
    year: '1999',
  },
  {
    id: 26,
    year: '1998',
  },
  {
    id: 27,
    year: '1997',
  },
  {
    id: 26,
    year: '1996',
  },
  {
    id: 27,
    year: '1995',
  },
  {
    id: 28,
    year: '1994',
  },
  {
    id: 30,
    year: '1993',
  },
];

const Employment_Type = [
  {
    id: 1,
    type: 'Full Time',
  },
  {
    id: 2,
    type: 'Part Time',
  },
  {
    id: 3,
    type: 'Contract',
  },
];

const Days = [
  {
    id: 1,
    dayName: 'Monday',
    sliderVal: [1, 12.3],
    timesloteArr: [],
  },
  {
    id: 2,
    dayName: 'Tuesday',
    sliderVal: [1, 12.3],
    timesloteArr: [],
  },
  {
    id: 3,
    dayName: 'Wednesday',
    sliderVal: [1, 12.3],
    timesloteArr: [],
  },
  {
    id: 4,
    dayName: 'Thursday',
    sliderVal: [1, 12.3],
    timesloteArr: [],
  },
  {
    id: 5,
    dayName: 'Friday',
    sliderVal: [1, 12.3],
    timesloteArr: [],
  },
  {
    id: 6,
    dayName: 'Saturday',
    sliderVal: [1, 12.3],
    timesloteArr: [],
  },
  {
    id: 7,
    dayName: 'Sunday',
    sliderVal: [1, 12.3],
    timesloteArr: [],
  },
];
