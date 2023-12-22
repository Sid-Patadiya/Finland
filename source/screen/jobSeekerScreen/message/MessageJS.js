import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Images from '../../../theme/Images';
import Color from '../../../theme/Color';
import {scale} from '../../../theme/Scalling';
import Font from '../../../theme/Font';
import {MapUrlTile} from 'react-native-maps';
import SearchJS from '../../../component/SearchJS';
import FSize from '../../../theme/FSize';
import HeaderNavigation from '../../../component/HeaderNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {MessageListRequest} from '../../../redux/Action/MessageListAction';
import {loaderAction} from '../../../redux/Action/LoaderAction';
import Loader from '../../../component/loader';
import AsktoLogin from '../../../AsktoLogin';

const Data = [
  {
    id: 11,
    name: 'Jobseeker name',
    profileImage: Images.p1,
    messag: 'Hi , I have a requirment on...',
    day: 'Today',
    send: 'Recruiter :',
    pandingMessage: '2',
  },
  {
    id: 12,
    name: 'Jobseeker name',
    profileImage: Images.p2,
    messag: 'Hi , I have a requirment on...',
    day: 'Today',
    send: 'Recruiter :',
    pandingMessage: '1',
  },
];

const MessageJS = ({navigation}) => {
  const dispatch = useDispatch();
  const [messageList, setMessageList] = useState([]);

  const MessageListResponse = useSelector(state => state.messageList);
  console.log('MessageListResponse--->', MessageListResponse);
  const loaderResponse = useSelector(state => state.loader);

  useEffect(() => {
    if (MessageListResponse.data !== null) {
      setMessageList(MessageListResponse.data);
    } else {
      dispatch(MessageListRequest());
      dispatch(loaderAction(true));
    }
  }, [MessageListResponse.data]);
  useEffect(() => {
    dispatch(MessageListRequest());
    dispatch(loaderAction(true));
  }, []);

  // checking the login
  const [loginToken, setLoginToken] = useState('');
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('LoginAccessToken');
      // console.log('tokeprofileDatan--->', profileData);
      setLoginToken(token);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderNavigation
        onPress={() => navigation.goBack()}
        heading={'Messages'}
      />
      {loginToken == null ? (
        <AsktoLogin navigation={navigation} />
      ) : (
        <>
          {messageList.length === 0 ? (
            <View
              style={{flex: 9, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: FSize.fs23, fontWeight: '600'}}>
                No Data Found
              </Text>
            </View>
          ) : (
            <View style={{flex: 1}}>
              <View style={{height: hp(6), marginVertical: hp(1.5)}}>
                <SearchJS placeholder={'Search by Name/Messages'} />
              </View>

              <FlatList
                data={messageList}
                contentContainerStyle={{
                  backgroundColor: Color.Colorwhite,
                }}
                renderItem={({item, index}) => {
                  return (
                    <View>
                      <TouchableOpacity
                        style={styles.flatlistView2}
                        onPress={() => navigation.navigate('ChatJS', {item})}>
                        <View style={styles.flatlistInnerView}>
                          <Image
                            style={styles.img}
                            source={item.recruiter_image}
                          />
                        </View>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View>
                            <Text style={styles.nameText}>{item.name}</Text>
                            <View style={{flexDirection: 'row'}}>
                              <Text style={styles.sendText}>{item.send}</Text>
                              <Text
                                numberOfLines={1}
                                ellipsizeMode={'tail'}
                                style={styles.messagText}>
                                {item.messag}
                              </Text>
                            </View>
                          </View>

                          <View
                            style={{
                              alignItems: 'center',
                              width: wp(15),
                              justifyContent: 'center',
                            }}>
                            <Text style={styles.dayText}>{item.day}</Text>
                            {item.pandingMessage !== undefined ? (
                              <View style={styles.pandingMessageView}>
                                <Text style={styles.pandingMessageText}>
                                  {item.pandingMessage}
                                </Text>
                              </View>
                            ) : null}
                          </View>
                        </View>
                      </TouchableOpacity>

                      <View
                        style={{
                          borderBottomWidth: hp(0.1),
                          borderBottomColor: 'rgba(0, 0, 0, 0.1);',
                          marginLeft: hp(7),
                        }}></View>
                    </View>
                  );
                }}
              />
            </View>
          )}
        </>
      )}

      {/* <Loader val={loaderResponse.loader} /> */}
    </View>
  );
};
export default MessageJS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9EFF6',
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },

  flatlistView2: {
    margin: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  flatlistInnerView: {
    marginRight: wp(2),
    height: hp(7),
    width: hp(7),
    overflow: 'hidden',
    borderRadius: hp(7),
    backgroundColor: '#666',
  },
  nameText: {
    fontSize: FSize.fs13,
    fontFamily: Font.PoppinsRegular,
    color: '#656567',
    fontWeight: '500',
  },
  sendText: {
    fontSize: FSize.fs12,
    fontFamily: Font.PoppinsRegular,
    color: '#656567',
  },
  messagText: {
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs12,
    color: '#656567',
  },

  dayText: {
    // marginTop: hp(-1),
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs11,
    textAlign: 'center',
    color: '#656567',
  },
  pandingMessageView: {
    backgroundColor: '#0D3068',
    height: hp(3),
    width: hp(3),
    borderRadius: hp(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  pandingMessageText: {
    fontSize: FSize.fs9,
    color: Color.Colorwhite,
    fontFamily: Font.PoppinsRegular,
    fontWeight: 'bold',
  },
});
