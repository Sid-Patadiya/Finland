import {
    CREATE_END_JOB_REQUEST,
    CREATE_END_JOB_RESPONSE,
  } from '../Services/Type.js';
  
  const initialState = {
    data: null,
  };
  
  console.log('call endJobReducers');

  export const EndJobReducers = (state = initialState, action) => {
    const prevState = {...state};
    const {type} = action;
  
    switch (type) {
      case CREATE_END_JOB_REQUEST:
        console.log('endJobReducers Request call ===>', action);
        return {
          ...prevState,
          action: action,
        };
        
      case CREATE_END_JOB_RESPONSE:
        return {
          ...prevState,
          data: action.payload,
        };
    }
    return prevState;
  };
  