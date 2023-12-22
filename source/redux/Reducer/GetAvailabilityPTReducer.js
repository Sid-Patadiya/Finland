import {
  GET_AVAILABILITY_PT_RESPONSE,
  GET_AVAILABILITY_PT_REQUEST,
} from '../Services/Type';

const initialState = {
  data: null,
};
console.log('call GetAvailabilityPTReducer');
export const GetAvailabilityPTReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case GET_AVAILABILITY_PT_REQUEST:
      console.log('GetAvailabilityPTReducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case GET_AVAILABILITY_PT_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
