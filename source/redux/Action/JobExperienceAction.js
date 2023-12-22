import * as TYPES from '../Services/Type';

export function JobExperienceResponse(data) {
  return {
    type: TYPES.JOB_EXPERIENCE_RESPONSE,
    payload: data,
  };
}

export function JobExperienceRequest(bodydata) {
  return {
    type: TYPES.JOB_EXPERIENCE_REQUEST,
    bodydata: bodydata,
  };
}
