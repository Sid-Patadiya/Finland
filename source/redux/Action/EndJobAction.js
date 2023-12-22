import * as TYPES from '../Services/Type';

export function CreateEndJobResponse(data) {
  console.log('CreateEndJobResponse---->', data);

  return {
    type: TYPES.CREATE_END_JOB_RESPONSE,
    payload: data,
  };
}

export function CreateEndJobRequest(bodydata) {
  console.log('CreatedEndJobRequest ===>', bodydata);
  return {
    type: TYPES.CREATE_END_JOB_REQUEST,
    bodydata: bodydata,
  };
}
