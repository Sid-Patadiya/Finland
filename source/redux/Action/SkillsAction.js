import * as TYPES from '../Services/Type';

export function JobCategoryResponse(data) {
  console.log('JobCategoryResponseData---->', data);

  return {
    type: TYPES.SKILLS_RESPONSE,
    payload: data,
  };
}

export function JobCategoryRequest(bodydata) {
  console.log('JobCategoryrequest ===>', bodydata);
  return {
    type: TYPES.JOB_CATEGORY_REQUEST,
    bodydata: bodydata,
  };
}
