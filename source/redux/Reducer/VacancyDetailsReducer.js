import { VACANCY_DETAILS_REQUEST, VACANCY_DETAILS_RESPONSE } from '../Services/Type';

const initialState = {
  data: null,
};

export const VacancyDetailsReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;
  switch (type) {
    case VACANCY_DETAILS_REQUEST:
      return {
        ...prevState,
        action: action,
      };
    case VACANCY_DETAILS_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
