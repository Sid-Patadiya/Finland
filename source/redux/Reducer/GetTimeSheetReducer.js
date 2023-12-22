import {TIMESHEET_REQUEST, STIMESHEET_RESPONSE} from '../Services/Type';
const initialState = {
  data: null,
};
console.log('call get time sheet reducer');
export const GetTimeSheetReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case TIMESHEET_REQUEST:
      console.log('timesheet Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case STIMESHEET_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
