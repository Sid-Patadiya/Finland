import * as TYPES from '../Services/Type';

export function LoginResponse(data) {
  console.log('LoginResponseData---->', data);

  return {
    type: TYPES.LOGIN_RESPONSE,
    payload: data,
  };
}

export function LoginRequest(bodydata, navigation, key) {
  console.log('Loginrequest ===>', bodydata);
  return {
    type: TYPES.LOGIN_REQUEST,
    bodydata: bodydata,
    navigation: navigation,
    key: key,
  };
}
