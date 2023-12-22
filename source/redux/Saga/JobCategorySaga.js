import {put} from 'redux-saga/effects';
import Constant from '../../theme/Constant';
import {JobEducationResponse} from '../Action/JobEducationAction';
import {JobExperienceResponse} from '../Action/JobExperienceAction';
import {JobSkillResponse} from '../Action/JobSkillAction';
import {loaderAction} from '../Action/LoaderAction';
import {ToastDisplay} from '../Action/ToastAction';

export function* JobCategorySaga(action) {
  const {bodydata} = action;
  console.log('JOB CATEGORY SAGA :: ', bodydata);

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.PROFILEJOBCATEGORIES,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodydata),
      },
    );
    var responseJson = yield response.json();

    if (response.status !== 400) {
      yield put(loaderAction(false));
      // yield put(
      //   ToastDisplay({
      //     type: 'positive',
      //     title: 'Created',
      //   }),
      // );
    } else {
      yield put(loaderAction(false));
      // yield put(
      //   ToastDisplay({
      //     type: 'nagative',
      //     title: responseJson.category_name[0],
      //   }),
      // );
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

export function* JobSkillSaga(action) {
  const {bodydata} = action;
  console.log('JOB SKILL SAGA :: ', bodydata);

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.PROFILESKILLS,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodydata),
      },
    );
    var responseJson = yield response.json();
    if (response.status !== 400) {
      yield put(loaderAction(false));
      yield put(
        ToastDisplay({
          type: 'positive',
          title: 'Created',
        }),
      );
    } else {
      yield put(loaderAction(false));
      yield put(
        ToastDisplay({
          type: 'nagative',
          title: responseJson.skill_name[0],
        }),
      );
    }
  } catch (err) {
    console.log(err);
    yield put(loaderAction(false));

    // ToastDisplay({
    //   type: 'nagative',
    //   title: 'err',
    // }),
  }
}

export function* JobEducationSaga(action) {
  const {bodydata} = action;
  console.log('JOB EDUCATION SAGA :: ', bodydata);

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.PROFILEDEGREE,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodydata),
      },
    );
    var responseJson = yield response.json();
    if (response.status !== 400) {
      yield put(loaderAction(false));
      yield put(
        ToastDisplay({
          type: 'positive',
          title: 'Created',
        }),
      );
    } else {
      yield put(loaderAction(false));
      yield put(
        ToastDisplay({
          type: 'nagative',
          title: responseJson.degree[0],
        }),
      );
    }
  } catch (err) {
    console.log(err);
    yield put(loaderAction(false));
    yield put(
      ToastDisplay({
        type: 'nagative',
        title: 'err',
      }),
    );
  }
}

export function* JobExperienceSaga(action) {
  const {bodydata} = action;
  console.log('JOB EXPERIENCE SAGA :: ', bodydata);

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.PROFILEEXPERIENCE,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodydata),
      },
    );
    var responseJson = yield response.json();
    console.log('here ***', responseJson);
    if (response.status !== 400) {
      yield put(loaderAction(false));
      yield put(
        ToastDisplay({
          type: 'positive',
          title: 'Created',
        }),
      );
    } else {
      yield put(loaderAction(false));
      yield put(
        ToastDisplay({
          type: 'nagative',
          title: responseJson.experience[0],
        }),
      );
    }
  } catch (err) {
    console.log(err);
    yield put(loaderAction(false));
    yield put(
      ToastDisplay({
        type: 'nagative',
        title: 'err',
      }),
    );
  }
}
