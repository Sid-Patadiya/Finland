import { JOB_CATEGORY_REQUEST, JOB_CATEGORY_RESPONSE, JOB_EDUCATION_REQUEST, JOB_EDUCATION_RESPONSE, JOB_EXPERIENCE_REQUEST, JOB_EXPERIENCE_RESPONSE, JOB_SKILLS_REQUEST, JOB_SKILLS_RESPONSE } from '../Services/Type';

const initialState = {
  data: null,
};

export const JobEducationReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case JOB_EDUCATION_REQUEST:
      return {
        ...prevState,
        action: action,
      };
    case JOB_EDUCATION_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
