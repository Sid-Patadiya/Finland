import * as TYPES from '../Services/Type';

export function HireRequestsResponse(data) {
  console.log('HireRequestsResponse---->', data);

  return {
    type: TYPES.HIRE_REQUESTS_RESPONSE,
    payload: data,
  };
}

export function HireRequestsRequest() {
  console.log('HireRequestsRequest:::::>>>');
  return {
    type: TYPES.HIRE_REQUESTS_REQUEST,
  };
}
