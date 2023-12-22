import * as TYPES from '../Services/Type';

export function DeletePlayListResponse(data) {
  console.log('DeletePlayListResponseData---->', data);

  return {
    type: TYPES.DELETE_PLAY_LIST_RESPONSE,
    payload: data,
  };
}

export function DeletePlayListRequest(bodydata) {
  console.log('DeletePlayListrequest ===>', bodydata);
  return {
    type: TYPES.DELETE_PLAY_LIST_REQUEST,
    bodydata: bodydata,
  };
}
