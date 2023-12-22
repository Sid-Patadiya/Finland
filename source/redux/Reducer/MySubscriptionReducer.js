import {
  MY_SUBSCRITPTION_REQUEST,
  MY_SUBSCRITPTION_RESPONSE,
} from '../Services/Type';

const initialState = {
  data: null,
};
console.log('call MySubscriptionReducer');
export const MySubscriptionReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case MY_SUBSCRITPTION_REQUEST:
      console.log('MySubscriptionReducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case MY_SUBSCRITPTION_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
