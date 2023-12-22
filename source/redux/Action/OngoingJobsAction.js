import * as TYPES from '../Services/Type';

export function OngoingJobsResponse(data) {
  // console.log('OngoingJobsResponse---->', data);

  return {
    type: TYPES.ONGOING_JOBS_RESPONSE,
    payload: data,
  };
}

export function OngoingJobsRequest() {
  // console.log('OngoingJobsRequest :::::>>>');
  return {
    type: TYPES.ONGOING_JOBS_REQUEST,
  };
}
