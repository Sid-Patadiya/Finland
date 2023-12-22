import * as TYPES from '../Services/Type';

export function MySubscriptionResponse(data) {
  console.log('MySubscriptionResponse---->', data);

  return {
    type: TYPES.MY_SUBSCRITPTION_RESPONSE,
    payload: data,
  };
}

export function MySubscriptionRequest() {
  console.log('MySubscriptionRequest----->');
  return {
    type: TYPES.MY_SUBSCRITPTION_REQUEST,
    // token: token,
  };
}
