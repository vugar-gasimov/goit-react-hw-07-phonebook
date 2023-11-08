import React from 'react';
import { ListItemContainer, DeleteButton } from '../PhoneBookStyled';

import { useDispatch } from 'react-redux';
import { deleteContactThunk } from 'Redux/PhoneBook/operations';

export function ContactListItem({ contact }) {
  const dispatch = useDispatch();
  if (!contact) {
    return null;
  }

  return (
    <ListItemContainer>
      {contact.name}: {contact.number}
      <DeleteButton onClick={() => dispatch(deleteContactThunk(contact.id))}>
        Delete
      </DeleteButton>
    </ListItemContainer>
  );
}
