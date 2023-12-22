import {IGNORE_JOBS_RESPONSE, IGNORE_JOBS_REQUEST} from '../Services/Type';

const initialState = {
  data: null,
};
console.log('call IgnoreJobsReducer');
export const IgnoreJobsReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case IGNORE_JOBS_REQUEST:
      console.log('IgnoreJobsReducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case IGNORE_JOBS_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
