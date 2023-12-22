import {ONGOING_JOBS_REQUEST,ONGOING_JOBS_RESPONSE } from '../Services/Type';

const initialState = {
  data: null,
};
console.log('call OngoingJobsReducer');
export const OngoingJobsReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case ONGOING_JOBS_REQUEST:
      console.log('OngoingJobsReducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case ONGOING_JOBS_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
