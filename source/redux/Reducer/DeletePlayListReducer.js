import {
  DELETE_PLAY_LIST_REQUEST,
  DELETE_PLAY_LIST_RESPONSE,
} from '../Services/Type';

const initialState = {
  data: null,
};
console.log('call DeletePlayListReducer');
export const DeletePlayListReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case DELETE_PLAY_LIST_REQUEST:
      console.log('DeletePlayListReducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case DELETE_PLAY_LIST_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
