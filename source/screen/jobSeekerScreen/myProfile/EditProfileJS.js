import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
  Ani
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Font from '../../../theme/Font';
import FSize from '../../../theme/FSize';
import Color from '../../../theme/Color';
import { scale } from '../../../theme/Scalling';
import { loaderAction } from '../../../redux/Action/LoaderAction';
import { UpdateProfileRequest } from '../../../redux/Action/UpdateProfileAction';
import Loader from '../../../component/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderNavigation from '../../../component/HeaderNavigation';
import DocumentPicker from 'react-native-document-picker';
import { RNS3 } from 'react-native-aws3';
// import { Lang } from '../../../translation/lang';
import { useIsFocused } from '@react-navigation/native';
import UploadFileToAws from '../../../helper/UploadFileToAws';

// const awsConfig = {
//   keyPrefix: '/',
//   bucket: 'catzapp-dev',
//   region: 'eu-central-1',
//   accessKey: '',
//   secretKey: '',
//   successActionStatus: 201,
// };

export default function EditProfileJS({ route, navigation }) {
  console.log('route.params-->>', route.params.profileData);
  const Item = route.params.profileData;

  const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/;

  const dispatch = useDispatch();
  const IsFocused = useIsFocused();
  const [ln, setLn] = useState('en');
  useEffect(() => {
    const setLang = async () => {
      setLn(await AsyncStorage.getItem('LanguageCode'));
    };
    setLang();
  }, [IsFocused]);


  // * * * * * * * GET PROFILE DATA * * * * * * *
  useEffect(() => {
    getProfileData()
  }, [])

  const getProfileData = async () => {
    const token = await AsyncStorage.getItem('LoginAccessToken');
    fetch('https://staging.jobportalapi.atwpl.com/jobseeker/profile/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }).then(response => response.json())
      .then(json => {
        if (json?.status_code == 200) {
          setProfileDetails(json?.data)
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  // * * * * * * * GET PROFILE DATA * * * * * * *

  // * * * * * * * LANGUAGE PART * * * * * * * 
  const [Lang, setLang] = useState({})
  useEffect(() => {
    AsyncStorage.getItem('LANGUAGE').then((lang) => {
      setLang(JSON.parse(lang));
    })
  }, [])
  // * * * * * * * LANGUAGE PART * * * * * * * 

  const loaderResponse = useSelector(state => state.loader);
  console.log('loder-->', loaderResponse.loader);
  const [profileDetails, setProfileDetails] = useState({});
  console.log('profileDetails-->', profileDetails);


  const selectimage = async () => {
    try {
      await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      }).then(async (image) => {
        let imageUrl = await UploadFileToAws(image);
        handleInputChange('image', imageUrl.body.postResponse.location);

      
      });
    } catch (error) {
      console.log('error =>', error);
    }
  };

  const handleInputChange = (key, value) => {
    let newData = {
      ...profileDetails,
      [key]: value,
    };
    setProfileDetails({ ...newData });
  };

  const UpdateProfile = () => {
    // if (photopicker === undefined) {
    //   Alert.alert('Please Upload Photo');
    //   return
    // }
    // if (firstName == '' || lastName == '' || email == '' || phone == '' || profileTitle == '') {
    //   Alert.alert('Please Enter Details');
    //   return
    // }
    // if (pattern.test(email) === false) {
    //   Alert.alert('Please Enter valid Email');
    //   return
    // }
    let bodyData = {
      // first_name: profileDetails.first_name,
      // last_name: profileDetails.last_name,
      // email: profileDetails.email,
      // mobile_number: profileDetails.mobile_number,
      // profile_title: profileDetails.profile_title,
      profileDetails,
      // image: profileImage,
    };
    // console.log('BodyData ===>', bodyData);
    // return
    // dispatch(UpdateProfileRequest(bodyData, navigation, token));
    dispatch(loaderAction(true));
    navigation.navigate('ProffessionalInformation', { personalInfo: bodyData });
    // }
  };

  return (
    <View style={styles.mainView}>
      <HeaderNavigation
        onPress={() => navigation.goBack()}
        heading={Lang && Object.keys(Lang).length > 0 && Lang[ln].Profile['My Profile']}
      />

      <ScrollView style={styles.container}>
        <View style={styles.profileStyle}>
          <Image
            source={require('../../../assets/Icon/Vector.png')}
            resizeMode="contain"
            style={styles.profileBlank}
          />

          <Image
            source={{ uri: profileDetails.image }}
            style={styles.profilepick}
          />

          <TouchableOpacity
            style={styles.penStyle}
            onPress={selectimage}
            activeOpacity={0.7}>
            <Image
              style={styles.penImage}
              resizeMode="contain"
              source={require('../../../assets/Icon/pen.png')}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.uploadText}>
          {Lang && Object.keys(Lang).length > 0 ? Lang[ln].Profile['Upload image'] : ''}
        </Text>

        <View style={styles.InformationView}>
          <Text style={styles.InformationText}>
            {Lang && Object.keys(Lang).length > 0 ? Lang[ln].Profile['Personal Information'] : ''}
          </Text>

          <TextInput
            placeholderTextColor={'#96989A'}
            placeholder={Lang && Object.keys(Lang).length > 0 ? Lang[ln].Profile['First Name'] : ''}
            style={styles.textInput}
            value={profileDetails?.first_name}
            onChangeText={value => handleInputChange('first_name', value)}
          />
          <TextInput
            placeholderTextColor={'#96989A'}
            placeholder={Lang && Object.keys(Lang).length > 0 ? Lang[ln].Profile['Last Name'] : ''}
            style={styles.textInput}
            value={profileDetails?.last_name}
            onChangeText={value => handleInputChange('last_name', value)}
          />

          <TextInput
            placeholderTextColor={'#96989A'}
            placeholder={Lang && Object.keys(Lang).length > 0 ? Lang[ln].Profile['Email'] : ''}
            style={styles.textInput}
            autoCapitalize="none"
            value={profileDetails?.email}
            onChangeText={value => handleInputChange('email', value)}
          />

          <TextInput
            placeholderTextColor={'#96989A'}
            placeholder={Lang && Object.keys(Lang).length > 0 ? Lang[ln].Profile['Mobile Number'] : ''}
            style={styles.textInput}
            keyboardType="number-pad"
            value={profileDetails?.mobile_number}
            onChangeText={value => handleInputChange('mobile_number', value)}
          />

          <TextInput
            placeholderTextColor={'#96989A'}
            placeholder={Lang && Object.keys(Lang).length > 0 ? Lang[ln].Profile['Profile Title'] : ''}
            style={styles.textInput}
            value={profileDetails?.profile_title}
            onChangeText={value => handleInputChange('profile_title', value)}
          />
        </View>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => UpdateProfile()}
        // onPress={() => navigation.navigate('ProffessionalInformation')}
        >
          <Text style={styles.buttonText}>{Lang && Object.keys(Lang).length > 0 && Lang[ln].Profile['Next']}</Text>
        </TouchableOpacity>
        <Loader val={loaderResponse.loader} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: Color.Colorwhite,
  },
  container: {
    flex: 1,
  },
  profileStyle: {
    height: hp(15),
    width: hp(15),
    borderRadius: hp(10),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp(5),
  },
  profilepick: {
    height: hp(15),
    width: hp(15),
    borderRadius: scale(60),
  },
  profileBlank: {
    height: hp(15),
    width: hp(15),
    // bottom: 0.2,
    position: 'absolute',
  },
  penStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(10),
    borderColor: '#96989A',
    borderWidth: 2,
    padding: hp(0.8),
    borderRadius: hp(10),
    position: 'absolute',
    right: hp(0.5),
    bottom: hp(-1),
    backgroundColor: '#FFFF',
  },
  penImage: {
    height: scale(15),
    width: scale(15),
  },
  uploadText: {
    color: '#3F95F3',
    fontFamily: Font.PoppinsRegular,
    padding: hp(2),
    fontSize: FSize.fs14,
    fontWeight: '500',
    textAlign: 'center',
  },
  InformationView: {
    marginHorizontal: hp(2),
  },
  InformationText: {
    color: '#96989A',
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs15,
    fontWeight: '600',
  },
  textInput: {
    height: hp(7),
    borderWidth: 1,
    borderColor: '#96989A',
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs13,
    borderRadius: hp(0.5),
    paddingHorizontal: wp(3),
    marginVertical: hp(1),
  },
  buttonStyle: {
    backgroundColor: '#0D3068',
    paddingVertical: hp(1),
    alignItems: 'center',
    marginHorizontal: hp(2),
    borderRadius: hp(4),
    marginVertical: hp(2),
  },
  buttonText: {
    color: '#FFFF',
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs18,
    fontWeight: '500',
  },
});
