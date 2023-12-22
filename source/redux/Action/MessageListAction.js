import * as TYPES from '../Services/Type';

export function MessageListResponse(data) {
//   console.log('MessageListResponse---->', data);

  return {
    type: TYPES.MESSAGE_LIST_RESPONSE,
    payload: data,
  };
}

export function MessageListRequest() {
  console.log('MessageListRequest----->');
  return {
    type: TYPES.MESSAGE_LIST_REQUEST,
    // token: token,
  };
}
