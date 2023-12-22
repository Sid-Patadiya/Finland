import AsyncStorage from '@react-native-async-storage/async-storage';
import {put} from 'redux-saga/effects';
import Constant from '../../theme/Constant';
import {loaderAction} from '../Action/LoaderAction';
import {ToastDisplay} from '../Action/ToastAction';

export function* GetTimeSheetSaga(action) {
  const {bodydata} = action;

  console.log('action-->>>>', bodydata);

  const token = yield AsyncStorage.getItem('LoginAccessToken');
  console.log('token----', token);

  console.log(
    'URL======>',
    token !== null
      ? Constant.baseURL +
          '/jobseeker/timesheet/' +
          '?timesheet_id=' +
          bodydata.keyword
      : Constant.baseURL +
          Constant.end_Point.GETTIMESHEET +
          '?timesheet_id=' +
          bodydata.keyword,
  );

  try {
    const response = yield fetch(
      token !== null
        ? Constant.baseURL +
            'jobseeker/timesheet/' +
            '?keyword=' +
            bodydata.keyword
        : Constant.baseURL +
            Constant.end_Point.GETTIMESHEET +
            '?keyword=' +
            bodydata.keyword,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token !== null ? 'Bearer ' + token : null,
        },
      },
    );
    var responseJson = yield response.json();


    if (responseJson.status_code === 200) {
      yield put(loaderAction(false));
      yield put(
        ToastDisplay({
          type: 'positive',
          title: "Timesheet retrieved successfully",
        }),
      );
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
    //     title: responseJson.error_message,
    //   }),
    // );
  }
}
