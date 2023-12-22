import * as TYPES from '../Services/Type';

export function VerifyOtpResponse(data) {
  console.log('VerifyOtpResponse Data---->', data);

  return {
    type: TYPES.VERIFY_OTP_RESPONSE,
    payload: data,
  };
}

export function VerifyOtpRequest(bodydata, navigation, key) {
  console.log('VerifyOtpRequest ===>', bodydata);
  return {
    type: TYPES.VERIFY_OTP_REQUEST,
    bodydata: bodydata,
    navigation: navigation,
    key: key,
  };
}
