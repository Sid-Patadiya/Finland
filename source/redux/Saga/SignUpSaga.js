import {put} from 'redux-saga/effects';
import Constant from '../../theme/Constant';
import {loaderAction} from '../Action/LoaderAction';
import {SignUpResponse} from '../Action/SignUpAction';
import {ToastDisplay} from '../Action/ToastAction';

export function* signUpSaga(action) {
  const {bodydata, navigation} = action;

  console.log(' signUpSaga bodydata', bodydata);
  console.log(
    'signUpSaga URL======>',
    Constant.baseURL + Constant.end_Point.SIGNUP,
  );

  try {
    const response = yield fetch(Constant.baseURL + Constant.end_Point.SIGNUP, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(bodydata),
    });
    var responseJson = yield response.json();

    // console.log('signUpSaga Response ====>', responseJson);

    if (responseJson.status_code === 201) {
      navigation.navigate('LoginPassword');
      yield put(loaderAction(false));
      yield put(
        ToastDisplay({
          type: 'positive',
          title: "Registration successfull",
        }),
      );
      yield put(SignUpResponse(responseJson));
    } else {
      yield put(loaderAction(false));
      // yield put(
      //   ToastDisplay({
      //     type: 'negative',
      //     title: responseJson.errors.phone[0],
      //   }),
      // );
    }

    // } else {
    //   if (responseJson.email) {
    //     yield put(
    //       ToastDisplay({
    //         type: 'negative',
    //         title: responseJson[1].email,
    //       }),
    //     );
    //   } else {
    //     yield put(
    //       ToastDisplay({
    //         type: 'negative',
    //         title: responseJson[0].phone,
    //       }),
    //     );
    //   }

    yield put(loaderAction(false));
  } catch (e) {
    console.log('SignUp Catch Part =====>>>>>', e);
    yield put(loaderAction(false));
    // yield put(
    //   ToastDisplay({
    //     type: 'negative',
    //     title: 'invalide',
    //   }),
    // );
  }
}
