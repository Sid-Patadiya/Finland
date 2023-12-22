import {PLAY_LIST_REQUEST, PLAY_LIST_RESPONSE} from '../Services/Type';

const initialState = {
  data: null,
};
console.log('call PlayListReducer');
export const PlayListReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case PLAY_LIST_REQUEST:
      console.log('PlayListReducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case PLAY_LIST_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
