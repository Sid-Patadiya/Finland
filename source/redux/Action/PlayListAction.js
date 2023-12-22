import * as TYPES from '../Services/Type';

export function PlayListResponse(data) {
  console.log('PlayListResponse---->', data);

  return {
    type: TYPES.PLAY_LIST_RESPONSE,
    payload: data,
  };
}

export function PlayListRequest() {
  // console.log('PlayListRequest token:::::>>>');
  return {
    type: TYPES.PLAY_LIST_REQUEST,
    // token: token,
  };
}
