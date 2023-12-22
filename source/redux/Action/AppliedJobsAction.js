import * as TYPES from '../Services/Type';

export function AppliedJobsResponse(data) {
  // console.log('AppliedJobsResponse---->', data);

  return {
    type: TYPES.APPLIEDJOBS_RESPONSE,
    payload: data,
  };
}

export function AppliedJobsRequest() {
  // console.log('AppliedJobsRequest token:::::>>>');
  return {
    type: TYPES.APPLIEDJOBS_REQUEST,
    // token: token,
  };
}
