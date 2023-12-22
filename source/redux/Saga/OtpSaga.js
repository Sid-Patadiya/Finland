import {put} from 'redux-saga/effects';
import Constant from '../../theme/Constant';
import {loaderAction} from '../Action/LoaderAction';
import {ToastDisplay} from '../Action/ToastAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function* otpSaga(action) {
  const {bodydata, navigation, key} = action;

  console.log('bodydata', bodydata);
  //   console.log('URL======>', Constant.baseURL + Constant.end_Point.LOGIN);

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.OTPSEND,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodydata),
      },
    );
    var responseJson = yield response.json();

    console.log('OTP Response ====>', responseJson);

    if (responseJson.status_code === 200) {
      if (key === 'login') {
        navigation.navigate('InterOtp', {phone: bodydata.phone});
      } else {
        navigation.navigate('ResetPassword', {phone: bodydata.phone});
      }

      yield put(loaderAction(false));

      yield put(
        ToastDisplay({
          type: 'positive',
          title: "OTP verified successfully",
        }),
      );
    } else {
      yield put(loaderAction(false));
      // yield put(
      //   ToastDisplay({
      //     type: 'nagative',
      //     title: responseJson.errors.phone[0],
      //   }),
      // );
    }
  } catch (err) {
    console.log(err);
    yield put(loaderAction(false));
    // yield put(
    //   ToastDisplay({
    //     type: 'nagative',
    //     title: 'errors[0].phone',
    //   }),
    // );
  }
}
