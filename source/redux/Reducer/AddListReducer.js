import {ADD_LIST_REQUEST, ADD_LIST_RESPONSE} from '../Services/Type';

const initialState = {
  data: null,
};
console.log('call AddListReducer');
export const AddListReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case ADD_LIST_REQUEST:
      console.log('AddListReducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case ADD_LIST_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
