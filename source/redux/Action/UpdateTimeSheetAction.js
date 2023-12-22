import * as TYPES from '../Services/Type';

export function UpdateTimeSheetResponse(data) {
  console.log('UpdateTimeSheetResponseData---->', data);

  return {
    type: TYPES.UPDATE_TIME_SHEET_RESPONSE,
    payload: data,
  };
}

export function UpdateTimeSheetRequest(bodydata, navigation) {
  console.log('UpdateTimeSheetrequest ===>', bodydata);
  return {
    type: TYPES.UPDATE_TIME_SHEET_REQUEST,
    bodydata: bodydata,
    navigation: navigation
  };
}
