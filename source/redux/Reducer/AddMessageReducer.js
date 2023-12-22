import {
  ADD_MESSAGE_LIST_REQUEST,
  ADD_MESSAGE_LIST_RESPONSE,
} from '../Services/Type';

const initialState = {
  data: null,
};
console.log('call AddMessageReducer');
export const AddMessageReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case ADD_MESSAGE_LIST_REQUEST:
      console.log('AddMessageReducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case ADD_MESSAGE_LIST_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
