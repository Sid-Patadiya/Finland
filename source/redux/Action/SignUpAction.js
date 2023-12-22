import * as TYPES from '../Services/Type';

export function SignUpResponse(data) {
  console.log('SignUpResponse---->', data);

  return {
    type: TYPES.SIGNUP_RESPONSE,
    payload: data,
  };
}

export function SignUpRequest(bodydata, navigation) {
  console.log('SignUpRequest ===>', bodydata);
  return {
    type: TYPES.SIGNUP_REQUEST,
    bodydata: bodydata,
    navigation: navigation,
  };
}
