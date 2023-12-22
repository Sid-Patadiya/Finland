import React, {useEffect, useState} from 'react';
import {Image, Platform, View, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Lang} from '../translation/lang';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  getFocusedRouteNameFromRoute,
  useIsFocused,
} from '@react-navigation/native';
//Screens
// import Home from '../screen/tab/pages/Home';

// Font Awesome Icons...
import Images from '../theme/Images';

import MyJobsJS from '../screen/jobSeekerScreen/myJobs/MyJobsJS';
import UpdateTimeSheetJS from '../screen/jobSeekerScreen/myJobs/UpdateTimeSheetJS';
import ExploreJobs from '../screen/jobSeekerScreen/exploreJOBS/ExploreJobs';
import MessageJS from '../screen/jobSeekerScreen/message/MessageJS';
import MyProfileJS from '../screen/jobSeekerScreen/myProfile/MyProfileJS';
import ChatJS from '../screen/jobSeekerScreen/message/ChatJS';
import HireRequestJS from '../screen/jobSeekerScreen/myProfile/hireRequest/HireRequestJS';
import RecommendedJobsJS from '../screen/jobSeekerScreen/exploreJOBS/RecommendedJobsJS';
import EditProfileJS from '../screen/jobSeekerScreen/myProfile/EditProfileJS.js';
import ProffessionalInformation from '../screen/jobSeekerScreen/myProfile/ProffessionalInformation';
import SearchJobsJS from '../screen/jobSeekerScreen/exploreJOBS/SearchJobsJS';
import NewExploreJobs from '../screen/jobSeekerScreen/exploreJOBS/NewExploreJobs';
import ExploreJobsDetailsJS from '../screen/jobSeekerScreen/exploreJOBS/ExploreJobsDetailsJS';
import DashBoard from '../screen/jobSeekerScreen/HomeScreens/DashBoard';
import Notification from '../screen/jobSeekerScreen/HomeScreens/Notification';
import ContactSupport from '../screen/jobSeekerScreen/myProfile/contactSupport/ContactSupport';
import PrivacyPolicies from '../screen/jobSeekerScreen/myProfile/privacyPolicies/PrivacyPolicies';
import Settings from '../screen/jobSeekerScreen/myProfile/setting/Settings';
import UpdatePassword from '../screen/jobSeekerScreen/myProfile/setting/UpdatePassword';
import MySubscription from '../screen/jobSeekerScreen/myProfile/mySubscription/MySubscription';
import ChangeLanguage from '../screen/jobSeekerScreen/myProfile/setting/ChangeLanguage';
import MyList from '../screen/jobSeekerScreen/myProfile/MyList';
import MyListsScreen from '../screen/jobSeekerScreen/myProfile/myLists/MyListsScreen';
import TimeSheetDetails from '../screen/jobSeekerScreen/HomeScreens/TimeSheetDetails';
import AsktoLogin from '../AsktoLogin';
import BlackCardScreen from '../screen/jobSeekerScreen/exploreJOBS/BlckCardScreen';
import UBRBlckCardScreen from '../screen/jobSeekerScreen/exploreJOBS/UBRBlckCardScreen';
import PlayListBlackCardScreen from '../screen/jobSeekerScreen/exploreJOBS/PlayListBlackCardScreen';
import MapBlackCardScreen from '../screen/jobSeekerScreen/HomeScreens/MapBlackCardScreen';
import JobsNearMeBlackCard from '../screen/jobSeekerScreen/exploreJOBS/JobsNearMeBlackCard';
import ExploreJobsBlackCardScreen from '../screen/jobSeekerScreen/exploreJOBS/ExploreJobsBlackCardScreen';
import JobseNearMeMapScreen from '../screen/jobSeekerScreen/exploreJOBS/JobseNearMeMapScreen';
import JobseNearMeViewAll from '../screen/jobSeekerScreen/exploreJOBS/JobsNearMeViewAll'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="DashBoard" component={DashBoard} />
      <Stack.Screen name="Notification" component={Notification} />
      {/* search */}
      <Stack.Screen name="SearchJobs" component={SearchJobsJS} />
      <Stack.Screen name="RecommendedJobs" component={RecommendedJobsJS} />
      <Stack.Screen name="MyJobsJS" component={MyJobsJS} />
      <Stack.Screen name="UpdateTimeSheetJS" component={UpdateTimeSheetJS} />
      {/* //-------- */}
      <Stack.Screen name="ExploreJobs" component={ExploreJobs} />
      <Stack.Screen name="BlackCardScreen" component={BlackCardScreen} />
      <Stack.Screen name="UBRBlckCardScreen" component={UBRBlckCardScreen} />
      <Stack.Screen name="EditProfileJS" component={EditProfileJS} />
      <Stack.Screen
        name="ProffessionalInformation"
        component={ProffessionalInformation}
      />
      <Stack.Screen name="MySubscription" component={MySubscription} />
      <Stack.Screen name="ChatJS" component={ChatJS} />

      <Stack.Screen name="TimeSheetDetails" component={TimeSheetDetails} />
      <Stack.Screen name="AsktoLogin" component={AsktoLogin} />
      <Stack.Screen name="MapBlackCardScreen" component={MapBlackCardScreen} />
      <Stack.Screen
        name="JobsNearMeBlackCard"
        component={JobsNearMeBlackCard}
      />
      <Stack.Screen
        name="ExploreJobsBlackCardScreen"
        component={ExploreJobsBlackCardScreen}
      />
      <Stack.Screen
        name="JobseNearMeMapScreen"
        component={JobseNearMeMapScreen}
      />
      <Stack.Screen
        name="JobseNearMeViewAll"
        component={JobseNearMeViewAll}
      />
    </Stack.Navigator>
  );
};

const ExploreJobsStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="NewExploreJobs" component={NewExploreJobs} />
      <Stack.Screen name="ExploreJobs" component={ExploreJobs} />
      <Stack.Screen
        name="ExploreJobsDetailsJS"
        component={ExploreJobsDetailsJS}
      />
      <Stack.Screen name="MapBlackCardScreen" component={MapBlackCardScreen} />

      <Stack.Screen
        name="ExploreJobsBlackCardScreen"
        component={ExploreJobsBlackCardScreen}
      />
    </Stack.Navigator>
  );
};

const MessageStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MessageJS" component={MessageJS} />
      <Stack.Screen name="ChatJS" component={ChatJS} />
    </Stack.Navigator>
  );
};

const MyJobStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MyJobsJS" component={MyJobsJS} />
      <Stack.Screen name="UpdateTimeSheetJS" component={UpdateTimeSheetJS} />
      <Stack.Screen name="ChatJS" component={ChatJS} />

      <Stack.Screen name="BlackCardScreen" component={BlackCardScreen} />
      <Stack.Screen name="UBRBlckCardScreen" component={UBRBlckCardScreen} />
    </Stack.Navigator>
  );
};

const MyProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MyProfileJS" component={MyProfileJS} />
      <Stack.Screen name="EditProfileJS" component={EditProfileJS} />
      <Stack.Screen
        name="ProffessionalInformation"
        component={ProffessionalInformation}
      />

      <Stack.Screen name="HireRequestJS" component={HireRequestJS} />

      <Stack.Screen name="Notification" component={Notification} />

      <Stack.Screen name="ContactSupport" component={ContactSupport} />

      <Stack.Screen name="PrivacyPolicies" component={PrivacyPolicies} />

      <Stack.Screen name="Settings" component={Settings} />

      <Stack.Screen name="UpdatePassword" component={UpdatePassword} />

      <Stack.Screen name="MySubscription" component={MySubscription} />

      <Stack.Screen name="ChangeLanguage" component={ChangeLanguage} />

      <Stack.Screen name="MyList" component={MyList} />

      <Stack.Screen name="MyListsScreen" component={MyListsScreen} />

      <Stack.Screen
        name="PlayListBlackCardScreen"
        component={PlayListBlackCardScreen}
      />
    </Stack.Navigator>
  );
};

// Hiding Tab Names...
const TabNavigation = () => {

  const IsFocused = useIsFocused();
  const [ln, setLn] = useState('en');
  useEffect(() => {
    const setLang = async () => {
      setLn(await AsyncStorage.getItem('LanguageCode'));
      console.log('ln-->', ln);
    };
    setLang();
  });


  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,

        tabBarStyle: {
          paddingBottom: 10,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          height:hp(6.5),
          // height: 600,
        },
      }}>
      <Tab.Screen
        // name={Lang[ln].tab['Home']}
        name={'Home'}
        component={HomeStack}
        options={({route}) => ({
          tabBarLabel: Lang[ln].tab['Home'], 
          // tabBarStyle: (route => {
          //   const routeName = getFocusedRouteNameFromRoute(route) ?? '';
          //   if (routeName === 'DashBoard' || routeName === '') {
          //     return {display: 'flex'};
          //   } else {
          //     return {display: 'none'};
          //   }
          //   return;
          // })(route),
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIcon}>
              <Image
                source={Images.homeTwo}
                resizeMode="contain"
                style={styles.img}
              />
            </View>
          ),
        })}></Tab.Screen>

      <Tab.Screen
        name={'Explore Jobs'}
        component={ExploreJobsStack}
        options={{
          tabBarLabel: Lang[ln].tab['Explore Jobs'],
          // tabBarStyle: {display: 'none'},
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIcon}>
              <Image
                source={require('../assets/Icon/searchIcon.png')}
                resizeMode="contain"
                style={styles.img}
              />
            </View>
          ),
        }}></Tab.Screen>

      <Tab.Screen
        name={'Messages'}
        component={MessageStack}
        options={{
          tabBarLabel: Lang[ln].tab['Messages'],
          // tabBarStyle: {display: 'none'},
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIcon}>
              <Image
                source={require('../assets/Icon/tabIcon/message.png')}
                resizeMode="contain"
                style={styles.img}
              />
            </View>
          ),
        }}></Tab.Screen>

      <Tab.Screen
        name={'My Jobs'}
        component={MyJobStack}
        options={{
          tabBarLabel: Lang[ln].tab['My Jobs'],
          // tabBarStyle: {display: 'none'},
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIcon}>
              <Image
                source={require('../assets/Icon/tabIcon/bagJS.png')}
                resizeMode="contain"
                style={styles.img}
              />
            </View>
          ),
        }}></Tab.Screen>

      <Tab.Screen
        name={'My Profile'}
        component={MyProfileStack}
        options={{
          tabBarLabel: Lang[ln].tab['My Profile'],
          // tabBarStyle: {display: 'none'},
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIcon}>
              <Image
                source={require('../assets/Icon/tabIcon/profilejs.png')}
                resizeMode="contain"
                style={styles.img}
              />
            </View>
          ),
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  tabIcon: {
    height: hp(3),
    width: hp(3),
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red'
  },
  img: {height: '100%', width: '100%'},
});
