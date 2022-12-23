import {configureStore} from '@reduxjs/toolkit';


const initialState = {
    count: 0
  };
  
  function reducer(state = initialState, action) {
    return state;
  }

  const store = configureStore({
    reducer
    });

export default store;

