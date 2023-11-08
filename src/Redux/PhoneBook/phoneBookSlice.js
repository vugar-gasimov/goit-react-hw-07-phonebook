import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  addContactThunk,
  deleteContactThunk,
  fetchDataThunk,
} from './operations';

const initialState = {
  contacts: {
    items: [
      // { id: 'id-1', name: 'Vugar Gasimov', number: '684-02-29' },
    ],
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
      })
      .addCase(deleteContactThunk.fulfilled, (state, { payload }) => {
        state.contacts.items = state.contacts.items.filter(
          item => item.id !== payload.id
        );
      })
      .addCase(addContactThunk.fulfilled, (state, { payload }) => {
        state.contacts.items.push(payload);
      })
      .addMatcher(
        isAnyOf(
          deleteContactThunk.fulfilled,
          fetchDataThunk.fulfilled,
          addContactThunk.fulfilled
        ),
        (state, { payload }) => {
          state.contacts.loading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          deleteContactThunk.pending,
          fetchDataThunk.pending,
          addContactThunk.pending
        ),
        (state, { payload }) => {
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
