import * as TYPES from '../Services/Type';

export function CreateTimeSheetResponse(data) {
  console.log('CreateTimeSheetResponseData---->', data);

  return {
    type: TYPES.CREATE_TIME_SHEET_RESPONSE,
    payload: data,
  };
}

export function CreateTimeSheetRequest(bodydata, item, navigation, key) {
  console.log('CreateTimeSheetrequest ===>', bodydata);
  return {
    type: TYPES.CREATE_TIME_SHEET_REQUEST,
    bodydata: bodydata,
    item: item,
    navigation: navigation,
    key: key,
  };
}
