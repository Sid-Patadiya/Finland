import {UNLOCKED_BY_REQUEST, UNLOCKED_BY_RESPONSE} from '../Services/Type';

const initialState = {
  data: null,
};
console.log('call UnloackedBRReducer');
export const UnloackedBRReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case UNLOCKED_BY_REQUEST:
      console.log('UnloackedBRReducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case UNLOCKED_BY_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
