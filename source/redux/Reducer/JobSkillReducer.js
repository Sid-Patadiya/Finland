import { JOB_CATEGORY_REQUEST, JOB_CATEGORY_RESPONSE, JOB_SKILLS_REQUEST, JOB_SKILLS_RESPONSE } from '../Services/Type';

const initialState = {
  data: null,
};

export const JobSkillReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case JOB_SKILLS_REQUEST:
      return {
        ...prevState,
        action: action,
      };
    case JOB_SKILLS_RESPONSE:
      console.log('action :::::', action)
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
