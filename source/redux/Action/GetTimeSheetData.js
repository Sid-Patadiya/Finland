import * as TYPES from '../Services/Type';

export function GetTimeSheetResponse(data) {
  console.log('TimesheetResponse---->', data);

  return {
    type: TYPES.TIMESHEET_RESPONSE,
    payload: data,
  };
}

export function GetTimeSheetRequest(bodydata) {
  console.log('timesheet token:::::>>>', bodydata);
  return {
    type: TYPES.TIMESHEET_REQUEST,
    bodydata: bodydata,
  };
}
