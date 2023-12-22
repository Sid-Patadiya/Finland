import {JOBS_NEAR_ME_REQUEST, JOBS_NEAR_ME_RESPONSE} from '../Services/Type';

const initialState = {
  data: null,
};
console.log('call JobsNearMeReducer');
export const JobsNearMeReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case JOBS_NEAR_ME_REQUEST:
      console.log('JobsNearMeReducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case JOBS_NEAR_ME_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
