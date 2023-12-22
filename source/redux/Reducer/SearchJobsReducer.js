import {SEARCH_REQUEST, SEARCH_RESPONSE} from '../Services/Type';
const initialState = {
  data: null,
};
console.log('call SearchJobsReducer');
export const SearchJobsReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case SEARCH_REQUEST:
      console.log('SearchJobsReducer Request call ===>', action);
      return {
        ...prevState,
        action: action,
      };
    case SEARCH_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
