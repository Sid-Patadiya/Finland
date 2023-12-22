import * as TYPES from '../Services/Type';

export function OtpResponse(data) {
  console.log('OtpResponse---->', data);

  return {
    type: TYPES.OTP_RESPONSE,
    payload: data,
  };
}

export function OtpRequest(bodydata, navigation, key) {
  console.log('OtpRequest ===>', bodydata);
  return {
    type: TYPES.OTP_REQUEST,
    bodydata: bodydata,
    navigation: navigation,
    key: key,
  };
}
