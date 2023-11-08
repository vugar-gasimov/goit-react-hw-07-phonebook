import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFilteredData,
  selectFilter,
  selectContacts,
} from 'Redux/PhoneBook/selectors';
import { setFilter } from 'Redux/filterSlice';
import { fetchDataThunk } from 'Redux/PhoneBook/operations';
import {
  PhoneBookContactTitle,
  PhoneBookContainer,
  PhoneBookTitle,
} from './PhoneBookStyled';
import { BookUser, Phone } from 'lucide-react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

export const PhoneBook = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const filteredData = useSelector(selectFilteredData);

  useEffect(() => {
    dispatch(fetchDataThunk('contacts'));
  }, [dispatch]);

  const isNameExists = name => contacts.some(contact => contact.name === name);
  const isNumberExists = number =>
    contacts.some(contact => contact.phoneNumber === number);

  const handleFilterChange = value => {
    dispatch(setFilter(value));
  };

  return (
    <div>
      <PhoneBookContainer>
        <PhoneBookTitle>
          PhoneBook <Phone strokeWidth={1.5} />
        </PhoneBookTitle>
        <ContactForm
          isNameExists={isNameExists}
          isNumberExists={isNumberExists}
        />
      </PhoneBookContainer>

      <PhoneBookContainer>
        <PhoneBookContactTitle>
          Contacts <BookUser strokeWidth={1.5} />
        </PhoneBookContactTitle>
        <Filter setFilter={handleFilterChange} filter={filter} />
        <ContactList contacts={filteredData} filter={filter} />
      </PhoneBookContainer>
    </div>
  );
};
