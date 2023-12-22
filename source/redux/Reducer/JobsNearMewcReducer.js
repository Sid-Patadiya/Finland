import {JOBS_NEAR_MEWC_REQUEST, JOBS_NEAR_MEWC_RESPONSE} from '../Services/Type';

const initialState = {
  data: null,
};
console.log('call JobsNearMewcReducer');
export const JobsNearMewcReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case JOBS_NEAR_MEWC_REQUEST:
      console.log('JobsNearMewcReducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case JOBS_NEAR_MEWC_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
