import { configureStore } from '@reduxjs/toolkit';
import { phoneBookReducer } from './PhoneBook/phoneBookSlice';
import { filterReducer } from './filterSlice';

export const store = configureStore({
  reducer: { contacts: phoneBookReducer, filter: filterReducer },
});
