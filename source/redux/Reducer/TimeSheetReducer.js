import {TIME_SHEET_REQUEST, TIME_SHEET_RESPONSE} from '../Services/Type';

const initialState = {
  data: null,
};
console.log('call TimeSheetReducer');
export const TimeSheetReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case TIME_SHEET_REQUEST:
      console.log('TimeSheetReducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case TIME_SHEET_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
