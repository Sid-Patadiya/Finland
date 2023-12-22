import {put} from 'redux-saga/effects';
import Constant from '../../theme/Constant';
import {loaderAction} from '../Action/LoaderAction';
import {ToastDisplay} from '../Action/ToastAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function* AcceptHireRequestsSaga(action) {
  const {bodydata} = action;

  console.log('bodydata', bodydata);
  console.log(
    'URL======>',
    Constant.baseURL + Constant.end_Point.ACCEPT_HIRE_REQUEST,
  );

  const token = yield AsyncStorage.getItem('LoginAccessToken');
  // console.log('token----', token);
  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.ACCEPT_HIRE_REQUEST,
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

    console.log('AcceptHireRequestsSaga Response ====>', responseJson);

    if (responseJson.status_code === 200) {
      yield put(loaderAction(false));
      yield put(
        ToastDisplay({
          type: 'positive',
          title: "Accepted successfully",
        }),
      );
    } else {
      yield put(loaderAction(false));
      // yield put(
      //   ToastDisplay({
      //     type: 'nagative',
      //     title: 'Oops! something went wrong.',
      //   }),
      // );
    }
  } catch (err) {
    console.log('err=>', err);
    yield put(loaderAction(false));
    // yield put(
    //   ToastDisplay({
    //     type: 'nagative',
    //     title: 'Oops! something went wrong.',
    //   }),
    // );
  }
}
