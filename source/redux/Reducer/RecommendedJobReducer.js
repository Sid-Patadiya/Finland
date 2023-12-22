import {RECOMMENDEDJOBS_REQUEST,RECOMMENDEDJOBS_RESPONSE } from '../Services/Type';

const initialState = {
  data: null,
};
console.log('call RecommendedJobReducer');
export const RecommendedJobReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case RECOMMENDEDJOBS_REQUEST:
      console.log('RecommendedJobReducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case RECOMMENDEDJOBS_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
