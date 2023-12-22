import * as TYPES from '../Services/Type';

export function GetCreatePlayListResponse(data) {
  console.log('GetCreatePlayListResponse---->', data);

  return {
    type: TYPES.GET_CREATE_PLAY_LIST_RESPONSE,
    payload: data,
  };
}

export function GetCreatePlayListRequest() {
  // console.log('GetCreatePlayListRequest token:::::>>>');
  return {
    type: TYPES.GET_CREATE_PLAY_LIST_REQUEST,
    // token: token,
  };
}
