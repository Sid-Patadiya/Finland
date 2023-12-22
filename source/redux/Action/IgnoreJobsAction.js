import * as TYPES from '../Services/Type';

export function IgnoreJobsResponse(data) {
  console.log('IgnoreJobsResponseData---->', data);

  return {
    type: TYPES.IGNORE_JOBS_RESPONSE,
    payload: data,
  };
}

export function IgnoreJobsRequest(bodydata) {
  console.log('IgnoreJobsrequest ===>', bodydata);
  return {
    type: TYPES.IGNORE_JOBS_REQUEST,
    bodydata: bodydata,
  };
}
