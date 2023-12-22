import * as TYPES from '../Services/Type';

export function JobsNearMewcResponse(data) {
  // console.log('JobsNearMewcResponse---->', data);

  return {
    type: TYPES.JOBS_NEAR_MEWC_RESPONSE,
    payload: data,
  };
}

export function JobsNearMewcRequest(bodydata) {
  console.log('JobsNearMeRequest token:::::>>>');
  return {
    type: TYPES.JOBS_NEAR_MEWC_REQUEST,
    bodydata: bodydata,
  };
}
