import AsyncStorage from '@react-native-async-storage/async-storage';
import {put} from 'redux-saga/effects';
import Constant from '../../theme/Constant';
import {JobsNearMeResponse} from '../Action/JobsNearMeAction';
import {JobsNearMewcResponse} from '../Action/JobsNearMewcAction';
import {loaderAction} from '../Action/LoaderAction';
import {SearchJobsResponse} from '../Action/SearchJobsAction';
import {ToastDisplay} from '../Action/ToastAction';

export function* SearchJobsSaga(action) {
  const {bodydata} = action;

  console.log('action-->>>>', bodydata);

  const token = yield AsyncStorage.getItem('LoginAccessToken');
  console.log('token----', token);

  console.log(
    'URL======>',
    token !== null
      ? Constant.baseURL +
          'jobseeker/search_jobs/' +
          '?keyword=' +
          bodydata.keyword
      : Constant.baseURL +
          Constant.end_Point.SEARCH_JOBS +
          '?keyword=' +
          bodydata.keyword,
  );

  try {
    const response = yield fetch(
      token !== null
        ? Constant.baseURL +
            'jobseeker/search_jobs/' +
            '?keyword=' +
            bodydata.keyword
        : Constant.baseURL +
            Constant.end_Point.SEARCH_JOBS +
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

    // console.log('SearchJobs responseJson::::>', responseJson);

    if (responseJson.status_code === 200) {
      yield put(loaderAction(false));
      // yield put(
      //   ToastDisplay({
      //     type: 'positive',
      //     title: responseJson.message,
      //   }),
      // );
      yield put(SearchJobsResponse(responseJson));
      yield put(JobsNearMewcResponse(null));
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
