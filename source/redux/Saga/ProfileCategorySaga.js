import {put} from 'redux-saga/effects';
import Constant from '../../theme/Constant';
import {loaderAction} from '../Action/LoaderAction';
import {ProfileCategoryResponse} from '../Action/ProfileCategoryAction';
import {ToastDisplay} from '../Action/ToastAction';

export function* ProfileCategorySaga() {
  console.log(
    'postJobCategorySaga URL======>',
    Constant.baseURL + Constant.end_Point.PROFILEJOBCATEGORIES,
  );

  try {
    let [JOBCATAGORY, SKILLS, EXPERIENCE, DEGREE] = yield Promise.all([
      fetch(Constant.baseURL + Constant.end_Point.PROFILEJOBCATEGORIES),
      fetch(Constant.baseURL + Constant.end_Point.PROFILESKILLS),
      fetch(Constant.baseURL + Constant.end_Point.PROFILEEXPERIENCE),
      fetch(Constant.baseURL + Constant.end_Point.PROFILEDEGREE),
    ]);
    const JobCategory = yield JOBCATAGORY.json();

    const Skills = yield SKILLS.json();

    const Experience = yield EXPERIENCE.json();

    const Degree = yield DEGREE.json();

    yield put(
      ProfileCategoryResponse({
        first: JobCategory.data,
        second: Skills.data,
        third: Experience.data,
        four: Degree.data,
      }),
    );
    console.log('JobCategory:::', JobCategory);
    console.log('Skills:::', Skills);
    console.log('Experience:::', Experience);
    console.log('Degree:::', Degree);
  } catch (e) {
    console.log('Catch Part =====>>>>>', e);
    // yield put(
    //   ToastDisplay({
    //     type: 'negative',
    //     title: 'invalide',
    //   }),
    // );
  }
}
