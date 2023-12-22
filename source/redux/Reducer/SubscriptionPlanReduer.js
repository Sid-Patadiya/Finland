import {
  SUBSCRITPTION_PLAN_REQUEST,
  SUBSCRITPTION_PLAN_RESPONSE,
} from '../Services/Type';

const initialState = {
  data: null,
};
console.log('call SubscriptionPlanReduer');
export const SubscriptionPlanReduer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case SUBSCRITPTION_PLAN_REQUEST:
      console.log('SubscriptionPlanReduer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case SUBSCRITPTION_PLAN_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
