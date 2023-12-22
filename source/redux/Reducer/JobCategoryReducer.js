import {JOB_CATEGORY_REQUEST, JOB_CATEGORY_RESPONSE} from '../Services/Type';

const initialState = {
  data: null,
};
console.log('call JobCategoryReducer');
export const JobCategoryReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case JOB_CATEGORY_REQUEST:
      console.log('JobCategoryReducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case JOB_CATEGORY_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
