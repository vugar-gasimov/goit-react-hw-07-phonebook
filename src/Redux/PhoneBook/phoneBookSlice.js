import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  addContactThunk,
  deleteContactThunk,
  fetchDataThunk,
} from './operations';

const initialState = {
  contacts: {
    items: [],
    loading: false,
    error: null,
  },
  deletedId: null,
};

export const phoneBookSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setCurrentId: (state, { payload }) => {
      state.deletedId = payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchDataThunk.fulfilled, (state, { payload }) => {
        state.contacts.items = payload;
        state.contacts.loading = false;
      })
      .addCase(deleteContactThunk.fulfilled, (state, { payload }) => {
        state.contacts.items = state.contacts.items.filter(
          item => item.id !== payload.id
        );
        state.contacts.loading = false;
      })
      .addCase(addContactThunk.fulfilled, (state, { payload }) => {
        state.contacts.items.push(payload);
        state.contacts.loading = false;
      })
      .addMatcher(
        isAnyOf(
          deleteContactThunk.pending,
          fetchDataThunk.pending,
          addContactThunk.pending
        ),
        state => {
          state.contacts.loading = true;
          state.contacts.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          deleteContactThunk.rejected,
          fetchDataThunk.rejected,
          addContactThunk.rejected
        ),
        (state, { payload }) => {
          state.contacts.loading = false;
          state.contacts.error = payload;
        }
      );
  },
});

export const { setCurrentId } = phoneBookSlice.actions;
export const phoneBookReducer = phoneBookSlice.reducer;
