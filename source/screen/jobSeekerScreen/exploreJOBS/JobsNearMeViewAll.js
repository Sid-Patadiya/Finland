import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapCardViewJS from '../../../component/MapCardViewJS';
import JNMVLMapView from './JNMVLMapView';
// import JNMVLCardViewJS from './JNMVLCardViewJS';
import JMVLCardViewJS from './JMVLCardViewJS'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import HeaderNavigation from '../../../component/HeaderNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {Lang} from '../../../translation/lang';

export default function JobsNearMeViewAll({navigation, route}) {
  const [workTab, setWorkTab] = useState(route.params);

  const IsFocused = useIsFocused();

  const [ln, setLn] = useState('en');
  useEffect(() => {
    const setLang = async () => {
      setLn(await AsyncStorage.getItem('LanguageCode'));
    };
    setLang();
  }, [IsFocused]);

  const onSelectSwitch = value => {
    console.log('value', value); 
    setWorkTab(value);
  };

//   var latitude = route?.params.latitude;
//   var longitude = route?.params.longitude;
// console.log("route?.params.latitude",route?.params.latitude)

  return (
    <View style={{flex: 1, backgroundColor: '#FFFAF6'}}>
      <HeaderNavigation
        onPress={() => navigation.goBack()}
        heading={'Jobs Near Me'}
      />
      <MapCardViewJS
        selectionMode={workTab !== undefined ? workTab : {key: 'Map View'}}
        onSelectSwitch={onSelectSwitch}
        option1={Lang[ln].ExploreJobs['Map View']}
        option2={Lang[ln].ExploreJobs['Card View']}
      />
      {workTab !== undefined ? (
        workTab.key === 'Map View' ? (
          <JNMVLMapView navigation={navigation} latitude={route?.params.latitude} longitude={route?.params.longitude}/>
        ) : workTab.key === 'Card View' ? (
          <JMVLCardViewJS navigation={navigation} latitude={route?.params.latitude} longitude={route?.params.longitude}/>
        ) : null
      ) : (
        <JNMVLMapView navigation={navigation} latitude={route?.params.latitude} longitude={route?.params.longitude}/>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
