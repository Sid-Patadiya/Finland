import * as TYPES from '../Services/Type';

export function ProfileResponse(data) {
  // console.log('ProfileResponse---->', data);

  return {
    type: TYPES.PROFILE_RESPONSE,
    payload: data,
  };
}

export function ProfileRequest() {
  // console.log('ProfileRequest token:::::>>>');
  return {
    type: TYPES.PROFILE_REQUEST,
    // token: token,
  };
}
