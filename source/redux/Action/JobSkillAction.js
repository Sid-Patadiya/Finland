import * as TYPES from '../Services/Type';

export function JobSkillResponse(data) {
  return {
    type: TYPES.JOB_SKILLS_RESPONSE,
    payload: data,
  };
}

export function JobSkillRequest(bodydata) {
  return {
    type: TYPES.JOB_SKILLS_REQUEST,
    bodydata: bodydata,
  };
}
