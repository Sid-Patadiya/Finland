import * as TYPES from '../Services/Type';

export function RecommendedJobResponse(data) {
  // console.log('RecommendedJobResponse---->', data);
  return {
    type: TYPES.RECOMMENDEDJOBS_RESPONSE,
    payload: data,
  };
}

export function RecommendedJobRequest() {
  // console.log('RecommendedJobRequest token:::::>>>');
  return {
    type: TYPES.RECOMMENDEDJOBS_REQUEST,
    // token: token,
  };
}
