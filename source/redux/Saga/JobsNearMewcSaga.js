import AsyncStorage from '@react-native-async-storage/async-storage';
import {put} from 'redux-saga/effects';
import Constant from '../../theme/Constant';
import {JobsNearMeResponse} from '../Action/JobsNearMeAction';
import {JobsNearMewcResponse} from '../Action/JobsNearMewcAction';
import {loaderAction} from '../Action/LoaderAction';
import {ToastDisplay} from '../Action/ToastAction';

export function* JobsNearMewcSaga(action) {
  const {bodydata} = action;

  console.log('bodydata--->', bodydata);
  console.log(
    'URL======>',
    Constant.baseURL + Constant.end_Point.JOBS_NEAR_MEWC,
  );

  const token = yield AsyncStorage.getItem('LoginAccessToken');

  // console.log('token----', token);

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.JOBS_NEAR_MEWC,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Content-Length': '<calculated when request is sent>',
          //   Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(bodydata),
      },
    );
    var responseJson = yield response.json();

    // console.log('JobsNearMedsa responseJson::::>', responseJson);

    if (responseJson.status_code === 200) {
      yield put(loaderAction(false));
      // yield put(
      //   ToastDisplay({
      //     type: 'positive',
      //     title: responseJson.message,
      //   }),
      // );
      yield put(JobsNearMewcResponse(responseJson.data));
      yield put(JobsNearMeResponse(null));
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
    console.log('err+++++', err);
    yield put(loaderAction(false));
    // yield put(
    //   ToastDisplay({
    //     type: 'nagative',
    //     title: 'err',
    //   }),
    // );
  }
}
