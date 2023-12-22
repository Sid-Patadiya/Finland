import {put} from 'redux-saga/effects';
import Constant from '../../theme/Constant';
import {loaderAction} from '../Action/LoaderAction';
import {ToastDisplay} from '../Action/ToastAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function* CreateTimeSheetSaga(action) {
  const {bodydata, item, navigation, key} = action;

  console.log('key+++++++>', key);

  console.log('bodydata', bodydata);
  console.log(
    'URL======>',
    Constant.baseURL + Constant.end_Point.CREATE_TIME_SHEET,
  );

  const token = yield AsyncStorage.getItem('LoginAccessToken');
  // console.log('token----', token);
  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.CREATE_TIME_SHEET,
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

    console.log('CreateTimeSheetSaga Response ====>', responseJson);

    if (
      responseJson.status_code === 200 ||
      responseJson.error_message == 'Timesheet already exists.'
    ) {
      if (key.key == 'TimeSheet') {
        navigation.navigate('TimeSheetDetails', {item, id: responseJson.data});
      } else {
        navigation.navigate('UpdateTimeSheetJS', {item, id: responseJson.data});
      }

      yield put(loaderAction(false));
      // yield put(
      //   ToastDisplay({
      //     type: 'positive',
      //     title: responseJson.message,
      //   }),
      // );
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
    console.log('err=======', err);
    yield put(loaderAction(false));
    // yield put(
    //   ToastDisplay({
    //     type: 'nagative',
    //     title: 'sdsdsdf',
    //   }),
    // );
  }
}
