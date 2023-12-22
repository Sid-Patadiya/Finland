import { JOB_CATEGORY_REQUEST, JOB_CATEGORY_RESPONSE, JOB_EXPERIENCE_REQUEST, JOB_EXPERIENCE_RESPONSE, JOB_SKILLS_REQUEST, JOB_SKILLS_RESPONSE } from '../Services/Type';

const initialState = {
  data: null,
};

export const JobExperienceReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case JOB_EXPERIENCE_REQUEST:
      return {
        ...prevState,
        action: action,
      };
    case JOB_EXPERIENCE_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
