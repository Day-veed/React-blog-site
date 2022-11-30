import {  createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {   
      state.user = action.payload;
    },
    
    logout: (state) => {
      state.user = null;
    },
  },

});

//  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export const { login, logout } = userSlice.actions;

//selectors
export const selectUser = (state) => state.user.user;


/*export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};*/

export default userSlice.reducer;
