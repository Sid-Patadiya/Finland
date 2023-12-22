import {HIRE_REQUESTS_RESPONSE, HIRE_REQUESTS_REQUEST} from '../Services/Type';

const initialState = {
  data: null,
};
console.log('call HireRequestsRducer');
export const HireRequestsRducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case HIRE_REQUESTS_REQUEST:
      console.log('HireRequestsRducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case HIRE_REQUESTS_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
