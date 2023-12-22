import {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_RESPONSE,
} from '../Services/Type';

const initialState = {
  data: null,
};

console.log('call UpdateProfileReducer');
export const UpdateProfileReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case UPDATE_PROFILE_REQUEST:
      console.log('UpdateProfileReducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case UPDATE_PROFILE_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
