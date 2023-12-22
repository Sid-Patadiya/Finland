import * as TYPES from '../Services/Type';

export function JobEducationResponse(data) {
  return {
    type: TYPES.JOB_EDUCATION_RESPONSE,
    payload: data,
  };
}

export function JobEducationRequest(bodydata) {
  return {
    type: TYPES.JOB_EDUCATION_REQUEST,
    bodydata: bodydata,
  };
}
