import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  contacts: [
    // { id: 'id-1', name: 'Vugar Gasimov', number: '684-02-29' },
  ],
  loading: false,
};

const prepareAdd = ({ name, number }) => {
  return {
    payload: {
      id: nanoid(),
      name: name,
      number,
    },
  };
};

export const phoneBookSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: {
      prepare: prepareAdd,
      reducer: (state, { payload }) => {
        state.contacts.push(payload);
      },
    },
    deleteContact: (state, { payload }) => {
      const index = state.contacts.findIndex(contact => contact.id === payload);
      state.contacts.splice(index, 1);
    },
    editContact: (state, { payload }) => {
      const index = state.contacts.find(contact => contact.id === payload.id);
      index.contact = payload.text;
    },
    isFetching: (state, action) => {
      state.loading = true;
    },
    isError: (state, action) => {
      state.error = action.payload;
    },
    isFetchingDone: (state, action) => {
      state.loading = false;
      state.contacts = action.payload;
    },
  },
});

export const {
  editContact,
  isFetching,
  isError,
  isFetchingDone,
  addContact,
  deleteContact,
} = phoneBookSlice.actions;
export const phoneBookReducer = phoneBookSlice.reducer;
