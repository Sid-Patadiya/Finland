import * as TYPES from '../Services/Type';

export function AddMessageResponse(data) {
  console.log('AddMessageResponseData---->', data);

  return {
    type: TYPES.ADD_MESSAGE_LIST_RESPONSE,
    payload: data,
  };
}

export function AddMessageRequest(bodydata) {
  console.log('AddMessagerequest ===>', bodydata);
  return {
    type: TYPES.ADD_MESSAGE_LIST_REQUEST,
    bodydata: bodydata,
  };
}
