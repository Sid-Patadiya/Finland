import {
  CREATE_TIME_SHEET_REQUEST,
  CREATE_TIME_SHEET_RESPONSE,
} from '../Services/Type';

const initialState = {
  data: null,
};

console.log('call CreateTimeSheetReducer');
export const CreateTimeSheetReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case CREATE_TIME_SHEET_REQUEST:
      console.log('CreateTimeSheetReducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case CREATE_TIME_SHEET_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
