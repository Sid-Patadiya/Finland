import {PROFILE_REQUEST,PROFILE_RESPONSE } from '../Services/Type';

const initialState = {
  data: null,
};
console.log('call ProfileReducer');
export const ProfileReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case PROFILE_REQUEST:
      console.log('ProfileReducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case PROFILE_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
