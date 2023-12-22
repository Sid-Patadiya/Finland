import AsyncStorage from '@react-native-async-storage/async-storage';
import { put } from 'redux-saga/effects';
import Constant from '../../theme/Constant';
import { loaderAction } from '../Action/LoaderAction';
import { ToastDisplay } from '../Action/ToastAction';
import { vacancyDetailsResponse } from '../Action/VacancyDetailsAction';

export function* VacancyDetailsSaga(action) {
  const { bodydata } = action;
  console.log('bodydata :::', Constant.baseURL + Constant.end_Point.VACANCY_DETAILS)
  const token = yield AsyncStorage.getItem('LoginAccessToken');

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.VACANCY_DETAILS,
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
    console.log('response :::::::', response)
    var responseJson = yield response.json();
    console.log("responseJson ::", responseJson)
    if (responseJson.status_code === 200) {
      yield put(loaderAction(false));
      // yield put(
      //   ToastDisplay({
      //     type: 'positive',
      //     title: responseJson.message,
      //   }),
      // );
      yield put(vacancyDetailsResponse(responseJson));
    } else {
      yield put(loaderAction(false));
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
