import {put} from 'redux-saga/effects';
import Constant from '../../theme/Constant';
import {loaderAction} from '../Action/LoaderAction';
import {ToastDisplay} from '../Action/ToastAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function* loginSaga(action) {
  const {bodydata, navigation, key} = action;

  console.log('bodydata', bodydata);
  console.log('URL======>', Constant.baseURL + Constant.end_Point.LOGIN);

  try {
    console.log('try part');
    const response = yield fetch(Constant.baseURL + Constant.end_Point.LOGIN, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodydata),
    });
    var responseJson = yield response.json();

    console.log('LoginSaga Response ====>', responseJson);
    console.log('LoginSaga Response access ====>', responseJson.data.access);

    if (responseJson.status_code === 200) {
      AsyncStorage.setItem('LoginAccessToken', responseJson.data.access);
      navigation.replace('TabNavigation');

      yield put(loaderAction(false));
      yield put(
        ToastDisplay({
          type: 'positive',
          title: "You logged in successfully!",
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
    yield put(
      ToastDisplay({
        type: 'nagative',
        title: 'phone number or password does not match',
      }),
    );
  }
}
