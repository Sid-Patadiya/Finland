import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderNavigation from '../../../component/HeaderNavigation';
import { Lang } from '../../../translation/lang';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PlayListRequest } from '../../../redux/Action/PlayListAction';
import Images from '../../../theme/Images';
import FSize from '../../../theme/FSize';
import AsktoLogin from '../../../AsktoLogin';
import { loaderAction } from '../../../redux/Action/LoaderAction';
import Loader from '../../../component/loader';

//to show the list bookmark which is saving in the my profile section.
export default function MyList({ navigation, route }) {
  console.log('locationnnnnnzzzz',route?.params.latitude, route?.params.longitude);
  const [currentLatitude, setCurrentLatitude]= useState(parseFloat(route?.params.latitude).toFixed(6));
  const [currentLongitude, setCurrentLongitude]= useState(parseFloat(route?.params.longitude).toFixed(6));

  const dispatch = useDispatch();
  const IsFocused = useIsFocused();

  const [ln, setLn] = useState('en');
  useEffect(() => {
    const setLang = async () => {
      setLn(await AsyncStorage.getItem('LanguageCode'));
    };
    setLang();
  }, [IsFocused]);

  const [playList, setPlayList] = useState([]);
  const loaderResponse = useSelector(state => state.loader);

  const PlayListResponse = useSelector(state => state.playList);

  useEffect(() => {
    if (PlayListResponse.data !== null) {
      let finalObj = {};
      PlayListResponse.data.data.forEach(item => {
        if (finalObj[item?.playlist]) {
          finalObj[item?.playlist].push(item);
        } else {
          finalObj[item?.playlist] = [item];
        }
      });
      let tmp = [];
      Object.keys(finalObj).map(v => {
        tmp.push({
          playlist: v,
          data: [...finalObj[v]],
        });


        console.log('*** playlist with data ***', JSON.stringify(tmp));
        setPlayList([...tmp]);
      });

    }
  }, [PlayListResponse.data]);

  useEffect(() => {
    dispatch(PlayListRequest());
    // dispatch(loaderAction(true));
  }, [IsFocused]);

  const [loginToken, setLoginToken] = useState('');
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('LoginAccessToken');
      setLoginToken(token);
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <HeaderNavigation
        onPress={() => navigation.goBack()}
        heading={Lang[ln].Profile['My Lists']}
      />

      {loginToken == null ? <AsktoLogin navigation={navigation} /> :
        <View style={{ flex: 1 }}>

          {playList.length == 0 ? (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: FSize.fs23, fontWeight: '600' }}>
                No Data Found
              </Text>
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              <FlatList
                data={playList}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      style={styles.playListView}
                      onPress={() =>
                        navigation.navigate('MyListsScreen', { item: item?.data,
                        latitude:currentLatitude,
                        longitude:currentLongitude,
                        })
                      }>
                      <Text>{item.playlist}</Text>
                      <View>
                        <Image
                          source={Images.UpArrow}
                          style={styles.rightArrow}
                          resizeMode="contain"
                        />
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          )}
        </View>
      }
      <Loader val={loaderResponse.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  playListView: {
    backgroundColor: '#FFFF',
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000000',
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightArrow: {
    tintColor: 'gray',
    height: 21,
    width: 15,
    transform: [{ rotate: '90deg' }],
  },
});
