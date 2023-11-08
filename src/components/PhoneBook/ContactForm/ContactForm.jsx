import React, { useState } from 'react';
import {
  PhoneBookInputContainer,
  PhoneBookInputLabel,
  PhoneBookInput,
  PhoneBookButton,
  PhoneBookHint,
} from '../PhoneBookStyled';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { selectContacts } from 'Redux/PhoneBook/selectors';
import { nanoid } from '@reduxjs/toolkit';
import { addContactThunk } from 'Redux/PhoneBook/operations';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  const [isNumberValid, setIsNumberValid] = useState(false);
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleNewContacts = () => {
    if (isNameValid && isNumberValid) {
      if (contacts.some(contact => contact.name === name)) {
        toast.info('Sorry, you already have this name in the phonebook. 😅');
      } else if (contacts.some(contact => contact.number === number)) {
        toast.info('Sorry, you already have this number in the phonebook. 😉');
      } else {
        const newContact = {
          id: nanoid(),
          name,
          number,
        };
        dispatch(addContactThunk(newContact));
        setName('');
        setNumber('');
        setIsNameValid(false);
        setIsNumberValid(false);
        toast.success('You have added a new contact');
      }
    } else {
      if (!isNameValid) {
        toast.error('Please enter a valid name');
      }
      if (!isNumberValid) {
        toast.error('Please enter a valid phone number');
      }
    }
  };

  const handleNewName = e => {
    const newName = e.target.value.trim();
    const isValidName =
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/.test(
        newName
      );
    setName(newName);
    setIsNameValid(isValidName);
  };

  const handleNewNumber = e => {
    const newNumber = e.target.value.trim();
    const isValidNumber =
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        newNumber
      );
    setNumber(newNumber);
    setIsNumberValid(isValidNumber);
  };

  return (
    <PhoneBookInputContainer>
      <PhoneBookInputLabel>Name: </PhoneBookInputLabel>
      <PhoneBookInput
        name="name"
        required
        value={name}
        placeholder="Add new name..."
        onChange={handleNewName}
      />
      {!isNameValid && (
        <PhoneBookHint>
          Please enter a valid name (alphabets, spaces, hyphens, apostrophes).
        </PhoneBookHint>
      )}
      <PhoneBookInputLabel>Number: </PhoneBookInputLabel>
      <PhoneBookInput
        type="tel"
        name="number"
        required
        value={number}
        placeholder="Add new number..."
        onChange={handleNewNumber}
      />
      {!isNumberValid && (
        <PhoneBookHint>Please enter a valid phone number.</PhoneBookHint>
      )}
      <PhoneBookButton
        onClick={handleNewContacts}
        disabled={!isNameValid || !isNumberValid}
      >
        Add contact
      </PhoneBookButton>
    </PhoneBookInputContainer>
  );
};

export default ContactForm;
