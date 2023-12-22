import * as TYPES from '../Services/Type';

export function JobsNearMeResponse(data) {
  console.log('JobsNearMeResponse---->', data);

  return {
    type: TYPES.JOBS_NEAR_ME_RESPONSE,
    payload: data,
  };
}

export function JobsNearMeRequest(bodydata) {
  // console.log('JobsNearMeRequest token:::::>>>');
  return {
    type: TYPES.JOBS_NEAR_ME_REQUEST,
    bodydata: bodydata,
  };
}
