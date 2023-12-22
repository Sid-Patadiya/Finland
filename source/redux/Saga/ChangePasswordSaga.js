import { put } from 'redux-saga/effects';
import Constant from '../../theme/Constant';
import { loaderAction } from '../Action/LoaderAction';
import { ToastDisplay } from '../Action/ToastAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function* changePasswordSaga(action) {
  const { bodydata, navigation, key } = action;

  console.log('bodydata', bodydata);
  console.log(
    'URL======>',
    Constant.baseURL + Constant.end_Point.CHANGEPASSWORD,
  );

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.CHANGEPASSWORD,
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodydata),
      },
    );
    var responseJson = yield response.json();

    console.log('ChnagePasswordSaga Response ====>', responseJson);
    // console.log('ChnagePassword Response access ====>', responseJson.access);

    if (responseJson.status_code === 200) {
      if (key === 'Update Password') {
        navigation.goBack();
      } else {
        navigation.replace('StackNavigation');
      }

      yield put(loaderAction(false));
      yield put(
        ToastDisplay({
          type: 'positive',
          title: "Password changed successfully"
        }),
      );
    }
    else {
      yield put(loaderAction(false));
    //   yield put(
    //     ToastDisplay({
    //       type: 'nagative',
    //       title: responseJson.detail,
    //     }),
    //   );
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
