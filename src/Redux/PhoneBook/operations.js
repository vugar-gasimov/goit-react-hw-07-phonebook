import axios from 'axios';
import { isError, isFetching, isFetchingDone } from './phoneBookSlice';

axios.defaults.baseURL = 'https://654a381ce182221f8d52bf6d.mockapi.io/';

export const fetchDataThunk = text => async dispatch => {
  try {
    dispatch(isFetching());
    const { data } = await axios.get('contacts');
    dispatch(isFetchingDone(data));
    console.log(text, data);
  } catch (error) {
    dispatch(isError(error.message));
  }
};
