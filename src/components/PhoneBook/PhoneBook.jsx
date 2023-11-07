import { addContact, deleteContact } from 'Redux/PhoneBook/phoneBookSlice';
import { selectContacts, selectFilter } from 'Redux/PhoneBook/selectors';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setFilter } from 'Redux/filterSlice';
import {
  PhoneBookContactTitle,
  PhoneBookContainer,
  PhoneBookTitle,
} from './PhoneBookStyled';
import { BookUser, Phone } from 'lucide-react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { fetchDataThunk } from 'Redux/PhoneBook/operations';

export const PhoneBook = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(fetchDataThunk('contacts'));
  }, [dispatch]);

  const handleContactDelete = id => {
    dispatch(deleteContact(id));
    toast.info('You have deleted a contact');
  };

  const handleFilterChange = value => {
    dispatch(setFilter(value));
  };

  const filteredData = contacts.filter(
    item =>
      item.name &&
      filter &&
      item.name.toLowerCase().includes(filter.toLowerCase().trim())
  );

  const isNameExists = name => contacts.some(contact => contact.name === name);
  const isNumberExists = number =>
    contacts.some(contact => contact.phoneNumber === number);

  const onSubmit = data => {
    dispatch(addContact(data));
    toast.success('You have added a new contact');
  };

  return (
    <div>
      <PhoneBookContainer>
        <PhoneBookTitle>
          PhoneBook <Phone strokeWidth={1.5} />
        </PhoneBookTitle>

        <ContactForm
          onSubmit={onSubmit}
          isNameExists={isNameExists}
          isNumberExists={isNumberExists}
        />
      </PhoneBookContainer>
      <PhoneBookContainer>
        <PhoneBookContactTitle>
          Contacts <BookUser strokeWidth={1.5} />
        </PhoneBookContactTitle>

        <Filter setFilter={handleFilterChange} filter={filter} />

        <ContactList
          contacts={filteredData}
          filter={filter}
          onDeleteContact={handleContactDelete}
        />
      </PhoneBookContainer>
    </div>
  );
};
