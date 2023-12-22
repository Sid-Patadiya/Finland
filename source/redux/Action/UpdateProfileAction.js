import * as TYPES from '../Services/Type';

export function UpdateProfileResponse(data) {
  console.log('UpdateProfileResponse---->', data);
  return {
    type: TYPES.UPDATE_PROFILE_RESPONSE,
    payload: data,
  };
}

export function UpdateProfileRequest(bodydata, navigation) {
  console.log('UpdateProfileRequest ===>', bodydata);
  return {
    type: TYPES.UPDATE_PROFILE_REQUEST,
    bodydata: bodydata,
    navigation: navigation,
  };
}
