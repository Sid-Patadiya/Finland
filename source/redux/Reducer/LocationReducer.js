import {LOCATION_REQUEST, LOCATION_RESPONSE} from '../Services/Type';

const initialState = {
  data: null,
};
console.log('call LocationReducer');
export const LocationReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case LOCATION_REQUEST:
      console.log('LocationReducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case LOCATION_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
