import {
  CREATE_PLAY_LIST_REQUEST,
  CREATE_PLAY_LIST_RESPONSE,
} from '../Services/Type';

const initialState = {
  data: null,
};
console.log('call CreatePlayListReducer');
export const CreatePlayListReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case CREATE_PLAY_LIST_REQUEST:
      console.log('CreatePlayListReducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case CREATE_PLAY_LIST_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
