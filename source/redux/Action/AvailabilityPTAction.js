import * as TYPES from '../Services/Type';

export function AvailabilityPTResponse(data) {
  console.log('AvailabilityPTResponseData---->', data);

  return {
    type: TYPES.AVAILABILITY_PT_RESPONSE,
    payload: data,
  };
}

export function AvailabilityPTRequest(bodydata) {
  console.log('AvailabilityPTrequest ===>', bodydata);
  return {
    type: TYPES.AVAILABILITY_PT_REQUEST,
    bodydata: bodydata,
  };
}
