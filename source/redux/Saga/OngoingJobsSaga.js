import AsyncStorage from '@react-native-async-storage/async-storage';
import {put} from 'redux-saga/effects';
import Constant from '../../theme/Constant';
import {loaderAction} from '../Action/LoaderAction';
import {OngoingJobsResponse} from '../Action/OngoingJobsAction';
import {ToastDisplay} from '../Action/ToastAction';

export function* OngoingJobsSaga(action) {
  console.log('OngoingJobsSaga');
  console.log('URL======>', Constant.baseURL + Constant.end_Point.ONGOING_JOBS);

  //----Token----
  const token = yield AsyncStorage.getItem('LoginAccessToken');
  // console.log('token----', token);

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.ONGOING_JOBS,
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

    // console.log('OngoingJobsSaga responseJson::::>', responseJson);

    if (responseJson.status_code === 200) {
      yield put(loaderAction(false));
      // yield put(
      //   ToastDisplay({
      //     type: 'positive',
      //     title: responseJson.message,
      //   }),
      // );
      yield put(OngoingJobsResponse(responseJson.data));
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
