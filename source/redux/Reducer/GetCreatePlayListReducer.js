import {
  GET_CREATE_PLAY_LIST_REQUEST,
  GET_CREATE_PLAY_LIST_RESPONSE,
} from '../Services/Type';

const initialState = {
  data: null,
};
console.log('call GetCreatePlayListReducer');
export const GetCreatePlayListReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case GET_CREATE_PLAY_LIST_REQUEST:
      console.log('GetCreatePlayListReducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case GET_CREATE_PLAY_LIST_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
