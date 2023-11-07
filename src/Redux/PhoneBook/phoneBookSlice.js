import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  contacts: [
    { id: 'id-1', name: 'Vugar Gasimov', number: '684-02-29' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    { id: 'id-5', name: 'Rosie Simpson', number: '459-12-56' },
  ],
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
  },
});

export const { addContact, deleteContact } = phoneBookSlice.actions;
export const phoneBookReducer = phoneBookSlice.reducer;
