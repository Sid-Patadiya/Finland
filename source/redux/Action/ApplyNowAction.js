import * as TYPES from '../Services/Type';

export function ApplyNowResponse(data) {
  console.log('ApplyNowResponseData---->', data);

  return {
    type: TYPES.APPLY_NOW_RESPONSE,
    payload: data,
  };
}

export function ApplyNowRequest(bodydata) {
  console.log('ApplyNowrequest ===>', bodydata);
  return {
    type: TYPES.APPLY_NOW_REQUEST,
    bodydata: bodydata,
  };
}
