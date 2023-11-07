import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  addContactThunk,
  deleteContactThunk,
  fetchDataThunk,
} from './operations';

const initialState = {
  contacts: [
    // { id: 'id-1', name: 'Vugar Gasimov', number: '684-02-29' },
  ],
  loading: false,
  error: null,
};

export const phoneBookSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, { payload }) => {
      state.contacts.push(payload);
    },
  },

  editContact: (state, { payload }) => {
    const index = state.contacts.find(contact => contact.id === payload.id);
    index.contact = payload.text;
  },
  deleteContact: (state, { payload }) => {
    const index = state.contacts.findIndex(contact => contact.id === payload);
    state.contacts.splice(index, 1);
  },

  extraReducers: builder => {
    builder
      .addCase(fetchDataThunk.fulfilled, (state, { payload }) => {
        state.contacts = payload;
      })
      .addCase(deleteContactThunk.fulfilled, (state, { payload }) => {
        state.contacts = state.contacts.filter(item => item.id !== payload.id);
      })
      .addCase(addContactThunk.fulfilled, (state, { payload }) => {
        state.contacts.push(payload);
      })
      .addMatcher(
        isAnyOf(
          deleteContactThunk.fulfilled,
          fetchDataThunk.fulfilled,
          addContactThunk.fulfilled
        ),
        (state, { payload }) => {
          state.loading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          deleteContactThunk.pending,
          fetchDataThunk.pending,
          addContactThunk.pending
        ),
        (state, { payload }) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          deleteContactThunk.rejected,
          fetchDataThunk.rejected,
          addContactThunk.rejected
        ),
        (state, { payload }) => {
          state.loading = false;
          state.error = payload;
        }
      );
  },
});

export const { editContact, addContact, deleteContact } =
  phoneBookSlice.actions;
export const phoneBookReducer = phoneBookSlice.reducer;
