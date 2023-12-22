import {APPLIEDJOBS_RESPONSE, APPLIEDJOBS_REQUEST} from '../Services/Type';

const initialState = {
  data: null,
};
console.log('call AppliedJobsReducer');
export const AppliedJobsReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case APPLIEDJOBS_REQUEST:
      console.log('AppliedJobsReducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case APPLIEDJOBS_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
