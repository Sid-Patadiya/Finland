import {APPLY_NOW_REQUEST, APPLY_NOW_RESPONSE} from '../Services/Type';

const initialState = {
  data: null,
};
console.log('call ApplyNowReducer');
export const ApplyNowReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case APPLY_NOW_REQUEST:
      console.log('ApplyNowReducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case APPLY_NOW_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
