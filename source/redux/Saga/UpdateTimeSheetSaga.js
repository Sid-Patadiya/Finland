import { put } from 'redux-saga/effects';
import Constant from '../../theme/Constant';
import { loaderAction } from '../Action/LoaderAction';
import { ToastDisplay } from '../Action/ToastAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function* UpdateTimeSheetSaga(action) {
  const { bodydata, navigation } = action;

  console.log('bodydata', bodydata);
  console.log(
    'URL======>',
    Constant.baseURL + Constant.end_Point.UPDATE_TIME_SHEET,
  );

  const token = yield AsyncStorage.getItem('LoginAccessToken');
  // console.log('token----', token);
  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.UPDATE_TIME_SHEET,
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

    console.log('UpdateTimeSheetSaga Response ====>', responseJson);

    if (responseJson.status_code === 200) {
      navigation.goBack();
      yield put(loaderAction(false));
      yield put(
        ToastDisplay({
          type: 'positive',
          title: "Timesheet got updated successfully",
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
    console.log('UpdateTimeSheetSagaerr~~~~~', err);
    yield put(loaderAction(false));
    // yield put(
    //   ToastDisplay({
    //     type: 'nagative',
    //     title: 'err',
    //   }),
    // );
  }
}
