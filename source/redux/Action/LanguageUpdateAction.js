import * as TYPES from '../Services/Type';

export function UpdateLanguageResponse(data) {
  return {
    type: TYPES.UPDATE_LANGUAGE_RESPONSE,
    payload: data,
  };
}

export function UpdateLanguageRequest(bodydata) {
  return {
    type: TYPES.UPDATE_LANGUAGE_REQUEST,
    bodydata: bodydata
  };
}
