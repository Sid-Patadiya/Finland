import * as TYPES from '../Services/Type';

export function TimeSheetResponse(data) {
  console.log('TimeSheetResponse---->', data);

  return {
    type: TYPES.TIME_SHEET_RESPONSE,
    payload: data,
  };
}

export function TimeSheetRequest(bodydata) {
  // console.log('TimeSheetRequest token:::::>>>');
  return {
    type: TYPES.TIME_SHEET_REQUEST,
    // token: token,
    bodydata: bodydata,
  };
}
