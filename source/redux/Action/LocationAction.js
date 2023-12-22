import * as TYPES from '../Services/Type';

export function LocationResponse(data) {
  console.log('LocationResponseData---->', data);
  return {
    type: TYPES.LOCATION_RESPONSE,
    payload: data,
  };
}

export function LocationRequest(bodydata) {
  console.log('Locationrequest ===>', bodydata);
  return {
    type: TYPES.LOCATION_REQUEST,
    bodydata: bodydata,
  };
}
