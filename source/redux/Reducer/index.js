import {combineReducers} from 'redux';
import {LoaderReducer} from './LoaderReducer';
import {LoginReducer} from '../Reducer/LoginReducer';
import {TostReducer} from './ToastReducer';
import {SignUpReducer} from './SignUpReducer';
import {OtpReducer} from './OtpReducer';
import {VerifyOtpReducer} from './VerifyOtpReducer';
import {ChangePasswordReducer} from './ChangePasswordReducer';
import {ProfileReducer} from './ProfileReducer';
import {UpdateProfileReducer} from './UpdateProfileReducer';
import {RecommendedJobReducer} from './RecommendedJobReducer';
import {AppliedJobsReducer} from './AppliedJobsReducer';
import {ApplyNowReducer} from './ApplyNowReducer';
import {LocationReducer} from './LocationReducer';
import {ContactSupportReducer} from './ContactSupportReducer';
import {SearchJobsReducer} from './SearchJobsReducer';
import {IgnoreJobsReducer} from './IgnoreJobsReducer';
import {OngoingJobsReducer} from './OngoingJobsReducer';
import {HireRequestsRducer} from './HireRequestsRducer';
import {MySubscriptionReducer} from './MySubscriptionReducer';
import {JobsNearMeReducer} from './JobsNearMeReducer';
import {AcceptHireRequestsReducer} from './AcceptHireRequestsReducer';
import {ProfileCategoryReducer} from './ProfileCategoryReducer';
import {MessageListReducer} from './MessageListReducer';
import {CreatePlayListReducer} from './CreatePlayListReducer';
import {GetCreatePlayListReducer} from './GetCreatePlayListReducer';
import {AddListReducer} from './AddListReducer';
import {UpdateTimeSheetReducer} from './UpdateTimeSheetReducer';
import {CreateTimeSheetReducer} from './CreateTimeSheetReducer';
import {UnloackedBRReducer} from './UnloackedBRReducer';
import {PlayListReducer} from './PlayListReducer';
import {SubscriptionPlanReduer} from './SubscriptionPlanReduer';
import {CreareEndJobReducer, EndJobReducers} from './EndJobReducer';
import {AvailabilityPTReducer} from './AvailabilityPTReducer';
import {GetAvailabilityPTReducer} from './GetAvailabilityPTReducer';
import {JobCategoryReducer} from './JobCategoryReducer';
import {JobsNearMewcReducer} from './JobsNearMewcReducer';
import {TimeSheetReducer} from './TimeSheetReducer';
import {VacancyDetailsReducer} from './VacancyDetailsReducer';
import {JobSkillReducer} from './JobSkillReducer';
import {AddMessageReducer} from './AddMessageReducer';
import { DeletePlayListReducer } from './DeletePlayListReducer';

export default combineReducers({
  loader: LoaderReducer,
  toast: TostReducer,
  login: LoginReducer,
  signUp: SignUpReducer,
  otp: OtpReducer,
  verifyOtp: VerifyOtpReducer,
  changePassword: ChangePasswordReducer,
  profile: ProfileReducer,
  profileCategory: ProfileCategoryReducer,
  updateProfile: UpdateProfileReducer,
  recommendedJob: RecommendedJobReducer,
  appliedJobs: AppliedJobsReducer,
  applyNow: ApplyNowReducer,
  location: LocationReducer,
  contactSupport: ContactSupportReducer,
  searchJobs: SearchJobsReducer,
  ignoreJobs: IgnoreJobsReducer,
  ongoingJobs: OngoingJobsReducer,
  hireRequests: HireRequestsRducer,
  mySubscription: MySubscriptionReducer,
  jobseNearMe: JobsNearMeReducer,
  jobseNearMewc: JobsNearMewcReducer,
  acceptHireRequests: AcceptHireRequestsReducer,
  messageList: MessageListReducer,
  createPlayList: CreatePlayListReducer,
  getCretatePlayList: GetCreatePlayListReducer,
  addList: AddListReducer,
  playList: PlayListReducer,
  updateTimeSheet: UpdateTimeSheetReducer,
  createTimeSheet: CreateTimeSheetReducer,
  unloackedBR: UnloackedBRReducer,
  subscriptionPlan: SubscriptionPlanReduer,
  endJob: EndJobReducers,
  availabilityPT: AvailabilityPTReducer,
  getAvailabilityPT: GetAvailabilityPTReducer,
  jobCategory: JobCategoryReducer,
  timeSheet: TimeSheetReducer,
  jobSkills: JobSkillReducer,
  // jobExperience: JobExperienceReducer,
  // jobEducation: JobEducationReducer,
  vacancyDetails: VacancyDetailsReducer,
  addMessageList: AddMessageReducer,
  deletePlayList: DeletePlayListReducer,
});
