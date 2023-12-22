import * as TYPES from '../Services/Type';

export function SearchJobsResponse(data) {
  // console.log('SearchJobsResponse---->', data);

  return {
    type: TYPES.SEARCH_RESPONSE,
    payload: data,
  };
}

export function SearchJobsRequest(bodydata) {
  console.log('SearchJobsRequest token:::::>>>', bodydata);
  return {
    type: TYPES.SEARCH_REQUEST,
    bodydata: bodydata,
  };
}
