export default {
  baseURL: 'https://staging.jobportalapi.atwpl.com/',

  end_Point: {
    //------------ Authentication ---------\\
    LOGIN: 'login/',
    SIGNUP: 'register/',
    OTPSEND: 'send/otp/',
    VERIFYOTP: 'verify/otp/',
    CHANGEPASSWORD: 'ResetPassword/',

    PROFILE: 'jobseeker/profile/',

    PROFILEJOBCATEGORIES: 'recruiter/JobCategories/', //-----JobCategory
    PROFILESKILLS: 'recruiter/skills/',
    PROFILEEXPERIENCE: 'recruiter/experience/',
    PROFILEDEGREE: 'recruiter/degree/',

    UPDATE_PROFILE: 'jobseeker/profile/',

    RECOMMENDEDJOBS: 'jobseeker/recommendedjobs/',

    APPLIEDJOBS: 'jobseeker/applied_job/',

    APPLYNOW: 'jobseeker/applynow/',

    LOCATION: 'jobseeker/location/',

    CONTACT_SUPPORT: 'jobseeker/contact_support/',

    SEARCH_JOBS: 'jobseeker/search_job/',

    IGNORE_JOBS: 'jobseeker/ignore/',

    ONGOING_JOBS: 'jobseeker/ongoingjobs/',

    HIRE_REQUEST: 'jobseeker/hirerequest/',

    ACCEPT_HIRE_REQUEST: 'jobseeker/hirerequest/',

    MY_SUBSCRIPTION: 'jobseeker/candidate_plan_list/',

    JOBS_NEAR_ME: 'jobseeker/jobs_near_me/',

    MESSAGE_LIST: 'jobseeker/storemessages/',

    ADD_TO_PLAYLIST: 'jobseeker/add_to_playlist/',

    CREATE_PLAYLIST: 'jobseeker/Jobseekerplaylist/',

    CREATE_TIME_SHEET: 'jobseeker/timesheet/',

    UPDATE_TIME_SHEET: 'jobseeker/fill_timesheet/',

    UNLOCKED_BY_RECRUITER: 'jobseeker/unlocked_by_recruiter',

    END_JOB: 'jobseeker/endjob/',

    JOBS_NEAR_MEWC: 'jobseeker/jobs_near_me_without_token/',

    AVAILABILITYPT: 'jobseeker/set_part_time_availability/',

    GETTIMESHEET: 'jobseeker/timesheet/',

    VACANCY_DETAILS: 'jobseeker/vacancy_details/',

    UPDATED_LANGUAGE: 'jobseeker/updated_language/',
  },
};
