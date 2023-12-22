import {
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_RESPONSE,
} from '../Services/Type';

const initialState = {
  data: null,
};
console.log('call loginReducer');
export const ChangePasswordReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case CHANGE_PASSWORD_REQUEST:
      console.log('ChangePasswordReducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case CHANGE_PASSWORD_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
