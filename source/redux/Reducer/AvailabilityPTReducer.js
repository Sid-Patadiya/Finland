import {
  AVAILABILITY_PT_REQUEST,
  AVAILABILITY_PT_RESPONSE,
} from '../Services/Type';

const initialState = {
  data: null,
};
console.log('call AvailabilityPTReducer');
export const AvailabilityPTReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case AVAILABILITY_PT_REQUEST:
      console.log('AvailabilityPTReducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case AVAILABILITY_PT_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
