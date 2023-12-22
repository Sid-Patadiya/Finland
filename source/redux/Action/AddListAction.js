import * as TYPES from '../Services/Type';

export function AddListResponse(data) {
  //   console.log('AddListResponseData---->', data);
  return {
    type: TYPES.ADD_LIST_RESPONSE,
    payload: data,
  };
}

export function AddListRequest(bodydata) {
  console.log('AddListrequest ===>', bodydata);
  return {
    type: TYPES.ADD_LIST_REQUEST,
    bodydata: bodydata,
  };
}
