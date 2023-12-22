import {
  UPDATE_TIME_SHEET_RESPONSE,
  UPDATE_TIME_SHEET_REQUEST,
} from '../Services/Type';

const initialState = {
  data: null,
};

console.log('call UpdateTimeSheetReducer');
export const UpdateTimeSheetReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case UPDATE_TIME_SHEET_REQUEST:
      console.log('UpdateTimeSheetReducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case UPDATE_TIME_SHEET_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
