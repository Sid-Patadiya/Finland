import {put} from 'redux-saga/effects';
import Constant from '../../theme/Constant';
import {loaderAction} from '../Action/LoaderAction';
import {ToastDisplay} from '../Action/ToastAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProfileResponse} from '../Action/ProfileAction';
import {GetAvailabilityPTResponse} from '../Action/GetAvailabilityPTAction';

export function* updateProfileSaga(action) {
  const {bodydata, navigation} = action;

  console.log('bodydata==>', bodydata);

  console.log('URL ::', Constant.baseURL + Constant.end_Point.UPDATE_PROFILE);
  let token = yield AsyncStorage.getItem('LoginAccessToken');

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.UPDATE_PROFILE,
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Postman-Token': '<calculated when request is sent>',
          'Content-Length': '<calculated when request is sent>',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(bodydata),
      },
    );
    var responseJson = yield response.json();
    console.log('ProfileResponse ProfileResponse--->', responseJson);
    if (responseJson.status_code === 200) {
      navigation.navigate('MyProfileJS');
      yield put(ProfileResponse(null));
      yield put(GetAvailabilityPTResponse(null));
      yield put(loaderAction(false));
      yield put(
        ToastDisplay({
          type: 'positive',
          title: "Profile got updated successfully",
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
    console.log(err);
    yield put(loaderAction(false));
    // yield put(
    //   ToastDisplay({
    //     type: 'nagative',
    //     title: 'Server Problem',
    //   }),
    // );
  }
}
