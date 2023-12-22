import { put } from 'redux-saga/effects';
import Constant from '../../theme/Constant';
import { loaderAction } from '../Action/LoaderAction';
import { ToastDisplay } from '../Action/ToastAction';
import { UpdateLanguageResponse } from '../Action/LanguageUpdateAction';



export function* updateLanguageSaga(action) {
  const { bodydata, token } = action;
  console.log('URL ::', Constant.baseURL + Constant.end_Point.UPDATE_LANGUAGE);
  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.UPDATE_LANGUAGE,
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
    console.log('* * * * * * responseJson * * * * * * * *')
    console.log(responseJson)
    console.log('* * * * * * * * * * * * * *')
    if (responseJson.status_code === 200) {
      yield put(UpdateLanguageResponse(null));
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