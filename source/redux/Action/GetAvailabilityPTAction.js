import * as TYPES from '../Services/Type';

export function GetAvailabilityPTResponse(data) {
  // console.log('GetAvailabilityPTResponse---->', data);

  return {
    type: TYPES.GET_AVAILABILITY_PT_RESPONSE,
    payload: data,
  };
}

export function GetAvailabilityPTRequest() {
  console.log('AVAILABILITYPT * * * * *');
  return {
    type: TYPES.GET_AVAILABILITY_PT_REQUEST,
  };
}
