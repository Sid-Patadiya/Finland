import * as TYPES from '../Services/Type';

export function languageResponse(data) {
  console.log('data :::::')
  console.log('data :::::')
  console.log('data :::::', data)
  console.log('data :::::')
  console.log('data :::::')
  return {
    type: TYPES.LANGUAGE_RESPONSE,
    payload: data,
  };
}

export function languageRequest() {
  return {
    type: TYPES.LANGUAGE_REQUEST,
  };
}
