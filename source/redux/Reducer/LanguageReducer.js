import { LANGUAGE_REQUEST, LANGUAGE_RESPONSE, SET_LANGUAGE } from '../Services/Type';

const initialState = {
  lang: {},
  data: null,
};

export const LanguageReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;
  switch (type) {
    case LANGUAGE_REQUEST:
      return {
        ...prevState,
        action: action,
      };
    case LANGUAGE_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
    case SET_LANGUAGE:
      console.log("SET_LANGUAGE ::::::")
      return {
        ...prevState,
        lang: action.data,
      };
  }
  return prevState;
};
