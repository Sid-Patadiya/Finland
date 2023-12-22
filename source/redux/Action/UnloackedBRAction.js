import * as TYPES from '../Services/Type';

export function UnloackedBRResponse(data) {
  //   console.log('UnloackedBRResponse---->', data);

  return {
    type: TYPES.UNLOCKED_BY_RESPONSE,
    payload: data,
  };
}

export function UnloackedBRRequest() {
  console.log('UnloackedBRRequest----->');
  return {
    type: TYPES.UNLOCKED_BY_REQUEST,
    // token: token,
  };
}
