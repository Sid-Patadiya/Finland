import {put} from 'redux-saga/effects';
import Constant from '../../theme/Constant';
import {loaderAction} from '../Action/LoaderAction';
import {ToastDisplay} from '../Action/ToastAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function* ContactSupportSaga(action) {
  const {bodydata, navigation} = action;

  console.log('bodydata', bodydata);
  console.log(
    'URL======>',
    Constant.baseURL + Constant.end_Point.CONTACT_SUPPORT,
  );

  const token = yield AsyncStorage.getItem('LoginAccessToken');
  // console.log('token----', token);
  try {
    console.log('try part');
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.CONTACT_SUPPORT,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(bodydata),
      },
    );
    var responseJson = yield response.json();

    // console.log('ContactSupportSaga Response ====>', responseJson);

    if (responseJson.status_code === 200) {
      navigation.pop();
      yield put(loaderAction(false));
      yield put(
        ToastDisplay({
          type: 'positive',
          title: "Thank you for contacting our support team. We'll get back to you soon!",
        }),
      );
    } else {
      yield put(loaderAction(false));
      // yield put(
      //   ToastDisplay({
      //     type: 'nagative',
      //     title: responseJson.error_message,
      //   }),
      // );
    }
  } catch (err) {
    console.log(err);
    yield put(loaderAction(false));
    // yield put(
    //   ToastDisplay({
    //     type: 'nagative',
    //     title: 'err',
    //   }),
    // );
  }
}
