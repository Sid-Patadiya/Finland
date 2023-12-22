import * as TYPES from '../Services/Type';

export function ChangePasswordResponse(data) {
  console.log('ChangePasswordResponseData---->', data);

  return {
    type: TYPES.CHANGE_PASSWORD_RESPONSE,
    payload: data,
  };
}

export function ChangePasswordRequest(bodydata, navigation, key) {
  console.log('ChangePasswordrequest ===>', bodydata);
  return {
    type: TYPES.CHANGE_PASSWORD_REQUEST,
    bodydata: bodydata,
    navigation: navigation,
    key: key,
  };
}
