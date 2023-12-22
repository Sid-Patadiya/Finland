import {
  ACCEPT_HIRE_REQUESTS_REQUEST,
  ACCEPT_HIRE_REQUESTS_RESPONSE,
} from '../Services/Type';

const initialState = {
  data: null,
};
console.log('call AcceptHireRequestsReducer');
export const AcceptHireRequestsReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case ACCEPT_HIRE_REQUESTS_REQUEST:
      console.log('AcceptHireRequestsReducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case ACCEPT_HIRE_REQUESTS_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
