import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import HeaderNavigation from '../../../../component/HeaderNavigation';
import { Lang } from '../../../../translation/lang';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PlayListRequest } from '../../../../redux/Action/PlayListAction';
import RecomJobElementJS from '../../../../component/RecomJobElementJS';
import Color from '../../../../theme/Color';
import Images from '../../../../theme/Images';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { DeletePlayListRequest } from '../../../../redux/Action/DeletePlayListAction.js';
import AsktoLogin from '../../../../AsktoLogin';

//to show the list bookmark which is saving in the my profile section.
export default function MyListsScreen({ route, navigation, loginToken }) {

  // console.log('locationnnnnxxxn',route?.params.latitude, route?.params.longitude);
  const [currentLatitude, setCurrentLatitude] = useState(parseFloat(route?.params.latitude));
  const [currentLongitude, setCurrentLongitude] = useState(parseFloat(route?.params.longitude));

  const dispatch = useDispatch();
  const IsFocused = useIsFocused();

  const [ln, setLn] = useState('en');
  useEffect(() => {
    const setLang = async () => {
      setLn(await AsyncStorage.getItem('LanguageCode'));
    };
    setLang();
  }, [IsFocused]);

  console.log(' ', JSON.stringify(route.params.item));
  const [playList, setPlayList] = useState(route.params.item);

  const DeleteData = item => {
    console.log('key---->', item.id);
    let bodydata = {
      id: item.id,
    };
    dispatch(DeletePlayListRequest(bodydata));
    navigation.goBack();
  };

  const showMenu = (item, index, key) => {
    console.log('key=====>', key);
    let temp = playList;
    temp.map((mapItem, mapIndex) => {
      // console.log('mapItem ::;', mapItem);
      if (mapIndex === index) {
        if (mapItem.check !== undefined) {
          if (mapItem.check !== true) {
            mapItem.check = true;
          } else {
            if (key === 'delete') {
              mapItem.check = false;
              DeleteData(item);
            } else {
              mapItem.check = false;
            }
          }
        } else {
          temp[mapIndex] = { ...mapItem, check: true };
        }
      } else {
        mapItem.check = false;
      }
      // console.log('temp :::', temp);
      setPlayList([...temp]);
    });
  };

  // login token:-
  // checking the login
  // const [loginToken, setLoginToken] = useState('');
  // useEffect(() => {
  //   (async () => {
  //     const token = await AsyncStorage.getItem('LoginAccessToken');
  //     console.log('tokeprofileDatan--->', profileData);
  //     setLoginToken(token);
  //   })();
  // }, []);

  return (
    <View style={{ flex: 1 }}>
      <HeaderNavigation
        onPress={() => navigation.goBack()}
        heading={Lang[ln].Profile['My Lists']}
      />
      <View style={{ flex: 1 }}>
        <FlatList
          data={playList}
          renderItem={({ item, index }) => {
            console.log('fsaeffaf', item);
            return (
              <View style={{ flex: 1 }}>
                <RecomJobElementJS
                  image={item.recruiter_image}
                  category_image={item.category_image} //background image
                  contact_person_name={item.recruiter_name} // name
                  company_name={item.company_name} // company name
                  RECRUITER_VIEWED={item.status} // recruiter viewed?
                  percentage_match={item.matching_percentage} //ends with %
                  job={item.vacancy_title} //job title
                  urgent={item.urgent_vacancy}
                  experience={item.experience} //expeience
                  location={item.work_location}
                  currency={item.currency} //currency
                  package={item.compensation_amount} //package
                  compensation_details={item.compensation_details} // per week/month/yesr
                  empType={item.employent_type}
                  kmAway={item.distance}
                  as={item.sent_at} //application sent at
                  penShow={true}
                  onPressPen={() => showMenu(item, index)}
                  visible={item.check}
                  onRequestClose={() => showMenu(item, index)}
                  Delete={() => showMenu(item, index, 'delete')}
                  onPress={() =>
                    navigation.navigate('PlayListBlackCardScreen', { item, latitude: currentLatitude, longitude: currentLongitude })
                  }
                />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
