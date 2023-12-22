import {takeEvery, all, take} from 'redux-saga/effects';
import {loginSaga} from './LoginSaga';
import {signUpSaga} from './SignUpSaga';
import {otpSaga} from './OtpSaga';
import {verifyOtpSaga} from './VerifyOtpSaga';
import {changePasswordSaga} from './ChangePasswordSaga';
import {updateProfileSaga} from './UpdateProfileSaga';
import {RecommendedJobSaga} from './RecommendedJobSaga';
import {AppliedJobsSaga} from './AppliedJobsSaga';
import {ApplyNowSaga} from './ApplyNowSaga';
import {LocationSaga} from './LocationSaga';
import {ContactSupportSaga} from './ContactSupportSaga';
import {IgnoreJobsSaga} from './IgnoreJobsSaga';
import {OngoingJobsSaga} from './OngoingJobsSaga';
import {ProfileSaga} from './ProfileSaga';
import {HireRequestsSaga} from './HireRequestsSaga';
import {MySubscriptionSaga} from './MySubscriptionSaga';
import {JobsNearMeSaga} from './JobsNearMeSaga';
import {AcceptHireRequestsSaga} from './AcceptHireRequestsSaga';
import {ProfileCategorySaga} from './ProfileCategorySaga';
import {MessageListSaga} from './MessageListSaga';
import {SearchJobsSaga} from './SearchJobsSaga';
import {CreatePlayListSaga} from './CreatePlayListSaga';
import {GetCreatePlayListSaga} from './GetCreatePlayListSaga';
import {AddListSaga} from './AddListSaga';
import {UpdateTimeSheetSaga} from './UpdateTimeSheetSaga';
import {CreateTimeSheetSaga} from './CreateTimeSheetSaga';
import {UnloackedBRSaga} from './UnloackedBRSaga';
import {PlayListSaga} from './PlayListSaga';
import {SubscriptionPlanSaga} from './SubscriptionPlanSaga';
import {EndJobSaga} from './EndJobSaga';
import {GetAvailabilityPTSaga} from './GetAvailabilityPTSaga';
import {AvailabilityPTSaga} from './AvailabilityPTSaga';
import {
  JobCategorySaga,
  JobEducationSaga,
  JobExperienceSaga,
  JobSkillSaga,
} from './JobCategorySaga';
import {JobsNearMewcSaga} from './JobsNearMewcSaga';
import {GetTimeSheetSaga} from './GetTimesheetSaga';
import * as TYPES from '../Services/Type';
import {VacancyDetailsSaga} from './VacancyDetailsSaga';
import {AddMessageSaga} from './AddMessageSaga';
import {DeletePlayListSaga} from './DeletePlayListSaga';
import {TimeSheetSaga} from './TimeSheetSaga';

export default function* root_saga() {
  yield all([
    takeEvery('LOGIN_REQUEST', loginSaga),
    takeEvery('SIGNUP_REQUEST', signUpSaga),
    takeEvery('OTP_REQUEST', otpSaga),
    takeEvery('VERIFY_OTP_REQUEST', verifyOtpSaga),
    takeEvery('CHANGE_PASSWORD_REQUEST', changePasswordSaga),
    takeEvery('PROFILE_REQUEST', ProfileSaga),
    takeEvery('PROFILE_CATEGORY_REQUEST', ProfileCategorySaga),
    takeEvery('UPDATE_PROFILE_REQUEST', updateProfileSaga),
    takeEvery('RECOMMENDEDJOBS_REQUEST', RecommendedJobSaga),
    takeEvery('APPLIEDJOBS_REQUEST', AppliedJobsSaga),
    takeEvery('APPLY_NOW_REQUEST', ApplyNowSaga),
    takeEvery('LOCATION_REQUEST', LocationSaga),
    takeEvery('CONTACT_SUPPORT_REQUEST', ContactSupportSaga),
    takeEvery('SEARCH_REQUEST', SearchJobsSaga),
    takeEvery('IGNORE_JOBS_REQUEST', IgnoreJobsSaga),
    takeEvery('ONGOING_JOBS_REQUEST', OngoingJobsSaga),
    takeEvery('HIRE_REQUESTS_REQUEST', HireRequestsSaga),
    takeEvery('ACCEPT_HIRE_REQUESTS_REQUEST', AcceptHireRequestsSaga),
    takeEvery('MY_SUBSCRITPTION_REQUEST', MySubscriptionSaga),
    takeEvery('JOBS_NEAR_ME_REQUEST', JobsNearMeSaga),
    takeEvery('JOBS_NEAR_MEWC_REQUEST', JobsNearMewcSaga),
    takeEvery('JOBS_NEAR_MEWC_REQUEST', JobsNearMewcSaga),
    takeEvery('MESSAGE_LIST_REQUEST', MessageListSaga),
    takeEvery('ADD_MESSAGE_LIST_REQUEST', AddMessageSaga),
    takeEvery('CREATE_PLAY_LIST_REQUEST', CreatePlayListSaga),
    takeEvery('GET_CREATE_PLAY_LIST_REQUEST', GetCreatePlayListSaga),
    takeEvery('ADD_LIST_REQUEST', AddListSaga),
    takeEvery('PLAY_LIST_REQUEST', PlayListSaga),
    takeEvery('UPDATE_TIME_SHEET_REQUEST', UpdateTimeSheetSaga),
    takeEvery('CREATE_TIME_SHEET_REQUEST', CreateTimeSheetSaga),
    takeEvery('UNLOCKED_BY_REQUEST', UnloackedBRSaga),
    takeEvery('SUBSCRITPTION_PLAN_REQUEST', SubscriptionPlanSaga),
    takeEvery('CREATE_END_JOB_REQUEST', EndJobSaga),
    takeEvery('GET_AVAILABILITY_PT_REQUEST', GetAvailabilityPTSaga),
    takeEvery('AVAILABILITY_PT_REQUEST', AvailabilityPTSaga),

    takeEvery('JOB_CATEGORY_REQUEST', JobCategorySaga),
    takeEvery('JOB_SKILLS_REQUEST', JobSkillSaga),
    takeEvery('JOB_EDUCATION_REQUEST', JobEducationSaga),
    takeEvery('JOB_EXPERIENCE_REQUEST', JobExperienceSaga),

    takeEvery('VACANCY_DETAILS_REQUEST', VacancyDetailsSaga),

    takeEvery('TIMESHEET_REQUEST', GetTimeSheetSaga),
    takeEvery('DELETE_PLAY_LIST_REQUEST', DeletePlayListSaga),
    takeEvery('TIME_SHEET_REQUEST', TimeSheetSaga),
  ]);
}
