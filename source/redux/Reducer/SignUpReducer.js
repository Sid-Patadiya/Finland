import {SIGNUP_REQUEST, SIGNUP_RESPONSE} from '../Services/Type';

const initialState = {
  data: null,
};
console.log('call SignUpReducer');
export const SignUpReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case SIGNUP_REQUEST:
      console.log('SignUpReducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case SIGNUP_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
