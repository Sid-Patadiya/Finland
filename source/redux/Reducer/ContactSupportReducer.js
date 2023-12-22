import {
  CONTACT_SUPPORT_REQUEST,
  CONTACT_SUPPORT_RESPONSE,
} from '../Services/Type';

const initialState = {
  data: null,
};
console.log('call ContactSupportReducer');
export const ContactSupportReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case CONTACT_SUPPORT_REQUEST:
      console.log('ContactSupportReducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case CONTACT_SUPPORT_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
