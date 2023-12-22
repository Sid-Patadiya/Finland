import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import MenuHeader from '../../../component/MenuHeader';
import Color from '../../../theme/Color';
import Images from '../../../theme/Images';
import {scale} from '../../../theme/Scalling';
import moment from 'moment';
import Font from '../../../theme/Font';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FSize from '../../../theme/FSize';
import firestore from '@react-native-firebase/firestore';
import {ProfileRequest} from '../../../redux/Action/ProfileAction';
import {loaderAction} from '../../../redux/Action/LoaderAction';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import Loader from '../../../component/loader';

const ReceiverMessage = ({message, date, profileImg, name}) => {
  return (
    <View style={styles.messageContainer}>
      <View
        style={{
          height: hp(7),
          width: hp(7),
          overflow: 'hidden',
          borderRadius: hp(7),
          backgroundColor: '#666',
        }}>
        <Image
          // resizeMode="contain"
          source={{uri: profileImg}}
          style={{height: '100%', width: '100%'}}
        />
      </View>

      <View style={{flex: 1, alignItems: 'flex-start'}}>
        <View style={styles.messageView}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.messageText}>{message}</Text>
        </View>
        <Text style={styles.dataText}>{date}</Text>
      </View>
    </View>
  );
};

const SenderMessage = ({message, date, profileImg, name}) => {
  return (
    <TouchableOpacity
      onLongPress={() => alert('Hello')}
      activeOpacity={8}
      style={[
        styles.messageContainer,
        {alignSelf: 'flex-end', flexDirection: 'row'},
      ]}>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <View style={styles.senderMessageView}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.messageText}>{message}</Text>
        </View>
        <Text style={styles.dataText}>{date}</Text>
      </View>
      <View
        style={{
          height: hp(7),
          width: hp(7),
          overflow: 'hidden',
          borderRadius: hp(7),
          backgroundColor: '#666',
        }}>
        <Image
          // resizeMode="contain"
          source={{uri: profileImg}}
          style={{height: '100%', width: '100%'}}
        />
      </View>
    </TouchableOpacity>
  );
};

var monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const ChatBox = ({route, navigation}) => {
  const receiverData = route.params.item;
  console.log('route--->', receiverData);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const scrollEnd = useRef();
  const [sendMessage, setSendMessage] = useState('');
  console.log('sendMessage', sendMessage);
  const [messages, setMessages] = useState([]);

  // console.log('messages->>', messages);
  const loaderResponse = useSelector(state => state.loader);
  // ------------------------ Profile Data Api call -------------------------- \\
  const [userData, setUserData] = useState([]);

  const ProfileDataResponse = useSelector(state => state.profile);
  console.log('userData ----->', userData);

  useEffect(() => {
    if (ProfileDataResponse.data !== null) {
      setUserData(ProfileDataResponse.data.data);

      const docid =
        receiverData.recruiter_id > ProfileDataResponse.data.data.user
          ? ProfileDataResponse.data.data.user +
            '-' +
            receiverData.recruiter_id
          : receiverData.recruiter_id +
            '-' +
            ProfileDataResponse.data.data.user;

      const messageRef = firestore()
        .collection('JobseekerChatRoom')
        .doc(docid)
        .collection('messages')
        .orderBy('createdAt', 'asc');

      messageRef.onSnapshot(async querySnap => {
        const allmsg = querySnap.docs.map(docSnap => {
          const data = docSnap.data();
          if (data.createdAt) {
            return {
              ...docSnap.data(),
              createdAt: docSnap.data().createdAt.toDate(),
            };
          } else {
            return {
              ...docSnap.data(),
              createdAt: new Date(),
            };
          }
        });
        setMessages(allmsg);
      });
    }
  }, [isFocused, ProfileDataResponse.data]);
  useEffect(() => {
    dispatch(ProfileRequest());
    dispatch(loaderAction(true));
  }, []);

  const onSend = () => {
    // let temp = sendMessage[0];
    const mymsg = {
      text: sendMessage,
      sentBy: userData.user,
      sentTo: receiverData.recruiter_id,
      createdAt: new Date(),
    };
    console.log('mymsg', mymsg);
    messages.push(mymsg);
    setMessages([...messages]);
    setSendMessage('');
    const docid =
      receiverData.recruiter_id > userData.user
        ? userData.user + '-' + receiverData.recruiter_id
        : receiverData.recruiter_id + '-' + userData.user;
    // console.log('docid====>', docid);
    firestore()
      .collection('JobseekerChatRoom')
      .doc(docid)
      .collection('messages')
      .add({...mymsg, createdAt: firestore.FieldValue.serverTimestamp()});
  };

  return (
    <View style={styles.container}>
      <MenuHeader
        backButton={Images.backButton}
        title={
          receiverData.vacancy
            ? receiverData.vacancy.contact_person_name
            : receiverData.name
        }
        Dots={Images.dots}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.conversationView}>
        <FlatList
          data={messages}
          showsVerticalScrollIndicator={false}
          ref={scrollEnd}
          contentContainerStyle={styles.scrollViewStyle}
          onContentSizeChange={() =>
            scrollEnd.current.scrollToEnd({animated: true})
          }
          renderItem={({item, index}) => {
            console.log('item===dsfsdfsf=>', item);
            let DateTitle = moment(new Date(item?.createdAt)).format(
              'YYYY-MM-DD',
            );
            let month = monthNames[new Date(item?.createdAt).getMonth()];
            let date = new Date(item?.createdAt).getDate();
            let year = new Date(item?.createdAt).getFullYear();
            let dateFormat = date + ' ' + month + ' ' + year;
            let todayDateFormat = moment(new Date()).format('YYYY-MM-DD');
            let previousObjDate;
            if (index !== 0) {
              previousObjDate = moment(
                new Date(messages[index - 1].createdAt),
              ).format('YYYY-MM-DD');
            }
            return (
              <>
                {index !== 0 && DateTitle === previousObjDate ? null : (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <View style={styles.dateTitle}></View>
                    <Text style={styles.dateText}>
                      {DateTitle === todayDateFormat ? 'Today' : dateFormat}
                    </Text>
                    <View style={styles.dateTitle}></View>
                  </View>
                )}
                {item.sentTo === userData.user ? (
                  <View key={String(index)}>
                    <ReceiverMessage
                      name={
                        receiverData.vacancy
                          ? receiverData.vacancy.contact_person_name
                          : receiverData.name
                      }
                      profileImg={receiverData.recruiter_image}
                      message={item.text}
                      date={moment(item.createdAt).format('hh:mmA')}
                    />
                  </View>
                ) : item.sentBy === userData.user ? (
                  <View key={String(index)}>
                    <SenderMessage
                      name={userData.first_name}
                      profileImg={userData.image}
                      message={item.text}
                      date={moment(item.createdAt).format('hh:mmA')}
                    />
                  </View>
                ) : null}
              </>
            );
          }}
        />
        {/* <ScrollView
          style={styles.scrollViewStyle}
          showsVerticalScrollIndicator={false}
          ref={scrollEnd}
          onContentSizeChange={() =>
            scrollEnd.current.scrollToEnd({animated: true})
          }>
          {messages.length !== 0
            ? messages.map((item, index) => {
                {
                  index !== 0 && DateTitle === previousObjDate ? null : (
                    <View style={styles.dateTitle}>
                      <Text style={styles.dateText}>
                        {DateTitle === todayDateFormat ? 'Today' : dateFormat}
                      </Text>
                    </View>
                  );
                }
                if (item.sentTo === userData.id) {
                  return (
                    <View key={String(index)}>
                      <ReceiverMessage
                        name={item.name}
                        profileImg={item.profileImg}
                        message={item.text}
                        date={moment(item.createdAt).format('hh:mmA')}
                      />
                    </View>
                  );
                } else if (item.sentBy === userData.id) {
                  return (
                    <View key={String(index)}>
                      <SenderMessage
                        name={item.name}
                        profileImg={item.profileImg}
                        message={item.text}
                        date={moment(item.createdAt).format('hh:mmA')}
                      />
                    </View>
                  );
                }
              })
            : null}
        </ScrollView> */}
      </View>

      <View style={styles.footerView}>
        <View style={styles.textinputeView}>
          {/* <TouchableOpacity
            style={{height: hp(3.5), width: hp(3.5), overflow: 'hidden'}}
            onPress={() => alert('Under DevelopMent')}>
            <Image
              source={Images.emojiImage}
              style={styles.chatboxImageStyles}
            />
          </TouchableOpacity> */}

          <TextInput
            placeholderTextColor={'#D2D2D2'}
            style={styles.textInputeStyle}
            multiline
            numberOfLines={2}
            value={sendMessage}
            placeholder="Type message"
            onChangeText={msg => setSendMessage(msg)}
          />

          {/* <TouchableOpacity
            onPress={() => alert('Under DevelopMent')}
            style={{height: hp(3.5), width: hp(3.5), overflow: 'hidden'}}>
            <Image
              source={Images.cameraImage}
              style={styles.cameraImageStyles}
              resizeMode="contain"
            />
          </TouchableOpacity> */}
        </View>

        {/* <View
          style={{width: hp(10), justifyContent: 'center', paddingLeft: wp(2)}}> */}
        <TouchableOpacity
          disabled={sendMessage !== '' ? false : true}
          onPress={() => onSend()}
          style={{
            height: hp(5.4),
            width: hp(5.4),
            overflow: 'hidden',
            marginRight: hp(2),
          }}>
          <Image
            source={Images.chatMessageSend}
            style={styles.chatMessageSendStyles}
          />
        </TouchableOpacity>
        {/* </View> */}
      </View>
      <Loader val={loaderResponse.loader} />
    </View>
  );
};
export default ChatBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BackgroundColor,
  },
  conversationView: {
    flex: 1,
  },
  scrollViewStyle: {
    // flex: 1,
    padding: scale(15),
  },
  //-------------------------------
  dateTitle: {
    borderWidth: 0.2,
    flex: 1,
    borderColor: Color.TextGrayColor,
  },
  dateText: {
    color: Color.ColorBlack,
    paddingHorizontal: scale(4),
    paddingVertical: scale(5),
    fontSize: scale(12),
    top: 1,
    fontFamily: Font.PoppinsRegular,
  },
  messageContainer: {
    flex: 1,
    marginBottom: scale(15),
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  messageView: {
    flex: 1,
    borderBottomRightRadius: scale(8),
    borderBottomLeftRadius: scale(8),
    borderTopRightRadius: scale(8),
    alignItems: 'flex-start',
    paddingHorizontal: wp(2),
    backgroundColor: Color.Colorwhite,
    padding: scale(3),
    marginHorizontal: scale(10),
  },
  senderMessageView: {
    flex: 1,
    borderBottomRightRadius: scale(8),
    borderBottomLeftRadius: scale(8),
    borderTopLeftRadius: scale(8),
    alignItems: 'flex-start',
    backgroundColor: Color.Colorwhite,
    padding: scale(3),
    paddingHorizontal: wp(2),
    marginHorizontal: scale(10),
  },
  nameText: {
    fontSize: scale(12),
    color: '#35404D',
    // padding: scale(5),
    fontFamily: Font.PoppinsSemiBold,
    paddingHorizontal: scale(5),
    color: Color.HeaderColor,
  },
  messageText: {
    color: '#222222',
    fontSize: scale(11),
    padding: scale(5),
    textAlign: 'justify',
  },
  dataText: {
    textAlign: 'left',
    fontSize: FSize.fs9,
    color: '#656567',
    fontFamily: Font.PoppinsRegular,
    paddingHorizontal: scale(10),
  },
  //======================================
  footerView: {
    backgroundColor: Color.BACKGROUND_WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(0.5),
  },
  textinputeView: {
    height: scale(40),
    flex: 1,
    flexDirection: 'row',
    borderRadius: hp(8),
    borderWidth: hp(0.15),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(4),
    marginHorizontal: wp(3),
    // marginVertical: hp(1),
    borderColor: '#83B9D0',
    backgroundColor: Color.Colorwhite,
  },
  textInputeStyle: {
    // width: '69%',
    // textAlign: 'left',
    // left: scale(5),
    // fontFamily: Font.PoppinsRegular,
    flex: 1,
    color: '#444444',
    textAlign: 'left',
    left: scale(5),
    fontSize: FSize.fs13,
    fontFamily: Font.PoppinsRegular,
  },
  chatboxImageStyles: {
    // width: 24,
    // height: 24,
    // marginLeft: scale(10),
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    // tintColor: Color.Grey,
  },
  cameraImageStyles: {
    // width: 24,
    // height: 24,
    // tintColor: Color.Grey,
    // left: scale(20),
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    tintColor: Color.Grey,
  },
  chatMessageSendStyles: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    tintColor: Color.Grey,
  },
});
