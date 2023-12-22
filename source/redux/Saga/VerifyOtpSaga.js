import {put} from 'redux-saga/effects';
import Constant from '../../theme/Constant';
import {loaderAction} from '../Action/LoaderAction';
import {ToastDisplay} from '../Action/ToastAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function* verifyOtpSaga(action) {
  const {bodydata, navigation, key} = action;

  console.log('bodydata', bodydata);
  //   console.log('URL======>', Constant.baseURL + Constant.end_Point.LOGIN);

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.VERIFYOTP,
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

    console.log('Verify Otp Response ====>', responseJson.data.access);
    console.log('OTP Response Code ====>', responseJson.status_code);
    if (responseJson.status_code === 200) {
      if (key === 'LoginOtp') {
        AsyncStorage.setItem('LoginAccessToken', responseJson.data.access);
        navigation.replace('TabNavigation');
        yield put(loaderAction(false));
        yield put(
          ToastDisplay({
            type: 'positive',
            title: "OTP Verified successfully",
          }),
        );
      } else {
        navigation.replace('ChangePassword', {phone: bodydata.phone});
        yield put(loaderAction(false));
        yield put(
          ToastDisplay({
            type: 'positive',
            title: "OTP Verified successfully",
          }),
        );
      }
    } else {
      yield put(loaderAction(false));
      // yield put(
      //   ToastDisplay({
      //     type: 'nagative',
      //     title: responseJson.errors,
      //   }),
      // );
    }
  } catch (err) {
    console.log('Catch part Error <><><><><><>', err);
    yield put(loaderAction(false));
    // yield put(
    //   ToastDisplay({
    //     type: 'nagative',
    //     title: 'responseJson.error_message',
    //   }),
    // );
  }
}
