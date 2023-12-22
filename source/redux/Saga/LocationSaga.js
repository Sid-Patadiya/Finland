import {put} from 'redux-saga/effects';
import Constant from '../../theme/Constant';
import {loaderAction} from '../Action/LoaderAction';
import {ToastDisplay} from '../Action/ToastAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function* LocationSaga(action) {
  const {bodydata} = action;

  console.log('bodydata', bodydata);
  console.log('URL======>', Constant.baseURL + Constant.end_Point.LOCATION);
  const token = yield AsyncStorage.getItem('LoginAccessToken');
  // console.log('token----', token);Ì
  try {
    console.log('try part');
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.LOCATION,
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(bodydata),
      },
    );
    var responseJson = yield response.json();

    // console.log('LocationSaga  ====>', responseJson);

    if (responseJson.status_code === 200) {
      yield put(loaderAction(false));
      yield put(
        ToastDisplay({
          type: 'positive',
          title: responseJson.message,
        }),
      );
    } else {
      // yield put(loaderAction(false));
      // yield put(
      //   ToastDisplay({
      //     type: 'nagative',
      //     title: responseJson.detail,
      //   }),
      // );
    }
  } catch (err) {
    console.log(err);
    // yield put(loaderAction(false));
    // yield put(
    //   ToastDisplay({
    //     type: 'nagative',
    //     title: 'err',
    //   }),
    // );
  }
}
