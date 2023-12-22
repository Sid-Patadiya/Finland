import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapCardViewJS from '../../../component/MapCardViewJS';
import MapViewJS from './MapViewJS';
import CardViewJS from './CardViewJS';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import HeaderNavigation from '../../../component/HeaderNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Lang } from '../../../translation/lang';

export default function RecommendedJobsJS({ navigation, route }) {

  
  const [workTab, setWorkTab] = useState(route?.params);
  const [currentLatitude, setCurrentLatitude] = useState(route?.params.latitude);
  const [currentLongitude, setCurrentLongitude] = useState(route?.params.longitude);
  console.log('routeeeeeeeeeeeeeeexx', workTab)

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

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFAF6' }}>
      <HeaderNavigation
        onPress={() => navigation.goBack()}
        heading={Lang[ln].ExploreJobs['Recommended Jobs']}
      />
      <MapCardViewJS
        selectionMode={workTab !== undefined ? workTab : {key: 'Map View'}}
        onSelectSwitch={onSelectSwitch}
        option1={Lang[ln].ExploreJobs['Map View']}
        option2={Lang[ln].ExploreJobs['Card View']}
      />
      {workTab !== undefined ? (
        workTab.key === 'Map View' ? (
          <MapViewJS navigation={navigation} latitude={currentLatitude} longitude={currentLongitude} />
        ) : workTab.key === 'Card View' ? (
          <CardViewJS navigation={navigation} latitude={currentLatitude} longitude={currentLongitude} />
        ) : <MapViewJS navigation={navigation} latitude={currentLatitude} longitude={currentLongitude} />
      ) : (
        <MapViewJS navigation={navigation} latitude={currentLatitude} longitude={currentLongitude} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
