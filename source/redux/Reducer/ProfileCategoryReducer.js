import {
  PROFILE_CATEGORY_RESPONSE,
  PROFILE_CATEGORY_REQUEST,
} from '../Services/Type';

const initialState = {
  data: null,
};
console.log('call PostJobCategoryReducer');
export const ProfileCategoryReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case PROFILE_CATEGORY_REQUEST:
      console.log('PostJobCategoryReducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case PROFILE_CATEGORY_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
