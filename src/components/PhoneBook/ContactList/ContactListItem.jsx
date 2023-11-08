import React from 'react';
import { ListItemContainer, DeleteButton } from '../PhoneBookStyled';

import { useDispatch, useSelector } from 'react-redux';
import { deleteContactThunk } from 'Redux/PhoneBook/operations';
import { selectDeletedId, selectLoading } from 'Redux/PhoneBook/selectors';

export function ContactListItem({ contact }) {
  const curId = useSelector(selectDeletedId);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  if (!contact) {
    return null;
  }

  return (
    <ListItemContainer>
      {contact.name}: {contact.number}
      {loading && curId === contact.id ? (
        <DeleteButton>Loading</DeleteButton>
      ) : (
        <DeleteButton onClick={() => dispatch(deleteContactThunk(contact.id))}>
          Delete
        </DeleteButton>
      )}
    </ListItemContainer>
  );
}
