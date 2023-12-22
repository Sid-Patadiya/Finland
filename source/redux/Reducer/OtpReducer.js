import {OTP_RESPONSE, OTP_REQUEST} from '../Services/Type';

const initialState = {
  data: null,
};
console.log('call OtpReducer');
export const OtpReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case OTP_REQUEST:
      console.log('OtpReducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case OTP_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
