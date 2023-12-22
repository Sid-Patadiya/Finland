import * as TYPES from '../Services/Type';

export function vacancyDetailsResponse(data) {
  console.log('acancyDetails---->', data);

  return {
    type: TYPES.VACANCY_DETAILS_RESPONSE,
    payload: data,
  };
}

export function vacancyDetailsRequest(bodydata) {
  console.log('BDBDBD :::',bodydata);
  return {
    type: TYPES.VACANCY_DETAILS_REQUEST,
    bodydata: bodydata,
  };
}
