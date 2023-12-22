import {VERIFY_OTP_RESPONSE, VERIFY_OTP_REQUEST} from '../Services/Type';

const initialState = {
  data: null,
};
console.log('call VerifyOtpReducer');

export const VerifyOtpReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case VERIFY_OTP_REQUEST:
      console.log('VerifyOtpReducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case VERIFY_OTP_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
