import AsyncStorage from '@react-native-async-storage/async-storage';
import {put} from 'redux-saga/effects';
import Constant from '../../theme/Constant';
import {loaderAction} from '../Action/LoaderAction';
import {TimeSheetResponse} from '../Action/TimeSheetAction';
import {ToastDisplay} from '../Action/ToastAction';

export function* TimeSheetSaga(action) {
  const {bodydata} = action;
  console.log(
    'TimeURL======>',
    Constant.baseURL +
      Constant.end_Point.CREATE_TIME_SHEET +
      '?timesheet_id=' +
      bodydata.timesheet_id,
  );

  const token = yield AsyncStorage.getItem('LoginAccessToken');

  console.log('token----', token);

  try {
    const response = yield fetch(
      Constant.baseURL +
        Constant.end_Point.CREATE_TIME_SHEET +
        '?timesheet_id=' +
        bodydata.timesheet_id,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    );
    var responseJson = yield response.json();

    console.log('TimeSheetSaga responseJson::::>', responseJson);

    if (responseJson.status_code === 200) {
      yield put(loaderAction(false));
      // yield put(
      //   ToastDisplay({
      //     type: 'positive',
      //     title: responseJson.message,
      //   }),
      // );
      yield put(TimeSheetResponse(responseJson));
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
    //     title: 'responseJson.error_message',
    //   }),
    // );
  }
}
