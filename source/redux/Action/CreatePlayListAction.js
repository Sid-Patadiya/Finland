import * as TYPES from '../Services/Type';

export function CreatePlayListResponse(data) {
  console.log('CreatePlayListResponseData---->', data);

  return {
    type: TYPES.CREATE_PLAY_LIST_RESPONSE,
    payload: data,
  };
}

export function CreatePlayListRequest(bodydata) {
  console.log('CreatePlayListrequest ===>', bodydata);
  return {
    type: TYPES.CREATE_PLAY_LIST_REQUEST,
    bodydata: bodydata,
  };
}
