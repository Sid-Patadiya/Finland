import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import JobsCardDetailsTWO from './JobsCardDetailsTWO';

export default function ExploreJobsDetailsJS({navigation}) {
  return (
    <View style={{backgroundColor: '#FFFFFF'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <JobsCardDetailsTWO
          backgroundImg={require('../../../assets/Icon/backGround.png')}
          profilePicture={require('../../../assets/Icon/px.png')}
          name={'Ramesh D'}
          company={'Piping Co'}
          designation={'plumber'}
          details={'Plumbers needed for Construction Siteon Regular Basis'}
          aboutText={
            'We Lorem ipsum dolor sit amet, consectadipiscing elit, sed do eiusmsit at,consectetur adipiscing eliem Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusm.eiusmsit at,consectetur adipiscing eliem Lorem ipsum dolor sit amet, consectetur adipiscing elit'
          }
          experienceYear={'0-5'}
          salary={'€ 200/pm - € 300/pm'}
          aboutCompany={
            'Lorem ipsum dolor sit amet, consectadipiscing elit, sed do eiusmsit at,consectetur adipiscing eliem Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusm'
          }
          // details
          companyWebsite={'www.abccompany.co.in'}
          companyAddress={'D.no-12/85-8, Street Rodger, Finland'}
          distance={'3'}
          onPress={() => navigation.navigate('ExploreJobsDetailsJS')}
        />
      </ScrollView>
    </View>
  );
}
