import * as TYPES from '../Services/Type';

export function SubscriptionPlanResponse(data) {
  console.log('SubscriptionPlanResponse---->', data);
  return {
    type: TYPES.SUBSCRITPTION_PLAN_RESPONSE,
    payload: data,
  };
}

export function SubscriptionPlanRequest(bodydata) {
  console.log('SubscriptionPlanRequest ===>', bodydata);
  return {
    type: TYPES.SUBSCRITPTION_PLAN_REQUEST,
    bodydata: bodydata,
  };
}
