import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sort: {
    name: 'популярности (Убыв)',
    sortProperty: 'rating',
  },
};

const filterSilce = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      // console.log('action Catid:', action);
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
  },
});

export const { setCategoryId, setSort } = filterSilce.actions;
export default filterSilce.reducer;
