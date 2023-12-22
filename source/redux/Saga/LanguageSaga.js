import AsyncStorage from '@react-native-async-storage/async-storage';
import { put } from 'redux-saga/effects';
import Constant from '../../theme/Constant';
import { loaderAction } from '../Action/LoaderAction';
import { languageResponse } from '../Action/LanguageAction';
import { ToastDisplay } from '../Action/ToastAction';

export function* languageSaga(action) {
  console.log('URL ::', Constant.baseURL + Constant.end_Point.GET_LANGUAGE);

  const token = yield AsyncStorage.getItem('LoginAccessToken');
  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.GET_LANGUAGE,
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
    if (responseJson.status_code === 200) {
      yield put(loaderAction(false));
      yield put(languageResponse(responseJson.data));
    } else {
      yield put(loaderAction(false));
    }
  } catch (err) {
    console.log(err);
    yield put(loaderAction(false));
    // yield put(
    //   ToastDisplay({
    //     type: 'nagative',
    //     title: responseJson.detail,
    //   }),
    // );
  }
}
