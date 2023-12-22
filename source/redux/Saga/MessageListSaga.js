import AsyncStorage from '@react-native-async-storage/async-storage';
import {put} from 'redux-saga/effects';
import Constant from '../../theme/Constant';
import {loaderAction} from '../Action/LoaderAction';
import {MessageListResponse} from '../Action/MessageListAction';
import {MySubscriptionResponse} from '../Action/MySubscriptionAction';
import {ToastDisplay} from '../Action/ToastAction';

export function* MessageListSaga(action) {
  console.log('URL======>', Constant.baseURL + Constant.end_Point.MESSAGE_LIST);

  const token = yield AsyncStorage.getItem('LoginAccessToken');

  console.log('token----', token);

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.MESSAGE_LIST,
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

    // console.log('responseJson::::>', responseJson);

    if (responseJson.status_code === 200) {
      yield put(loaderAction(false));
      // yield put(
      //   ToastDisplay({
      //     type: 'positive',
      //     title: responseJson.message,
      //   }),
      // );
      yield put(MessageListResponse(responseJson.data));
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
    //     title: responseJson.code,
    //   }),
    // );
  }
}
