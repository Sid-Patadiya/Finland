import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import HeaderNavigation from '../../../../component/HeaderNavigation';
import { MySubscriptionRequest } from '../../../../redux/Action/MySubscriptionAction';
import Color from '../../../../theme/Color';
import Font from '../../../../theme/Font';
import { scale } from '../../../../theme/Scalling';
import Loader from '../../../../component/loader';
import { loaderAction } from '../../../../redux/Action/LoaderAction';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useIsFocused } from '@react-navigation/native';
import FSize from '../../../../theme/FSize';
import MySubscriptionSkeleton from '../../../../theme/SkeletonScreens/MySubscriptionSkeleton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SubscriptionPlanRequest } from '../../../../redux/Action/SubscriptionPlanAction';
import moment from 'moment';
import AsktoLogin from '../../../../AsktoLogin';

export default function MySubscription({ navigation}) {
  const dispatch = useDispatch();

  const IsFocused = useIsFocused();

  const loaderResponse = useSelector(state => state.loader);

  // ------------------------ Language  -------------------------- \\
  const [ln, setLn] = useState('en');
  useEffect(() => {
    const setLang = async () => {
      setLn(await AsyncStorage.getItem('LanguageCode'));
    };
    setLang();
  }, [IsFocused]);

  // ------------------------ Profile Data Api call -------------------------- \\
  const [mySubscriptionData, setMySubscriptionData] = useState([]);
  const MySubscriptionData = useSelector(state => state.mySubscription);

  useEffect(() => {
    dispatch(MySubscriptionRequest());
    dispatch(loaderAction(true));
  }, [])

  useEffect(() => {
    if (MySubscriptionData.data !== null) {
      setMySubscriptionData(MySubscriptionData?.data?.data[0]);
      console.log('My Subscription Data ::', MySubscriptionData?.data?.data[0])
    }
  }, [MySubscriptionData.data]);

  useEffect(() => {
    dispatch(loaderAction(true));
    setTimeout(() => {
      dispatch(loaderAction(false));
    }, 2000);
  }, []);

  const [modalState, setModalState] = useState('close');

  const handleShowModal = () => {
    setModalState('modal');
  };

  const handleClose = () => {
    setModalState('close');
  };

  const PurchasedPlan = () => {
    let bodydata = {
      plan_id: 1,
    };

    dispatch(SubscriptionPlanRequest(bodydata));
    handleClose();
  };


  // checking the login
  const [loginToken, setLoginToken] = useState('');
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('LoginAccessToken');
      // console.log('tokeprofileDatan--->', token);
      setLoginToken(token);
    })();
  }, []);


  return (
    <View style={styles.container}>
      <HeaderNavigation
        onPress={() => navigation.goBack()}
        heading={'My Subscription'}
      />
      {loginToken == null ? <AsktoLogin navigation={navigation} /> :
        <View>
          <View style={styles.subscriptionView}>
            <Text style={styles.creditBalText}>Subscription Details</Text>
            {loaderResponse.loader === true ? (
              <MySubscriptionSkeleton enabled={loaderResponse.loader} />
            ) : (
              <>
                <View style={styles.creditdView}>
                  <Text style={styles.availableText}>
                    {mySubscriptionData?.plan_name}
                  </Text>
                  {/* {mySubscriptionData?.validity !== undefined &&
                    mySubscriptionData?.validity !== null ? (
                    <Text style={styles.daysLeftText}>
                      {mySubscriptionData?.validity} Days Left
                    </Text>
                  ) : null} */}
                </View>

                {/* <Text style={styles.availableText}>
              {mySubscriptionData?.validity !== undefined &&
              mySubscriptionData?.validity !== null
                ? mySubscriptionData?.validity  + ' Days Validity'
                : null}
            </Text> */}

                <View>
                  {mySubscriptionData?.feature_list?.created_at == "" || mySubscriptionData?.feature_list?.created_at == null ? null :
                    <View style={styles.purchasedView}>
                      <Text style={styles.availableText}>Purchased Date</Text>
                      <Text style={styles.creditsText}>
                        {moment(mySubscriptionData?.feature_list?.created_at).format('DD MMM YYYY')}
                      </Text>
                    </View>
                  }

                  {mySubscriptionData?.validity == "" || mySubscriptionData?.validity == null ? null :
                    (
                      <View style={styles.purchasedView}>
                        <Text style={styles.availableText}>Validity</Text>
                        <Text style={styles.creditsText}> {mySubscriptionData?.validity + ' Days'}</Text>
                      </View>
                    )
                  }

                  {mySubscriptionData?.price == Number || mySubscriptionData?.price == null ? null :
                    <View style={styles.purchasedView}>
                      <Text style={styles.availableText}>Amount</Text>
                      <Text style={styles.creditsText}>
                        $ {mySubscriptionData?.price}
                      </Text>
                    </View>
                  }

                  {mySubscriptionData?.payment_mode == "" || mySubscriptionData?.payment_mode == null ? null :
                    <View style={styles.purchasedView}>
                      <Text style={styles.availableText}>Payment Mode</Text>
                      <Text style={styles.creditsText}> </Text>
                    </View>
                  }
                </View>

                <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                    paddingHorizontal: hp(5),
                    paddingVertical: hp(1.3),
                    borderRadius: 30,
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#007AFF',
                    justifyContent: 'center',
                    marginTop: hp(2),
                  }}
                  onPress={handleShowModal}>
                  <Text
                    style={{
                      color: '#007AFF',
                      fontSize: scale(15),
                      fontFamily: Font.PoppinsRegular,
                    }}>
                    Upgrade Plan
                  </Text>
                </TouchableOpacity>
              </>
            )}
            {/* <Loader val={loaderResponse.loader} /> */}
          </View>
          <GestureRecognizer style={{ flex: 1 }} onSwipeDown={handleClose}>
            <Modal
              animationType="slide"
              transparent
              visible={modalState === 'modal'}
              onRequestClose={handleClose}>
              <View style={styles.mainView}>
                <TouchableOpacity style={styles.lineStyle}>
                  <View style={styles.lineView}></View>
                </TouchableOpacity>

                <View style={styles.innerView}>
                  <View style={styles.containerx}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.uptoText}>Upto</Text>

                      <Text style={styles.moreText}>12 X More Visibility</Text>

                      <Text style={styles.containText}>
                        Lorem ipsum dolorit consecteturadipiscing elit ut aliquam,
                        purs s amet luctus venenatis, lectus magna fringilla.
                      </Text>
                    </View>

                    <Image
                      source={require('../../../../assets/Icon/pana.png')}
                      style={styles.imageStyle}
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => PurchasedPlan()}>
                    <Text style={styles.buttonText}>
                      Pay € {mySubscriptionData?.price}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </GestureRecognizer>
        </View>
      }
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  subscriptionView: {
    backgroundColor: Color.Colorwhite,
    marginTop: scale(10),
    paddingHorizontal: scale(20),
    paddingTop: scale(15),
    paddingVertical: scale(8),
    shadowColor: '#000',
    elevation: 20,
    marginHorizontal: hp(2),
  },
  daysLeftText: {
    backgroundColor: 'rgba(252, 164, 99, 1)',
    fontSize: scale(10),
    fontFamily: Font.PoppinsRegular,
    paddingHorizontal: scale(12),
    borderRadius: scale(10),
    paddingTop: scale(2.5),
    color: Color.Colorwhite,
  },
  purchasedView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scale(3),
  },
  creditdView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scale(8),
  },
  availableText: {
    color: '#656567',
    paddingRight: scale(8),
    fontSize: scale(11),
    fontFamily: Font.PoppinsRegular,
  },

  creditsText: {
    fontSize: scale(11),
    color: '#494949',
    fontFamily: Font.PoppinsSemiBold,
  },
  creditBalText: {
    color: '#656567',
    paddingRight: scale(10),
    fontSize: scale(12),
    fontWeight: '600',
    fontFamily: Font.PoppinsSemiBold,
  },
  // modal
  mainView: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'flex-end',
  },
  lineStyle: {
    alignSelf: 'center',
    bottom: 10,
  },
  lineView: {
    width: wp(20),
    height: hp(0.5),
    backgroundColor: '#FFFFFF',
    borderRadius: wp(1),
  },
  innerView: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: wp(2),
    borderTopRightRadius: wp(2),
    height: hp(35),
  },

  containerx: {
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: hp(2),
  },
  uptoText: {
    marginTop: scale(20),
    color: '#343C44',
    fontSize: FSize.fs13,
    fontFamily: Font.PoppinsRegular,
  },
  moreText: {
    marginTop: scale(1),
    color: '#0D3068',
    fontSize: FSize.fs15,
    fontFamily: Font.PoppinsRegular,
  },
  containText: {
    marginTop: scale(8),
    color: '#343C44',
    fontSize: FSize.fs12,
    fontFamily: Font.PoppinsRegular,
    textAlign: 'auto',
  },
  imageStyle: {
    height: hp(20),
    width: hp(20),
    // marginTop: hp(5),
  },
  buttonStyle: {
    backgroundColor: '#0D3068',
    marginHorizontal: hp(4),
    borderRadius: hp(8),
    paddingVertical: hp(1),
    marginBottom: hp(3),
  },
  buttonText: {
    color: '#FFF',
    fontSize: 15,
    fontFamily: Font.PoppinsRegular,
    textAlign: 'center',
  },
});
