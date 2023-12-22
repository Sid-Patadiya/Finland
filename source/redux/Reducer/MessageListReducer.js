import {MESSAGE_LIST_REQUEST, MESSAGE_LIST_RESPONSE} from '../Services/Type';

const initialState = {
  data: null,
};
console.log('call MessageListReducer');
export const MessageListReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case MESSAGE_LIST_REQUEST:
      console.log('MessageListReducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case MESSAGE_LIST_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
