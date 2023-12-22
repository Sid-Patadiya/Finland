import * as TYPES from '../Services/Type';

export function AcceptHireRequestsResponse(data) {
  console.log('AcceptHireRequestsResponseData---->', data);

  return {
    type: TYPES.ACCEPT_HIRE_REQUESTS_RESPONSE,
    payload: data,
  };
}

export function AcceptHireRequestsRequest(bodydata) {
  console.log('AcceptHireRequestsrequest ===>', bodydata);
  return {
    type: TYPES.ACCEPT_HIRE_REQUESTS_REQUEST,
    bodydata: bodydata,
  };
}
